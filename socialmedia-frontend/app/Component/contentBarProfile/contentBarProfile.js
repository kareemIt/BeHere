"use client";

import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import './style.css';

const ContentBarProfile = ({ currentTab, setCurrentTab }) => {
  const router = useRouter();

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
