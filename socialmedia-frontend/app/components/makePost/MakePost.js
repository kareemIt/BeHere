import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import UserContext from '../../context/UserContext';
import './style.css';

const MakePost = ({ setPostMade, username }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const [content, setContent] = useState('');
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // **Query to check if the user has an active post**
  const { data: hasPost, isLoading: isCheckingPost, refetch: refetchPostStatus } = useQuery({
    queryKey: ['hasPost', userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/posts/active/${userId}`);
      if (!response.ok) throw new Error('Failed to check post status');
      const data = await response.json();
      return data.id != null; // Returns `true` if user has an active post
    },
    enabled: !!userId, // Only fetch when `userId` is available
    staleTime: 0, // Prevent stale data
    cacheTime: 0, // Prevent caching old posts
  });

  // **Query to fetch all active posts**
  const { data: posts = [], isLoading: isLoadingPosts, error, refetch: refetchPosts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/posts/allActivePosts/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
    enabled: !!userId,
    staleTime: 0,
    cacheTime: 0,
  });

  // **Mutation to create a new post**
  const { mutate: createPost, isLoading: isCreatingPost } = useMutation({
    mutationFn: async () => {
      if (!content.trim()) return; // Prevent empty posts
      const response = await fetchWithToken(`${BACKEND_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({ userId: userId, content: content }),
      });
      if (!response.ok) throw new Error('Error creating post');
      return response.json();
    },
    onSuccess: () => {
      setPostMade(true); // Notify parent component
      setContent(''); // Clear input field
      refetchPostStatus(); // Refresh post status
      refetchPosts(); // Refresh posts list
    },
    onError: (error) => {
      console.error('Post creation failed:', error);
    },
  });

  // **Show loading message while checking if user has an active post**
  if (isCheckingPost) return <div></div>;

  // **If user already has a post, don't show the form**
  if (hasPost) return null;

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
      <div className="charLimit">{255 - content.length} characters remaining</div>
      <button
        className="postButton"
        onClick={() => createPost()}
        disabled={isCreatingPost || !content.trim()}
      >
        {isCreatingPost ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default MakePost;
