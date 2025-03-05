import {  jwt_decode } from "jwt-decode";

const checkTokenExpiration = () => {
    if (typeof window === "undefined") return false; // Ensure it runs only on the client side

    const token = localStorage.getItem("accessToken"); // Updated to use accessToken
    if (!token) return false;

    try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem("accessToken"); // Remove expired token
            return false;
        }
        return true;
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken"); // Remove if token is corrupted
        return false;
    }
};

export default checkTokenExpiration;
