import { Link } from "react-router-dom";

function PersonalizedStudyPlan() {
  return (
    <main className="home-page">
      <section className="guide-section">
        <div className="section-kicker">Study plan</div>
        <h2>Personalized study plan</h2>
        <p>Track progress from your dashboard, or open a course path from the home page.</p>
        <div className="hero-actions" style={{ marginTop: "1rem" }}>
          <Link className="primary-action" to="/dashboard">
            Open dashboard
          </Link>
          <Link className="secondary-action" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default PersonalizedStudyPlan;
