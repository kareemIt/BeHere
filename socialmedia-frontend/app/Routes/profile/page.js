"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext'; 
import NavBar from '../../component/navBar/NavBar';
import SideBar from '../../component/sideBar/SideBar';
import ContentBarProfile from '../../component/contentBarProfile/contentBarProfile';
import ArchivedPosts from '../../component/archivedPosts/archivedPosts';
import UserPost from '../../component/userPost/userPost';

const Profile = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0);

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
   

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.log(data)
      } else {
        console.log("userId", userId)
        console.error('no content');
      }
    };

    fetchPosts();
  }, []); 
  
  return (
    <div>
      <NavBar/>
      <SideBar/>
      <ContentBarProfile/>
      {currentTab == 0 &&   <UserPost/> }
      {currentTab == 1 &&   <ArchivedPosts/> }
        <h1>{userId}</h1>
    </div>
  );
};

export default Profile;
