import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import PartialDerivativesGuide from "./PartialDerivativesGuide";
import "./GuidePart.css";

function PartialPart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("partial-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">Partial Derivatives — Chain Rule, Directional Derivatives &amp; Extrema</span>
        </div>
        <BookmarkButton
          id="partial-2"
          title="Partial Derivatives — Part 2"
          path="/partial-derivatives/2"
        />
      </div>
      <PartialDerivativesGuide part={2} />
      <SectionCompleteBar
        sectionId="partial-2"
        nextPath="/vector-calculus/1"
        nextLabel="Vector Calculus Part 1"
      />
    </div>
  );
}

export default PartialPart2;
