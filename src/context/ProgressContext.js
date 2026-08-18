import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { recordActivityDay, getStreak } from "../utils/progressUtils";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const ProgressContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

function storageKey(username) {
  return `calcvoyager_progress_${username}`;
}

function loadProgress(username) {
  if (!username) return defaultProgress();
  try {
    const raw = localStorage.getItem(storageKey(username));
    return raw ? { ...defaultProgress(), ...JSON.parse(raw) } : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function defaultProgress() {
  return {
    completedSections: {},
    completedSectionTimestamps: {},
    completedSectionMetadata: {},
    quizScores: {},
    bookmarks: [],
    solverHistory: [],
    lastVisited: {},
    leaderboardOptIn: false,
  };
}

function mergeQuizScores(localScores = {}, serverScores = {}) {
  const merged = { ...localScores };
  for (const [quizId, server] of Object.entries(serverScores || {})) {
    const local = merged[quizId];
    if (!local) {
      merged[quizId] = { score: server.score, total: server.total };
      continue;
    }
    const localScore = Number(local.score) || 0;
    const serverScore = Number(server.score) || 0;
    if (serverScore > localScore) {
      merged[quizId] = { score: server.score, total: server.total };
    } else if (serverScore === localScore && server.total) {
      merged[quizId] = {
        score: local.score,
        total: server.total || local.total,
      };
    }
  }
  return merged;
}

function normalizeProgressPayload(payload) {
  const next = {
    completedSections: payload?.completedSections || {},
    completedSectionTimestamps: payload?.completedSectionTimestamps || {},
    completedSectionMetadata: payload?.completedSectionMetadata || {},
    quizScores: payload?.quizScores || {},
    bookmarks: payload?.bookmarks || [],
    solverHistory: payload?.solverHistory || [],
    lastVisited: payload?.lastVisited || {},
    solverUses: payload?.solverUses ?? 0,
  };
  if (payload && Object.prototype.hasOwnProperty.call(payload, "leaderboardOptIn")) {
    next.leaderboardOptIn = Boolean(payload.leaderboardOptIn);
  }
  return next;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => loadProgress(user?.username));
  const [isHydrated, setIsHydrated] = useState(false);
  const [streak, setStreak] = useState(() => getStreak());
  // Last intentional opt-in write — prevents a slow GET /progress from clobbering it.
  const leaderboardWriteRef = useRef(null);

  useEffect(() => {
    setProgress(loadProgress(user?.username));
    setIsHydrated(false);
    leaderboardWriteRef.current = null;
    setStreak(getStreak());
  }, [user?.username]);

  const persist = useCallback(
    (next) => {
      if (!user?.username) return;
      try {
        localStorage.setItem(storageKey(user.username), JSON.stringify(next));
      } catch {}
    },
    [user?.username]
  );

  const authHeaders = useCallback(() => {
    if (!user?.accessToken) return null;
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
  }, [user?.accessToken]);

  useEffect(() => {
    if (!user?.accessToken) {
      setIsHydrated(true);
      return;
    }

    let cancelled = false;

    async function fetchProgress() {
      try {
        const response = await fetchWithTimeout(`${API_URL}/api/progress/`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load progress");
        }

        const payload = await response.json();
        if (cancelled) return;

        setProgress((prev) => {
          const server = normalizeProgressPayload(payload);
          const write = leaderboardWriteRef.current;
          const writeIsFresh = write && Date.now() - write.at < 15000;

          let mergedOptIn;
          if (writeIsFresh) {
            mergedOptIn = Boolean(write.value);
          } else if (server.leaderboardOptIn !== undefined) {
            mergedOptIn = Boolean(server.leaderboardOptIn);
          } else {
            mergedOptIn = Boolean(prev.leaderboardOptIn);
          }

          const next = {
            ...prev,
            ...server,
            quizScores: mergeQuizScores(prev.quizScores, server.quizScores),
            leaderboardOptIn: mergedOptIn,
            solverHistory: prev.solverHistory?.length
              ? prev.solverHistory
              : server.solverHistory || [],
            lastVisited: {
              ...(server.lastVisited || {}),
              ...(prev.lastVisited || {}),
            },
            bookmarks: (server.bookmarks && server.bookmarks.length > 0)
              ? server.bookmarks
              : prev.bookmarks,
          };
          persist(next);
          return next;
        });

        // Fresh local opt-in true + snapshot still false → re-push to server.
        const write = leaderboardWriteRef.current;
        if (
          write?.value === true &&
          Date.now() - write.at < 15000 &&
          payload &&
          Object.prototype.hasOwnProperty.call(payload, "leaderboardOptIn") &&
          !payload.leaderboardOptIn &&
          user?.accessToken
        ) {
          try {
            await fetch(`${API_URL}/api/progress/leaderboard`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({ opt_in: true }),
            });
          } catch {
            // Keep local opt-in; next visit can retry.
          }
        }
      } catch {
        if (!cancelled) {
          setProgress((prev) => ({
            ...prev,
            completedSectionTimestamps: prev.completedSectionTimestamps || {},
          }));
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [user?.accessToken, persist]);

  const markSectionComplete = useCallback(
    async (sectionId) => {
      const applyLocal = (completedAt = Date.now()) => {
        setProgress((prev) => {
          const next = {
            ...prev,
            completedSections: { ...prev.completedSections, [sectionId]: true },
            completedSectionTimestamps: {
              ...prev.completedSectionTimestamps,
              [sectionId]: completedAt,
            },
            completedSectionMetadata: {
              ...prev.completedSectionMetadata,
              [sectionId]: {
                needs_review: false,
                days_since_completion: 0,
              },
            },
          };
          persist(next);
          return next;
        });
        if (recordActivityDay()) {
          setStreak(getStreak());
        }
      };

      // Always update local UI first so the button never crashes the page.
      applyLocal();

      if (!user?.accessToken) return;

      try {
        const response = await fetch(`${API_URL}/api/progress/section/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ section_id: sectionId }),
        });

        if (!response.ok) {
          // Local mark already applied; stale sessions just stay local.
          return;
        }

        const payload = await response.json().catch(() => ({}));
        if (payload?.completed_at != null) {
          applyLocal(payload.completed_at);
        }
      } catch {
        // Network / CORS / backend down — local progress already saved.
      }
    },
    [persist, user?.accessToken]
  );

  const saveQuizScore = useCallback(
    async (quizId, score, total) => {
      setProgress((prev) => {
        const existing = prev.quizScores[quizId];
        const nextPct = total > 0 ? score / total : 0;
        const existingPct =
          existing && existing.total > 0 ? existing.score / existing.total : -1;
        // Keep the best local percentage (not raw score), but still sync below.
        if (existing && existingPct >= nextPct) {
          return prev;
        }
        const next = {
          ...prev,
          quizScores: { ...prev.quizScores, [quizId]: { score, total } },
        };
        persist(next);
        return next;
      });

      if (recordActivityDay()) {
        setStreak(getStreak());
      }

      const headers = authHeaders();
      if (!headers) return;

      try {
        await fetch(`${API_URL}/api/quiz/`, {
          method: "POST",
          headers,
          body: JSON.stringify({ quiz_id: quizId, score, total }),
        });
      } catch {
        // Local score is already saved; sync can retry on next submit.
      }
    },
    [authHeaders, persist]
  );

  const addBookmark = useCallback(
    (bookmark) => {
      setProgress((prev) => {
        if (prev.bookmarks.find((b) => b.id === bookmark.id)) return prev;
        const next = {
          ...prev,
          bookmarks: [{ ...bookmark, addedAt: Date.now() }, ...prev.bookmarks],
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeBookmark = useCallback(
    (id) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          bookmarks: prev.bookmarks.filter((b) => b.id !== id),
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isBookmarked = useCallback(
    (id) => progress.bookmarks.some((b) => b.id === id),
    [progress.bookmarks]
  );

  const addSolverHistory = useCallback(
    (entry) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          solverHistory: [{ ...entry, timestamp: Date.now() }, ...prev.solverHistory].slice(0, 50),
        };
        persist(next);
        return next;
      });
      if (recordActivityDay()) {
        setStreak(getStreak());
      }
    },
    [persist]
  );

  const recordVisit = useCallback(
    (pageId) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          lastVisited: { ...prev.lastVisited, [pageId]: Date.now() },
        };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setLeaderboardOptIn = useCallback(
    async (optIn) => {
      const value = Boolean(optIn);
      leaderboardWriteRef.current = { value, at: Date.now() };
      setProgress((prev) => {
        const next = {
          ...prev,
          leaderboardOptIn: value,
        };
        persist(next);
        return next;
      });

      const headers = authHeaders();
      if (!headers) return;

      try {
        const response = await fetch(`${API_URL}/api/progress/leaderboard`, {
          method: "POST",
          headers,
          body: JSON.stringify({ opt_in: value }),
        });
        if (!response.ok) {
          throw new Error(`opt-in failed (${response.status})`);
        }
        const data = await response.json().catch(() => ({}));
        if (typeof data.leaderboardOptIn === "boolean") {
          leaderboardWriteRef.current = {
            value: data.leaderboardOptIn,
            at: Date.now(),
          };
          setProgress((prev) => {
            const next = { ...prev, leaderboardOptIn: data.leaderboardOptIn };
            persist(next);
            return next;
          });
        }
      } catch {
        // Keep the optimistic local value; user can retry via the toggle.
      }
    },
    [authHeaders, persist]
  );

  /** Atomically save a quiz score and opt into the leaderboard (avoids setState races). */
  const publishQuizToLeaderboard = useCallback(
    async (quizId, score, total) => {
      leaderboardWriteRef.current = { value: true, at: Date.now() };
      setProgress((prev) => {
        const existing = prev.quizScores[quizId];
        const quizScores =
          !existing || existing.score < score
            ? { ...prev.quizScores, [quizId]: { score, total } }
            : prev.quizScores;
        const next = {
          ...prev,
          quizScores,
          leaderboardOptIn: true,
        };
        persist(next);
        return next;
      });

      if (recordActivityDay()) {
        setStreak(getStreak());
      }

      const headers = authHeaders();
      if (!headers) return;

      try {
        const [quizRes, optRes] = await Promise.all([
          fetch(`${API_URL}/api/quiz/`, {
            method: "POST",
            headers,
            body: JSON.stringify({ quiz_id: quizId, score, total }),
          }),
          fetch(`${API_URL}/api/progress/leaderboard`, {
            method: "POST",
            headers,
            body: JSON.stringify({ opt_in: true }),
          }),
        ]);

        // Retry opt-in once if the first attempt failed (common under racey GET).
        if (!optRes.ok) {
          await fetch(`${API_URL}/api/progress/leaderboard`, {
            method: "POST",
            headers,
            body: JSON.stringify({ opt_in: true }),
          });
        }

        if (!quizRes.ok && !optRes.ok) {
          throw new Error("Could not publish quiz to leaderboard");
        }

        leaderboardWriteRef.current = { value: true, at: Date.now() };
        setProgress((prev) => {
          const next = { ...prev, leaderboardOptIn: true };
          persist(next);
          return next;
        });
      } catch {
        // Local progress already updated.
      }
    },
    [authHeaders, persist]
  );

  const stats = {
    totalSections: 42,
    completedCount: Object.keys(progress.completedSections).length,
    bookmarkCount: progress.bookmarks.length,
    quizzesTaken: Object.keys(progress.quizScores).length,
    solverUses: progress.solverHistory.length || progress.solverUses || 0,
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        stats,
        streak,
        markSectionComplete,
        saveQuizScore,
        addBookmark,
        removeBookmark,
        isBookmarked,
        addSolverHistory,
        recordVisit,
        setLeaderboardOptIn,
        publishQuizToLeaderboard,
        isHydrated,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}