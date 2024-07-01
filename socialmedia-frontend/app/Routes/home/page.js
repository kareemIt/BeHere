"use client";

import React from 'react';
import { useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import styles from './style.css';
import UserContext from '../../context/UserContext'; 
import NavBar from '../../component/navBar/NavBar';
import SideBar from '../../component/sideBar/SideBar';
import MakePost from '../../component/makePost/MakePost';
import ContentBar from '../../component/contentBar/ContentBar';

const Home = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div>
      <NavBar/>
      <ContentBar/>
      <SideBar/>
      <MakePost/>
      <h1>Welcome to My Social Media App</h1>
      <p>hello {userId}</p>

    </div>
  );
};

export default Home;
