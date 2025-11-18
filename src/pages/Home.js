import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/user";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import "../styles/Home.css";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Welcome to Dr. Online</h1>
        <p>A platform connecting doctors and patients for better healthcare</p>
      </div>

      <div className="home-features">
        <div className="feature">
          <h3>For Doctors</h3>
          <p>Share medical studies, updates, and connect with patients</p>
        </div>
        <div className="feature">
          <h3>For Patients</h3>
          <p>Access medical information and discuss health topics</p>
        </div>
        <div className="feature">
          <h3>Community</h3>
          <p>Join discussions about various health conditions and treatments</p>
        </div>
      </div>

      <div className="auth-section">
        {showLogin ? (
          <LoginForm onToggle={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onToggle={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Home;
