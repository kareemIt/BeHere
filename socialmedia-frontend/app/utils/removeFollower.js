const removeFollower = async (userId, followerId, fetchWithToken) => {
    try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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
            console.error(`Failed to unfollow user`);
            return null; // Indicate failure
        }

        return response.status; // Return status for success handling
    } catch (error) {
        console.error("Error removing follower");
        return null; // Indicate failure
    }
};

export default removeFollower;
