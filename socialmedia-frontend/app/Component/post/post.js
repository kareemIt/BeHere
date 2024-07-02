"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import styles from './style.css';
import UserContext from '../../context/UserContext';

const Post = (props) => {
  const router = useRouter();

  return (
    <div className='navBar'>
        <div className='header'>
            <h1>{props.userId}</h1>
            {/* <h1>{expirationDate}</h1> */}
        </div>
        <div className='postContent'>
            <p>{props.content}</p>
        </div>
    </div>
  );
};

export default Post;
