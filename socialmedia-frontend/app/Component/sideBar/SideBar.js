"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import style from './style.css';
import UserContext from '../../context/UserContext';
import Home from '../../Icons/Home.svg'
import Profile from '../../Icons/Profile.svg'
import Image from 'next/image';

const SideBar = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div className='sideBar' >
      <Link href="/routes/home"  className='icon'>
        <Image priority src={Home} alt='home'/>
        <span>Home</span>
      </Link>
      <Link href="/routes/profile"  className='icon'>
        <Image priority src={Profile} alt= 'profile' />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default SideBar;
