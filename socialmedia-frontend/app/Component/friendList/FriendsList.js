"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const FriendsList = () => {
    const router = useRouter();
    const { userId } = useContext(UserContext);
    const [friendList, setFriendsList] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
                method: 'GET',
                headers: {
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
    }, [userId]);


    return (
        <div className='Profile'>
            <p>FriendsList</p>
            {friendList != null && friendList.map((friends, index) => (
                <div>
                    <h1>{friends}</h1>
                    <button>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;
