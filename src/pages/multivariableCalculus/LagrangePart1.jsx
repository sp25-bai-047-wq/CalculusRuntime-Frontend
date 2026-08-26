import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import LagrangeMultipliersGuide from "./LagrangeMultipliersGuide";
import "./GuidePart.css";

function LagrangePart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("lagrange-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">
            Lagrange Multipliers — Geometric Intuition & Gradient Alignment
          </span>
        </div>
        <BookmarkButton
          id="lagrange-1"
          title="Lagrange Multipliers — Part 1"
          path="/lagrange-multipliers/1"
        />
      </div>
      <LagrangeMultipliersGuide section={1} />
      <SectionCompleteBar
        sectionId="lagrange-1"
        nextPath="/lagrange-multipliers/2"
        nextLabel="Part 2: Applications & Multi-Constraint Frameworks"
      />
    </div>
  );
}

export default LagrangePart1;
