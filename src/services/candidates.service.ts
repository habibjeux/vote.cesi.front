import axios from "axios";
import { Candidate } from "../types/candidates.type";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090";

export const getCandidateById = async (id: number): Promise<Candidate> => {
  try {
    const response = await axios.get(`${API_URL}/cesi/${id}`, {
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

export const getCandidates = async (): Promise<Candidate[]> => {
  try {
    const response = await axios.get(`${API_URL}/cesi`, {
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

export const changeStatus = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/cesi/changeStatus/${id}`, {
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
