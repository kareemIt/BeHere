"use client";

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./style.css";
import UserContext from "../../context/UserContext";
import Post from "../post/post";

const Trending = ({ setPostMade }) => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // **Fetch trending posts using React Query**
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["trendingPosts", userId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/trending/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch trending posts");
      return response.json();
    },
    enabled: !!userId, // Only fetch when userId is available
    staleTime: 0, // Ensures fresh data
    cacheTime: 0, // Prevents caching old results
    onSuccess: () => setPostMade(true), // Update parent state when posts load
  });

  if (isLoading) return <div>Loading trending posts...</div>;
  if (error) return <div>Error loading trending posts.</div>;

  return (
    <div className="Posts">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
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
        <div>No trending posts available.</div>
      )}
    </div>
  );
};

export default Trending;
