import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, loginUser, adminLogin, logoutUser, updateProfile } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: getCurrentUser,
    retry: false,
    enabled: !!localStorage.getItem('auth_token'),
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      queryClient.setQueryData(['auth', 'user'], data);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.response?.data?.message || "بريد إلكتروني أو كلمة مرور غير صحيحة",
        variant: "destructive"
      });
    }
  });

  // Admin login mutation
  const adminLoginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('adminAuthenticated', 'true');
      queryClient.setQueryData(['auth', 'user'], data);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });
      navigate('/admin');
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.response?.data?.message || "بريد إلكتروني أو كلمة مرور غير صحيحة",
        variant: "destructive"
      });
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminAuthenticated');
      queryClient.clear();
      toast({
        title: "تم تسجيل الخروج بنجاح"
      });
      navigate('/');
    },
    onError: () => {
      // Even if logout fails on server, clear local data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminAuthenticated');
      queryClient.clear();
      navigate('/');
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'user'], data);
      localStorage.setItem('user', JSON.stringify(data.data));
      toast({
        title: "تم تحديث الملف الشخصي بنجاح"
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث الملف الشخصي",
        description: error.response?.data?.message || "حدث خطأ أثناء التحديث",
        variant: "destructive"
      });
    }
  });

  const isAuthenticated = !!localStorage.getItem('auth_token');
  const isAdmin = user?.data?.role === 'admin';
  const isTeacher = user?.data?.role === 'teacher';
  const isStudent = user?.data?.role === 'student';

  return {
    user: user?.data,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isTeacher,
    isStudent,
    login: loginMutation.mutate,
    adminLogin: adminLoginMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isAdminLoginLoading: adminLoginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isUpdateProfileLoading: updateProfileMutation.isPending,
  };
};