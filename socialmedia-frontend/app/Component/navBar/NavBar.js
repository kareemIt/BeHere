"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserContext from '../../context/UserContext';
import Search from '../Search/Search';
import Profile from '../../Icons/Profile.svg';
import Image from 'next/image';
import './style.css';

const NavBar = () => {
  const router = useRouter();
  const { userId, setUserId } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('jwtToken');
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
