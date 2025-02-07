"use client";

import React, { use } from 'react';
import { useEffect, useState, useContext } from 'react';

const like = async (userId, postId) => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch(`http://localhost:8080/api/${userId}/like/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('response like:', response);
  if (response.ok) {
    const data = await response.json();
    console.log('data like:', data);
    return data; // Return the JSON response
  } else {
    const errorData = await response.text();
    console.error('Error Liking post:', errorData);
    return null;
  }
};

export default like;