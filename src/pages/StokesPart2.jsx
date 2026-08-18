import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import StokesTheoremGuide from "./StokesTheoremGuide";
import "./GuidePart.css";

function StokesPart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("stokes-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">
            Stokes&apos; Theorem — Applications & Workflow Drills
          </span>
        </div>
        <BookmarkButton
          id="stokes-2"
          title="Stokes' Theorem — Part 2"
          path="/stokes-theorem/2"
        />
      </div>
      <StokesTheoremGuide section={2} />
      <SectionCompleteBar
        sectionId="stokes-2"
        courseId="multivariable-calculus"
        nextPath="/courses/multivariable-calculus"
        nextLabel="Back to Multivariable Calculus hub"
      />
    </div>
  );
}

export default StokesPart2;
