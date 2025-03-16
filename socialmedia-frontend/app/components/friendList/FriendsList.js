"use client";

import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../../context/UserContext";
import removeFollower from "../../utils/removeFollower";
import "./style.css";
import Link from "next/link";

const FriendsList = () => {
  const { userId, fetchWithToken } = useContext(UserContext);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const queryClient = useQueryClient();

  
  const { data: followingList, isLoading, error } = useQuery({
    queryKey: ["followingList", userId],
    queryFn: async () => {
      const response = await fetchWithToken(
        `${BACKEND_URL}/${userId}/followingList`
      );
      return response.json();
    },
    enabled: !!userId, // Only run query if userId exists
    staleTime: 60000, // Cache for 60 seconds
  });

  const removeFollowerMutation = useMutation({
    mutationFn: async (friendId) => {
      const response = await removeFollower(userId, friendId, fetchWithToken);
      if (response !== 200) throw new Error("Failed to remove follower");
      return friendId;
    },
    onMutate: async (friendId) => {
      // Optimistically update UI before API call
      await queryClient.cancelQueries(["followingList", userId]);
      const previousList = queryClient.getQueryData(["followingList", userId]);

      queryClient.setQueryData(["followingList", userId], (prev) =>
        prev ? prev.filter((friend) => friend.id !== friendId) : []
      );

      return { previousList };
    },
    onError: (err, friendId, context) => {
      console.error("Error removing follower:", err);
      // Rollback UI update on error
      queryClient.setQueryData(["followingList", userId], context.previousList);
    },
    onSettled: () => {
      // Refetch data after mutation completes
      queryClient.invalidateQueries(["followingList", userId]);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching following list</p>;

  return (
    <div className="friendsList">
      <h2>Following</h2>
      {followingList && followingList.length > 0 ? (
        followingList.map((friend) => (
          <div key={friend.id} className="friendItem">
            <Link href={`/${friend.username}?userId=${friend.id}`}>
              <h3 className="friendName">{friend.username}</h3>
            </Link>
            <button
              className="remove"
              onClick={() => removeFollowerMutation.mutate(friend.id)}
            >
              {removeFollowerMutation.isLoading ? "Removing..." : "Remove"}
            </button>
          </div>
        ))
      ) : (
        <p>No followers found</p>
      )}
    </div>
  );
};

export default FriendsList;
