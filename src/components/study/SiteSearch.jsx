import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchSite } from "../../data/siteSearchIndex";
import "./SiteSearch.css";

export default function SiteSearch({ variant = "header", onNavigate }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => setHighlight(0), [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const go = (entry) => {
    if (!entry) return;
    setQuery("");
    setOpen(false);
    if (onNavigate) onNavigate();
    navigate(entry.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[highlight]);
    }
  };

  const showPanel = open && query.trim().length >= 2;

  return (
    <div className={`site-search site-search--${variant}`} ref={wrapRef}>
      <div className="site-search__field">
        <Search size={15} strokeWidth={2} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Search guides, tools, formulas…"
          aria-label="Search the site"
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button type="button" className="site-search__clear" aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={14} strokeWidth={2} />
          </button>
        ) : null}
      </div>

      {showPanel ? (
        <div className="site-search__panel" role="listbox">
          {results.length ? (
            results.map((entry, idx) => (
              <button
                key={`${entry.kind}-${entry.title}-${entry.path}`}
                type="button"
                role="option"
                aria-selected={idx === highlight}
                className={`site-search__hit${idx === highlight ? " site-search__hit--active" : ""}`}
                onMouseEnter={() => setHighlight(idx)}
                onClick={() => go(entry)}
              >
                <span className="site-search__hit-main">
                  <span className="site-search__hit-title">{entry.title}</span>
                  {entry.description ? (
                    <span className="site-search__hit-sub">{entry.description}</span>
                  ) : null}
                </span>
                <span className="site-search__hit-kind">{entry.kind}</span>
              </button>
            ))
          ) : (
            <div className="site-search__empty">No matches for “{query.trim()}”.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
