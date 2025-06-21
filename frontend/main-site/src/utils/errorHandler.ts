import { ApiError } from '../services/api';

export const getErrorMessage = (error: ApiError | Error | unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const apiError = error as ApiError;
    return apiError.message || 'An unexpected error occurred';
  }
  
  return 'An unexpected error occurred';
};

export const getValidationErrors = (error: ApiError): Record<string, string[]> | null => {
  return error.errors || null;
};

export const isNetworkError = (error: ApiError): boolean => {
  return error.status === 0 || error.message.includes('Network error');
};

export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401 || error.status === 403;
};

export const handleApiError = (error: ApiError, showToast?: (message: string) => void) => {
  if (isNetworkError(error)) {
    const message = 'Network error. Please check your internet connection.';
    if (showToast) showToast(message);
    return message;
  }
  
  if (isAuthError(error)) {
    const message = 'Authentication required. Please log in again.';
    if (showToast) showToast(message);
    return message;
  }
  
  const message = getErrorMessage(error);
  if (showToast) showToast(message);
  return message;
};