import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  price: number;
  max_students: number;
  start_date: string;
  end_date: string;
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
  enrolled_students_count?: number;
}

interface ProgramFilters {
  language_id?: string;
  difficulty_level?: string;
  search?: string;
  page?: number;
}

const fetchPrograms = async (filters?: ProgramFilters): Promise<Program[]> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }
  
  const response = await api.get(`/programs?${params.toString()}`);
  return response.data.data || [];
};

export const usePrograms = (filters?: ProgramFilters) => {
  return useQuery({
    queryKey: ['programs', filters],
    queryFn: () => fetchPrograms(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};