import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import "./BookmarkButton.css";

function BookmarkButton({ id, title, path }) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useProgress();

  if (!user) return null;

  const bookmarked = isBookmarked(id);

  const toggle = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark({ id, title, path });
    }
  };

  return (
    <button
      className={`bookmark-btn${bookmarked ? " bookmark-btn--active" : ""}`}
      onClick={toggle}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this page"}
      title={bookmarked ? "Remove bookmark" : "Bookmark this page"}
    >
      <span aria-hidden="true">{bookmarked ? "★" : "☆"}</span>
      <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
}

export default BookmarkButton;
