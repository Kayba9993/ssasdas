import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminLogin, loginUser, logoutUser, getCurrentUser } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Admin login mutation
  const adminLoginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (response) => {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin')
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم"
      });
      
      navigate('/admin');
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.response?.data?.message || "بيانات الدخول غير صحيحة",
        variant: "destructive"
      });
    }
  });

  // User login mutation
  const userLoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك"
      });
      
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.response?.data?.message || "بيانات الدخول غير صحيحة",
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
      navigate('/');
    }
  });

  // Get current user query
  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('auth_token'),
    retry: false
  });

  return {
    adminLogin: adminLoginMutation.mutate,
    isAdminLoginLoading: adminLoginMutation.isPending,
    userLogin: userLoginMutation.mutate,
    isUserLoginLoading: userLoginMutation.isPending,
    logout: logoutMutation.mutate,
    currentUser: currentUser?.data,
    isUserLoading
  };
};