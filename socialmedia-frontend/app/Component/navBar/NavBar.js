"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import styles from './style.css';
import UserContext from '../../context/UserContext';

const NavBar = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div className='navBar'>
      <h1>BeHere</h1>
      <input
        placeholder='Search'></input>
      <Link href="/Routes/login" >
        <button>LogOut</button>
      </Link>
    </div>
  );
};

export default NavBar;
