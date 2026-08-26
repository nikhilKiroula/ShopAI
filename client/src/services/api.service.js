import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://shopai-h4bb.onrender.com",
        withCredentials: true,
    }
);

export default api; 