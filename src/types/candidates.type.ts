import { Role } from "./roles.type";
import { Student } from "./student.type";

export interface Candidate {
  id: number;
  student: Student;
  role: Role;
  photoURL: string;
  program: string;
  isRetained: boolean;
}
