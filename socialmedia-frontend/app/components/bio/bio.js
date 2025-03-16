"use client";

import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../../context/UserContext";
import "./style.css";

const Bio = () => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [isSetting, setIsSetting] = useState(false);
  const [newBio, setNewBio] = useState("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const queryClient = useQueryClient();

  const { data: userInfo, isLoading, error } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/user/${userId}`);
      return response.json();
    },
    enabled: !!userId, 
    staleTime: 60000, 
  });

  const updateBioMutation = useMutation({
    mutationFn: async (newBio) => {
      const response = await fetchWithToken(
        `${BACKEND_URL}/user/${Number(userId)}/bio`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bio: newBio }),
        }
      );
      if (!response.ok) throw new Error("Failed to update bio");
      return newBio;
    },
    onSuccess: (newBio) => {
      // Update cache after successful mutation
      queryClient.setQueryData(["userInfo", userId], (prev) =>
        prev ? { ...prev, bio: newBio } : prev
      );
      setIsSetting(false);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user info</p>;

  const handleSetting = () => {
    setNewBio(userInfo?.bio || ""); // Ensure it's not undefined
    setIsSetting((prev) => !prev);
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
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Update your bio..."
                  className="bioTextArea"
                />
                <div className="charLimit">
                  {255 - newBio.length} characters remaining
                </div>
                <div className="bioEditButtons">
                  <button
                    onClick={() => updateBioMutation.mutate(newBio)}
                    className="btn saveBtn"
                  >
                    {updateBioMutation.isLoading ? "Saving..." : "Save"}
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
