import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { COURSES } from "../../data/courses";

const guideCards = COURSES.map((c) => ({
  title: c.title,
  description: c.description,
  path: c.path,
  meta: c.meta,
  icon: c.icon,
  color: c.color,
}));

const toolLinks = [
  {
    label: "Simple Concepts",
    path: "/simple-concepts",
    icon: "ƒ",
    desc: "Plain-language foundations before multivariable calculus",
  },
  {
    label: "Continuity Finder",
    path: "/test",
    icon: "≈",
    desc: "Analyze continuity of multi-variable functions",
  },
  {
    label: "Extreme Value Finder",
    path: "/extreme",
    icon: "⬆",
    desc: "Find maxima and minima using second derivative test",
  },
  {
    label: "Volume Calculator",
    path: "/volumecalculator",
    icon: "∬",
    desc: "Evaluate double integrals with full step-by-step",
  },
  {
    label: "AI Calculus Solver",
    path: "/ai-solver",
    icon: "🤖",
    desc: "Neural solver for derivatives, integrals, gradients and more",
  },
  {
    label: "Cheat Sheet",
    path: "/cheatsheet",
    icon: "∑",
    desc: "Formula reference across calculus topics",
  },
  {
    label: "Practice Arena",
    path: "/practice",
    icon: "✎",
    desc: "MCQ drills with Submit to Leaderboard",
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: "🏆",
    desc: "Opt-in peer rankings and quiz scores",
  },
];

const baseItems = [
  ...guideCards.map((g) => ({ ...g, type: "guide" })),
  ...toolLinks.map((t) => ({ ...t, type: "tool" })),
];

function Home() {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { stats } = useProgress();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return baseItems;
    return baseItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.desc?.toLowerCase().includes(q) ||
        item.label?.toLowerCase().includes(q) ||
        item.meta?.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredGuides = filtered.filter((i) => i.type === "guide");
  const filteredTools = filtered.filter((i) => i.type === "tool");

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const goToFirstResult = () => {
    const first = filtered[0];
    if (first?.path) {
      setIsSearchOpen(false);
      navigate(first.path);
    }
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Multivariable Calculus Studio</p>
          <h1>Study guides, practice, and calculators in one place.</h1>
          <p>
            A focused home for the calculus pages in this site: clean topic
            navigation, readable notes, interactive checks, and companion tools
            when you need to compute instead of scroll.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" to="/partial-derivatives/1">
              Start studying
            </Link>
            {user ? (
              <Link className="secondary-action" to="/dashboard">
                My dashboard
              </Link>
            ) : (
              <Link className="secondary-action" to="/signup">
                Create free account
              </Link>
            )}
          </div>
          {user && stats.completedCount > 0 && (
            <p className="hero-progress-note">
              You've completed {stats.completedCount} of {stats.totalSections} sections. Keep it up!
            </p>
          )}
        </div>
        <div className="hero-panel" aria-label="Calculus topic map">
          <div className="orbit-grid">
            <span>f(x,y)</span>
            <span>grad f</span>
            <span>int C</span>
            <span>curl</span>
            <span>dA</span>
            <span>flux</span>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="home-search-wrap" ref={searchRef}>
        <form
          className="home-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            goToFirstResult();
          }}
        >
          <span className="home-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search guides and tools…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsSearchOpen(false);
            }}
            role="combobox"
            aria-label="Search topics and tools"
            aria-expanded={isSearching && isSearchOpen}
            aria-controls="home-search-results"
            aria-autocomplete="list"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="home-search-clear"
              onClick={() => {
                setQuery("");
                setIsSearchOpen(false);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
        {isSearching && isSearchOpen && (
          <div
            id="home-search-results"
            className="home-search-dropdown"
            role="listbox"
            aria-label="Search results"
          >
            {filtered.length === 0 ? (
              <p className="home-search-empty">No guides or tools match “{query}”.</p>
            ) : (
              filtered.map((item) => (
                <Link
                  key={item.path}
                  className="home-search-result"
                  to={item.path}
                  role="option"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="home-search-result-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="home-search-result-copy">
                    <strong>{item.title || item.label}</strong>
                    <small>{item.meta || item.desc}</small>
                  </span>
                  <span className="home-search-result-type">{item.type}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* No results */}
      {/* Study Guides */}
      {filteredGuides.length > 0 && (
        <section className="guide-section" aria-labelledby="guide-heading">
          <div className="section-kicker">Study Guides</div>
          <h2 id="guide-heading">Choose a path</h2>
          <div className="guide-grid">
            {filteredGuides.map((guide) => (
              <Link
                className={`guide-card guide-card--${guide.color}`}
                key={guide.path}
                to={guide.path}
              >
                <div className="guide-card-icon">{guide.icon}</div>
                <span>{guide.meta}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {filteredTools.length > 0 && (
        <section className="tool-strip" aria-labelledby="tools-heading">
          <div>
            <div className="section-kicker">Companion Tools</div>
            <h2 id="tools-heading">Calculate while you learn</h2>
          </div>
          <div className="tool-links">
            {filteredTools.map((tool) => (
              <Link key={tool.path} to={tool.path} title={tool.desc}>
                <span className="tool-link-icon">{tool.icon}</span>
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* AI Solver feature banner */}
      {!query && (
        <section className="ai-feature-banner">
          <div className="ai-feature-content">
            <span className="ai-feature-icon">🤖</span>
            <div>
              <div className="ai-feature-title">AI Calculus Solver</div>
              <div className="ai-feature-desc">
                Neural tree-to-tree transformer trained on 5.5M problems. Solves derivatives, integrals, gradients, Lagrange multipliers — with step-by-step explanations.
              </div>
            </div>
          </div>
          <Link to="/ai-solver" className="ai-feature-btn">Try the solver →</Link>
        </section>
      )}

      {/* Sign up CTA for guests */}
      {!user && !query && (
        <section className="home-cta">
          <div className="home-cta-content">
            <h2>Track your progress for free</h2>
            <p>Create an account to bookmark sections, save quiz scores, and pick up where you left off — just like freeCodeCamp.</p>
            <div className="home-cta-actions">
              <Link to="/signup" className="primary-action">Create free account</Link>
              <Link to="/login" className="secondary-action">Sign in</Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats strip */}
      <div className="home-stats">
        <div className="stat-item">
          <span className="stat-num">3</span>
          <span className="stat-label">Study Guides</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">4</span>
          <span className="stat-label">Interactive Tools</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">AI</span>
          <span className="stat-label">Neural Solver</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">∞</span>
          <span className="stat-label">Practice Problems</span>
        </div>
      </div>
    </main>
  );
}

export default Home;
