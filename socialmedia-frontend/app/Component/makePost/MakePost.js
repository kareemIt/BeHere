"use client";

import React from 'react';
import { useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import styles from './style.css';
import UserContext from '../../context/UserContext'; 

const MakePost = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);

  return (
    <div>
        

    </div>
  );
};

export default MakePost;
