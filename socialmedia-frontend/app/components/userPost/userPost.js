"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import { useQuery } from "@tanstack/react-query";
import Post from "../post/post";
import MakePost from '../makePost/MakePost';

const userPost = () => {
  const { userId, username, fetchWithToken } = useContext(UserContext);
  const [postMade, setPostMade] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data: post = [], isLoading, error } = useQuery({
    queryKey: ["userPost", userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/posts/active/${(userId)}`,);
      if (!response.ok) throw new Error("Failed to fetch trending posts");
      return response.json();
    },
    enabled: !!userId, // Only fetch when userId is available
    staleTime: 0, // Ensures fresh data
    cacheTime: 0, // Prevents caching old results
    onSuccess: () => setPostMade(true), // Update parent state when posts load
  });

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
