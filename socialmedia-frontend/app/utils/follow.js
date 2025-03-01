"use client";

import React, { use } from 'react';
import { useEffect, useState, useContext } from 'react';

const follow = async (userId,followerId) => {
    const token = localStorage.getItem('jwtToken');

      const response = await fetch(`http://localhost:8080/api/${userId}/follow/${followerId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          return 200;
      } else {
          const errorData = await response.text();
          const data = await response.json();
          console.error('Error creating post:',data);
          console.error('Error creating post:', errorData);
          return 400;
      }
}
export default follow;