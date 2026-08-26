import katex from "katex";

/**
 * Turn a string that may contain $...$ / $$...$$ into HTML with KaTeX spans.
 * Safe for React dangerouslySetInnerHTML — survives re-renders (unlike DOM mutation).
 * Caller must ensure katex CSS is loaded (StudyGuideShell / Math.jsx already do).
 */
export function mixedMathToHtml(input) {
  const src = input == null ? "" : String(input);
  if (!src) return "";

  // Match $$...$$ first, then $...$ (non-greedy, no unescaped newlines in $ $).
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let out = "";
  let last = 0;
  let m;

  while ((m = re.exec(src)) !== null) {
    out += escapeHtml(src.slice(last, m.index));
    const display = m[1] != null;
    const latex = display ? m[1] : m[2];
    try {
      out += katex.renderToString(latex, {
        throwOnError: false,
        strict: false,
        displayMode: display,
      });
    } catch {
      out += escapeHtml(m[0]);
    }
    last = m.index + m[0].length;
  }
  out += escapeHtml(src.slice(last));
  return out;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
