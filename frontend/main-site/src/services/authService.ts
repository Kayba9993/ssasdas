import { apiService, ApiResponse } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'student' | 'teacher';
  student_id?: string;
  employee_id?: string;
  department?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  student?: {
    id: string;
    student_id: string;
    level: string;
    bio?: string;
    phone?: string;
    skills?: string[];
  };
  teacher?: {
    id: string;
    employee_id: string;
    department: string;
    bio?: string;
    specializations?: string[];
    years_experience: number;
    qualification?: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials);
    
    if (response.data?.token) {
      apiService.setToken(response.data.token);
    }
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.auth.register, userData);
    
    if (response.data?.token) {
      apiService.setToken(response.data.token);
    }
    
    return response;
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await apiService.post(API_ENDPOINTS.auth.logout);
      apiService.setToken(null);
      return response;
    } catch (error) {
      // Even if logout fails on server, clear local token
      apiService.setToken(null);
      throw error;
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>(API_ENDPOINTS.auth.user);
  }

  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>(API_ENDPOINTS.auth.updateProfile, profileData);
  }

  isAuthenticated(): boolean {
    return !!apiService.getToken();
  }

  getToken(): string | null {
    return apiService.getToken();
  }
}

export const authService = new AuthService();