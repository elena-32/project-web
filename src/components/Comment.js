import React, { useState } from "react";
import { useAuth } from "./user";
import "../styles/Comment.css";

const CommentBox = ({ comments, onAddComment }) => {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      onAddComment({
        id: Date.now(),
        authorId: currentUser.id,
        authorName: currentUser.name,
        text: newComment,
        date: new Date().toISOString(),
      });
      setNewComment("");
    }
  };

  return (
    <div className="comment-box">
      <h3>Comments ({comments?.length || 0})</h3>

      <div className="comments-list">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.authorName}</strong>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
      </div>

      {currentUser && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
          />
          <button type="submit" className="btn-primary">
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentBox;
