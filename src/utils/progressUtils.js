export function normalizeTimestamp(value) {
  if (value === null || value === undefined || value === "") return null;

  const numericValue = Number(value);
  if (Number.isFinite(numericValue)) {
    return numericValue < 1e12 ? numericValue * 1000 : numericValue;
  }

  const dateValue = Date.parse(value);
  return Number.isFinite(dateValue) ? dateValue : null;
}

export function formatRelativeCompletion(value) {
  const timestamp = normalizeTimestamp(value);
  if (timestamp === null) return "Completed recently";

  const diffMs = Date.now() - timestamp;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffDays <= 0) return "Completed today";
  if (diffDays === 1) return "Completed 1 day ago";
  return `Completed ${diffDays} days ago`;
}

export function formatCompletionDate(value) {
  const timestamp = normalizeTimestamp(value);
  if (timestamp === null) return "Unknown completion date";
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isOverdueForReview(value, windowDays = 14) {
  const timestamp = normalizeTimestamp(value);
  if (timestamp === null) return false;

  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return timestamp <= cutoff;
}

export function recordActivityDay() {
  try {
    const today = new Date().toDateString();
    const studyDays = JSON.parse(localStorage.getItem("calculus-study-days") || "[]");

    if (!studyDays.includes(today)) {
      studyDays.push(today);
      localStorage.setItem("calculus-study-days", JSON.stringify(studyDays));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function getStreak() {
  try {
    const studyDays = JSON.parse(localStorage.getItem("calculus-study-days") || "[]");
    let count = 0;
    const now = new Date();
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      if (studyDays.includes(d.toDateString())) {
        count++;
      } else if (i === 0) {
        // If today is not in the array, we just skip it, 
        // the streak might be active from yesterday.
        continue;
      } else {
        // Missing a day other than today means the streak is broken
        break;
      }
    }
    return count;
  } catch {
    return 0;
  }
}
