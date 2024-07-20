"use client";

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';
import UserContext from '../../context/UserContext';
import NavBar from '../../component/navBar/NavBar';
import SideBar from '../../component/sideBar/SideBar';
import MakePost from '../../component/makePost/MakePost';
import ContentBar from '../../component/contentBar/ContentBar';
import ForYouPage from '../../component/FYP/ForYouPage';
import Trending from '../../component/trending/Trending';

const Home = () => {
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div>
      <NavBar />
      <ContentBar setCurrentTab={setCurrentTab} />
      <div className='homeContainer'>
        <SideBar />
        <div className='contentContainer'>
          {currentTab === 0 && <div> 
            <MakePost />
            <ForYouPage /> 
            </div>}
          {currentTab === 1 && <Trending />}
        </div>
      </div>
      <p>hello {userId}</p>

    </div>
  );
};

export default Home;
