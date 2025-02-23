"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import Post from "/app/component/post/post";
import MakePost from '/app/component/makePost/MakePost';

const FriendPost = ({ profileId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!profileId) {
      return;
    }
    const token = localStorage.getItem('jwtToken');
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/active/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPosts([data]);
        console.log("posts", [data]);
      }
    };

    fetchPosts();
  }, [profileId]);

  return (
    <div className='Posts'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            content={post.content}
            postid={post.id}
            remainingHours={post.remainingHours}
            userId={post.userId}
            isfollowing={post.followed}
            likes={post.likeCount}
            liked={post.liked}
          />
        ))
      ) : (
        <p>The user hasn't made a post today yet!</p>
      )}
    </div>
  );
};

export default FriendPost;
