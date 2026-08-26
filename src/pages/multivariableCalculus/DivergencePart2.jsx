import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import DivergenceAndCurlGuide from "./DivergenceAndCurlGuide";
import "./GuidePart.css";

function DivergencePart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("divergence-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">
            Divergence & Curl — Identities, Divergence Theorem & Stokes
          </span>
        </div>
        <BookmarkButton
          id="divergence-2"
          title="Divergence & Curl — Part 2"
          path="/divergence-curl/2"
        />
      </div>
      <DivergenceAndCurlGuide section={2} />
      <SectionCompleteBar
        sectionId="divergence-2"
        nextPath="/stokes-theorem/1"
        nextLabel="Next: Stokes' Theorem"
      />
    </div>
  );
}

export default DivergencePart2;
