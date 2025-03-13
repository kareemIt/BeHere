import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import './style.css';

const MakePost = ({ setPostMade, username }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [content, setContent] = useState("");
  const [hasPost, setHasPost] = useState(null); // Null means loading
  const [loading, setLoading] = useState(true); // To track loading state
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const makeAPost = async () => {
    if (!content) return;
    try {
      const response = await fetchWithToken(`${BACKEND_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({ userId: userId, content: content }),
      });

      if (response.ok) {
        const data = await response.json();
        setHasPost(true);
        setPostMade(true);
      } else {
        const errorData = await response.text();
        console.error('Error creating post:', errorData);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  useEffect(() => {
    const postCheck = async () => {
      try {
        const response = await fetchWithToken(`${BACKEND_URL}/posts/active/${userId}`);
        const data = await response.json();
        if (response.ok && data.id != null) {
          setHasPost(true);
        } else {
          setHasPost(false);
        }
      } catch (error) {
        console.error('Failed to check post status:', error);
        setHasPost(false);
      } finally {
        setLoading(false); // Finished loading
      }
    };

    if (userId) postCheck();
  }, [userId, fetchWithToken]);

  // Show a loading message or spinner while the check is in progress
  if (loading) return <div>Loading...</div>;

  if (hasPost) return null; // If user already has a post, don't show the form

  return (
    <div className="makePostContainer">
      <div className="makePostHeader">Hello, {username}!</div>
      <textarea
        type="text"
        className="postInput"
        maxLength={255}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
      />
      <div className="charLimit">
        {255 - content.length} characters remaining
      </div>
      <button className="postButton" onClick={makeAPost}>Post</button>
    </div>
  );
};

export default MakePost;
