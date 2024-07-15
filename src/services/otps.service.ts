import axios from "axios";
import { Student } from "../types/student.type";

const API_URL = "http://localhost:9090";

export const getOtpByStudent = async (student: Student) => {
  try {
    const response = await axios.post(`${API_URL}/otp/generate`, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
