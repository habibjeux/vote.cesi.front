import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090";

export const getCountStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/count`, {
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

export const getCountCandidate = async () => {
  try {
    const response = await axios.get(`${API_URL}/cesi/count`, {
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

export const getCountRole = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles/count`, {
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

export const getCountClass = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/classes/count`, {
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
