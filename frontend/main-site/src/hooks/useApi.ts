import { useState, useEffect } from 'react';
import { ApiResponse, ApiError } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = { immediate: true }
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      setState({
        data: response.data || null,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
      throw error;
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

export function useAsyncApi<T, P extends any[]>(
  apiCall: (...params: P) => Promise<ApiResponse<T>>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (...params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall(...params);
      setState({
        data: response.data || null,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
      throw error;
    }
  };

  return {
    ...state,
    execute,
  };
}