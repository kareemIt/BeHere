"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import Post from "../post/post"
import { content } from '../../../tailwind.config';

const ForYouPage = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [posts, setPosts] = useState();


  const getPosts = async () =>{
    const response = await fetch('http://localhost:8080/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.ok){
        const data = await response.json();
        setPosts(data);
        console.log(posts)
        console.log('Post created:', data);
        console.log('Post created:',  data[0].user.username);
      }
  }


  return (
    <div className='navBar'>
        <button onClick={getPosts}>button</button>
        { posts != null &&posts.map((post, key) => {
        return <Post userId={post.user.username} content={post.content} index={key}  />
        })}
    </div>
  );
};

export default ForYouPage;
