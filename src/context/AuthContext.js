import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "calcvoyager_user";
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user?.accessToken ? user : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

async function requestAuth(path, body) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      error: `Could not reach the backend at ${API_URL}. Make sure it is running on port 8002.`,
    };
  }

  let data = {};
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    return { error: data.detail || "Authentication failed." };
  }

  const session = {
    ...data.user,
    accessToken: data.access_token,
    tokenType: data.token_type,
  };
  return { ok: true, user: session };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  // loadUser() reads localStorage synchronously, so hydration is already
  // done by the time this first renders — this just needs to exist and be
  // true. Previously it was never defined/exported at all, so every
  // `!isHydrated` check elsewhere (MyCertificates, CourseQuiz, etc.) read
  // `undefined` and was permanently truthy — those pages got stuck showing
  // a loading state forever, regardless of backend status.
  const [isHydrated] = useState(true);

  // Drop stale tokens whose user no longer exists in the backend DB.
  useEffect(() => {
    if (!user?.accessToken) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        if (cancelled) return;
        if (response.status === 401 || response.status === 404) {
          setUser(null);
          saveUser(null);
        }
      } catch {
        // Backend unreachable — keep local session for offline UX.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.accessToken]);

  const signup = useCallback(async (username, password) => {
    const result = await requestAuth("signup", { username, password });
    if (result.ok) {
      setUser(result.user);
      saveUser(result.user);
    }
    return result;
  }, []);

  const login = useCallback(async (username, password) => {
    const result = await requestAuth("login", { username, password });
    if (result.ok) {
      setUser(result.user);
      saveUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isHydrated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}