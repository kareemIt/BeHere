"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import UserContext from '../../context/UserContext';
import UserProfile from './UserProfile';
import FriendProfile from './[FriendsProfile]/page';

const ProfileContent = () => {
  const searchParams = useSearchParams();
  const { userId: currentUserId } = useContext(UserContext);
  const [profileUserId, setProfileUserId] = useState(null);

  useEffect(() => {
    // Get the "userId" query parameter from the URL
    const id = searchParams.get('userId');
    setProfileUserId(id);
  }, [searchParams]);

  if (!profileUserId) {
    // Fallback if no query param is present
    return <UserProfile />;
  }

  return (
    <>
      {String(profileUserId) === String(currentUserId) ? (
        <UserProfile />
      ) : (
        <FriendProfile />
      )}
    </>
  );
};

export default ProfileContent;
