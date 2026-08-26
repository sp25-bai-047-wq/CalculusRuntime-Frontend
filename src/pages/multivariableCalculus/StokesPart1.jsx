import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import StokesTheoremGuide from "./StokesTheoremGuide";
import "./GuidePart.css";

function StokesPart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("stokes-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">
            Stokes&apos; Theorem — Circulation, Oriented Surfaces & The Statement
          </span>
        </div>
        <BookmarkButton
          id="stokes-1"
          title="Stokes' Theorem — Part 1"
          path="/stokes-theorem/1"
        />
      </div>
      <StokesTheoremGuide section={1} />
      <SectionCompleteBar
        sectionId="stokes-1"
        nextPath="/stokes-theorem/2"
        nextLabel="Part 2: Applications & Workflow Drills"
      />
    </div>
  );
}

export default StokesPart1;
