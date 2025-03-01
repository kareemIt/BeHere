"use client";

import React from 'react';
import styles from './style.css';

const ContentBarProfileFriend = ({currentTab}) => {

  return (
    <div className="contentBarProfileFriend">
      <button
        className={currentTab === 0 ? "active" : "inactive"}
      >
        Current Post
      </button>
    </div>
  );
};

export default ContentBarProfileFriend;
