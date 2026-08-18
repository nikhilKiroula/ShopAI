import api from "./api.service.js";

const loginUser = async (data) => {
    const response = await api.post("/auth/login", data);

    return response.data;
};

const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);

    return response.data;
};

const getProfile = async () => {
    const response = await api.get("/auth/profile");

    return response.data;
};

const logoutUser = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};

export {
    loginUser,
    registerUser,
    logoutUser,
    getProfile
}
