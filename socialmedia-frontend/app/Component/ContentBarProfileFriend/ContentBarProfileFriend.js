"use client";

import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import './style.css';

const ContentBarProfileFriend = ({currentTab}) => {
  const router = useRouter()

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
