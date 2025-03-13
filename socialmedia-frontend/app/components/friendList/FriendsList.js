"use client";

import React, { useEffect, useState, useContext, useCallback } from 'react';
import UserContext from '../../context/UserContext';
import removeFollower from '../../utils/removeFollower';
import './style.css';
import Link from 'next/link';

const FriendsList = () => {
  const { userId,fetchWithToken  } = useContext(UserContext);
  const [followingList, setFollowingList] = useState([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchFollowingList = useCallback(async () => {
    try {
      const response = await fetchWithToken(`${BACKEND_URL}/${userId}/followingList`);
      if (response.ok) {
        const data = await response.json();
        setFollowingList(data);
      } else {
        console.log("Failed to fetch following list for userId:", userId);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId, fetchWithToken]);

  useEffect(() => {
    if (userId) {
      fetchFollowingList();
    }
  }, [userId, fetchWithToken, fetchFollowingList]);

  const handleRemoveFollower = async (friendId) => {
    setFollowingList((prevFriendsList) =>
      prevFriendsList.filter((friend) => friend.id !== friendId)
    );
    
    const removed = await removeFollower(userId, friendId, fetchWithToken);
    if (removed !== 200) {
      fetchFollowingList();
    }
  };

  return (
    <div className="friendsList">
      <h2>Following</h2>
      {followingList.length > 0 ? (
        followingList.map((friend) => (
          <div key={friend.id} className="friendItem">
            <Link href={`/${friend.username}?userId=${friend.id}`}>
             <h3 className="friendName">{friend.username}</h3>
            </Link>
            <button className="remove" onClick={() => handleRemoveFollower(friend.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No followers found</p>
      )}
    </div>
  );
};

export default FriendsList;
