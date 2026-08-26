import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import LagrangeMultipliersGuide from "./LagrangeMultipliersGuide";
import "./GuidePart.css";

function LagrangePart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("lagrange-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">
            Lagrange Multipliers — Applications & Multi-Constraint Frameworks
          </span>
        </div>
        <BookmarkButton
          id="lagrange-2"
          title="Lagrange Multipliers — Part 2"
          path="/lagrange-multipliers/2"
        />
      </div>
      <LagrangeMultipliersGuide section={2} />
      <SectionCompleteBar
        sectionId="lagrange-2"
        nextPath="/divergence-curl/1"
        nextLabel="Next: Divergence & Curl"
      />
    </div>
  );
}

export default LagrangePart2;
