import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Footer() {
  const year = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-logo">∂</span>
        <div>
          <p>CalcVoyager</p>
          <span>Study guides, practice, AI solver, and interactive tools.</span>
        </div>
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/partial-derivatives/1">Partials</NavLink>
        <NavLink to="/taylor-series/1">Taylor</NavLink>
        <NavLink to="/lagrange-multipliers/1">Lagrange</NavLink>
        <NavLink to="/divergence-curl/1">Divergence</NavLink>
        <NavLink to="/stokes-theorem/1">Stokes</NavLink>
        <NavLink to="/practice">Practice</NavLink>
        <NavLink to="/ai-solver">AI Solver</NavLink>
        {user ? (
          <NavLink to="/dashboard">Dashboard</NavLink>
        ) : (
          <Link to="/signup">Sign up free</Link>
        )}
      </nav>

      <p className="footer-copy">© {year} CalcVoyager</p>
    </footer>
  );
}

export default Footer;
