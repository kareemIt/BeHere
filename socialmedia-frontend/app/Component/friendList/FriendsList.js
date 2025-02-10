"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import removeFollower from '../../utils/removeFollower';

const FriendsList = () => {
    const router = useRouter();
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

            if (response.ok) {
                const data = await response.json();
                setFollowingList(data);
                console.log('friendsList fyp:', data);
            } else {
                console.log("userId", userId);
            }
        };

        fetchPosts();
    }, [userId, token,setFollowingList]);

    const handleRemoveFollower = async (friendId) => {
        let removed = await removeFollower(userId, friendId);
        if (removed == 200) {
            setFollowingList((prevFriendsList) => {
                const newFriendsList = prevFriendsList.filter((friend) => friend.id !== friendId);
                return newFriendsList;
            });
        }
    };

    return (
        <div className='Following List'>
            <p>Following</p>
            {followingList.length > 0 && followingList.map((friend, index) => (
                <div key={index}>
                    <h1>{friend.username}</h1>
                    <button onClick={() => handleRemoveFollower(friend.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;
