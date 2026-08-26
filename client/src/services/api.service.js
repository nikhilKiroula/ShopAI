import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://shopai-h4bb.onrender.com/api",
        withCredentials: true,
    }
);

export default api; 