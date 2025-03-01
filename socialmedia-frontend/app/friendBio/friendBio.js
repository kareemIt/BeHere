"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const FriendBio = ({ profileId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!profileId) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/${currentUserId}/friendsbio/${profileId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setIsFollowing(data.following);
        } else {
          const errorText = await response.text();
          console.error(
            "FriendBio: Error fetching friend info:",
            response.status,
            errorText
          );
        }
      } catch (error) {
        console.error("FriendBio: Error fetching friend info:", error);
      }
    };

    fetchUserInfo();
  }, [profileId, currentUserId, token]); // Only re-run if profileId changes

  const handleFollow = async () => {
    const action = isFollowing ? "unfollow" : "follow";
    const method = isFollowing ? "DELETE" : "POST";

    try {
      const response = await fetch(
        `http://localhost:8080/api/${currentUserId}/${action}/${profileId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing);
      } else {
        const errorText = await response.text();
        console.error(
          "FriendBio: Error updating follow status:",
          response.status,
          errorText
        );
      }
    } catch (error) {
      console.error("FriendBio: Error updating follow status:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading Friend Bio...</div>;
  }

  return (
    <div className="bioWrapper">
      <div className="bioContainer">
        <div className="bioHeader">
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
        <div className="bioSection">
          <h3>Bio</h3>
          <p>{userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendBio;
