"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../../context/UserContext";
import follow from "../../utils/follow";
import like from "../../utils/like";
import Clock from "../../Icons/clock.svg";
import Like from "../../Icons/Like.svg";
import Image from "next/image";
import "./style.css";

const Post = (props) => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(props.isfollowing);
  const [liked, setLiked] = useState(props.liked);
  const [currentLike, setCurrentLike] = useState(props.likes);
  const [timeLeft, setTimeLeft] = useState("");

  const handleFollow = async () => {
    let followed = await follow(userId, props.userId);
    if (followed === 200) {
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
              router.push(`/routes/profile/${props.username}?userId=${props.userId}`)
            }
          >
            {props.username}
          </button>
          {String(userId) !== String(props.userId) &&
            (isFollowing ? (
              <span>Following</span>
            ) : (
              <button onClick={handleFollow}>Follow</button>
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
              <Image priority src={Like} height={20} width={20} alt={"like icon"} />
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
