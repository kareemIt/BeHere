"use client";

import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import './style.css';

const ForYouPage = ({ postMade, setPostMade }) => {
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/allActivePosts/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        if(postMade) {
          setPostMade(false);
        }
      } else {
        console.error('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, [userId, postMade, setPostMade]);
  
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
