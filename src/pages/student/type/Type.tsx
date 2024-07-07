
export interface Candidate {
    id: number;
    student: Student;
    role: Role;
    photoURL: string;
    program: string;
    isRetained: boolean;
    votes: Vote[];
  }
  
  export interface Class {
    id: number;
    name: string;
  }
  
  export interface Role {
    id: number;
    title: string;
  }
  
  export interface Student {
    id: number;
    nce: string;
    firstName: string;
    lastName: string;
    email: string;
    class_id: Class;
    votes: Vote[];
  }
  
  export interface Vote {
    id: number;
    student: Student;
    candidate: Candidate;
    voteDate: string;
  }
  export interface VoteResult {
    candidateId: number;
    candidate: Candidate;
    voteCount: number;
  }

  export interface ApiResponse {
    message: string;
    status: "success";
  }
  export interface OutletContext {
    student: Student;
  }

  export interface CandidateResponse {
    message: string;
    status: string;
  }