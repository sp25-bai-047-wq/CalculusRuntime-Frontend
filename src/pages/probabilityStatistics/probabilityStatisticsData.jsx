import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROBABILITY_STATISTICS_DATA } from "../../data/probabilityStatisticsData";

export default function ProbStatsTopic() {
  const location = useLocation();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState({});

  const rawData = Array.isArray(PROBABILITY_STATISTICS_DATA) ? PROBABILITY_STATISTICS_DATA : [];
  const currentPath = location.pathname.toLowerCase();

  // Find active topic based on current URL path and data item ID
  const activeTopic = rawData.find((item) => {
    if (currentPath.includes("descriptive-statistics")) {
      return item.id === "descriptive-statistics";
    }
    if (currentPath.includes("basic-probability")) {
      return item.id === "basic-probability";
    }
    return false;
  }) || rawData[0] || {};

  // Extract sections safely (Prioritize mcqs since your data uses 'mcqs')
  const questions = activeTopic.mcqs || activeTopic.questions || activeTopic.problems || [];
  const standardExamples = activeTopic.examples || []; 

  let realLifeExamples = [];
  if (Array.isArray(activeTopic.realLifeExamples)) {
    realLifeExamples = activeTopic.realLifeExamples;
  } else if (activeTopic.realLifeExample) {
    realLifeExamples = [{ title: "Real-Life Application", description: activeTopic.realLifeExample }];
  } else if (Array.isArray(activeTopic.applications)) {
    realLifeExamples = activeTopic.applications;
  }

  const handleOptionChange = (qId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleCheckAnswer = (qId) => {
    if (selectedAnswers[qId]) {
      setSubmittedStatus((prev) => ({
        ...prev,
        [qId]: true,
      }));
    }
  };

  const handleRetry = (qId) => {
    setSubmittedStatus((prev) => ({
      ...prev,
      [qId]: false,
    }));
    setSelectedAnswers((prev) => {
      const newState = { ...prev };
      delete newState[qId];
      return newState;
    });
  };

  const renderExampleContent = (ex) => {
    if (typeof ex === "string") {
      return <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>{ex}</p>;
    }
    if (ex.question && ex.solution) {
      return (
        <div style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6" }}>
          <p style={{ marginBottom: "8px" }}><strong style={{ color: "#94a3b8" }}>Question:</strong> {ex.question}</p>
          <p style={{ margin: 0 }}><strong style={{ color: "#10b981" }}>Solution:</strong> {ex.solution}</p>
        </div>
      );
    }
    return (
      <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>
        {ex.description || ex.text || JSON.stringify(ex)}
      </p>
    );
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto", color: "#f8fafc" }}>
      <Link to="/practice" style={{ color: "#818cf8", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
        ← Back to Practice Arena
      </Link>

      <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "10px", color: "#ffffff" }}>
        {typeof activeTopic.title === "string" ? activeTopic.title : "Probability & Statistics"}
      </h1>

      {activeTopic.description && (
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "30px", lineHeight: "1.6" }}>
          {String(activeTopic.description)}
        </p>
      )}

      {/* 🌍 Real-Life Applications Section */}
      {realLifeExamples.length > 0 && (
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#a855f7", marginBottom: "16px" }}>
            🌍 Real-Life Applications
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {realLifeExamples.map((ex, idx) => {
              const exTitle = typeof ex === "string" ? `Application ${idx + 1}` : (ex.title || ex.concept || `Application ${idx + 1}`);
              return (
                <div key={idx} style={{ padding: "16px 20px", backgroundColor: "#0f172a", borderRadius: "8px", borderLeft: "4px solid #a855f7" }}>
                  <h4 style={{ fontWeight: "600", color: "#f1f5f9", marginBottom: "10px", fontSize: "1.1rem" }}>
                    {exTitle}
                  </h4>
                  {renderExampleContent(ex)}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 💡 Solved Examples Section */}
      {standardExamples.length > 0 && (
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#f59e0b", marginBottom: "16px" }}>
            💡 Solved Examples
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {standardExamples.map((ex, idx) => {
              const exTitle = typeof ex === "string" ? `Example ${idx + 1}` : (ex.title ? `${ex.title}` : `Example ${idx + 1}`);
              return (
                <div key={idx} style={{ padding: "16px 20px", backgroundColor: "#0f172a", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
                  <h4 style={{ fontWeight: "600", color: "#f1f5f9", marginBottom: "10px", fontSize: "1.1rem" }}>
                    {exTitle}
                  </h4>
                  {renderExampleContent(ex)}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 📝 Practice Questions Section */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#ffffff", marginBottom: "20px" }}>
        📝 Practice Questions
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {questions.map((q, idx) => {
          const qText = typeof q.question === "string" ? q.question : (q.prompt || q.title || `Question ${idx + 1}`);
          const optionsList = Array.isArray(q.options) ? q.options : (q.choices || []);
          const qId = q.id || idx;
          const isChecked = submittedStatus[qId];

          return (
            <div
              key={qId}
              style={{
                backgroundColor: "#1e293b",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #334155",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "16px", color: "#f8fafc" }}>
                {idx + 1}. {qText}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {optionsList.map((opt, oIdx) => {
                  const optText = String(opt);
                  const isSelected = selectedAnswers[qId] === optText;
                  const isCorrect = isChecked && optText === String(q.answer);
                  const isWrong = isChecked && isSelected && optText !== String(q.answer);

                  let bgColor = "transparent";
                  let borderColor = "#475569";

                  if (isCorrect) {
                    bgColor = "rgba(16, 185, 129, 0.2)";
                    borderColor = "#10b981";
                  } else if (isWrong) {
                    bgColor = "rgba(244, 63, 94, 0.2)";
                    borderColor = "#f43f5e";
                  }

                  return (
                    <label
                      key={oIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        cursor: isChecked ? "default" : "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`q-${qId}`}
                        value={optText}
                        checked={isSelected}
                        onChange={() => !isChecked && handleOptionChange(qId, optText)}
                        disabled={isChecked}
                        style={{ marginRight: "12px" }}
                      />
                      <span>{optText}</span>
                    </label>
                  );
                })}
              </div>

              {!isChecked ? (
                <button
                  onClick={() => handleCheckAnswer(qId)}
                  disabled={!selectedAnswers[qId]}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: selectedAnswers[qId] ? "#6366f1" : "#475569",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: selectedAnswers[qId] ? "pointer" : "not-allowed",
                  }}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={() => handleRetry(qId)}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#334155",
                    color: "#ffffff",
                    border: "1px solid #475569",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Retry Question
                </button>
              )}

              {isChecked && q.explanation && (
                <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#0f172a", borderRadius: "6px", fontSize: "0.875rem", color: "#cbd5e1" }}>
                  <strong style={{ color: "#818cf8" }}>Explanation: </strong>
                  {String(q.explanation)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}