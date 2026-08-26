// src/pages/CheatSheet.jsx
import { useState, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";
import formulaData from "../../data/formulaData.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ─── Topic key → progress key mapping ────────────────────────────────────────
// Adjust these keys to match what your ProgressContext actually stores
const TOPIC_PROGRESS_KEYS = {
  "partial-derivatives": ["partial-derivatives/1", "partial-derivatives/2", "vector-1", "partial-1"],
  "vector-calculus":     ["vector-calculus/1", "vector-calculus/2", "vector-1", "vector-2"],
  "limits-continuity":   ["limits-continuity/1", "limits-continuity/2", "limits-1", "limits-2"],
  "multiple-integrals":  ["multiple-integrals/1", "multiple-integrals/2", "integrals-1", "integrals-2"],
  extrema:               ["extreme", "extrema"],
  "taylor-series":       ["taylor-series/1", "taylor-series/2", "taylor-1", "taylor-2"],
  "lagrange-multipliers": ["lagrange-multipliers/1", "lagrange-multipliers/2", "lagrange-1", "lagrange-2"],
  "stokes-theorem":      ["stokes-theorem/1", "stokes-theorem/2", "stokes-1", "stokes-2"],
  "divergence-curl":     ["divergence-curl/1", "divergence-curl/2", "divergence/1", "divergence/2"],
  "la-vectors":          ["linear-algebra/vectors/1", "linear-algebra/vectors/2"],
  "la-matrices":         ["linear-algebra/matrices/1", "linear-algebra/matrices/2"],
  "la-systems":          ["linear-algebra/systems/1", "linear-algebra/systems/2"],
  "la-eigen":            ["linear-algebra/eigen/1", "linear-algebra/eigen/2"],
  "prob-basics":         ["probability-statistics/probability-basics"],
  "prob-random-vars":    ["probability-statistics/random-variables"],
  "prob-descriptive":    ["probability-statistics/descriptive-statistics"],
  "prob-hypothesis":     ["probability-statistics/hypothesis-testing"],
  "prob-regression":     ["probability-statistics/regression-correlation"],
  "simple-concepts":     ["simple-concepts"],
};

export default function CheatSheet() {
  const { completedTopics = [] } = useProgress();  // adjust to your context shape
  const sheetRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState(() =>
    Object.keys(formulaData)
  );
  const [searchTerm, setSearchTerm] = useState("");

  // ── Which topics has the student completed? ──────────────────────────────
  const isCompleted = (topicKey) => {
    const keys = TOPIC_PROGRESS_KEYS[topicKey] ?? [topicKey];
    return keys.some((k) => completedTopics.includes(k));
  };

  // ── Toggle topic selection ───────────────────────────────────────────────
  const toggleTopic = (key) => {
    setSelectedTopics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const selectAll   = () => setSelectedTopics(Object.keys(formulaData));
  const selectDone  = () =>
    setSelectedTopics(Object.keys(formulaData).filter(isCompleted));
  const clearAll    = () => setSelectedTopics([]);

  // ── Filtered formulas by search ──────────────────────────────────────────
  const filteredData = Object.entries(formulaData).filter(([key]) =>
    selectedTopics.includes(key)
  ).map(([key, topic]) => ({
    key,
    ...topic,
    formulas: topic.formulas.filter(
      (f) =>
        searchTerm === "" ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.formula.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((t) => t.formulas.length > 0);

  // ── PDF Download ─────────────────────────────────────────────────────────
  const downloadPDF = async () => {
    if (!sheetRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(sheetRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageW  = pdf.internal.pageSize.getWidth();
      const pageH  = pdf.internal.pageSize.getHeight();
      const ratio  = canvas.width / canvas.height;
      const imgW   = pageW - 20;
      const imgH   = imgW / ratio;
      let heightLeft = imgH;
      let position   = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgW, imgH);
      heightLeft -= pageH - 20;
      while (heightLeft > 0) {
        position = heightLeft - imgH + 10;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgW, imgH);
        heightLeft -= pageH - 20;
      }
      pdf.save("CalcVoyager-CheatSheet.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setDownloading(false);
  };

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="cheat-page">

      {/* ── Page header ── */}
      <div className="tool-hero">
        <div>
          <p className="tool-hero-kicker">Formula Reference</p>
          <h1>Formula Cheat Sheet</h1>
          <p className="tool-hero-sub">
            Select topics, search formulas, then download your personalised PDF.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

      {/* ── Controls bar ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "24px", padding: "16px", background: "var(--cv-bg-surface)", borderRadius: "12px", boxShadow: "var(--cv-shadow-md)" }}>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search formulas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: "1 1 220px", padding: "10px 14px", borderRadius: "8px", border: "2px solid var(--cv-border)", background: "var(--cv-input-bg)", color: "var(--cv-text-primary)", fontSize: "14px" }}
        />

        {/* Quick select buttons */}
        <button onClick={selectAll}  className="cv-btn cv-btn--function" style={{ padding: "9px 14px", fontSize: "13px", borderRadius: "8px" }}>All Topics</button>
        <button onClick={selectDone} className="cv-btn cv-btn--operator" style={{ padding: "9px 14px", fontSize: "13px", borderRadius: "8px" }}>✅ Completed Only</button>
        <button onClick={clearAll}   className="cv-btn cv-btn--function" style={{ padding: "9px 14px", fontSize: "13px", borderRadius: "8px" }}>Clear</button>

        {/* Download */}
        <button
          onClick={downloadPDF}
          disabled={downloading || filteredData.length === 0}
          className="cv-btn cv-btn--equals"
          style={{ padding: "10px 20px", fontSize: "14px", fontWeight: 700, borderRadius: "8px", minWidth: "160px" }}
        >
          {downloading ? "⏳ Generating PDF..." : "⬇️ Download PDF"}
        </button>
      </div>

      {/* ── Topic filter chips ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
        {Object.entries(formulaData).map(([key, topic]) => {
          const active    = selectedTopics.includes(key);
          const completed = isCompleted(key);
          return (
            <button
              key={key}
              onClick={() => toggleTopic(key)}
              style={{
                padding: "7px 14px",
                borderRadius: "20px",
                border: `2px solid ${active ? "var(--cv-accent)" : "var(--cv-border)"}`,
                background: active ? "var(--cv-accent-light)" : "var(--cv-bg-surface)",
                color: active ? "var(--cv-accent-text, var(--cv-accent))" : "var(--cv-text-secondary)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {completed ? "✅ " : ""}{topic.title}
            </button>
          );
        })}
      </div>

      {/* ── Formula sheet (this gets rendered to PDF) ── */}
      {filteredData.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--cv-text-muted)" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p>No formulas match your selection. Try selecting a topic above.</p>
        </div>
      ) : (
        <div
          ref={sheetRef}
          style={{ background: "#ffffff", borderRadius: "16px", padding: "32px", boxShadow: "var(--cv-shadow-lg)" }}
        >
          {/* PDF Header */}
          <div style={{ textAlign: "center", borderBottom: "3px solid #a0720a", paddingBottom: "16px", marginBottom: "28px" }}>
            <h2 style={{ fontSize: "1.8em", fontWeight: 900, color: "#1a1a2e", margin: "0 0 4px" }}>
              📐 CalcVoyager — Formula Reference Sheet
            </h2>
            <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>
              Generated on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Topics */}
          {filteredData.map((topic) => (
            <div key={topic.key} style={{ marginBottom: "32px" }}>

              {/* Topic heading */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", paddingBottom: "8px", borderBottom: `2px solid ${topic.color}` }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: topic.color }} />
                <h3 style={{ margin: 0, fontSize: "1.15em", fontWeight: 800, color: "#1a1a2e" }}>
                  {topic.title}
                </h3>
                <span style={{ marginLeft: "auto", fontSize: "12px", color: "#888" }}>
                  {topic.formulas.length} formula{topic.formulas.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Formula cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
                {topic.formulas.map((f, i) => (
                  <div
                    key={i}
                    style={{ padding: "12px 14px", borderRadius: "10px", border: `1px solid ${topic.color}44`, background: topic.color + "0d", borderLeft: `4px solid ${topic.color}` }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "12px", color: topic.color, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {f.name}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: "13px", color: "#1a1a2e", background: "#fff", padding: "8px 10px", borderRadius: "6px", marginBottom: f.note ? "6px" : 0, wordBreak: "break-word" }}>
                      {f.formula}
                    </div>
                    {f.note && (
                      <div style={{ fontSize: "11px", color: "#666", fontStyle: "italic", marginTop: "4px" }}>
                        💡 {f.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* PDF Footer */}
          <div style={{ textAlign: "center", borderTop: "1px solid #e5e7eb", paddingTop: "16px", marginTop: "16px", color: "#999", fontSize: "11px" }}>
            CalcVoyager · Multivariable Calculus Tools · calcvoyager.com
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
