import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  {
    to: "/courses/calculus-analytical-geometry",
    label: "Calc & Geometry",
    type: "Course",
    match: "/courses/calculus-analytical-geometry",
  },
  {
    to: "/courses/multivariable-calculus",
    label: "Multivariable",
    type: "Course",
    match: "/courses/multivariable-calculus",
  },
  {
    to: "/courses/linear-algebra",
    label: "Linear Algebra",
    type: "Course",
    match: "/courses/linear-algebra",
  },
  {
    to: "/courses/probability-statistics",
    label: "Prob & Stats",
    type: "Course",
    match: "/courses/probability-statistics",
  },
  // General (site-wide) tools
  { to: "/simple-concepts", label: "Concepts",    type: "General" },
  { to: "/ai-solver",       label: "AI Solver",   type: "General" },
  { to: "/cheatsheet",      label: "Cheat Sheet", type: "General" },
  { to: "/practice",        label: "Practice",    type: "General" },
  { to: "/saved",           label: "Saved",       type: "General" },
  { to: "/leaderboard",     label: "Leaderboard", type: "General" },
  {
    to: "/certificates",
    label: "Certificates",
    type: "General",
    match: "/certificate",
  },
];

function Header({ darkMode, onToggleDark }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = () => {
    try {
      logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setMenuOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>

      {/* Brand */}
      <NavLink className="site-brand" to="/" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">∂</span>
        <span className="brand-text">
          <span>CalcVoyager</span>
          <small>Multivariable tools</small>
        </span>
      </NavLink>

      {/* Desktop nav */}
      <nav className="site-nav" aria-label="Primary navigation">
        {navLinks.map(({ to, label, type, match }) => {
          const active = match
            ? location.pathname.startsWith(match)
            : location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              title={type}
              className={active ? "active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Controls: theme toggle + auth + hamburger */}
      <div className="header-controls">
        <button
          className="theme-toggle"
          onClick={onToggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <>
              <Sun size={16} strokeWidth={2} />
              <span> Light</span>
            </>
          ) : (
            <>
              <Moon size={16} strokeWidth={2} />
              <span> Dark</span>
            </>
          )}
        </button>

        {user ? (
          <div className="header-user">
            <Link to="/dashboard" className="header-avatar" title="Dashboard">
              {user.username?.[0]?.toUpperCase() ?? "U"}
            </Link>
          </div>
        ) : (
          <div className="header-auth">
            <Link
              to="/login"
              className="header-login"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="header-signup"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ to, label, match }) => {
          const active = match
            ? location.pathname.startsWith(match)
            : location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={active ? "active" : undefined}
              aria-current={active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          );
        })}

        <div className="mobile-nav-divider" />

        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <button className="mobile-nav-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
            >
              Sign up
            </Link>
          </>
        )}
      </nav>

    </header>
  );
}

export default Header;
