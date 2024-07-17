import axios from "axios";
import { AdminCredentials, LoginCredentials } from "../types/auth.type";

const API_URL = "http://localhost:9090";
export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${API_URL}/student/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginAdmin = async (credentials: AdminCredentials) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  localStorage.removeItem("user");
};

export const saveUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
