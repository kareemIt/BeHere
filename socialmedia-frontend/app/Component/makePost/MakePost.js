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
  const [hasPost, setHasPost] = useState(false);

  const makeAPost = async () =>{
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, content: content }),
      });
      if (response.ok) {
        const data = await response.json();

    } else {
        const errorData = await response.text();
        console.error('Error creating post:', errorData);
    }
  }
  useEffect(() => {
    const postCheck = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("inner", data);
        setHasPost(true);
        console.log(data);
      }
      else{
        setHasPost(false);
      }
    };
    postCheck();
  }, []);
  return (
    <div>
      {hasPost &&
        <div className='createPost'>
          <input type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..."></input>
            <button onClick={makeAPost}>Post</button>
        </div>
      }
    </div>
  );
};

export default MakePost;
