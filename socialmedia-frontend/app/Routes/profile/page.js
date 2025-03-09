"use client";

import React, { useContext, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import UserContext from "../../context/UserContext";
import UserProfile from "./UserProfile";

const FriendProfile = dynamic(() => import("./[FriendsProfile]/page"), {
  ssr: false,
});

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
};

const ProfileContent = () => {
  const searchParams = useSearchParams();
  const profileUserId = searchParams.get("userId");

  const { userId: currentUserId } = useContext(UserContext);

  return (
    <>
      {profileUserId && String(profileUserId) === String(currentUserId) ? (
        <UserProfile />
      ) : profileUserId ? (
        <FriendProfile />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default ProfilePage;
