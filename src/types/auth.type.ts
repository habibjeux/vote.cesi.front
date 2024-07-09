import { Student } from "./student.type";

export interface LoginCredentials {
  nce: string;
  email: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Student;
}
