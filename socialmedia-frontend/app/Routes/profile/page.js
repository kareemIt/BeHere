"use client";

import React, { useEffect, useState, useContext, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import UserContext from '../../context/UserContext';
import UserProfile from './UserProfile';
import FriendProfile from './[FriendsProfile]/page';

const ProfilePage = ({ params }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId: currentUserId } = useContext(UserContext);
  const [profileUserId, setProfileUserId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('userId');
    setProfileUserId(id);
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      {profileUserId && String(profileUserId) === String(currentUserId) ? (
        <UserProfile />
      ) : profileUserId ? (
        <FriendProfile />
      ) : (
        <UserProfile />
      )}
    </Suspense>
  );
};

export default ProfilePage;
