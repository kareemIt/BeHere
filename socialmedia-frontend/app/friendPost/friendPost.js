"use client";

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./style.css";
import Post from "../components/post/post"; // Corrected import path
import UserContext from "../context/UserContext";

const FriendPost = ({ profileId }) => {
  const { fetchWithToken } = useContext(UserContext);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["friendPosts", userId, profileId],
    queryFn: async () => {
      const response = await fetchWithToken(`${BACKEND_URL}/posts/${userId}/friend/${profileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch friend's post");

      const text = await response.text();
      if (!text) return []; // Handle empty response

      const data = JSON.parse(text);
      return data.id != null ? [data] : []; // Ensure proper structure
    },
    enabled: !!userId && !!profileId, // Only fetch when both userId & profileId exist
    staleTime: 0, // Prevents stale data
    cacheTime: 0, // Ensures fresh data
  });

  if (isLoading) return <div>Loading friend's post...</div>;
  if (error) return <div>Error loading friend's post.</div>;

  return (
    <div className="Posts">
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
        <p className="no-post">The user hasn't made a post today yet!</p>
      )}
    </div>
  );
};

export default FriendPost;
