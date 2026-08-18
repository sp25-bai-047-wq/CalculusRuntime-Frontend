import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import "../GuidePart.css";
import DifferentiationGuide from "./DifferentiationGuide";
import IntegrationGuide from "./IntegrationGuide";
import SequencesSeriesGuide from "./SequencesSeriesGuide";
import ConicsGuide from "./ConicsGuide";

function CalcTopicPart({ sectionId, title, path, Guide, part, nextPath, nextLabel, courseId }) {
  const { recordVisit } = useProgress();
  useEffect(() => {
    recordVisit(sectionId);
  }, [recordVisit, sectionId]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part {part} of 2</span>
          <span className="guide-part-title">{title}</span>
        </div>
        <BookmarkButton id={sectionId} title={title} path={path} />
      </div>
      <Guide part={part} />
      <SectionCompleteBar
        sectionId={sectionId}
        nextPath={nextPath}
        nextLabel={nextLabel}
        courseId={courseId}
      />
    </div>
  );
}

export function DiffPart1() {
  return (
    <CalcTopicPart
      sectionId="calc-diff-1"
      title="Differentiation - Part 1"
      path="/differentiation/1"
      Guide={DifferentiationGuide}
      part={1}
      nextPath="/differentiation/2"
      nextLabel="Next: Part 2 - Applications & advanced tools"
    />
  );
}

export function DiffPart2() {
  return (
    <CalcTopicPart
      sectionId="calc-diff-2"
      title="Differentiation - Part 2"
      path="/differentiation/2"
      Guide={DifferentiationGuide}
      part={2}
      nextPath="/integration/1"
      nextLabel="Next: Integration & Applications"
    />
  );
}

export function IntPart1() {
  return (
    <CalcTopicPart
      sectionId="calc-int-1"
      title="Integration - Part 1"
      path="/integration/1"
      Guide={IntegrationGuide}
      part={1}
      nextPath="/integration/2"
      nextLabel="Next: Part 2 - Techniques & improper integrals"
    />
  );
}

export function IntPart2() {
  return (
    <CalcTopicPart
      sectionId="calc-int-2"
      title="Integration - Part 2"
      path="/integration/2"
      Guide={IntegrationGuide}
      part={2}
      nextPath="/sequences-series/1"
      nextLabel="Next: Sequences & Infinite Series"
    />
  );
}

export function SeriesPart1() {
  return (
    <CalcTopicPart
      sectionId="calc-series-1"
      title="Sequences & Series - Part 1"
      path="/sequences-series/1"
      Guide={SequencesSeriesGuide}
      part={1}
      nextPath="/sequences-series/2"
      nextLabel="Next: Part 2 - Tests & power series"
    />
  );
}

export function SeriesPart2() {
  return (
    <CalcTopicPart
      sectionId="calc-series-2"
      title="Sequences & Series - Part 2"
      path="/sequences-series/2"
      Guide={SequencesSeriesGuide}
      part={2}
      nextPath="/conic-sections/1"
      nextLabel="Next: Conic Sections & Analytic Geometry"
    />
  );
}

export function ConicsPart1() {
  return (
    <CalcTopicPart
      sectionId="calc-conics-1"
      title="Conic Sections - Part 1"
      path="/conic-sections/1"
      Guide={ConicsGuide}
      part={1}
      nextPath="/conic-sections/2"
      nextLabel="Next: Part 2 - Classification & applications"
    />
  );
}

export function ConicsPart2() {
  return (
    <CalcTopicPart
      sectionId="calc-conics-2"
      title="Conic Sections - Part 2"
      path="/conic-sections/2"
      Guide={ConicsGuide}
      part={2}
      nextPath="/taylor-series/1"
      nextLabel="Next: Taylor Series"
    />
  );
}
