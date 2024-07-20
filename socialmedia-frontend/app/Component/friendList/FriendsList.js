"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.css';
import UserContext from '../../context/UserContext';

const FriendsList = () => {
    const router = useRouter();
    const { userId } = useContext(UserContext);

    return (
        <div className='Profile'>
            <p>words</p>
        </div>
    );
};

export default FriendsList;
