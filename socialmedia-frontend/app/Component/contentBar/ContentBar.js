"use client";

import React, { useContext } from 'react';
import './style.css';

const ContentBar = ({ currentTab, setCurrentTab }) => {
  
  const handleFYP = () => {
    setCurrentTab(0);
  };

  const handleTrending = () => {
    setCurrentTab(1);
  };

  return (
    <div className="homeNavBar">
      <button 
        onClick={handleFYP} 
        className={currentTab === 0 ? "active" : "inactive"}
      >
        For you page
      </button>
      <button 
        onClick={handleTrending} 
        className={currentTab === 1 ? "active" : "inactive"}
      >
        Trending
      </button>
    </div>
  );
};

export default ContentBar;
