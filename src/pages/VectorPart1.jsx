import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import VectorCalculusGuide from "./VectorCalculusGuide";
import MvCertificateBoost from "./MvCertificateBoost";
import "./GuidePart.css";
import "./PartialDerivativesGuide.css";

function VectorPart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("vector-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">Vector Calculus — Vector Functions, Line Integrals &amp; Path Independence</span>
        </div>
        <BookmarkButton
          id="vector-1"
          title="Vector Calculus — Part 1"
          path="/vector-calculus/1"
        />
      </div>
      <VectorCalculusGuide part={1} />
      <div
        className="partial-derivatives-guide"
        style={{ maxWidth: 1000, margin: "0 auto", padding: "0 2rem 2rem" }}
      >
        <MvCertificateBoost topic="vector" part={1} />
      </div>
      <SectionCompleteBar
        sectionId="vector-1"
        nextPath="/vector-calculus/2"
        nextLabel="Part 2: Green's Theorem & Surfaces"
      />
    </div>
  );
}

export default VectorPart1;
