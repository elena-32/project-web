import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/user";
import { useData } from "../components/userData";
import PostCard from "../components/PostCard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { currentUser, isDoctor, users } = useAuth();
  const { posts, updates } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const patients = users.filter((u) => u.role === "patient");
  const recentPosts = posts.slice(0, 3);
  const recentUpdates = updates.slice(0, 3);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name}!</h1>
        <p className="user-role">{isDoctor ? "Doctor" : "Patient"} Dashboard</p>
      </div>

      <div className="dashboard-content">
        {isDoctor && (
          <div className="dashboard-section">
            <h2>Your Patients</h2>
            <div className="patients-list">
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <div key={patient.id} className="patient-card">
                    <h3>{patient.name}</h3>
                    <p>Age: {patient.age || "N/A"}</p>
                    <p>Condition: {patient.healthCondition || "N/A"}</p>
                  </div>
                ))
              ) : (
                <p>No patients registered yet.</p>
              )}
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2>Recent Discussions</h2>
          <div className="posts-grid">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onPostClick={() => navigate("/discussions")}
                />
              ))
            ) : (
              <p>No discussions yet. Be the first to start one!</p>
            )}
          </div>
          <button
            className="btn-secondary"
            onClick={() => navigate("/discussions")}
          >
            View All Discussions
          </button>
        </div>

        <div className="dashboard-section">
          <h2>Latest Medical Updates</h2>
          <div className="updates-list">
            {recentUpdates.length > 0 ? (
              recentUpdates.map((update) => (
                <div key={update.id} className="update-card">
                  <h3>{update.studyTitle}</h3>
                  <p className="update-disease">{update.disease}</p>
                  <p>{update.description}</p>
                  <span className="update-date">
                    {new Date(update.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No medical updates available.</p>
            )}
          </div>
          <button
            className="btn-secondary"
            onClick={() => navigate("/updates")}
          >
            View All Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
