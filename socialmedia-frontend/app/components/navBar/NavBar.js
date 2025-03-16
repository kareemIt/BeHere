"use client";

import React, { useContext } from 'react';
import Link from 'next/link'; 
import UserContext from '../../context/UserContext';
import Search from '../Search/Search';
import Profile from '../../Icons/Profile.svg';
import Image from 'next/image';
import './style.css';
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { userId, setUserId, setAccessToken, setContextUsername } = useContext(UserContext); // Access setContextUsername here
  const router = useRouter();

  const logout = () => {
    console.log("Logging out, clearing session...");
  
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  
    // Reset context state
    setUserId(null);
    setAccessToken(null);
  
    console.log("Redirecting to login...");
    router.push('/login');
  };
  
  return (
    <div className='navBar'>
      <Link href="/home">
        <h1>BeHere</h1>
      </Link>

      <Search className="searchBar" />

      <div className="nav-right">
        <Link href="/profile">
          <Image priority src={Profile} alt='profile' className='profile'/>
        </Link>
        <span className="divider" />
        <button onClick={logout} className='logout'>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
