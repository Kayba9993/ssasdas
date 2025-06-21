import { apiService, ApiResponse } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Language {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  programs?: any[];
  programs_count?: number;
}

class LanguageService {
  async getLanguages(): Promise<ApiResponse<Language[]>> {
    return apiService.get<Language[]>(API_ENDPOINTS.languages.list);
  }

  async getLanguage(id: string): Promise<ApiResponse<Language>> {
    return apiService.get<Language>(API_ENDPOINTS.languages.show(id));
  }
}

export const languageService = new LanguageService();