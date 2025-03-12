"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import MakePost from '../makePost/MakePost';

const userPost = () => {
  const { userId, username, fetchWithToken } = useContext(UserContext);
  const [post, setPosts] = useState();
  const [postMade, setPostMade] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!userId) return; // wait until userId is available

      const fetchPosts = async () => {
        const response = await fetchWithToken(`${BACKEND_URL}/posts/active/${userId}`, );
  
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const errorData = await response.text();
          console.error('Failed to fetch posts:', errorData);
        }
      };
    fetchPosts();
  }, [userId, fetchWithToken]);

  return (
    <div className='Posts'>
      {post != null && post.username != null && 
       <Post username={post.username} content={post.content} postid={post.id}
       remainingHours={post.remainingHours} userId={post.userId} isfollowing={post.followed}
       likes={post.likeCount} liked={post.liked} expiration={post.expirationTime} 
       />
      }
         {post != null && <MakePost setPostMade={setPostMade} username={username}/> }
    </div>
  );
};

export default userPost;
