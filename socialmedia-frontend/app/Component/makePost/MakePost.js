"use client";

import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import './style.css';

const MakePost = ({ setPostMade, username }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [hasPost, setHasPost] = useState(false);

  const makeAPost = async () => {
    if (!content) return;
    try {
      const response = await fetchWithToken('http://localhost:8080/api/posts', {
        method: 'POST',
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
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  useEffect(() => {
    const postCheck = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:8080/api/posts/active/${userId}`);
        const data = await response.json();
        if (response.ok && data.id != null) {
          setHasPost(true);
        } else {
          setHasPost(false);
        }
      } catch (error) {
        console.error('Failed to check post status:', error);
        setHasPost(false);
      }
    };
    if (userId) postCheck();
  }, [userId, fetchWithToken]);

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
