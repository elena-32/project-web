import { useState, useEffect } from "react";
import mockData from "../data.js";

// Simple global state
let posts = [...mockData.posts];
let updates = [...mockData.updates];
let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const addPost = (post) => {
  posts.unshift(post);
  notifyListeners();
};

export const addComment = (postId, comment) => {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
    notifyListeners();
  }
};

export const addUpdate = (update) => {
  updates.unshift(update);
  notifyListeners();
};

export const getPosts = () => posts;
export const getUpdates = () => updates;

// React hook for components
export const useData = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    posts: getPosts(),
    updates: getUpdates(),
    addPost,
    addComment,
    addUpdate,
  };
};
