"use client";

import React, { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../../context/UserContext";
import follow from "../../utils/follow";
import like from "../../utils/like";
import Clock from "../../Icons/Clock.svg";
import Like from "../../Icons/Like.svg";
import Image from "next/image";
import "./style.css";

const Post = (props) => {
  const router = useRouter();
  const { userId: currentUserId, fetchWithToken } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(props.isfollowing);
  const [liked, setLiked] = useState(props.liked);
  const [currentLike, setCurrentLike] = useState(props.likes);
  const [timeLeft, setTimeLeft] = useState("");
  const [isDisabledLike, setIsDisabledLike] = useState(false);
  const clockIcon = useMemo(() => (
    <Image priority src={Clock} height={20} width={20} alt="clock icon" />
  ), []);
  
  const likeIcon = useMemo(() => (
    <Image priority src={Like} height={40} width={40} alt="like icon" />
  ), []);
  

  const handleFollow = async () => {
    try {
      const result = await follow(currentUserId, props.userId, fetchWithToken);
      if (result === 200) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow failed');
    }
  };

  const handleLike = async () => {
    if(isDisabledLike) return 
    try {
      setIsDisabledLike(true)
      const result = await like(currentUserId, props.postid, fetchWithToken);
      if (result) {
        setLiked((prevLiked) => {
          const newLiked = !prevLiked;
          setCurrentLike(result.likeCount);
          setTimeout(() => setIsDisabledLike(false), 2500);
          return newLiked;
        });
      }
    } catch (error) {
      console.error('Like failed');
    }
  };

  useEffect(() => {
    const now = new Date();
    const expiration = new Date(props.expiration);
    const diffMs = expiration - now;
    const diffHrs = diffMs / (1000 * 60 * 60);
    if (diffHrs >= 1) {
      setTimeLeft(`${Math.floor(diffHrs)}h`);
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      setTimeLeft(`${diffMins}m`);
    }
    if(diffHrs < 0){
      setTimeLeft(props.expiration);
    }
  }, [liked,props.expiration]);

  return (
    <div className='post-container'>
      <div className='header'>
        <h1>
          <button
            onClick={() =>
              router.push(`/${props.username}?userId=${props.userId}`)
            }
          >
            {props.username}
          </button>
          {String(currentUserId) !== String(props.userId) &&
            (isFollowing ? (
              <span  className='follow-color'> Following</span>
            ) : (
              <button className='follow-color'onClick={handleFollow}>Follow</button>
            ))}
        </h1>
        <h1 className='inner-container'>
          <span className="time-unit">{timeLeft}</span>
          {clockIcon}
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
              likeIcon
            ) : (
              "Like"
            )}
            <p className='like-count'>{currentLike}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
