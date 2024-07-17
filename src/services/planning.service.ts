import axios from "axios";
import { Planning } from "../types/planning.type";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090";

export const getPlanning = async (): Promise<Planning> => {
  try {
    const response = await axios.get<Planning>(`${API_URL}/planning`, {
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

export const createPlanning = async (
  startDate: Date,
  endDate: Date
): Promise<Planning> => {
  try {
    const planning: Planning = {
      id: 0,
      startDate,
      endDate,
    };
    const response = await axios.post<Planning>(
      `${API_URL}/planning`,
      planning,
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

export const updatePlanning = async (
  startDate: Date,
  endDate: Date
): Promise<Planning> => {
  try {
    const planning: Planning = {
      id: 0,
      startDate,
      endDate,
    };
    const response = await axios.put<Planning>(
      `${API_URL}/planning`,
      planning,
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
