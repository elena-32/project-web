import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/user";
import { useData } from "../components/userData";
import PostCard from "../components/PostCard";
import CommentBox from "../components/Comment";
import "../styles/Discussions.css";

const Discussions = () => {
  const { currentUser } = useAuth();
  const { posts, addPost, addComment } = useData();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      ...newPost,
      authorId: currentUser.id,
      authorName: currentUser.name,
      date: new Date().toISOString(),
      comments: [],
    };

    addPost(post);
    setNewPost({ title: "", description: "", category: "" });
    setShowCreateForm(false);
  };

  const handleAddComment = (comment) => {
    addComment(selectedPost.id, comment);
    setSelectedPost(posts.find((p) => p.id === selectedPost.id));
  };

  return (
    <div className="discussions-page">
      <div className="discussions-header">
        <h1>Discussion Forum</h1>
        <button
          className="btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create New Discussion"}
        </button>
      </div>

      {showCreateForm && (
        <form className="create-post-form" onSubmit={handleCreatePost}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Category (Disease/Topic)</label>
            <input
              type="text"
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Post Discussion
          </button>
        </form>
      )}

      <div className="discussions-content">
        <div className="posts-list">
          <h2>All Discussions</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostClick={setSelectedPost}
              />
            ))
          ) : (
            <p>No discussions yet. Start the first one!</p>
          )}
        </div>

        {selectedPost && (
          <div className="post-detail">
            <button className="btn-close" onClick={() => setSelectedPost(null)}>
              ✕ Close
            </button>
            <h2>{selectedPost.title}</h2>
            <span className="post-category">{selectedPost.category}</span>
            <p className="post-description">{selectedPost.description}</p>
            <div className="post-meta">
              <span>By: {selectedPost.authorName}</span>
              <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
            </div>
            <CommentBox
              comments={selectedPost.comments}
              onAddComment={handleAddComment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussions;
