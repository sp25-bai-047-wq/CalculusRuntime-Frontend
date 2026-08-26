import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}