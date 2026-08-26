import "./Skeleton.css";

export default function Skeleton({ variant = "card", lines = 3 }) {
  if (variant === "text") {
    return (
      <div className="skeleton-text">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="skeleton-line" />
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-card">
      <div className="skeleton-graphic" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
}
