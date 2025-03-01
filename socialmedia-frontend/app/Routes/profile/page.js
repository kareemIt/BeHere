"use client";

import React, { Suspense } from 'react';
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
