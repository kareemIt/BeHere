"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const bio = (props) => {
    const router = useRouter();
    const  {userId} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState();
    const { token}  = useContext(UserContext);
    
    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("bio", data);
                setUserInfo(data);
            } else {
                console.log("response failed", response);
            }
        };


    fetchPosts();
    }, []);


    return (
        <div className='Profile '>
            <h1>settings</h1>
            <div className='bio-container'>
                {userInfo != null &&
                    <><div className='stats'>
                        <h1>{userInfo.username}</h1>
                        <h1>Following</h1>
                        <p>{userInfo.followingCount}</p>
                        <h1>Followers</h1>
                        <p>{userInfo.followersCount}</p>
                        <h1>Total Likes</h1>
                        <p>{userInfo.totalLikes}</p>
                        <h1>Daily post</h1>
                        <p>{userInfo.postingStreak}</p>
                    </div>
                        <div className='bio'>
                            <p>bio</p>
                            <p>{userInfo.bio}</p>
                        </div></>
                }
            </div>
        </div>
    );
};

export default bio;
