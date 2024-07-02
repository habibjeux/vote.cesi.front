import { Student } from "./student.type";

export interface Otp {
  id: number;
  code: string;
  expiryDate: Date;
  student: Student;
}
