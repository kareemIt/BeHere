"use client";

import React from 'react';
import styles from './style.css';

const ContentBarProfile = ({ currentTab, setCurrentTab }) => {

  const handleCurrentPostTab = () => {
    setCurrentTab(0);
  };

  const handleArchivedPostTab = () => {
    setCurrentTab(1);
  };

  return (
    <div className="contentBarProfile">
      <button 
        onClick={handleCurrentPostTab} 
        className={currentTab === 0 ? "active" : "inactive"}
      >
        Current Post
      </button>
      <button 
        onClick={handleArchivedPostTab} 
        className={currentTab === 1 ? "active" : "inactive"}
      >
        Archived Posts
      </button>
    </div>
  );
};

export default ContentBarProfile;
