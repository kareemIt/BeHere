// pages/index.js
"use client";

import React from 'react';
import { useRouter } from "next/navigation";

const Home = () => {

  const router = useRouter();
  router.push('/routes/login');

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default Home;
