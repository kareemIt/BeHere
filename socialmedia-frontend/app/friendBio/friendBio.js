"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./style.css";

const FriendBio = ({ profileId }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if(!profileId) {
        return;
    }
    const fetchUserInfo = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:8080/api/user/${profileId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: "include"
        });
        console.log("FriendBio: fetch response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("FriendBio: fetched data:", data);
          setUserInfo(data);
        } else {
          const errorText = await response.text();
          console.error("FriendBio: Error fetching friend info:", response.status, errorText);
        } 
    };
    fetchUserInfo();
  }, [profileId]);

  if (!userInfo) {
    return <div>Loading Friend Bio...</div>;
  }

  return (
    <div className="bioWrapper">
      <div className="bioContainer">
        <div className="bioHeader">
          <h2 className="username">{userInfo.username}</h2>
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
