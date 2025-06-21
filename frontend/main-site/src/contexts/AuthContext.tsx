import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '../services/authService';
import { ApiError } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: ApiError | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data || null);
        } catch (error) {
          console.error('Failed to get current user:', error);
          authService.logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ email, password });
      setUser(response.data?.user || null);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      setUser(response.data?.user || null);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response.data || null);
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user && authService.isAuthenticated();

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated,
      loading,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
};