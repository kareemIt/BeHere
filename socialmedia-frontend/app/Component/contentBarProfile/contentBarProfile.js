"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import ArchivedPosts from '../../component/archivedPosts/archivedPosts';
import UserPost from '../../component/userPost/userPost';

const NavBar = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div className='navBar'>
        <h1>Current Post</h1>

        <h1>Archived Posts</h1>
    </div>
  );
};

export default NavBar;
