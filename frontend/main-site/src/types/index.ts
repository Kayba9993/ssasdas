export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  enrolledCourses?: string[];
  paymentStatus?: 'pending' | 'verified' | 'rejected';
}

export interface Course {
  id: string;
  title: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  teacher: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  students: number;
}

export interface LiveSession {
  id: string;
  title: string;
  courseId: string;
  teacher: string;
  dateTime: string;
  platform: 'meet' | 'teams';
  joinUrl: string;
  description: string;
  language: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  completedAt: string;
  answers: number[];
}

export interface PaymentInfo {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  bank: 'cih' | 'barid';
  proofImage: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
}

export type Theme = 'light' | 'dark';