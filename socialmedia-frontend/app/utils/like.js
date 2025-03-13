"use client";

const like = async (userId, postId, fetchWithToken) => {
  try {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetchWithToken(`${BACKEND_URL}/users/${userId}/like/${postId}`, {
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error liking post:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Like operation failed:', error);
    return null;
  }
};

export default like;