"use client";

import React, { useContext, useEffect, useState } from "react";
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

  const handleFollow = async () => {
    try {
      const result = await follow(currentUserId, props.userId, fetchWithToken);
      if (result === 200) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow failed:', error);
    }
  };

  const handleLike = async () => {
    try {
      const result = await like(currentUserId, props.postid, fetchWithToken);
      if (result) {
        setLiked((prevLiked) => {
          const newLiked = !prevLiked;
          setCurrentLike(result.likeCount);
          return newLiked;
        });
      }
    } catch (error) {
      console.error('Like failed:', error);
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
          <Image priority src={Clock} height={20} width={20} alt={"clock icon"} />
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
              <Image priority src={Like} height={40} width={40} alt={"like icon"} />
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
