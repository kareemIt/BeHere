"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import './style.css';

const MakePost = ({ setPostMade, username }) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [hasPost, setHasPost] = useState(false);
  const token = localStorage.getItem('jwtToken');

  const makeAPost = async () => {
    if (!content) return;
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
      setHasPost(true);
      setPostMade(true);
    } else {
      const errorData = await response.text();
      console.error('Error creating post:', errorData);
    }
  };

  useEffect(() => {
    const postCheck = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        setHasPost(true);
      } else {
        setHasPost(false);
      }
    };
    if (userId) postCheck();
  }, [userId, token]);

  if (hasPost) return null;

  return (
    <div className="makePostContainer">
      <div className="makePostHeader">Hello, {username}!</div>
      <textarea
        type="text"
        className="postInput"
        maxLength={256}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
      />
      <div className="charLimit">
        {256 - content.length} characters remaining
      </div>
      <button className="postButton" onClick={makeAPost}>Post</button>
    </div>
  );
};

export default MakePost;
