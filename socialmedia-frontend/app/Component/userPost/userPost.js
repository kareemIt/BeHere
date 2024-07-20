"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post";
import MakePost from '../../component/makePost/MakePost';

const userPost = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
   

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
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
      {posts.length > 0 && posts.map((post, index) => (
        <Post key={index} userId={post.username} content={post.content} remainingHours={post.remainingHours}  />
      ))}
         {posts.length == 0 && <MakePost/> }
    </div>
  );
};

export default userPost;
