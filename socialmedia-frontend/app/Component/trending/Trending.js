"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const Trending = ({setPostMade}) => {
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchTrendingPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/trending/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setPostMade(true);
      } else {
        console.log("response failed", response);
      }
    };
    fetchTrendingPosts();
  }, [ setPostMade]);

  return (
    <div className='Posts'>
    {posts.length > 0 && posts.map((post, index) => (
      <Post key={index} username={post.username} content={post.content} postid={post.id}
      remainingHours={post.remainingHours} userId={post.userId} isfollowing={post.followed}
      likes={post.likeCount} liked={post.liked} expiration={post.expirationTime}
      
      />
    ))}
  </div>
  );
};

export default Trending;
