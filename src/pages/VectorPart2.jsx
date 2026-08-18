import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import VectorCalculusGuide from "./VectorCalculusGuide";
import MvCertificateBoost from "./MvCertificateBoost";
import "./GuidePart.css";
import "./PartialDerivativesGuide.css";

function VectorPart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("vector-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">Vector Calculus — Green's Theorem &amp; Surfaces</span>
        </div>
        <BookmarkButton
          id="vector-2"
          title="Vector Calculus — Part 2"
          path="/vector-calculus/2"
        />
      </div>
      <VectorCalculusGuide part={2} />
      <div
        className="partial-derivatives-guide"
        style={{ maxWidth: 1000, margin: "0 auto", padding: "0 2rem 2rem" }}
      >
        <MvCertificateBoost topic="vector" part={2} />
      </div>
      <SectionCompleteBar
        sectionId="vector-2"
        nextPath="/multiple-integrals/1"
        nextLabel="Next: Multiple Integrals"
      />
    </div>
  );
}

export default VectorPart2;
