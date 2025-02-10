"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import follow from '../../utils/follow';
import like from '../../utils/like';

const Post = (props) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(props.isfollowing);
  const [liked, setLiked] = useState(props.liked);
  const [currentLike, setCurrentLike] = useState(props.likes);

  const handleFollow = async () => {
    let followed = await follow(userId, props.userId);
    if (followed == 200) {
      setIsFollowing(true);
    }
  };

  const handleLike = async () => {
    let response = await like(userId, props.postid);
    if (response) {
      setLiked((prevLiked) => {
        const newLiked = !prevLiked;
        setCurrentLike(response.likeCount);
        return newLiked;
      });
    }
  };

  useEffect(() => {
  }, [liked]);

  return (
    <div className='post-container'>
      <div className='header'>
        <h1>{props.username} {isFollowing && <a>Following</a>}
          {!isFollowing && userId != props.userId && <button onClick={handleFollow}>Follow</button>}
        </h1>
        <h1>{props.remainingHours} icon</h1>
      </div>
      <div className='postContent'>
        <p>{props.content}</p>
      </div>
      <div>
        <p>{currentLike}</p>
        <button onClick={handleLike}>{liked ? "Liked" : "Like"}</button>
      </div>
    </div>
  );
};

export default Post;
