"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";

const ArchivedPosts = () => {
  const { fetchWithToken } = useContext(UserContext);
  const userId = localStorage.getItem('userId');
  const [posts, setPosts] = useState([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetchWithToken(`${BACKEND_URL}/posts/archived/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch posts:', response.status, errorText);
        }
      } catch (error) {
        console.error('Fetch posts operation failed:', error);
      }
    };

    fetchPosts();
  }, [userId, fetchWithToken]);

  return (
    <div className='Posts'>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            content={post.content}
            postid={post.id}
            expirationTime={post.expirationTime}
            remainingHours={post.remainingHours}
            userId={post.userId}
            isfollowing={post.followed}
            likes={post.likeCount}
            liked={post.liked}
            expiration={post.expirationTime}
          />
        ))
      ) : (
        <p>No archived posts found.</p>
      )}
    </div>
  );
};

export default ArchivedPosts;
