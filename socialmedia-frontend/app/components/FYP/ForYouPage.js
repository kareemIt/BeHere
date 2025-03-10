"use client";

import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import './style.css';

const ForYouPage = ({ postMade, setPostMade }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:8080/api/posts/allActivePosts/${userId}`);
    
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          if(postMade) {
            setPostMade(false);
          }
        } else {
          const errorData = await response.text();
          console.error('Failed to fetch posts:', errorData);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    if (userId) fetchPosts();
  }, [userId, postMade, setPostMade, fetchWithToken]);
  
  return (
    <div className='Posts'>
      {posts.length > 0 && posts.map((post, index) => (
        <Post
          key={index}
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
      ))}
    </div>
  );
};

export default ForYouPage;
