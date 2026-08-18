import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import TaylorSeriesGuide from "./TaylorSeriesGuide";
import "./GuidePart.css";

function TaylorPart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("taylor-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">
            Taylor Series — Convergence, Error Bounds & Applications
          </span>
        </div>
        <BookmarkButton
          id="taylor-2"
          title="Taylor Series — Part 2"
          path="/taylor-series/2"
        />
      </div>
      <TaylorSeriesGuide section={2} />
      <SectionCompleteBar
        sectionId="taylor-2"
        nextPath="/courses/calculus-analytical-geometry"
        nextLabel="Back to Calculus & Analytical Geometry hub"
        courseId="calculus-analytical-geometry"
      />
    </div>
  );
}

export default TaylorPart2;
