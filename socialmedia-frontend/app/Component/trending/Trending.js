"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const Trending = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div className='Posts'>
        <h1>hello</h1>
    </div>
  );
};

export default Trending;
