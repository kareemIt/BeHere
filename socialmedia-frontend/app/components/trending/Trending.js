"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const Trending = ({setPostMade}) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetchWithToken(`${BACKEND_URL}/trending/${userId}`);

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setPostMade(true);
        } else {
          const errorData = await response.text();
          console.error('Failed to fetch trending posts:', errorData);
        }
      } catch (error) {
        console.error('Failed to fetch trending posts:', error);
      }
    };

    if (userId) fetchTrendingPosts();
  }, [userId, setPostMade, fetchWithToken]);

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
