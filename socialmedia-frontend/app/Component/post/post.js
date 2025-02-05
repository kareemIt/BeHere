"use client";

import React, { use } from 'react';
import { useEffect, useState, useContext } from 'react';
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

  console.log('props:', props);

  const handleFollow = async () => {
    let followed = await follow(userId, props.userId);
    if (followed == 200) {
      setIsFollowing(true);
    }
  };

  useEffect(() => {
  }, [setIsFollowing]);

  return (
    <div className='post-container'>
        <div className='header'>
            <h1>{props.username} {isFollowing && <a>Following</a>}
            {!isFollowing && <button onClick={handleFollow}>Follow</button>} </h1>
            <h1>{props.remainingHours}icon</h1>
        </div>
        <div className='postContent'>
            <p>{props.content}</p>
        </div>
        <div>
          <button onClick={like}>Likes icon </button>
          <p>{props.likes}</p>
          <button>Comment icon</button>
        </div>
    </div>
  );
};

export default Post;
