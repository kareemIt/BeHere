"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import MakePost from '../../component/makePost/MakePost';

const userPost = () => {
  const { userId, username } = useContext(UserContext);
  const [post, setPosts] = useState();

  useEffect(() => {
    if (!userId) return; // wait until userId is available
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
      } else {
        console.error('No content for userId:', userId);
      }
    };
    fetchPosts();
  }, [userId]);

  return (
    <div className='Posts'>
      {post != null && 
       <Post username={post.username} content={post.content} postid={post.id}
       remainingHours={post.remainingHours} userId={post.userId} isfollowing={post.followed}
       likes={post.likeCount} liked={post.liked} expiration={post.expirationTime} 
       />
      }
         {post == null && <MakePost username={username}/> }
    </div>
  );
};

export default userPost;
