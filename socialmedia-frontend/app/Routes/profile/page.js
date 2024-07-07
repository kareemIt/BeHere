// pages/index.js
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext'; 

const Profile = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
    } else {
      console.log(userId)
      console.log(data)
      //now display all the info make sure setup total likes/days in a row posted
      //current post tab
      //archived post tab
    }
  };
  
  return (
    <div>
        <h1>Profile</h1>
        <h1>{userId}</h1>
        <button onClick={handleSubmit}>hey</button>
    </div>
  );
};

export default Profile;
