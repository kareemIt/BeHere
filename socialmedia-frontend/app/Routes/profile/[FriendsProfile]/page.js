"use client";

import React,{ useState, useEffect} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NavBar from '../../../component/navBar/NavBar';
import SideBar from '../../../component/sideBar/SideBar';
import ContentBarProfileFriend from '../../../component/ContentBarProfileFriend/ContentBarProfileFriend';
import FriendBio from '../../../friendBio/friendBio';
import FriendPost from '../../../friendPost/friendPost';
import { useRouter } from 'next/navigation';
import "./style.css";

const FriendProfile = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userid = localStorage.getItem('userId');
    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromQuery = searchParams.get('userId');
    setProfileUserId(userIdFromQuery);
    //route back to profi
    if(userIdFromQuery == userid){
      router.push('/routes/profile/')
    }
  }, []);



  return (
    <div>
      <NavBar />
      <div className="profileContainer">
        <SideBar />
        <div className="profileContent">
          <FriendBio profileId={profileUserId} />
          <ContentBarProfileFriend currentTab={0} />
          <FriendPost profileId={profileUserId} />
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;