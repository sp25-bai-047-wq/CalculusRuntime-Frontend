/**
 * Study-guide MCQ block. Emits the markup that StudyGuideShell's `setupMcqs`
 * wires up: `data-section` / `data-q` / `data-answer` on each card, lettered
 * options, and a reveal button. Cards render inside a one-at-a-time slider —
 * dots and Prev/Next move between questions already unlocked, and answering
 * the current card unlocks the next. Scores are reported as
 * `guide-mcq-${section}` and gated in src/data/sectionQuizGates.js.
 */
export function GuideMcqSection({ id, badge, title, scoreId, section, questions }) {
  const count = questions.length;
  return (
    <section className="mcq-section" id={id}>
      <div className="mcq-section-head">
        <span className="mcq-section-badge">
          {badge} · {count} question{count === 1 ? "" : "s"}
        </span>
        <h2 className="mcq-section-title">{title}</h2>
      </div>
      <div className="mcq-score-strip">
        <span className="score-lbl">Score</span>
        <span className="score-val" id={scoreId}>
          0 / {count}
        </span>
        <span className="score-lbl" style={{ marginLeft: "auto", opacity: 0.4 }}>
          Solve each question to unlock the next
        </span>
      </div>
      <div className="mcq-dots" data-section={section} role="tablist" aria-label="Question progress">
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            className="mcq-dot"
            data-section={section}
            data-dot={String(i + 1)}
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="mcq-viewport">
        {questions.map((q, i) => (
          <div
            key={`${section}-${i}`}
            className="mcq-card"
            data-section={section}
            data-q={String(i + 1)}
            data-answer={q.answer}
          >
            <div className="mcq-q-row">
              <div className="mcq-num">{i + 1}</div>
              <div className="mcq-q-text">{q.prompt}</div>
            </div>
            <div className="mcq-options">
              {q.options.map((opt, j) => {
                const letter = String.fromCharCode(65 + j);
                return (
                  <div key={letter} className="mcq-opt" data-opt={letter}>
                    <span className="mcq-opt-letter">{letter}</span>
                    {opt}
                  </div>
                );
              })}
            </div>
            <button type="button" className="mcq-reveal-btn">
              Reveal Answer
            </button>
            <div className="mcq-answer">
              <span className="mcq-correct-badge">Correct Option: {q.answer}</span>
              <div className="mcq-explanation">{q.explanation}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mcq-slide-nav" data-section={section}>
        <button type="button" className="mcq-slide-prev">
          ‹ Previous
        </button>
        <span className="mcq-slide-pos">
          Question <span className="mcq-slide-pos-cur">1</span> / {count}
        </span>
        <button type="button" className="mcq-slide-next">
          Next ›
        </button>
      </div>
    </section>
  );
}

export default GuideMcqSection;
