"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const bio = () => {
    const router = useRouter();
    const { userId } = useContext(UserContext);

    return (
        <div className='Profile '>
            <h1>settings</h1>
            <div className='stats'>
                <h1>Following</h1>
                <h1>Followers</h1>
                <h1>Total Likes</h1>
                <h1>Daily post</h1>
            </div>
            <div className='bio'>
                <p>words</p>
            </div>
        </div>
    );
};

export default bio;
