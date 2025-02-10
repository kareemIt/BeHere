"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import NavBar from '../../component/navBar/NavBar';
import SideBar from '../../component/sideBar/SideBar';
import MakePost from '../../component/makePost/MakePost';
import ContentBar from '../../component/contentBar/ContentBar';
import ForYouPage from '../../component/FYP/ForYouPage';
import Trending from '../../component/trending/Trending';
import withAuth from '../../utils/withAuth';
import checkTokenExpiration from '../../utils/checkTokenExpiration';
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem('jwtToken');
    
    if (!localToken) {
      console.log('No token found');
      router.push('/routes/login');
    } else {
      try {
          const decodedToken = jwtDecode(localToken);
          const currentTime = Date.now() / 1000; 
          if (decodedToken.exp < currentTime) {
              localStorage.removeItem('jwtToken');
            router.push('/routes/login');
          }
      } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('jwtToken');
        router.push('/routes/login');
      }
    }

  }, [router]);

  return (
    <div>
      <NavBar />
      <MakePost />
      <ContentBar />
      <SideBar />
      {currentTab === 0 && <ForYouPage />}
      {currentTab === 1 && <Trending />}

    </div>
  );
};

export default withAuth(Home);
