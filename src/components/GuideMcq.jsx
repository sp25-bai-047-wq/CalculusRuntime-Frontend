/**
 * Study-guide MCQ block. Emits the markup that StudyGuideShell's `setupMcqs`
 * wires up: `data-section` / `data-q` / `data-answer` on each card, lettered
 * options, and a reveal button. Scores are reported as
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
    </section>
  );
}

export default GuideMcqSection;
