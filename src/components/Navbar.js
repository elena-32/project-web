import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./user";
import "../styles/NavBar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Dr. Online
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/discussions" className="navbar-link">
                  Discussions
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/updates" className="navbar-link">
                  Doctor Updates
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={logout} className="navbar-link btn-logout">
                  Logout
                </button>
              </li>
              <li className="navbar-item navbar-user">
                <span>
                  {currentUser.name} ({currentUser.role})
                </span>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
