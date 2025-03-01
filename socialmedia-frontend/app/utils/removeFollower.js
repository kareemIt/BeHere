const removeFollower = async (userId,followerId) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:8080/api/${userId}/unfollow/${followerId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        return response.status;
    } else {
        console.log("userId wasnt unfollowed", userId);
    }
};
export default removeFollower;