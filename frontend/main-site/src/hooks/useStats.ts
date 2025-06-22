import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';

export interface PlatformStats {
  total_students: number;
  total_teachers: number;
  active_programs: number;
  total_languages: number;
  certificates_issued: number;
  success_rate: number;
}

const fetchStats = async (): Promise<PlatformStats> => {
  try {
    const response = await api.get('/stats');
    return response.data.data;
  } catch (error) {
    // Return fallback data if API is not available
    return {
      total_students: 2456,
      total_teachers: 45,
      active_programs: 120,
      total_languages: 12,
      certificates_issued: 1890,
      success_rate: 95,
    };
  }
};

export const useStats = () => {
  return useQuery({
    queryKey: ['platform-stats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};