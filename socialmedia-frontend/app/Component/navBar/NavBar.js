"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const NavBar = () => {
  const router = useRouter();
  const { userId, setUserId } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUserId(null); // Clear the user ID from context
    router.push('/routes/login'); // Redirect to login page
  };

  return (
    <div className='navBar'>
      <h1>BeHere</h1>
      <input
        placeholder='Search'></input>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default NavBar;
