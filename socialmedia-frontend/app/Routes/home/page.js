"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import MakePost from '../../component/makePost/MakePost';
import ContentBar from '../../component/contentBar/ContentBar';
import ForYouPage from '../../component/FYP/ForYouPage';
import Trending from '../../component/trending/Trending';
import withAuth from '../../utils/withAuth';
import {jwtDecode} from "jwt-decode";
import './style.css';

const Home = () => {
  const router = useRouter();
  const { userId, username } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [postMade, setPostMade] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('jwtToken');
      if (!localToken) {
        router.push('/routes/login');
      } else {
        try {
          const decodedToken = jwtDecode(localToken);
          const currentTime = Date.now() / 1000;
          // Check that decoded token has an expiration and it is valid
          if (decodedToken.exp && decodedToken.exp > currentTime) {
          } else {
            localStorage.removeItem('jwtToken');
            router.push('/routes/login');
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('jwtToken');
          router.push('/routes/login');
        }
      }
    }
  }, [router]);

  return (
    <div>
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
