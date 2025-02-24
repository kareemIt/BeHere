"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import './style.css';

const Bio = () => {
  const { userId } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [isSetting, setIsSetting] = useState(false)
  const [newBio, setNewBio] = useState("");
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("bio", data);
        setUserInfo(data);
      } else {
        console.log("response failed", response);
      }
    };

    fetchUserInfo();
  }, [userId,isSetting]);

  const handleSetting = () => {
    console.log("userInfo", userInfo.bio);
    setNewBio(userInfo.bio);
    setIsSetting(!isSetting);
  };

  const handleChange = (e) => {
    setNewBio(e.target.value); 
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${Number(userId)}/bio`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bio");
      }
      setNewBio(newBio); 
      setIsSetting(!isSetting);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="bioWrapper">
      {userInfo && (
        <div className="bioContainer">
          <div className="bioHeader">
            <h2 className="username">{userInfo.username}</h2>
            <span onClick={handleSetting} className="settings">
              {isSetting ? "Cancel" : "Settings"}
            </span>
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
            {isSetting == 1 && <div>
             <input
                type="text"
                value={newBio}
                onChange={handleChange}
                className="border rounded p-2"
               />
              <button onClick={handleSave}>Save</button>
              </div>}
              {isSetting == 0 && <div>
                <p>{userInfo.bio}</p>
              </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
