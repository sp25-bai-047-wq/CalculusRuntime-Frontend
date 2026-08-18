import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { saveExample, unsaveExample, isExampleSaved, exampleAnchorId } from "../utils/saveForLaterStorage";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { useProgress } from "../context/ProgressContext";
import "../pages/Leaderboard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const integrationStyles = `
.sfl-highlight {
  outline: 3px solid #c8922a;
  outline-offset: 4px;
  border-radius: 8px;
  transition: outline-color 2s ease;
}

.study-guide-page {
  min-height: 100vh;
  overflow: visible;
}

/* Left vertical guide nav — stays visible while scrolling */
.partial-derivatives-guide {
  display: block;
}

.partial-derivatives-guide .sidebar {
  position: fixed !important;
  top: calc(var(--header-h, 64px) + var(--guide-topbar-h, 0px)) !important;
  left: 0 !important;
  right: auto !important;
  bottom: 0 !important;
  width: 240px !important;
  max-width: 240px !important;
  height: auto !important;
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 0.15rem;
  background: #0f0e0d;
  border-right: 1px solid rgba(200, 146, 42, 0.35) !important;
  border-bottom: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem 0.75rem 2rem !important;
  z-index: 115 !important;
  scrollbar-width: thin;
  overscroll-behavior-y: contain;
  box-shadow: 4px 0 18px rgba(0, 0, 0, 0.18);
}

.partial-derivatives-guide .guide-nav-spacer {
  display: none !important;
}

.partial-derivatives-guide .sidebar::-webkit-scrollbar {
  width: 4px;
  height: auto;
}

.partial-derivatives-guide .sidebar::-webkit-scrollbar-thumb {
  background: rgba(200, 146, 42, 0.55);
  border-radius: 2px;
}

.vector-calculus-guide nav {
  top: 64px;
}

.vector-calculus-guide > div > main {
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.55) inset;
}

.partial-derivatives-guide .sb-brand {
  flex: 0 0 auto;
  border-bottom: 1px solid rgba(200, 146, 42, 0.3) !important;
  border-right: 0 !important;
  margin: 0 0 0.65rem;
  padding: 0.35rem 0.55rem 0.85rem !important;
}

.partial-derivatives-guide .sb-sub {
  display: none;
}

.partial-derivatives-guide .sb-title {
  color: #e8b84b;
  font-size: 0.85rem;
  font-style: normal;
  white-space: normal;
  line-height: 1.35;
}

.partial-derivatives-guide .sb-group {
  display: none;
}

.partial-derivatives-guide .sb-link {
  flex: 0 0 auto;
  display: block !important;
  border-left: 3px solid transparent !important;
  border-bottom: 0 !important;
  border-radius: 6px;
  color: rgba(250, 247, 242, 0.76);
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: none;
  white-space: normal;
  padding: 0.55rem 0.65rem !important;
  line-height: 1.35;
  background: transparent;
}

.partial-derivatives-guide .sb-link:hover,
.partial-derivatives-guide .sb-link.active {
  background: rgba(200, 146, 42, 0.12) !important;
  border-left-color: #c8922a !important;
  border-bottom-color: transparent !important;
  color: #e8b84b;
}

.partial-derivatives-guide .sb-link .sn {
  color: #c8922a;
  font-size: 0.68rem;
  margin-right: 0.35em;
}

.partial-derivatives-guide .main {
  margin-left: 240px !important;
  max-width: none;
  padding: 0;
  min-width: 0;
  width: auto;
}

/* Sequential quiz unlock */
.partial-derivatives-guide .mcq-card.mcq-locked {
  display: none !important;
}

.partial-derivatives-guide .mcq-section.mcq-section-locked {
  position: relative;
  opacity: 0.55;
  pointer-events: none;
  filter: grayscale(0.25);
}

.partial-derivatives-guide .mcq-section.mcq-section-locked::before {
  content: attr(data-lock-hint);
  display: block;
  margin: 0 2rem 1rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px dashed rgba(200, 146, 42, 0.55);
  background: rgba(200, 146, 42, 0.08);
  color: #7a5a12;
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
}

.partial-derivatives-guide .mcq-unlock-hint {
  margin: 0.35rem 0 1rem;
  color: #7a7268;
  font-size: 0.88rem;
  font-family: 'Source Sans 3', system-ui, sans-serif;
}


.partial-derivatives-guide .ch-hdr {
  /* Warm ink brown with gold pinstripes — matches Vector Calculus guide */
  background:
    repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(200, 146, 42, 0.06) 40px, rgba(200, 146, 42, 0.06) 41px),
    #0f0e0d;
  border-bottom: 0;
  color: #faf7f2;
  margin-bottom: 0;
  overflow: hidden;
  padding: 3.4rem 2rem 3rem;
  position: relative;
}

.partial-derivatives-guide .ch-hdr::after {
  background: linear-gradient(90deg, transparent, #c8922a, #2a5c45, transparent);
  content: "";
  height: 1px;
  inset: auto 0 0;
  opacity: 0.8;
  position: absolute;
}

.partial-derivatives-guide .ch-eye {
  color: #e8b84b;
  font-family: 'Source Sans 3', system-ui, sans-serif;
}

.partial-derivatives-guide .ch-title {
  color: #faf7f2;
  font-size: clamp(2rem, 5vw, 3.5rem);
}

.partial-derivatives-guide .ch-sub {
  color: rgba(250, 247, 242, 0.74);
}

.partial-derivatives-guide .ch-orn {
  color: #e8b84b;
}

.partial-derivatives-guide .main > p,
.partial-derivatives-guide .main > .toc,
.partial-derivatives-guide .main > .section,
.partial-derivatives-guide .main > .mcq-section,
.partial-derivatives-guide .main > .pg-foot {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}

.partial-derivatives-guide .main > p {
  padding: 3rem 2rem 0;
}

.partial-derivatives-guide .main > .toc {
  background: #ffffff;
  border: 1px solid #d6cfc4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  margin-bottom: 3.5rem;
  margin-top: 2rem;
}

.partial-derivatives-guide .toc-h {
  color: #3d4f6b;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
}

.partial-derivatives-guide .toc-a {
  color: #3d4f6b;
}

.partial-derivatives-guide .main > .divider {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}

.partial-derivatives-guide .section,
.partial-derivatives-guide .mcq-section {
  background: transparent;
  padding-left: 2rem;
  padding-right: 2rem;
  scroll-margin-top: calc(var(--header-h, 64px) + var(--guide-topbar-h, 0px) + 3.5rem);
}

.partial-derivatives-guide .sec-badge,
.partial-derivatives-guide .mcq-section-badge {
  color: #c8922a;
  font-family: 'Source Sans 3', system-ui, sans-serif;
}

.partial-derivatives-guide .sec-title,
.partial-derivatives-guide .mcq-section-title {
  color: #3d4f6b;
  font-family: 'Playfair Display', Georgia, serif;
}

.partial-derivatives-guide .box,
.partial-derivatives-guide .mcq-card,
.partial-derivatives-guide .sum-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.partial-derivatives-guide .fml {
  background: #f7f4ff;
  border-left: 4px solid #3d4f6b;
  border-radius: 0 6px 6px 0;
}

.partial-derivatives-guide .pg-foot {
  color: #7a7268;
  padding-left: 2rem;
  padding-right: 2rem;
}

@media (max-width: 920px) {
  .partial-derivatives-guide .sidebar {
    top: calc(var(--header-h, 64px) + var(--guide-topbar-h, 0px)) !important;
    left: 0 !important;
    right: 0 !important;
    bottom: auto !important;
    width: 100% !important;
    max-width: none !important;
    height: auto !important;
    flex-direction: row !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    padding: 0 1rem !important;
    border-right: 0 !important;
    border-bottom: 1px solid rgba(200, 146, 42, 0.35) !important;
  }

  .partial-derivatives-guide .sb-brand {
    border-bottom: 0 !important;
    border-right: 1px solid rgba(200, 146, 42, 0.3) !important;
    margin: 0 0.5rem 0 0;
    padding: 0.65rem 1rem 0.65rem 0 !important;
  }

  .partial-derivatives-guide .sb-title {
    white-space: nowrap;
  }

  .partial-derivatives-guide .sb-link {
    white-space: nowrap;
    border-left: 0 !important;
    border-bottom: 2px solid transparent !important;
    border-radius: 0;
    text-transform: uppercase;
    padding: 0.85rem 0.8rem !important;
  }

  .partial-derivatives-guide .sb-link:hover,
  .partial-derivatives-guide .sb-link.active {
    border-left-color: transparent !important;
    border-bottom-color: #c8922a !important;
    background: transparent !important;
  }

  .partial-derivatives-guide .main {
    margin-left: 0 !important;
  }

  .partial-derivatives-guide .guide-nav-spacer {
    display: block !important;
    width: 100%;
    height: 52px;
  }

  .vector-calculus-guide nav {
    top: var(--header-h, 72px);
  }
}

@media (max-width: 640px) {
  .partial-derivatives-guide .sb-brand {
    display: none;
  }

  .partial-derivatives-guide .ch-hdr {
    padding: 2.4rem 1rem 2.2rem;
  }

  .partial-derivatives-guide .main > p,
  .partial-derivatives-guide .section,
  .partial-derivatives-guide .mcq-section,
  .partial-derivatives-guide .pg-foot {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
`;

const saveForLaterStyles = `
.box.exm {
  position: relative;
}
.save-example-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #ffffff;
  border: 1px solid rgba(200, 146, 42, 0.4);
  color: #3d4f6b;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  z-index: 5;
}
.save-example-btn.saved {
  background: #e8b84b;
  color: #0f0e0d;
  border-color: #e8b84b;
}
.box.exm.exm-flash {
  outline: 3px solid #c8922a;
  outline-offset: 4px;
  box-shadow: 0 0 0 8px rgba(200, 146, 42, 0.2);
  transition: outline 0.2s, box-shadow 0.2s;
}
`;

function renderLatex(root) {
  root.normalize();
  renderMathInElement(root, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
    strict: false,
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
  });
}

function setupMcqs(root, { publishQuizToLeaderboard, saveQuizScore, setLeaderboardOptIn } = {}) {
  // Only Partial-style cards: data-answer + lettered options + Reveal Answer.
  // Skips React-owned quizzes (Limits / Integrals) that lack these attributes.
  const cards = Array.from(root.querySelectorAll(".mcq-card")).filter(
    (card) =>
      card.dataset.answer &&
      card.querySelector(".mcq-opt[data-opt]") &&
      card.querySelector(".mcq-reveal-btn"),
  );
  if (!cards.length) return [];

  const scores = {};
  const totals = {};
  const answeredCount = {};
  const state = {};
  const answered = {};
  const cleanups = [];
  const submitHosts = {};
  const persisted = {};

  cards.forEach((card) => {
    const section = card.dataset.section;
    if (!section) return;
    totals[section] = (totals[section] || 0) + 1;
    scores[section] = 0;
    answeredCount[section] = 0;
  });

  const updateScoreDisplay = (section) => {
    const el =
      root.querySelector(`#score${section}`) ||
      root.querySelector(`#score-${section}`);
    if (el) el.textContent = `${scores[section] || 0} / ${totals[section] || 0}`;
  };

  const ensureSubmitHost = (section) => {
    if (submitHosts[section]) return submitHosts[section];
    const sectionEl =
      root.querySelector(`.mcq-section[id="mcq${section}"], .mcq-section[data-section="${section}"]`) ||
      root.querySelector(`#score${section}`)?.closest(".mcq-section") ||
      cards.find((c) => c.dataset.section === section)?.closest(".mcq-section");
    if (!sectionEl) return null;

    let host = sectionEl.querySelector(`[data-lb-submit="${section}"]`);
    if (!host) {
      host = document.createElement("div");
      host.dataset.lbSubmit = section;
      host.className = "lb-submit";
      host.innerHTML = `
        <div class="lb-submit__row">
          <button type="button" class="lb-submit__btn" disabled>Submit to Leaderboard</button>
          <a class="lb-submit__link" href="/leaderboard">View leaderboard →</a>
        </div>
        <p class="lb-submit__hint">Answer every question in this quiz, then submit an anonymized score.</p>
      `;
      sectionEl.appendChild(host);
      const btn = host.querySelector(".lb-submit__btn");
      const onSubmit = async () => {
        const score = scores[section] || 0;
        const total = totals[section] || 0;
        if (answeredCount[section] < total) return;
        const quizId = `guide-mcq-${section}`;
        btn.disabled = true;
        try {
          if (publishQuizToLeaderboard) {
            await publishQuizToLeaderboard(quizId, score, total);
          } else {
            await saveQuizScore?.(quizId, score, total);
            await setLeaderboardOptIn?.(true);
          }
          const hint = host.querySelector(".lb-submit__hint, .lb-submit__status");
          if (hint) {
            hint.className = "lb-submit__status";
            hint.textContent = `Submitted ${score}/${total}. You now appear on the leaderboard.`;
          }
          btn.textContent = "Update Leaderboard Score";
        } finally {
          btn.disabled = false;
        }
      };
      btn?.addEventListener("click", onSubmit);
      cleanups.push(() => btn?.removeEventListener("click", onSubmit));
      cleanups.push(() => host.remove());
    }
    submitHosts[section] = host;
    return host;
  };

  const refreshSubmitVisibility = (section) => {
    const host = ensureSubmitHost(section);
    if (!host) return;
    const btn = host.querySelector(".lb-submit__btn");
    const done = answeredCount[section] >= (totals[section] || 0);
    if (btn) btn.disabled = !done;
    const hint = host.querySelector(".lb-submit__hint");
    if (hint && !host.querySelector(".lb-submit__status")) {
      hint.textContent = done
        ? "Quiz complete — submit your anonymized score to the leaderboard."
        : "Answer every question in this quiz, then submit an anonymized score.";
    }
  };

  const applyStyles = (card, chosen, correct, revealed) => {
    card.querySelectorAll(".mcq-opt").forEach((opt) => {
      const option = opt.dataset.opt;
      opt.classList.remove("correct", "wrong", "selected");
      if (!option) return;
      if (revealed) {
        if (option === correct) opt.classList.add("correct");
        else if (option === chosen) opt.classList.add("wrong");
      } else if (option === chosen) {
        opt.classList.add("selected");
      }
    });
  };

  const isWiredCard = (card) =>
    card &&
    card.classList.contains("mcq-card") &&
    card.dataset.answer &&
    card.querySelector(".mcq-opt[data-opt]") &&
    card.querySelector(".mcq-reveal-btn");

  const cardKey = (card) => `${card.dataset.section}-${card.dataset.q}`;

  cards.forEach((card) => {
    const section = card.dataset.section;
    if (!section) return;
    const key = cardKey(card);
    state[key] = { chosen: null };
    answered[key] = false;
    updateScoreDisplay(section);
    ensureSubmitHost(section);
    refreshSubmitVisibility(section);
  });

  const quizSections = Array.from(root.querySelectorAll(".mcq-section")).filter((sec) =>
    sec.querySelector(".mcq-card[data-answer]"),
  );

  const applySequentialUnlock = () => {
    quizSections.forEach((sec, secIndex) => {
      const sectionCards = Array.from(sec.querySelectorAll(".mcq-card[data-answer]")).filter(
        isWiredCard,
      );
      const prevSection = secIndex > 0 ? quizSections[secIndex - 1] : null;
      const prevCards = prevSection
        ? Array.from(prevSection.querySelectorAll(".mcq-card[data-answer]")).filter(isWiredCard)
        : [];
      const prevSectionDone =
        !prevSection ||
        (prevCards.length > 0 &&
          prevCards.every((c) => answered[cardKey(c)]));

      if (!prevSectionDone) {
        sec.classList.add("mcq-section-locked");
        sec.setAttribute(
          "data-lock-hint",
          `Locked — finish Quiz ${secIndex} (all questions) to unlock Quiz ${secIndex + 1}`,
        );
        sectionCards.forEach((card) => card.classList.add("mcq-locked"));
        return;
      }

      sec.classList.remove("mcq-section-locked");
      sec.removeAttribute("data-lock-hint");

      sectionCards.forEach((card, i) => {
        if (i === 0) {
          card.classList.remove("mcq-locked");
          return;
        }
        const prevKey = cardKey(sectionCards[i - 1]);
        if (answered[prevKey]) card.classList.remove("mcq-locked");
        else card.classList.add("mcq-locked");
      });

      let hint = sec.querySelector(".mcq-unlock-hint");
      if (!hint) {
        hint = document.createElement("p");
        hint.className = "mcq-unlock-hint";
        const head = sec.querySelector(".mcq-score-strip");
        if (head) head.insertAdjacentElement("afterend", hint);
        else sec.prepend(hint);
      }
      const unlockedCount =
        1 + sectionCards.filter((c, i) => i > 0 && answered[cardKey(sectionCards[i - 1])]).length;
      const visible = Math.min(unlockedCount, sectionCards.length);
      hint.textContent = `Quiz progress: question ${Math.min(
        visible,
        sectionCards.length,
      )} of ${sectionCards.length} unlocked — solve each question to reveal the next.`;
    });
  };

  applySequentialUnlock();

  // Event delegation on the stable root — survives React child re-renders.
  const onRootClick = (event) => {
    const revealButton = event.target.closest(".mcq-reveal-btn");
    const option = event.target.closest(".mcq-opt");
    const card = (revealButton || option)?.closest(".mcq-card");
    if (!isWiredCard(card)) return;

    const section = card.dataset.section;
    const correctAnswer = card.dataset.answer;
    const key = cardKey(card);
    if (!state[key]) state[key] = { chosen: null };

    if (option && card.contains(option)) {
      if (answered[key]) return;
      if (!option.dataset.opt) return;
      state[key].chosen = option.dataset.opt;
      applyStyles(card, state[key].chosen, correctAnswer, false);
      return;
    }

    if (revealButton && card.contains(revealButton)) {
      if (answered[key]) return;
      if (!state[key].chosen) {
        const original = revealButton.textContent;
        revealButton.textContent = "Pick an option first!";
        window.setTimeout(() => {
          if (!answered[key]) revealButton.textContent = original;
        }, 1600);
        return;
      }

      answered[key] = true;
      revealButton.disabled = true;
      revealButton.textContent = "Revealed";
      applyStyles(card, state[key].chosen, correctAnswer, true);
      const answerPanel = card.querySelector(".mcq-answer");
      answerPanel?.classList.add("visible");

      if (state[key].chosen === correctAnswer) {
        scores[section] = (scores[section] || 0) + 1;
      }

      answeredCount[section] = (answeredCount[section] || 0) + 1;
      updateScoreDisplay(section);
      refreshSubmitVisibility(section);
      applySequentialUnlock();

      if (
        saveQuizScore &&
        !persisted[section] &&
        answeredCount[section] >= (totals[section] || 0)
      ) {
        persisted[section] = true;
        saveQuizScore(
          `guide-mcq-${section}`,
          scores[section] || 0,
          totals[section] || 0,
        );
      }

      if (answerPanel) renderLatex(answerPanel);
    }
  };

  root.addEventListener("click", onRootClick);
  cleanups.push(() => root.removeEventListener("click", onRootClick));

  // React progress re-renders can strip imperative .selected/.correct/.wrong classes.
  // Re-apply from in-memory quiz state whenever the DOM under root mutates.
  const rehydrate = () => {
    root.querySelectorAll(".mcq-card[data-answer]").forEach((card) => {
      if (!isWiredCard(card)) return;
      const key = cardKey(card);
      const correctAnswer = card.dataset.answer;
      const revealButton = card.querySelector(".mcq-reveal-btn");
      const answerPanel = card.querySelector(".mcq-answer");
      if (answered[key]) {
        applyStyles(card, state[key]?.chosen, correctAnswer, true);
        if (revealButton) {
          revealButton.disabled = true;
          revealButton.textContent = "Revealed";
        }
        answerPanel?.classList.add("visible");
      } else if (state[key]?.chosen) {
        applyStyles(card, state[key].chosen, correctAnswer, false);
      }
      updateScoreDisplay(card.dataset.section);
      refreshSubmitVisibility(card.dataset.section);
    });
  };

  let hydrateRaf = 0;
  const mo = new MutationObserver(() => {
    window.cancelAnimationFrame(hydrateRaf);
    hydrateRaf = window.requestAnimationFrame(rehydrate);
  });
  mo.observe(root, { childList: true, subtree: true });
  cleanups.push(() => {
    mo.disconnect();
    window.cancelAnimationFrame(hydrateRaf);
  });

  return cleanups;
}

function setupPinnedGuideNav(root) {
  const sidebar = root.querySelector(".sidebar");
  if (!sidebar) return () => {};

  let spacer = root.querySelector(".guide-nav-spacer");
  if (!spacer) {
    spacer = document.createElement("div");
    spacer.className = "guide-nav-spacer";
    spacer.setAttribute("aria-hidden", "true");
    sidebar.insertAdjacentElement("afterend", spacer);
  }

  const sync = () => {
    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      ) || 64;
    const topbar = document.querySelector(".guide-part-topbar");
    const topbarH = topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty("--guide-topbar-h", `${topbarH}px`);
    const mobile = window.matchMedia("(max-width: 920px)").matches;

    sidebar.style.position = "fixed";
    sidebar.style.top = `${headerH + topbarH}px`;
    sidebar.style.left = "0";
    sidebar.style.zIndex = "115";

    if (mobile) {
      sidebar.style.right = "0";
      sidebar.style.bottom = "auto";
      sidebar.style.width = "100%";
      sidebar.style.height = "auto";
      spacer.style.display = "block";
      spacer.style.height = `${Math.ceil(sidebar.getBoundingClientRect().height || 52)}px`;
    } else {
      sidebar.style.right = "auto";
      sidebar.style.bottom = "0";
      sidebar.style.width = "240px";
      sidebar.style.height = "auto";
      spacer.style.display = "none";
      spacer.style.height = "0";
    }
  };

  sync();
  const onResize = () => sync();
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", sync, { passive: true });

  let ro;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(sync);
    ro.observe(sidebar);
    const topbar = document.querySelector(".guide-part-topbar");
    if (topbar) ro.observe(topbar);
  }

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", sync);
    ro?.disconnect();
    spacer.remove();
    document.documentElement.style.removeProperty("--guide-topbar-h");
  };
}

function setupSidebar(root) {
  const sections = Array.from(root.querySelectorAll(".section[id], .mcq-section[id]"));
  const links = Array.from(
    root.querySelectorAll('.sb-link[href^="#"], .sidebar-link[href^="#"], .toc-a[href^="#"], .toc-item-link[href^="#"]'),
  );
  if (!sections.length || !links.length) return () => {};

  const sidebar = root.querySelector(".sidebar");
  const keepActiveLinkVisible = (link) => {
    if (!sidebar) return;
    const linkBox = link.getBoundingClientRect();
    const sidebarBox = sidebar.getBoundingClientRect();
    const padding = 24;
    const mobile = window.matchMedia("(max-width: 920px)").matches;

    if (mobile) {
      if (linkBox.left < sidebarBox.left + padding) {
        sidebar.scrollTo({
          left: sidebar.scrollLeft - (sidebarBox.left + padding - linkBox.left),
          behavior: "smooth",
        });
      } else if (linkBox.right > sidebarBox.right - padding) {
        sidebar.scrollTo({
          left: sidebar.scrollLeft + (linkBox.right - sidebarBox.right + padding),
          behavior: "smooth",
        });
      }
      return;
    }

    if (linkBox.top < sidebarBox.top + padding) {
      sidebar.scrollTo({
        top: sidebar.scrollTop - (sidebarBox.top + padding - linkBox.top),
        behavior: "smooth",
      });
    } else if (linkBox.bottom > sidebarBox.bottom - padding) {
      sidebar.scrollTo({
        top: sidebar.scrollTop + (linkBox.bottom - sidebarBox.bottom + padding),
        behavior: "smooth",
      });
    }
  };

  const scrollToTarget = (event) => {
    const link = event.currentTarget;
    const hash = link.getAttribute("href");
    const target = hash ? root.querySelector(hash) : null;
    if (!target) return;

    event.preventDefault();
    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
    ) || 72;
    const topbarH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--guide-topbar-h"),
    ) || 0;
    const mobile = window.matchMedia("(max-width: 920px)").matches;
    const sidebarHeight =
      mobile && sidebar ? sidebar.getBoundingClientRect().height : 0;
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      topbarH -
      sidebarHeight -
      14;

    window.history.pushState(null, "", hash);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    keepActiveLinkVisible(link);
  };

  links.forEach((link) => link.addEventListener("click", scrollToTarget));
  const cleanups = [
    () => links.forEach((link) => link.removeEventListener("click", scrollToTarget)),
  ];

  if (!window.IntersectionObserver) return () => cleanups.forEach((cleanup) => cleanup());

  let lastActive = null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link =
        root.querySelector(`.sb-link[href="#${entry.target.id}"]`) ||
        root.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
      if (link && link !== lastActive) {
        links.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        lastActive = link;
        keepActiveLinkVisible(link);
      }
    });
  }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
  cleanups.push(() => observer.disconnect());
  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupSaveForLater(root, { guideTitle, guidePath } = {}) {
  const examples = Array.from(root.querySelectorAll(".box.exm"));
  if (!examples.length) return () => {};

  const cleanups = [];
  const getMeta = (example) => {
    const titleEl = example.querySelector(".exm-title");
    let exampleTitle = "Untitled example";
    if (titleEl) {
      const clone = titleEl.cloneNode(true);
      clone.querySelectorAll(".katex-mathml").forEach((el) => el.remove());
      exampleTitle = clone.textContent.trim() || "Untitled example";
    }
    const sectionEl = example.closest("section[id]");
    const sectionId = sectionEl ? sectionEl.id : "unknown-section";
    return { exampleTitle, sectionId };
  };

  examples.forEach((example, index) => {
    const { exampleTitle, sectionId } = getMeta(example);
    const anchor = exampleAnchorId(sectionId, exampleTitle);
    if (!example.id) example.id = anchor;
    example.dataset.exampleId = anchor;

    if (example.querySelector(".save-example-btn")) return;

    example.style.position = example.style.position || "relative";

    if (!example.id) {
      const { sectionId } = getMeta(example);
      example.id = `${sectionId}-example-${index}`;
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "save-example-btn";
    btn.setAttribute("aria-label", "Save for later");
    btn.dataset.exampleIndex = String(index);

    const alreadySaved = isExampleSaved(sectionId, exampleTitle);
    if (alreadySaved) btn.classList.add("saved");
    btn.textContent = alreadySaved ? "★ Saved" : "☆ Save";

    example.appendChild(btn);
    cleanups.push(() => btn.remove());
  });

  const onClick = (event) => {
    const btn = event.target.closest(".save-example-btn");
    if (!btn || !root.contains(btn)) return;
    const example = btn.closest(".box.exm");
    if (!example) return;

    const { exampleTitle, sectionId } = getMeta(example);
    const exampleId = example.id || exampleAnchorId(sectionId, exampleTitle);
    const isSaved = btn.classList.toggle("saved");
    btn.textContent = isSaved ? "★ Saved" : "☆ Save";

    if (isSaved) {
      saveExample({
        sectionId,
        exampleTitle,
        guideTitle,
        guidePath: guidePath || window.location.pathname,
        exampleId,
      });
    } else {
      unsaveExample(sectionId, exampleTitle);
    }
  };

  root.addEventListener("click", onClick);
  cleanups.push(() => root.removeEventListener("click", onClick));

  return () => cleanups.forEach((cleanup) => cleanup());
}

function scrollToExampleHash(root) {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || !root) return;
  const target =
    root.querySelector(`#${CSS.escape(hash)}`) ||
    document.getElementById(hash);
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("exm-flash");
    window.setTimeout(() => target.classList.remove("exm-flash"), 2200);
  });
}

function StudyGuideShell({
  guideClass = "partial-derivatives-guide",
  title,
  styles = "",
  markup,
  children,
}) {
  const rootRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { saveQuizScore, setLeaderboardOptIn, publishQuizToLeaderboard } = useProgress();
  const location = useLocation();
  const resolvedClass = guideClass || "partial-derivatives-guide";
  const guidePath = location.pathname;

  const handleSaveAsPDF = async () => {
    const element = rootRef.current;
    if (!element) return;
    setIsGeneratingPDF(true);
    try {

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = title ? `${title}.pdf` : "study-guide.pdf";
    pdf.save(fileName);
  } finally {
    setIsGeneratingPDF(false);
  }
  };

  useEffect(() => {
    if (title) {
      const previous = document.title;
      document.title = `${title} · CalcVoyager`;
      return () => {
        document.title = previous;
      };
    }
    return undefined;
  }, [title]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Inject markup imperatively instead of dangerouslySetInnerHTML: React 19
    // re-applies __html on unrelated re-renders (e.g. recordVisit progress
    // updates), which wiped the KaTeX output ~1s after load.
    if (markup) {
      root.innerHTML = markup;
    }

    // Do not depend on `children` — parent visit/progress re-renders were tearing
    // down MCQ listeners and wiping selected / correct / wrong styles mid-click.
    let cancelled = false;
    let cleanups = [];

    const wire = () => {
      if (cancelled || !rootRef.current) return;
      cleanups.forEach((cleanup) => cleanup());
      renderLatex(rootRef.current);
      cleanups = [
        ...setupMcqs(rootRef.current, {
          publishQuizToLeaderboard,
          saveQuizScore,
          setLeaderboardOptIn,
        }),
        setupPinnedGuideNav(rootRef.current),
        setupSidebar(rootRef.current),
        setupSaveForLater(rootRef.current, {
          guideTitle: title,
          guidePath,
        }),
      ];
      const topButton = rootRef.current.querySelector("#top-btn");
      const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
      topButton?.addEventListener("click", scrollTop);
      cleanups.push(() => topButton?.removeEventListener("click", scrollTop));
      scrollToExampleHash(rootRef.current);
    };

    // Defer one frame so React finishes committing Partials-style children.
    const raf = window.requestAnimationFrame(wire);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [markup, publishQuizToLeaderboard, saveQuizScore, setLeaderboardOptIn, title, guidePath]);

  useEffect(() => {
    scrollToExampleHash(rootRef.current);
  }, [location.hash, markup, guidePath]);

  // Children-mode guides: progress/visit re-renders restore raw `$...$` text nodes.
  // useLayoutEffect runs before paint so users never see broken raw LaTeX.
  useLayoutEffect(() => {
    if (markup) return;
    const root = rootRef.current;
    if (root) renderLatex(root);
  });

  return (
    <main className={`study-guide-page ${resolvedClass}`}>
      <style>{styles + integrationStyles + saveForLaterStyles}</style>
      <button
        type="button"
        onClick={handleSaveAsPDF}
        disabled={isGeneratingPDF}
        className="save-as-pdf-btn"
        style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "2rem",
          zIndex: 200,
          background: "#0f0e0d",
          color: "#e8b84b",
          border: "1px solid rgba(200, 146, 42, 0.5)",
          borderRadius: "6px",
          padding: "0.6rem 1rem",
          fontSize: "0.85rem",
          cursor: isGeneratingPDF ? "wait" : "pointer",
          opacity: isGeneratingPDF ? 0.7 : 1,
        }}
      >
        {isGeneratingPDF ? "Generating..." : "Save as PDF"}
      </button>
      {markup ? (
        <div ref={rootRef} suppressHydrationWarning />
      ) : (
        <div ref={rootRef}>{children}</div>
      )}
    </main>
  );
}

export default StudyGuideShell;
