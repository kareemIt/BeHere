"use client";

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import removeFollower from '../../utils/removeFollower';
import './style.css';

const FriendsList = () => {
  const { userId } = useContext(UserContext);
  const [followingList, setFollowingList] = useState([]);
  const token = localStorage.getItem('jwtToken');

  const fetchFollowingList = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/${userId}/followingList`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFollowingList(data);
      } else {
        console.log("Failed to fetch following list for userId:", userId);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId) {
      fetchFollowingList();
    }
  }, [userId, token, fetchFollowingList]);

  const handleRemoveFollower = async (friendId) => {
    setFollowingList((prevFriendsList) =>
      prevFriendsList.filter((friend) => friend.id !== friendId)
    );
    
    const removed = await removeFollower(userId, friendId);
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
            <h3 className="friendName">{friend.username}</h3>
            <button onClick={() => handleRemoveFollower(friend.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No followers found</p>
      )}
    </div>
  );
};

export default FriendsList;
