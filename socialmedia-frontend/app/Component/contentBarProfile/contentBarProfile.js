"use client";

import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const NavBar = ({ setCurrentTab }) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  const handleCurrentPostTab = () => {
    setCurrentTab(0);
  }

  const handleArchivedPostTab = () => {
    setCurrentTab(1);
  }

  return (
    <div className='navBar'>
      <h1 onClick={handleCurrentPostTab}>Current Post</h1>
      <h1 onClick={handleArchivedPostTab}>Archived Posts</h1>
    </div>
  );
};

export default NavBar;
