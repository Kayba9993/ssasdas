import { apiService, ApiResponse } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Enrollment {
  id: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'suspended';
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  student?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  program?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty_level: string;
    duration_weeks: number;
    price: number;
    language?: {
      id: string;
      name: string;
      slug: string;
    };
    teacher?: {
      id: string;
      name: string;
      email: string;
    };
  };
}

class EnrollmentService {
  async getEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    return apiService.get<Enrollment[]>(API_ENDPOINTS.enrollments.list);
  }

  async enrollInProgram(programId: string): Promise<ApiResponse<Enrollment>> {
    return apiService.post<Enrollment>(API_ENDPOINTS.enrollments.create(programId));
  }

  async getEnrollment(id: string): Promise<ApiResponse<Enrollment>> {
    return apiService.get<Enrollment>(API_ENDPOINTS.enrollments.show(id));
  }

  async updateEnrollment(id: string, data: { progress_percentage?: number }): Promise<ApiResponse<Enrollment>> {
    return apiService.put<Enrollment>(API_ENDPOINTS.enrollments.update(id), data);
  }

  async getTeacherEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    return apiService.get<Enrollment[]>(API_ENDPOINTS.enrollments.teacher);
  }
}

export const enrollmentService = new EnrollmentService();