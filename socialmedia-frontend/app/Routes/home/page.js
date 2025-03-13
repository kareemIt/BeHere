"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import MakePost from "@/components/makePost/MakePost";
import ContentBar from "@/components/contentBar/ContentBar";
import ForYouPage from "@/components/FYP/ForYouPage";
import Trending from "@/components/trending/Trending";
import withAuth from '../../utils/withAuth';
import './style.css';
import { jwtDecode } from 'jwt-decode';
 
const Home = () => {
  const router = useRouter();
  const { username, fetchWithToken, accessToken, userId } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [postMade, setPostMade] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check for all required auth data
        const token = localStorage.getItem('accessToken');
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');

        if (!token || !storedUserId || !storedUsername) {
          console.error('Missing auth data:', { token: !!token, userId: !!storedUserId, username: !!storedUsername });
          router.push('/login');
          return;
        }

        // Verify token validity
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            console.error('Token expired');
            router.push('/login');
            return;
          }
        } catch (e) {
          console.error('Token decode error:', e);
          router.push('/login');
          return;
        }

        // Verify with backend
        const response = await fetchWithToken(`${BACKEND_URL}/secured-endpoint`);
        
        if (!response.ok) {
          throw new Error(`Auth verification failed: ${response.status}`);
        }

        // If we get here, auth is valid
        console.log('Auth verified successfully');

      } catch (error) {
        console.error('Auth verification error:', error);
        router.push('/login');
      }
    };

    verifyAuth();
  }, [router, fetchWithToken]); // Add proper dependencies

  // Early return if not authenticated
  if (!accessToken || !userId || !username) {
    return null;
  }

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
