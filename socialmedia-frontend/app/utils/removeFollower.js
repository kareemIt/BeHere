const removeFollower = async (userId, followerId, fetchWithToken) => {
    try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetchWithToken(
            `${BACKEND_URL}/${userId}/unfollow/${followerId}`,
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
