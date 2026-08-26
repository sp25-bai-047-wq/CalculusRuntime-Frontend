import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await login(form.username.trim(), form.password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-mark">∂</span>
          <span className="auth-logo-text">CalcVoyager</span>
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to track your progress and bookmarks.</p>

        <form className="auth-form" onSubmit={submit} noValidate>
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handle}
              autoComplete="username"
              autoFocus
            />
          </label>
          <label className="auth-label">
            Password
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handle}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
