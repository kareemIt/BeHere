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
  const { token } = useContext(UserContext);
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

    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:8080/api/secured-endpoint', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch data',response.status);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <NavBar />
      <SideBar />
      <MakePost />
      <ContentBar />
      <ForYouPage />
      <Trending />
      <h1>Welcome to the Home Page</h1>
      {data ? (
        <div>
          {/* Render your data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withAuth(Home);
