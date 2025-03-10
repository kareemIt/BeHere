"use client";

import React, { useState, useContext, useEffect } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext'; 
import ContentBarProfile from '../../components/contentBarProfile/contentBarProfile';
import ArchivedPosts from '../../components/archivedPosts/archivedPosts';
import UserPost from '../../components/userPost/userPost';
import Bio from '../../components/bio/bio';
import FriendsList from '../../components/friendList/FriendsList';

const UserProfile = () => {
  const { fetchWithToken } = useContext(UserContext);
  const userId = localStorage.getItem('userId');
  const [currentTab, setCurrentTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userId) return; 

    const fetchPosts = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:8080/api/posts/active/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.id != null) {
            setPosts([data]);
          }
        } else {
          const errorText = await response.text();
          console.error('Error fetching posts:', response.status, errorText);
        }
      } catch (error) {
        console.error('Fetch posts operation failed:', error);
      }
    };

    fetchPosts();
  }, [userId, fetchWithToken]); 

  return (
    <div>
      <div className="profileContainer">
        <div className="profileContent">
          <Bio/>
          <ContentBarProfile currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab === 0 && <UserPost posts={posts} />}
          {currentTab === 1 && <ArchivedPosts />}
        </div>
        <FriendsList />
      </div>
    </div>
  );
};

export default UserProfile;