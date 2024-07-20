"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const NavBar = ({setCurrentTab}) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  const handleFYP = () => {
    setCurrentTab(0);
  }

  const handleTrending = () => {
    setCurrentTab(1);
  }

  return (
    <div className='navBar'>
        <h1 onClick={handleFYP}>For you page</h1>
        <h1 onClick={handleTrending}>Trending</h1>
    </div>
  );
};

export default NavBar;
