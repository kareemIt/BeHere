"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserContext from '../../context/UserContext'; 
import UserProfile from './UserProfile';
import FriendProfile from './[FriendsProfile]/page';

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = path.match(/\/profile\/(\d+)/);
      setProfileId(match ? match[1] : null);
    }
  }, []);

  return (
    <div>
      {profileId == null ? (
        <UserProfile />
      ) : (
        <FriendProfile userId={profileId} />

      )}
    </div>
  );
};

export default ProfilePage;
