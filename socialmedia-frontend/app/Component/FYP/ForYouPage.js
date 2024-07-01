"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const ForYouPage = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  const getPosts = async () =>{
    const response = await fetch('http://localhost:8080/api/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  }

  return (
    <div className='navBar'>
        <h1>For you page</h1>
        <h1>Trending</h1>
    </div>
  );
};

export default ForYouPage;
