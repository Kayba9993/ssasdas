import { apiService, ApiResponse } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  curriculum?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  price: number;
  thumbnail?: string;
  requirements?: string[];
  outcomes?: string[];
  max_students: number;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  language?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    difficulty_level: string;
    is_active: boolean;
  };
  teacher?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  enrollments?: any[];
  live_sessions?: any[];
  quizzes?: any[];
  enrolled_students_count?: number;
  is_enrolled?: boolean;
}

export interface ProgramFilters {
  language_id?: string;
  difficulty_level?: string;
  search?: string;
  teacher_id?: string;
  page?: number;
  per_page?: number;
}

export interface CreateProgramRequest {
  title: string;
  description: string;
  language_id: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  price: number;
  requirements?: string[];
  outcomes?: string[];
  max_students: number;
  start_date: string;
  end_date: string;
}

class ProgramService {
  async getPrograms(filters?: ProgramFilters): Promise<ApiResponse<Program[]>> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `${API_ENDPOINTS.programs.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get<Program[]>(endpoint);
  }

  async getProgram(id: string): Promise<ApiResponse<Program>> {
    return apiService.get<Program>(API_ENDPOINTS.programs.show(id));
  }

  async createProgram(programData: CreateProgramRequest): Promise<ApiResponse<Program>> {
    return apiService.post<Program>(API_ENDPOINTS.programs.create, programData);
  }

  async updateProgram(id: string, programData: Partial<CreateProgramRequest>): Promise<ApiResponse<Program>> {
    return apiService.put<Program>(API_ENDPOINTS.programs.update(id), programData);
  }

  async deleteProgram(id: string): Promise<ApiResponse> {
    return apiService.delete(API_ENDPOINTS.programs.delete(id));
  }
}

export const programService = new ProgramService();