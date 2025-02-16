"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import './style.css';

const ContentBar = ({ currentTab, setCurrentTab }) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

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
