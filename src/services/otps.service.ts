import axios from "axios";

const API_URL = "http://localhost:9090";

export const getOtpByStudent = async (studentId: number) => {
  try {
    const response = await axios.post(`${API_URL}/otp/generate/${studentId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
