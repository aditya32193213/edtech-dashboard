
import api from "../services/api";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

export const updateProfile = async (name) => {
  if (!name) throw new Error("Name is required");

  const res = await api.put("/auth/me", { name });

  if (res.data) {
    // FIX: Get current data first
    const existingUser = getUser(); 
    
    // FIX: Merge existing data (like role) with new data
    const updatedUser = { ...existingUser, ...res.data }; 

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  return res.data;
};