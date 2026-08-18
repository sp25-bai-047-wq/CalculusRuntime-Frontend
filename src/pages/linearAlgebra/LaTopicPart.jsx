import { useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";
import BookmarkButton from "../../components/BookmarkButton";
import SectionCompleteBar from "../../components/SectionCompleteBar";
import "../GuidePart.css";

/**
 * Shared Part 1 / Part 2 wrapper for Linear Algebra guides.
 * Props: sectionId, title, path, Guide, part, nextPath?, nextLabel?
 */
export default function LaTopicPart({
  sectionId,
  title,
  path,
  Guide,
  part,
  nextPath,
  nextLabel,
  courseId,
}) {
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
