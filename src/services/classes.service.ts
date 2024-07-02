import axios from "axios";

const API_URL = "http://localhost:9090";

export const createClass = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/classes`, { name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getClassById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/classes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateClass = async (id: number, name: string) => {
  try {
    const response = await axios.put(`${API_URL}/api/classes/${id}`, { name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteClass = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/api/classes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/classes`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
