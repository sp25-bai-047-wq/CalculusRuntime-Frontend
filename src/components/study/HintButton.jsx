import "./HintButton.css";

export default function HintButton({
  onReveal,
  visibleCount = 0,
  total = 0,
  feedback = "",
  disabled = false,
  label = "Show Me a Hint",
}) {
  const progressLabel =
    total > 0
      ? `Hint ${Math.min(visibleCount, total)} of ${total}`
      : "Hints unlock after you run the tool";

  return (
    <div className="hint-system">
      <div className="hint-system__row">
        <button
          type="button"
          className="hint-system__btn"
          onClick={onReveal}
          disabled={disabled}
          aria-describedby="hint-system-progress"
        >
          {label}
        </button>
        <span id="hint-system-progress" className="hint-system__progress">
          {progressLabel}
        </span>
      </div>
      {feedback ? (
        <p className="hint-system__feedback" role="status">
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
