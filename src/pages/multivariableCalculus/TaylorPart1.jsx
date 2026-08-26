import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import TaylorSeriesGuide from "./TaylorSeriesGuide";
import "./GuidePart.css";

function TaylorPart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("taylor-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">
            Taylor Series — Foundations, Formula & Maclaurin Reductions
          </span>
        </div>
        <BookmarkButton
          id="taylor-1"
          title="Taylor Series — Part 1"
          path="/taylor-series/1"
        />
      </div>
      <TaylorSeriesGuide section={1} />
      <SectionCompleteBar
        sectionId="taylor-1"
        nextPath="/taylor-series/2"
        nextLabel="Part 2: Convergence, Error Bounds & Applications"
      />
    </div>
  );
}

export default TaylorPart1;
