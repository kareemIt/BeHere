"use client";

const follow = async (userId, followerId, fetchWithToken) => {
  try {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetchWithToken(`${BACKEND_URL}/${userId}/follow/${followerId}`, {
      method: 'POST'
    });

    if (response.ok) {
      return 200;
    } else {
      console.error('Follow operation failed');
      return 400;
    }
  } catch (error) {
    console.error('Follow operation failed');
    return 400;
  }
};

export default follow;