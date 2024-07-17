import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090";

export const createRole = async (title: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/roles`,
      { title },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getRoleById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateRole = async (id: number, title: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/roles/${id}`,
      { title },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteRole = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
