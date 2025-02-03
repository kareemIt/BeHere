"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const FriendsList = () => {
    const router = useRouter();
    const { userId } = useContext(UserContext);
    // const { token }  = useContext(UserContext);
    const [followingList, setFriendsList] = useState();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:8080/api/${userId}/following`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFriendsList(data);
                console.log(data);
            } else {
                console.log("userId", userId);
            }
        };

        fetchPosts();
    }, [userId,setFriendsList]);

    const removeFollower = async (followerId) => {
        const response = await fetch(`http://localhost:8080/api/${userId}/unfollow/${followerId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            setFriendsList(data);
            console.log(data);
        } else {
            console.log("userId", userId);
        }
    };



    return (
        <div className='Following List'>
            <p>Following</p>
            {followingList != null && followingList.map((friend, index) => (
                <div key={index}>
                    <h1>{friend}</h1>
                    <button onClick={removeFollower(friend)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;
