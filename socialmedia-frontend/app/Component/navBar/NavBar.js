"use client";

import React, {useContext } from 'react';
import Link from 'next/link'; 
import UserContext from '../../context/UserContext';
import Search from '../Search/Search';
import Profile from '../../Icons/Profile.svg';
import Image from 'next/image';
import './style.css';
import { useRouter } from "next/navigation";


const NavBar = () => {
  const { userId, setUserId } = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    setUserId(null);
    router.push('/routes/login');
  };

  return (
    <div className='navBar'>
      <Link href="/routes/home">
        <h1>BeHere</h1>
      </Link>

      <Search className="searchBar" />

      <div className="nav-right">
        <Link href="/routes/profile">
          <Image priority src={Profile} alt='profile' className='profile'/>
        </Link>
        <span className="divider" />
        <button onClick={logout} className='logout'>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
