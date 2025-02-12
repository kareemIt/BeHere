"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../component/navBar/NavBar';
import SideBar from '../../../component/sideBar/SideBar';
import ContentBarProfile from '../../../component/contentBarProfile/contentBarProfile';
import FriendPost from '../../../friendPost/friendPost';
import FriendBio from '../../../friendBio/friendBio';

const FriendProfile = (props) => {
  const router = useRouter();
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = path.match(/\/profile\/(\d+)/);
      if (match) {
        console.log("profileId", match[1]);
        setProfileId(match[1]);
      }
    }
  }, []);

  if (!profileId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <SideBar />
      <FriendBio userid={profileId} />
      <h1 className='navBar'>Current Post</h1>
      <FriendPost userid={profileId} />
    </div>
  );
};

export default FriendProfile;