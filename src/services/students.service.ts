import axios from "axios";
import { Student } from "../types/student.type";
const API_URL = "http://localhost:9090";

export const getStudentById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const addStudent = async (student: Student) => {
  try {
    const response = await axios.post(`${API_URL}/student`, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const addStudents = async (students: Student[]) => {
  try {
    const response = await axios.post(`${API_URL}/student/bulk`, students);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/student`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getStudent = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateStudent = async (id: number, student: Student) => {
  try {
    const response = await axios.put(`${API_URL}/student/${id}`, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
