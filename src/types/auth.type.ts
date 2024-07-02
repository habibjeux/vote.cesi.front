import { Student } from "./student.type";

export interface LoginCredentials {
  nce: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: Student;
}
