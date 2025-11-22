import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/user";
import { useData } from "../components/userData";
import "../styles/DoctorUpdates.css";

const DoctorUpdates = () => {
  const { currentUser, isDoctor } = useAuth();
  const { updates, addUpdate } = useData();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    disease: "",
    studyTitle: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleCreateUpdate = (e) => {
    e.preventDefault();
    const update = {
      id: Date.now(),
      ...newUpdate,
      authorId: currentUser.id,
      authorName: currentUser.name,
      date: new Date().toISOString(),
    };

    addUpdate(update);
    setNewUpdate({ disease: "", studyTitle: "", description: "", link: "" });
    setShowCreateForm(false);
  };

  return (
    <div className="updates-page">
      <div className="updates-header">
        <h1>Medical Studies & Updates</h1>
        {isDoctor && (
          <button
            className="btn-primary"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "Cancel" : "Post New Update"}
          </button>
        )}
      </div>

      {showCreateForm && isDoctor && (
        <form className="create-update-form" onSubmit={handleCreateUpdate}>
          <div className="form-group">
            <label>Disease/Condition</label>
            <input
              type="text"
              value={newUpdate.disease}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, disease: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Study Title</label>
            <input
              type="text"
              value={newUpdate.studyTitle}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, studyTitle: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newUpdate.description}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, description: e.target.value })
              }
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Link (Optional)</label>
            <input
              type="url"
              value={newUpdate.link}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, link: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn-primary">
            Post Update
          </button>
        </form>
      )}

      <div className="updates-grid">
        {updates.length > 0 ? (
          updates.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-header">
                <h3>{update.studyTitle}</h3>
                <span className="update-disease">{update.disease}</span>
              </div>
              <p className="update-description">{update.description}</p>
              {update.link && (
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="update-link"
                >
                  Read Full Study →
                </a>
              )}
              <div className="update-footer">
                <span>By: Dr. {update.authorName}</span>
                <span>{new Date(update.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No medical updates available yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorUpdates;
