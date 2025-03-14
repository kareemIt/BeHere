"use client";

import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import './style.css';

const ForYouPage = ({ postMade, setPostMade }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const now = new Date();
        console.log("start of call: "+ now.getMinutes() + " " + now.getSeconds())
        const response = await fetchWithToken(`${BACKEND_URL}/posts/allActivePosts/${userId}`);
    
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          console.log("end of call: "+ now.getMinutes() + " " + now.getSeconds())
          if(postMade) {
            setPostMade(false);
          }
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Failed to fetch posts');
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
