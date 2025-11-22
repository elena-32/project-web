import { useState, useEffect } from "react";
import mockData from "../data.js";

// Simple global state
let currentUser = null;
let users = [...mockData.users];
let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const register = (userData) => {
  const existingUser = users.find((u) => u.email === userData.email);
  if (existingUser) {
    alert("User with this email already exists!");
    return null;
  }

  const newUser = {
    id: Date.now(),
    ...userData,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  currentUser = newUser;
  notifyListeners();
  alert("Registration successful!");
  return newUser;
};

export const login = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    notifyListeners();
    alert("Login successful!");
    return user;
  } else {
    alert("Invalid email or password!");
    return null;
  }
};

export const logout = () => {
  currentUser = null;
  notifyListeners();
};

export const getCurrentUser = () => currentUser;
export const getUsers = () => users;
export const isDoctor = () => currentUser?.role === "doctor";
export const isPatient = () => currentUser?.role === "patient";

// React hook for components
export const useAuth = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    currentUser: getCurrentUser(),
    users: getUsers(),
    register,
    login,
    logout,
    isDoctor: isDoctor(),
    isPatient: isPatient(),
  };
};
