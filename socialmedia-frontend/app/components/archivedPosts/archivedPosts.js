"use client";

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./style.css";
import UserContext from "../../context/UserContext";
import Post from "../post/post";

const fetchArchivedPosts = async ({ queryKey }) => {
  const [, userId, fetchWithToken, BACKEND_URL] = queryKey;
  const response = await fetchWithToken(`${BACKEND_URL}/posts/archived/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
};

const ArchivedPosts = () => {
  const { fetchWithToken } = useContext(UserContext);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["archivedPosts", userId, fetchWithToken, BACKEND_URL],
    queryFn: fetchArchivedPosts,
    enabled: !!userId, // Only fetch if userId exists
  });

  if (isLoading) return <p>Loading archived posts...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="Posts">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            content={post.content}
            postid={post.id}
            expirationTime={post.expirationTime}
            remainingHours={post.remainingHours}
            userId={post.userId}
            isfollowing={post.followed}
            likes={post.likeCount}
            liked={post.liked}
            expiration={post.expirationTime}
          />
        ))
      ) : (
        <p>No archived posts found.</p>
      )}
    </div>
  );
};

export default ArchivedPosts;
