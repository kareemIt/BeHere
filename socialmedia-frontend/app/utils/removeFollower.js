const removeFollower = async (userId, followerId, fetchWithToken) => {
    try {
        const response = await fetchWithToken(
            `http://localhost:8080/api/${userId}/unfollow/${followerId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error(`Failed to unfollow user ${followerId}`, response.status);
            return null; // Indicate failure
        }

        return response.status; // Return status for success handling
    } catch (error) {
        console.error("Error removing follower:", error);
        return null; // Indicate failure
    }
};

export default removeFollower;
