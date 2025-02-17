"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import removeFollower from '../../utils/removeFollower';
import './style.css';

const FriendsList = () => {
  const { userId } = useContext(UserContext);
  const [followingList, setFollowingList] = useState([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/${userId}/followingList`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setFollowingList(data);
        console.log('friendsList fyp:', data);
      } else {
        console.log("userId", userId);
      }
    };

    fetchPosts();
  }, [userId, token]);

  const handleRemoveFollower = async (friendId) => {
    let removed = await removeFollower(userId, friendId);
    if (removed === 200) {
      setFollowingList((prevFriendsList) =>
        prevFriendsList.filter((friend) => friend.id !== friendId)
      );
    }
  };

  return (
    <div className="friendsList">
      <h2>Following</h2>
      {followingList.length > 0 ? (
        followingList.map((friend, index) => (
          <div key={index} className="friendItem">
            <h3 className="friendName">{friend.username}</h3>
            <button onClick={() => handleRemoveFollower(friend.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No friends found</p>
      )}
    </div>
  );
};

export default FriendsList;
