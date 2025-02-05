"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const bio = () => {
    const router = useRouter();
    const { userId } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState();
    const { token}  = useContext(UserContext);
    
    useEffect(() => {
        console.log("userId", userId);
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
                console.log(data);
            } else {
                console.log("userId", userId);
            }
        };

        fetchPosts();
    }, [userId]);


    return (
        <div className='Profile '>
            <h1>settings</h1>
            <div className='bio-container'>
                {userInfo != null &&
                    <><div className='stats'>
                        <h1>Following</h1>
                        <p>{userInfo.following.length}</p>
                        <h1>Followers</h1>
                        <p>{userInfo.followers.length}</p>
                        <h1>Total Likes</h1>
                        <p>{userInfo.totalLikes}</p>
                        <h1>Daily post</h1>
                        <p>{userInfo.postingStreak}</p>
                    </div>
                        <div className='bio'>
                            <p>{userInfo.bio}</p>
                        </div></>
                }
            </div>
        </div>
    );
};

export default bio;
