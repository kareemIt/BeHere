"use client";

import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import UserContext from "../context/UserContext";

const FriendBio = ({ profileId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { fetchWithToken, userId } = useContext(UserContext);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isDisabledFollow, setIsDisabledFollow] = useState(false)

  useEffect(() => {
    if (!profileId) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetchWithToken(
          `${BACKEND_URL}/user/${userId}/friendsbio/${profileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setIsFollowing(data.following);
        } else {;
          console.error("FriendBio: Error fetching friend info");
        }
      } catch (error) {
        console.error("FriendBio: Error fetching friend info");
      }
    };

    fetchUserInfo();
  }, [profileId, userId, fetchWithToken]);

  const handleFollow = async () => {
    if(isDisabledFollow) return
    const action = isFollowing ? "unfollow" : "follow";
    const method = isFollowing ? "DELETE" : "POST";

    try {
      setIsDisabledFollow(true)
      const response = await fetchWithToken(
        `${BACKEND_URL}/${userId}/${action}/${profileId}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing);
        setTimeout(() => setIsDisabledFollow(false), 2500);
      } else {
        console.error("FriendBio: Error updating follow status");
      }
    } catch (error) {
      console.error("FriendBio: Error updating follow status");
    }
  };

  if (!userInfo) {
    return <div>Loading Friend Bio...</div>;
  }

  return (
    <div className="friendBioWrapper">
      <div className="friendBioContainer">
        <div className="friendBioHeader">
          <h2 className="username">{userInfo.username}</h2>
          <button onClick={handleFollow} className="settings">
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="stats">
          <div className="statsGrid">
            <div className="stat">
              <h3>Following</h3>
              <p>{userInfo.followingCount}</p>
            </div>
            <div className="stat">
              <h3>Followers</h3>
              <p>{userInfo.followersCount}</p>
            </div>
            <div className="stat">
              <h3>Total Likes</h3>
              <p>{userInfo.totalLikes}</p>
            </div>
            <div className="stat">
              <h3>Daily Post</h3>
              <p>{userInfo.postingStreak}</p>
            </div>
          </div>
        </div>
        <div className="friendBioSection">
          <h3>Bio</h3>
          <p>{userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendBio;
