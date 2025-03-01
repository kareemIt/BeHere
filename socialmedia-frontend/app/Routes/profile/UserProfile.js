"use client";

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext'; 
import NavBar from '../../component/navBar/NavBar';
import ContentBarProfile from '../../component/contentBarProfile/contentBarProfile';
import ArchivedPosts from '../../component/archivedPosts/archivedPosts';
import UserPost from '../../component/userPost/userPost';
import Bio from '../../component/bio/bio';
import FriendsList from '../../component/friendList/FriendsList';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [postMade, setPostMade] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
   
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } 
    };

    fetchPosts();
  }, [userId]); 

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