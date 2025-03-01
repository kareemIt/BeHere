"use client";

import React, { useEffect, useState, useContext } from 'react';
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
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromQuery = searchParams.get('userId');
    setProfileUserId(userIdFromQuery);
  }, [searchParams]);


  if (profileUserId && String(profileUserId) === String(currentUserId)) {
    return <UserProfile />;
  } else if (profileUserId) {
    return <FriendProfile />;
  } else {

    return <UserProfile />;
  }
};

export default ProfilePage;
