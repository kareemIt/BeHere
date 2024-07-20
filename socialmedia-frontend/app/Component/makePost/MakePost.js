"use client";

import React from 'react';
import { useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import  { currentDate as getCurrentDate, expirationDate as getExpirationDate } from "../../utils/date"

const MakePost = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [ content, setContent] = useState("words");

  const makeAPost = async () =>{
    const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, content: content }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
    } else {
        const errorData = await response.text();
        console.error('Error creating post:', errorData);
    }
  }
  return (
    <div className='createPost'>
      <input type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."></input>
        <button onClick={makeAPost}>Post</button>
    </div>
  );
};

export default MakePost;
