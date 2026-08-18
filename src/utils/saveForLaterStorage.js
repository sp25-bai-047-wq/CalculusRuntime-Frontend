const STORAGE_KEY = "calcvoyager.savedExamples";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(examples) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(examples));
  } catch {
    // localStorage unavailable — fail silently
  }
}

function makeId(sectionId, exampleTitle) {
  return `${sectionId}::${exampleTitle}`;
}

/** Stable DOM id / URL hash for an example within a guide. */
export function exampleAnchorId(sectionId, exampleTitle) {
  const slug = String(exampleTitle || "example")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  const sec = String(sectionId || "sec")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .slice(0, 32);
  return `ex-${sec}-${slug || "item"}`;
}

export function getSavedExamples() {
  return readAll();
}

export function isExampleSaved(sectionId, exampleTitle) {
  const id = makeId(sectionId, exampleTitle);
  return readAll().some((entry) => entry.id === id);
}

export function saveExample({
  sectionId,
  exampleTitle,
  guideTitle,
  guidePath,
  exampleId,
}) {
  const id = makeId(sectionId, exampleTitle);
  const existing = readAll();
  if (existing.some((entry) => entry.id === id)) return;

  const entry = {
    id,
    sectionId,
    exampleTitle,
    guideTitle: guideTitle || null,
    guidePath: guidePath || null,
    exampleId: exampleId || exampleAnchorId(sectionId, exampleTitle),
    savedAt: new Date().toISOString(),
  };
  writeAll([...existing, entry]);
}

export function unsaveExample(sectionId, exampleTitle) {
  const id = makeId(sectionId, exampleTitle);
  writeAll(readAll().filter((entry) => entry.id !== id));
}
