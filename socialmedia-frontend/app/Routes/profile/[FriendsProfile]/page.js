"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentBarProfileFriend from "../../../components/ContentBarProfileFriend/ContentBarProfileFriend";
import FriendBio from "../../../friendBio/friendBio";
import FriendPost from "../../../friendPost/friendPost";
import "./style.css";

const FriendProfile = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Using Next.js built-in hook for query params

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      const userIdFromQuery = searchParams.get("userId");

      if (userIdFromQuery) {
        setProfileUserId(userIdFromQuery);
        if (userIdFromQuery === storedUserId) {
          router.push("/routes/profile/");
        }
      }
    }
  }, [router, searchParams]);

  if (!profileUserId) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <FriendBio profileId={profileUserId} />
        <ContentBarProfileFriend currentTab={0} />
        <FriendPost profileId={profileUserId} />
      </div>
    </div>
  );
};

export default FriendProfile;
