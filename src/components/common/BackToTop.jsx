import { useEffect, useState } from "react";
import "./BackToTop.css";

/** Floating control above Ask Tutor — appears after scrolling ~200px. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " back-to-top--visible" : ""}`}
      onClick={scrollTop}
      aria-label="Back to top of page"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      ↑
    </button>
  );
}
