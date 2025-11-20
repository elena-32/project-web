import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/user";
import "../styles/Profile.css";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{currentUser.name}</h2>
              <p className="profile-role">
                {currentUser.role === "doctor" ? "Doctor" : "Patient"}
              </p>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <label>Email:</label>
              <span>{currentUser.email}</span>
            </div>

            {currentUser.role === "doctor" && (
              <div className="profile-field">
                <label>Specialization:</label>
                <span>{currentUser.specialization}</span>
              </div>
            )}

            {currentUser.role === "patient" && (
              <>
                {currentUser.age && (
                  <div className="profile-field">
                    <label>Age:</label>
                    <span>{currentUser.age}</span>
                  </div>
                )}
                {currentUser.healthCondition && (
                  <div className="profile-field">
                    <label>Health Condition:</label>
                    <span>{currentUser.healthCondition}</span>
                  </div>
                )}
              </>
            )}

            <div className="profile-field">
              <label>Member Since:</label>
              <span>
                {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
