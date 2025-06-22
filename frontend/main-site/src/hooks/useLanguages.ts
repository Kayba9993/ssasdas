import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';

export interface Language {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  is_active: boolean;
  programs_count?: number;
}

const fetchLanguages = async (): Promise<Language[]> => {
  const response = await api.get('/languages');
  return response.data.data || [];
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};