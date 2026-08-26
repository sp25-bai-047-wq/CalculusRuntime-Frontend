import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function renderLatexToElement(element, latex, options = {}) {
  if (!element) return;

  try {
    katex.render(latex || "", element, {
      throwOnError: false,
      strict: false,
      ...options,
    });
  } catch {
    element.textContent = latex || "";
  }
}

export function InlineMath({ latex, className = "", style }) {
  const ref = useRef(null);

  useEffect(() => {
    renderLatexToElement(ref.current, latex, { displayMode: false });
  }, [latex]);

  return (
    <span ref={ref} className={className} style={style}>
      {latex}
    </span>
  );
}

export function BlockMath({ latex, className = "", style }) {
  const ref = useRef(null);

  useEffect(() => {
    renderLatexToElement(ref.current, latex, { displayMode: true });
  }, [latex]);

  return (
    <div ref={ref} className={className} style={style}>
      {latex}
    </div>
  );
}
