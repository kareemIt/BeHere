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
    console.log("searchParams userId:", userIdFromQuery);

    console.log("profileUserId:", params);
    console.log("searchParams:", searchParams);
    console.log("router:", router.asPath);

    console.log("profileUserId:", String(profileUserId) === String(currentUserId));
    console.log("profileUserId:", String(profileUserId));
    console.log("currentUserId:", String(currentUserId));
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
