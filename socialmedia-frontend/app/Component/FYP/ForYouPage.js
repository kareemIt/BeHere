"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const ForYouPage = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:8080/api/posts/active', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
   

      console.log('response fyp:', response);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.log( data)
      } else {
        console.error('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []); 

  return (
    <div className='Posts'>
      {posts.length > 0 && posts.map((post, index) => (
        <Post key={index} userId={post.username} content={post.content} remainingHours={post.remainingHours}  />
      ))}
    </div>
  );
};

export default ForYouPage;
