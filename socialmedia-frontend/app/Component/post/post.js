"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserContext from '../../context/UserContext';
import follow from '../../utils/follow';
import like from '../../utils/like';
import Clock from "../../Icons/clock.svg";
import Like from  '../../Icons/Like.svg';
import Image from 'next/image';
import './style.css';

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

  useEffect(() => {}, [liked]);

  return (
    <div className='post-container'>
      <div className='header'>
        <h1>
          {props.username}{" "}
          {String(userId) !== String(props.userId) && (
            isFollowing 
              ? <span>Following</span> 
              : <button onClick={handleFollow}>Follow</button>
          )}
        </h1>
        <h1 className='inner-container'>
          {(props.remainingHours > 0 
          ? <span className="time-unit">{props.remainingHours}h</span>
          : <span className="time-unit">{props.expirationTime}</span>
          )}
          <Image priority src={Clock} height={20} width={20} alt={"image"}/> 
        </h1>
      </div>
      <div className='postContent'>
        <p>{props.content}</p>
      </div>
      <div className='likeContent'>
        <div className='Likes'>
          <button
            onClick={handleLike}
            className={liked ? "like-button liked" : "like-button unliked"}
          >
            {liked ? (
              <Image priority src={Like} height={20} width={20} alt={"image"}/>
            ) : (
              "Like"
            )}
            <p className='like-count'>{currentLike}</p></button>
        </div>
      </div>
    </div>
  );
};

export default Post;
