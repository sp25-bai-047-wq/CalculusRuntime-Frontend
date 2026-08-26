import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-card">
        <h1>404 — Page not found</h1>
        <p>It looks like the page you were trying to reach doesn't exist.</p>
        <Link to="/" className="notfound-link">
          Return to home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
