"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Search from '../Search/Search';

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
      <h1 style={{ fontSize: '40px' }}>BeHere</h1>
      <Search className="searchBar"/>
      <button onClick={logout} className='logout'>Logout</button>
    </div>
  );
};

export default NavBar;
