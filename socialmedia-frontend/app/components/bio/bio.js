"use client";

import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "./style.css";

const Bio = () => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [isSetting, setIsSetting] = useState(false);
  const [newBio, setNewBio] = useState("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetchWithToken(
          `${BACKEND_URL}/user/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info");
      }
    };

    if (userId) fetchUserInfo();
  }, [userId, isSetting]); // Removed `token` dependency

  const handleSetting = () => {
    setNewBio(userInfo?.bio || ""); // Ensure it's not undefined
    setIsSetting((prev) => !prev);
  };

  const handleChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await fetchWithToken(
        `${BACKEND_URL}/user/${Number(userId)}/bio`,
        {
          method: "POST", // Ensure this is the correct method
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bio: newBio }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update bio");
      }

      // Update user info locally without another API call
      setUserInfo((prev) => ({ ...prev, bio: newBio }));
      setIsSetting(false);
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
                <p>{userInfo.followersCount}</p>
              </div>
              <div className="stat">
                <h3>Followers</h3>
                <p>{userInfo.followingCount}</p>
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
            {isSetting ? (
              <div className="bioEdit">
                <textarea
                  value={newBio}
                  maxLength={255}
                  onChange={handleChange}
                  placeholder="Update your bio..."
                  className="bioTextArea"
                />
                <div className="charLimit">
                  {255 - newBio.length} characters remaining
                </div>
                <div className="bioEditButtons">
                  <button onClick={handleSave} className="btn saveBtn">
                    Save
                  </button>
                  <button onClick={handleSetting} className="btn cancelBtn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bioDisplay">
                <p>{userInfo.bio}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
