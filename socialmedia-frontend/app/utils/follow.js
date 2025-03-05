"use client";

const follow = async (userId, followerId, fetchWithToken) => {
  try {
    const response = await fetchWithToken(`http://localhost:8080/api/${userId}/follow/${followerId}`, {
      method: 'POST'
    });

    if (response.ok) {
      return 200;
    } else {
      const errorData = await response.text();
      console.error('Follow operation failed:', errorData);
      return 400;
    }
  } catch (error) {
    console.error('Follow operation failed:', error);
    return 400;
  }
};

export default follow;