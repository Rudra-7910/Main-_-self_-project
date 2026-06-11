import api from "../api/axios";

// POST /auth/register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// POST /auth/login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// POST /auth/logout  (optional — if your backend supports it)
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
