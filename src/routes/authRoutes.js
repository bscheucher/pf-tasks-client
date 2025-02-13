import API from "../services/api";

export const registerUser = (userData) => API.post("/auth/register", userData);
export const getUserById = (userId) => API.get(`/auth/${userId}`);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const updateUser = (userId, newUserData) =>
  API.put(`auth/${userId}/update`, newUserData);
