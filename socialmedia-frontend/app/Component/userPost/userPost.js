"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import MakePost from '../../component/makePost/MakePost';

const userPost = () => {
  const { userId } = useContext(UserContext);
  const [post, setPosts] = useState();

  useEffect(() => {
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
        console.log("posts", data);
        console.log(data)
      } else {
        console.log("userId", userId)
        console.error('no content');
      }
    };
        fetchPosts();

  }, []); 

  return (
    <div className='Posts'>
      {post != null && 
       <Post username={post.username} content={post.content} postid={post.id}
       remainingHours={post.remainingHours} userId={post.userId} isfollowing={post.followed}
       likes={post.likeCount} liked={post.liked} 
       />
      }
         {post == null && <MakePost/> }
    </div>
  );
};

export default userPost;
