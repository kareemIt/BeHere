"use client";

import React, { use } from 'react';
import { useEffect, useState, useContext } from 'react';

const like = async () =>{
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:8080/api/{postId}llike', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, content: content }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
    } else {
        const errorData = await response.text();
        console.error('Error creating post:', errorData);
    }
}
export default like;