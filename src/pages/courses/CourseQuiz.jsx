import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import {
  getCourseTitle,
  isCourseCertificateEligible,
  getRequiredSections,
  getQuizId,
} from "../../data/courseCompletion";
import "./CourseQuiz.css";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

// Small pause after picking an option so the user sees their choice
// highlighted before we auto-advance — long enough to register, short
// enough that it doesn't eat into the next question's 10s.
const ADVANCE_DELAY_MS = 350;

function CourseQuiz() {
  const { courseId } = useParams();
  const { user, isHydrated } = useAuth();
  const { progress, saveQuizScore } = useProgress();

  const courseTitle = getCourseTitle(courseId);
  const quizId = getQuizId(courseId);

  // Quiz attempt state — questions/attempt_token come from the server on
  // each fresh attempt, never from a bundled answer key.
  const [attempt, setAttempt] = useState(null); // { attempt_token, title, questions, total_seconds, seconds_per_question }
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(null);

  // Refs so the tick/advance logic always reads fresh values without
  // re-subscribing the interval on every keystroke of state.
  const questionDeadlineRef = useRef(null);
  const advancingRef = useRef(false);
  const advanceTimeoutRef = useRef(null);
  const currentIndexRef = useRef(0);
  const answersRef = useRef({});
  const attemptRef = useRef(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    attemptRef.current = attempt;
  }, [attempt]);

  const requiredSections = useMemo(() => getRequiredSections(courseId), [courseId]);
  const sectionsRemaining = requiredSections.filter(
    (id) => !progress.completedSections?.[id]
  );
  const sectionsComplete = sectionsRemaining.length === 0;

  const eligible = isCourseCertificateEligible(courseId) && !!quizId;
  const canStart = eligible && isHydrated && !!user && sectionsComplete;

  const startAttempt = useCallback(async () => {
    if (!user?.accessToken || !quizId) return;
    setLoading(true);
    setLoadError(null);
    setSubmitted(false);
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);
    advancingRef.current = false;
    clearTimeout(advanceTimeoutRef.current);
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/quiz/${quizId}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `Could not start quiz (${res.status}).`);
      }
      const data = await res.json();
      setAttempt(data);
      questionDeadlineRef.current = Date.now() + data.seconds_per_question * 1000;
      setSecondsLeft(data.seconds_per_question);
    } catch (e) {
      setLoadError(e.message || "Could not start the quiz. Try again.");
    } finally {
      setLoading(false);
    }
  }, [quizId, user?.accessToken]);

  useEffect(() => {
    if (canStart) startAttempt();
  }, [canStart, quizId, startAttempt]);

  function goToQuestion(nextIndex) {
    const a = attemptRef.current;
    if (!a) return;
    clearTimeout(advanceTimeoutRef.current);
    advancingRef.current = false;

    if (nextIndex >= a.questions.length) {
      handleSubmit();
      return;
    }
    setCurrentIndex(nextIndex);
    questionDeadlineRef.current = Date.now() + a.seconds_per_question * 1000;
    setSecondsLeft(a.seconds_per_question);
  }

  function advanceFromTimeout() {
    if (advancingRef.current) return;
    advancingRef.current = true;
    goToQuestion(currentIndexRef.current + 1);
  }

  // 10s-per-question countdown. Ticks every 100ms for a smooth bar; when it
  // hits 0 the question is locked in as answered-or-not and we auto-advance.
  useEffect(() => {
    if (!attempt || submitted) return undefined;
    const id = setInterval(() => {
      const left = Math.max(0, (questionDeadlineRef.current - Date.now()) / 1000);
      setSecondsLeft(left);
      if (left <= 0) {
        advanceFromTimeout();
      }
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, submitted, currentIndex]);

  useEffect(() => () => clearTimeout(advanceTimeoutRef.current), []);

  if (!eligible) {
    return <Navigate to="/" replace />;
  }

  if (!isHydrated || (user && !attempt && loading)) {
    return (
      <main className="quiz-page">
        <div className="quiz-state">
          <div className="quiz-spinner" />
          <p>Loading…</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="quiz-page">
        <div className="quiz-state">
          <h2>Sign in required</h2>
          <p>Sign in to take the {courseTitle} certification quiz.</p>
          <Link className="quiz-btn" to="/login">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  if (!sectionsComplete) {
    return (
      <main className="quiz-page">
        <div className="quiz-state">
          <h2>Finish the course first</h2>
          <p>
            Complete every module of {courseTitle} before attempting the
            certification quiz. {sectionsRemaining.length} section
            {sectionsRemaining.length === 1 ? "" : "s"} remaining.
          </p>
          <Link className="quiz-btn" to={`/courses/${courseId}`}>
            Back to course
          </Link>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="quiz-page">
        <div className="quiz-state quiz-state--fail">
          <h2>Couldn't start the quiz</h2>
          <p>{loadError}</p>
          <div className="quiz-actions">
            <button className="quiz-btn quiz-btn--primary" onClick={startAttempt}>
              Try again
            </button>
            <Link className="quiz-btn" to={`/courses/${courseId}`}>
              Back to course
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!attempt) {
    return (
      <main className="quiz-page">
        <div className="quiz-state">
          <div className="quiz-spinner" />
          <p>Preparing your quiz…</p>
        </div>
      </main>
    );
  }

  const totalQuestions = attempt.questions.length;
  const answeredCount = Object.keys(answers).length;
  const q = attempt.questions[currentIndex];
  const selectedForCurrent = answers[currentIndex];

  function selectAnswer(oi) {
    if (submitted || advancingRef.current) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: oi }));
    advancingRef.current = true;
    clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(() => {
      goToQuestion(currentIndexRef.current + 1);
    }, ADVANCE_DELAY_MS);
  }

  async function handleSubmit() {
    if (submitting || submitted) return;
    setSubmitting(true);

    const finalAttempt = attemptRef.current;
    const finalAnswers = answersRef.current;
    // answers[] must be positional (one entry per question, in the order
    // /start returned them) — null for anything left blank/timed-out.
    const answersArray = finalAttempt.questions.map((_, i) =>
      Object.prototype.hasOwnProperty.call(finalAnswers, i) ? finalAnswers[i] : null
    );

    try {
      const res = await fetchWithTimeout(`${API_URL}/api/quiz/${quizId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          attempt_token: finalAttempt.attempt_token,
          answers: answersArray,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Submit failed (${res.status}).`);
      }
      setResult(data);
      setSubmitted(true);
      await saveQuizScore(quizId, data.score, data.total);
    } catch (e) {
      setLoadError(e.message || "Could not submit the quiz. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && result) {
    return (
      <main className="quiz-page">
        <div className={`quiz-state ${result.passed ? "quiz-state--pass" : "quiz-state--fail"}`}>
          <h2>{result.passed ? "You passed! 🎉" : "Not quite there yet"}</h2>
          <p className="quiz-score-big">
            {result.score} / {result.total} ({result.pct}%)
          </p>
          <p>
            {result.passed
              ? `You've met the ${result.min_pass_percent}% requirement for the ${courseTitle} certificate.`
              : `You need ${result.min_pass_percent}% to unlock the certificate. Review the guides and try again.`}
          </p>
          <div className="quiz-actions">
            {result.passed ? (
              <Link className="quiz-btn quiz-btn--primary" to={`/certificate/${courseId}`}>
                Get your certificate →
              </Link>
            ) : (
              <button className="quiz-btn quiz-btn--primary" onClick={startAttempt}>
                Retry quiz
              </button>
            )}
            <Link className="quiz-btn" to={`/courses/${courseId}`}>
              Back to course
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const pct = attempt.seconds_per_question
    ? (secondsLeft / attempt.seconds_per_question) * 100
    : 0;
  const timeLow = secondsLeft !== null && secondsLeft <= 3;

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <p className="quiz-eyebrow">Certification Quiz</p>
        <h1>{courseTitle}</h1>
        <p className="quiz-sub">
          Question {currentIndex + 1} of {totalQuestions} ·{" "}
          {result?.min_pass_percent ?? 80}% required to unlock your certificate
        </p>
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
        <p className="quiz-progress-label">
          {answeredCount} / {totalQuestions} answered
        </p>
      </header>

      <div className="quiz-timer-wrap">
        <div className="quiz-timer-track">
          <div
            className={`quiz-timer-fill ${timeLow ? "quiz-timer-fill--low" : ""}`}
            style={{ width: `${Math.max(0, pct)}%` }}
          />
        </div>
        <span className={`quiz-timer-label ${timeLow ? "quiz-timer--low" : ""}`}>
          {Math.ceil(Math.max(0, secondsLeft ?? 0))}s
        </span>
      </div>

      <div className="quiz-card quiz-card--single">
        <div className="quiz-q-num">Question {currentIndex + 1}</div>
        <div className="quiz-q-text">{q.q}</div>
        <div className="quiz-options">
          {q.options.map((opt, oi) => (
            <button
              key={oi}
              type="button"
              className={`quiz-opt ${selectedForCurrent === oi ? "quiz-opt--selected" : ""}`}
              onClick={() => selectAnswer(oi)}
              disabled={submitting}
            >
              <span className="quiz-opt-letter">{String.fromCharCode(65 + oi)}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-submit-bar">
        <button
          className="quiz-btn"
          disabled={submitting}
          onClick={() => {
            advancingRef.current = true;
            goToQuestion(currentIndex + 1);
          }}
        >
          {currentIndex === totalQuestions - 1 ? "Skip & submit" : "Skip →"}
        </button>
      </div>
    </main>
  );
}

export default CourseQuiz;