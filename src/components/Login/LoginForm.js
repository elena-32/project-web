import React, { useState } from "react";
// import { useAuth } from "../user";
import "../../styles/Auth.css";

const LoginForm = ({ onToggle }) => {
  // const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(formData.email, formData.password);
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <p className="toggle-auth">
        Don't have an account? <span onClick={onToggle}>Register here</span>
      </p>
    </div>
  );
};

export default LoginForm;
