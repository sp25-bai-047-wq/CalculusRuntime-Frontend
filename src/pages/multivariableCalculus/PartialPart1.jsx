import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import PartialDerivativesGuide from "./PartialDerivativesGuide";
import "./GuidePart.css";

function PartialPart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("partial-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">Partial Derivatives — Functions, Limits &amp; Partial Derivatives</span>
        </div>
        <BookmarkButton
          id="partial-1"
          title="Partial Derivatives — Part 1"
          path="/partial-derivatives/1"
        />
      </div>
      <PartialDerivativesGuide part={1} />
      <SectionCompleteBar
        sectionId="partial-1"
        nextPath="/partial-derivatives/2"
        nextLabel="Part 2: Chain Rule & Extrema"
      />
    </div>
  );
}

export default PartialPart1;
