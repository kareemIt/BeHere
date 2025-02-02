const API_BASE_URL = "http://localhost:8080/api"; // Your backend URL

export const apiClient = async (endpoint, method = "GET", body = null, auth = false) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (auth) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};
