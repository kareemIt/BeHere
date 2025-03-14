"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import Post from '../components/post/post'; // Corrected import path
import UserContext from '../context/UserContext';

const FriendPost = ({ profileId }) => {
  const [posts, setPosts] = useState([]);
  const { fetchWithToken } = useContext(UserContext);
  const userId = localStorage.getItem('userId');
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!profileId || !userId) {
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetchWithToken(`${BACKEND_URL}/posts/${userId}/friend/${profileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const text = await response.text();
          if (text) {
            const data = JSON.parse(text);
            if (data.id != null) {
              setPosts([data]);
            }
          } else {
            console.error('Empty response');
          }
        } else {
          console.error('Error fetching posts');
        }
      } catch (error) {
        console.error('Fetch posts operation failed');
      }
    };

    fetchPosts();
  }, [profileId, userId, fetchWithToken]);

  return (
    <div className='Posts'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            content={post.content}
            postid={post.id}
            remainingHours={post.remainingHours}
            userId={post.userId}
            isfollowing={post.followed}
            likes={post.likeCount}
            liked={post.liked}
            expiration={post.expirationTime} 
          />
        ))
      ) : (
        <p className='no-post'>The user hasn't made a post today yet!</p>
      )}
    </div>
  );
};

export default FriendPost;
