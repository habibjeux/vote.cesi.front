import axios from "axios";

const API_URL = "http://localhost:9090";

export const getCountStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/count`);
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
    const response = await axios.get(`${API_URL}/cesi/count`);
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
    const response = await axios.get(`${API_URL}/roles/count`);
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
    const response = await axios.get(`${API_URL}/api/classes/count`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
