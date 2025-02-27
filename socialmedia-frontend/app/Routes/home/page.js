"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import NavBar from '../../component/navBar/NavBar';
import MakePost from '../../component/makePost/MakePost';
import ContentBar from '../../component/contentBar/ContentBar';
import ForYouPage from '../../component/FYP/ForYouPage';
import Trending from '../../component/trending/Trending';
import withAuth from '../../utils/withAuth';
import { jwtDecode } from "jwt-decode";
import './style.css';

const Home = () => {
  const router = useRouter();
  // Added 'username' from context
  const { userId, username } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [postMade, setPostMade] = useState(false);
  const localToken = localStorage.getItem('jwtToken');

  useEffect(() => {
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
  }, [router, postMade]);

  return (
    <div>
      <NavBar />
      <ContentBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="homeContainer">
        <div className="postsContainer">
          <MakePost setPostMade={setPostMade} username={username} />
          {currentTab === 0 && (
            <ForYouPage postMade={postMade} setPostMade={setPostMade} />
          )}
          {currentTab === 1 && <Trending setPostMade={setPostMade} />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
