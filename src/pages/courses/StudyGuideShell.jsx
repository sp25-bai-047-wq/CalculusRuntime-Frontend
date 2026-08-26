import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { saveExample, unsaveExample, isExampleSaved, exampleAnchorId } from "../../utils/saveForLaterStorage";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { useProgress } from "../../context/ProgressContext";
import "../dashboard/Leaderboard.css";
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
  top: var(--sidebar-top, calc(var(--header-h, 64px) + var(--guide-topbar-h, 0px))) !important;
  left: 0 !important;
  right: auto !important;
  bottom: 0 !important;
  width: 240px !important;
  max-width: 240px !important;
  height: calc(100vh - var(--sidebar-top, calc(var(--header-h, 64px) + var(--guide-topbar-h, 0px)))) !important;
  max-height: none !important;
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 0.15rem;
  background: #0f0e0d;
  border-right: 1px solid rgba(200, 146, 42, 0.35) !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem 0.75rem 1.35rem !important;
  z-index: 115 !important;
  scrollbar-width: thin;
  overscroll-behavior-y: contain;
  box-shadow: 4px 4px 18px rgba(0, 0, 0, 0.18);
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
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.partial-derivatives-guide .box:hover,
.partial-derivatives-guide .sum-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
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

/* ── MCQ Progress Sidebar ────────────────────────────────── */
.mcq-progress-sidebar {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 180;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  padding: 1.1rem 0.85rem 1.2rem;
  background: rgba(15, 14, 13, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(200, 146, 42, 0.35);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(200, 146, 42, 0.08);
  min-width: 58px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.mcq-progress-sidebar.visible {
  opacity: 1;
  pointer-events: auto;
}

.mcq-progress-sidebar__label {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c8922a;
  white-space: nowrap;
}

.mcq-progress-sidebar__track {
  position: relative;
  width: 6px;
  height: 120px;
  background: rgba(200, 146, 42, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.mcq-progress-sidebar__fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, #c8922a, #e8b84b);
  border-radius: 3px;
  transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mcq-progress-sidebar__count {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #faf7f2;
  white-space: nowrap;
}

.mcq-progress-sidebar__score {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.68rem;
  color: rgba(250, 247, 242, 0.55);
  white-space: nowrap;
}

.mcq-progress-sidebar__pct {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #e8b84b;
  line-height: 1;
}

.mcq-progress-sidebar__check {
  font-size: 1.25rem;
  line-height: 1;
  animation: mcq-check-pop 0.4s ease;
}

@keyframes mcq-check-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.3); }
  100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 920px) {
  .mcq-progress-sidebar {
    right: 0.75rem;
    padding: 0.75rem 0.6rem;
    min-width: 48px;
    border-radius: 10px;
  }
  .mcq-progress-sidebar__track {
    height: 80px;
  }
}

@media (max-width: 640px) {
  .mcq-progress-sidebar {
    top: auto;
    bottom: 5rem;
    right: 0.5rem;
    transform: none;
    flex-direction: row;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    border-radius: 8px;
  }
  .mcq-progress-sidebar__track {
    width: 60px;
    height: 5px;
  }
  .mcq-progress-sidebar__fill {
    bottom: 0;
    left: 0;
    height: 100% !important;
    width: var(--fill-w, 0%);
    transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}
`;

const saveForLaterStyles = `
.box.exm {
  position: relative;
  padding-right: 5.75rem;
}
.save-example-btn {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  background: #ffffff;
  border: 1px solid rgba(200, 146, 42, 0.4);
  color: #3d4f6b;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  z-index: 5;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}
.save-example-btn:hover {
  background: #fbf1dd;
  border-color: #c8922a;
  transform: translateY(-1px);
}
.save-example-btn.saved {
  background: #e8b84b;
  color: #0f0e0d;
  border-color: #e8b84b;
}
.save-example-btn.saved:hover {
  background: #dfa93b;
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

  // One-question-at-a-time slider: cardsBySection keeps DOM order per
  // section, activeIndex tracks which card is currently showing.
  const cardsBySection = {};
  cards.forEach((card) => {
    const section = card.dataset.section;
    if (!section) return;
    (cardsBySection[section] = cardsBySection[section] || []).push(card);
  });
  const activeIndex = {};

  const renderSlide = (section) => {
    const secCards = cardsBySection[section];
    if (!secCards || !secCards.length) return;
    const unlockedIdxs = secCards.reduce((acc, c, i) => {
      if (!c.classList.contains("mcq-locked")) acc.push(i);
      return acc;
    }, []);
    const maxIdx = unlockedIdxs.length ? unlockedIdxs[unlockedIdxs.length - 1] : 0;
    if (activeIndex[section] == null) activeIndex[section] = 0;
    if (activeIndex[section] > maxIdx) activeIndex[section] = maxIdx;

    secCards.forEach((c, i) => {
      c.classList.toggle("mcq-slide-hide", i !== activeIndex[section]);
    });

    root.querySelectorAll(`.mcq-dot[data-section="${section}"]`).forEach((dot, i) => {
      const reached = i <= maxIdx;
      dot.classList.toggle("active", i === activeIndex[section]);
      dot.classList.toggle("reached", reached);
      dot.disabled = !reached;
    });

    const nav = root.querySelector(`.mcq-slide-nav[data-section="${section}"]`);
    if (nav) {
      const pos = nav.querySelector(".mcq-slide-pos-cur");
      if (pos) pos.textContent = String(activeIndex[section] + 1);
      const prevBtn = nav.querySelector(".mcq-slide-prev");
      const nextBtn = nav.querySelector(".mcq-slide-next");
      if (prevBtn) prevBtn.disabled = activeIndex[section] <= 0;
      if (nextBtn) nextBtn.disabled = activeIndex[section] >= maxIdx;
    }
  };

  const goToSlide = (section, index) => {
    const secCards = cardsBySection[section];
    if (!secCards) return;
    const clamped = Math.max(0, Math.min(index, secCards.length - 1));
    if (secCards[clamped]?.classList.contains("mcq-locked")) return;
    activeIndex[section] = clamped;
    renderSlide(section);
  };

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
      const sectionKey = sectionCards[0]?.dataset.section;
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
        if (sectionKey) renderSlide(sectionKey);
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
        const head = sec.querySelector(".mcq-dots") || sec.querySelector(".mcq-score-strip");
        if (head) head.insertAdjacentElement("afterend", hint);
        else sec.prepend(hint);
      }
      const unlockedCount =
        1 + sectionCards.filter((c, i) => i > 0 && answered[cardKey(sectionCards[i - 1])]).length;
      const visible = Math.min(unlockedCount, sectionCards.length);
      hint.textContent = `Quiz progress: question ${Math.min(
        visible,
        sectionCards.length,
      )} of ${sectionCards.length} unlocked — slide through with the dots or Prev / Next below.`;

      if (sectionKey) renderSlide(sectionKey);
    });
  };

  applySequentialUnlock();

  // Event delegation on the stable root — survives React child re-renders.
  const onRootClick = (event) => {
    const dot = event.target.closest(".mcq-dot");
    if (dot && root.contains(dot) && !dot.disabled) {
      const section = dot.dataset.section;
      const idx = Number(dot.dataset.dot) - 1;
      if (section && Number.isInteger(idx)) goToSlide(section, idx);
      return;
    }

    const slideNav = event.target.closest(".mcq-slide-prev, .mcq-slide-next");
    if (slideNav && root.contains(slideNav) && !slideNav.disabled) {
      const section = slideNav.closest(".mcq-slide-nav")?.dataset.section;
      if (section) {
        const delta = slideNav.classList.contains("mcq-slide-prev") ? -1 : 1;
        goToSlide(section, (activeIndex[section] || 0) + delta);
      }
      return;
    }

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
      revealButton.style.display = "none";
      const answerPanel = card.querySelector(".mcq-answer");
      if (answerPanel) answerPanel.classList.add("visible");

      // Replace the MCQ number with a checkmark on the dot
      const qIndex = parseInt(card.dataset.q, 10) - 1;
      const dot = root.querySelector(`.mcq-dot[data-section="${section}"][data-dot="${qIndex + 1}"]`);
      if (dot) dot.textContent = "✓";

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

      // Dispatch progress event for the floating sidebar
      root.dispatchEvent(
        new CustomEvent("mcq-progress-update", {
          bubbles: true,
          detail: {
            section,
            answered: answeredCount[section] || 0,
            total: totals[section] || 0,
            score: scores[section] || 0,
          },
        }),
      );
    }
  };

  root.addEventListener("click", onRootClick);
  cleanups.push(() => root.removeEventListener("click", onRootClick));

  // React progress re-renders can strip imperative .selected/.correct/.wrong classes.
  // Re-apply from in-memory quiz state whenever the DOM under root mutates.
  const rehydrate = () => {
    // React re-renders can also wipe the imperative mcq-locked / mcq-slide-hide
    // classes — reapply lock + slider state before the per-card styling below.
    applySequentialUnlock();
    root.querySelectorAll(".mcq-card[data-answer]").forEach((card) => {
      if (!isWiredCard(card)) return;
      const key = cardKey(card);
      const correctAnswer = card.dataset.answer;
      const revealButton = card.querySelector(".mcq-reveal-btn");
      const answerPanel = card.querySelector(".mcq-answer");
      if (answered[key]) {
        applyStyles(card, state[key]?.chosen, correctAnswer, true);
        if (revealButton) {
          revealButton.style.display = "none";
        }
        answerPanel?.classList.add("visible");

        // Replace the MCQ number with a checkmark on the dot
        const qIndex = parseInt(card.dataset.q, 10) - 1;
        const dot = root.querySelector(`.mcq-dot[data-section="${card.dataset.section}"][data-dot="${qIndex + 1}"]`);
        if (dot) dot.textContent = "✓";
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
    const mobile = window.matchMedia("(max-width: 920px)").matches;
    const topbar = document.querySelector(".guide-part-topbar");
    const header = document.querySelector(".site-header");

    const headerH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      ) || 64;
    const topbarH = topbar ? Math.ceil(topbar.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty("--guide-topbar-h", `${topbarH}px`);

    // Dynamically calculate visible bottom of topbar / header stack
    let topOffset = 0;
    if (topbar) {
      const rect = topbar.getBoundingClientRect();
      topOffset = Math.max(0, Math.ceil(rect.bottom));
    } else if (header) {
      const rect = header.getBoundingClientRect();
      topOffset = Math.max(0, Math.ceil(rect.bottom));
    } else {
      topOffset = headerH + topbarH;
    }

    document.documentElement.style.setProperty("--sidebar-top", `${topOffset}px`);

    sidebar.style.position = "fixed";
    sidebar.style.top = `${topOffset}px`;
    sidebar.style.left = "0";
    sidebar.style.zIndex = "115";

    if (mobile) {
      sidebar.style.right = "0";
      sidebar.style.bottom = "auto";
      sidebar.style.width = "100%";
      sidebar.style.height = "auto";
      sidebar.style.maxHeight = "";
      sidebar.style.borderRadius = "0";
      spacer.style.display = "block";
      spacer.style.height = `${Math.ceil(sidebar.getBoundingClientRect().height || 52)}px`;
    } else {
      sidebar.style.right = "auto";
      sidebar.style.bottom = "0";
      sidebar.style.width = "240px";
      sidebar.style.height = `calc(100vh - ${topOffset}px)`;
      sidebar.style.maxHeight = "none";
      sidebar.style.borderRadius = "0";
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
    document.documentElement.style.removeProperty("--sidebar-top");
  };
}

/**
 * Floating MCQ progress sidebar — shows a vertical progress bar + counters
 * that update in real-time as quiz questions are answered. Visibility is
 * driven by IntersectionObserver on .mcq-section elements.
 */
function setupMcqProgressSidebar(root) {
  const mcqSections = Array.from(root.querySelectorAll(".mcq-section"));
  if (!mcqSections.length) return () => {};

  // Build the sidebar DOM
  const el = document.createElement("div");
  el.className = "mcq-progress-sidebar";
  el.setAttribute("aria-label", "Quiz progress");
  el.innerHTML = `
    <span class="mcq-progress-sidebar__label">QUIZ</span>
    <div class="mcq-progress-sidebar__track">
      <div class="mcq-progress-sidebar__fill" style="height:0%"></div>
    </div>
    <span class="mcq-progress-sidebar__count">0 / 0</span>
    <span class="mcq-progress-sidebar__score">Score: 0</span>
    <span class="mcq-progress-sidebar__pct">0%</span>
  `;
  document.body.appendChild(el);

  const fill = el.querySelector(".mcq-progress-sidebar__fill");
  const countEl = el.querySelector(".mcq-progress-sidebar__count");
  const scoreEl = el.querySelector(".mcq-progress-sidebar__score");
  const pctEl = el.querySelector(".mcq-progress-sidebar__pct");

  // Track progress per section (multiple quiz sections may exist)
  const progress = {};
  let activeSection = null;

  const updateUI = () => {
    const data = activeSection ? progress[activeSection] : null;
    if (!data) return;
    const pct = data.total > 0 ? Math.round((data.answered / data.total) * 100) : 0;
    const fillH = data.total > 0 ? (data.answered / data.total) * 100 : 0;
    fill.style.height = `${fillH}%`;
    fill.style.setProperty("--fill-w", `${fillH}%`);
    countEl.textContent = `${data.answered} / ${data.total}`;
    scoreEl.textContent = `Score: ${data.score}`;
    pctEl.textContent = `${pct}%`;

    if (pct === 100) {
      pctEl.innerHTML = `<span class="mcq-progress-sidebar__check">✅</span>`;
    }
  };

  // Initialize from current DOM state
  mcqSections.forEach((sec) => {
    const cards = sec.querySelectorAll(".mcq-card[data-section]");
    if (!cards.length) return;
    const section = cards[0].dataset.section;
    if (!section) return;
    progress[section] = { answered: 0, total: cards.length, score: 0 };
  });

  // Listen for progress events
  const onProgress = (e) => {
    const { section, answered, total, score } = e.detail;
    progress[section] = { answered, total, score };
    if (activeSection === section) updateUI();
  };
  root.addEventListener("mcq-progress-update", onProgress);

  // Intersection observer to show/hide when quiz sections are in view
  let visibleSections = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cards = entry.target.querySelectorAll(".mcq-card[data-section]");
        const section = cards[0]?.dataset.section;
        if (!section) return;

        if (entry.isIntersecting) {
          visibleSections.add(section);
          activeSection = section;
          updateUI();
          el.classList.add("visible");
        } else {
          visibleSections.delete(section);
          if (visibleSections.size === 0) {
            el.classList.remove("visible");
          } else {
            // Switch to another visible section
            activeSection = visibleSections.values().next().value;
            updateUI();
          }
        }
      });
    },
    { rootMargin: "0px", threshold: 0.05 },
  );

  mcqSections.forEach((sec) => io.observe(sec));

  return () => {
    io.disconnect();
    root.removeEventListener("mcq-progress-update", onProgress);
    el.remove();
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
        setupMcqProgressSidebar(rootRef.current),
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
