"use client";

import React, { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../../context/UserContext";
import Post from "../post/post";
import "./style.css";

const ForYouPage = ({ postMade, setPostMade }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const queryClient = useQueryClient();

  // Fetch posts using React Query
  const { data: posts = [], isLoading, error, refetch } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/posts/allActivePosts/${userId}`);
      return response.json();
    },
    enabled: !!userId, // Ensure fetching happens only when userId is available
    staleTime: 0, // Prevent stale data
    cacheTime: 0, // Prevent caching of old posts
  });

  
  useEffect(() => {
    if (postMade) {
      queryClient.invalidateQueries(["posts", userId]); // Mark the query as stale and refetch
      refetch(); // Force fetch
      setPostMade(false); // Reset after fetching new posts
    }
  }, [postMade, queryClient, refetch, setPostMade, userId]);

  return (
    <div className="Posts">
      {isLoading && <p>Loading posts...</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            username={post.username}
            content={post.content}
            postid={post.id}
            remainingHours={post.remainingHours}
            userId={post.userId}
            isfollowing={post.followed}
            likes={post.likeCount}
            liked={post.liked}
            expiration={post.expirationTime}
          />
        ))
      ) : (
        
        isLoading == false && <p>No posts available</p>
      )}
    </div>
  );
};

export default ForYouPage;
