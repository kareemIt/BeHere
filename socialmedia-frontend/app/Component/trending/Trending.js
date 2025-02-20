"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const Trending = () => {
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchTrendingPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/trending`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("trending", data);
        setPosts(data);
      } else {
        console.log("response failed", response);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <div className='Posts'>
    {posts.length > 0 && posts.map((post, index) => (
      <Post key={index} username={post.username} content={post.content} postid={post.id}
      remainingHours={post.remainingHours} userId={post.userId} isfollowing={post.followed}
      likes={post.likeCount} liked={post.liked}
      
      />
    ))}
  </div>
  );
};

export default Trending;
