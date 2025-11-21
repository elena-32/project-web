import React from "react";
import "../styles/PostCard.css";

const PostCard = ({ post, onPostClick }) => {
  return (
    <div className="post-card" onClick={() => onPostClick && onPostClick(post)}>
      <div className="post-header">
        <h3>{post.title}</h3>
        <span className="post-category">{post.category}</span>
      </div>
      <p className="post-description">{post.description}</p>
      <div className="post-footer">
        <span className="post-author">By: {post.authorName}</span>
        <span className="post-date">
          {new Date(post.date).toLocaleDateString()}
        </span>
      </div>
      {post.comments && (
        <div className="post-comments-count">
          {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default PostCard;
