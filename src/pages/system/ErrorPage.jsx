import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage({ error }) {
  return (
    <main className="error-page">
      <div className="error-card">
        <h1>Oops — something went wrong</h1>
        <p>We couldn't load the page. Try refreshing or head back to the homepage.</p>
        {error && (
          <details className="error-details">
            <summary>More details</summary>
            <pre>{String(error)}</pre>
          </details>
        )}
        <div className="error-actions">
          <button onClick={() => window.location.reload()} className="error-btn">
            Reload page
          </button>
          <Link to="/" className="error-link">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
