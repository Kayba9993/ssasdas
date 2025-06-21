import { apiService, ApiResponse } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface StudentDashboardData {
  stats: {
    enrolled_courses: number;
    completed_sessions: number;
    quiz_results: number;
    average_progress: number;
  };
  enrollments: any[];
  upcoming_sessions: any[];
  recent_quizzes: any[];
}

export interface TeacherDashboardData {
  stats: {
    active_courses: number;
    total_students: number;
    scheduled_sessions: number;
    total_programs: number;
  };
  programs: any[];
  upcoming_sessions: any[];
}

export interface AdminDashboardData {
  stats: {
    total_users: number;
    total_students: number;
    total_teachers: number;
    active_programs: number;
    total_enrollments: number;
    pending_verifications: number;
  };
  recent_users: any[];
  recent_enrollments: any[];
}

class DashboardService {
  async getStudentDashboard(): Promise<ApiResponse<StudentDashboardData>> {
    return apiService.get<StudentDashboardData>(API_ENDPOINTS.dashboard.student);
  }

  async getTeacherDashboard(): Promise<ApiResponse<TeacherDashboardData>> {
    return apiService.get<TeacherDashboardData>(API_ENDPOINTS.dashboard.teacher);
  }

  async getAdminDashboard(): Promise<ApiResponse<AdminDashboardData>> {
    return apiService.get<AdminDashboardData>(API_ENDPOINTS.dashboard.admin);
  }
}

export const dashboardService = new DashboardService();