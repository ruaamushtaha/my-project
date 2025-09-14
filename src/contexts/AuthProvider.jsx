import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { endpoints, apiHelpers } from '../services/api';
import { queryKeys } from './QueryProvider';
import toast from 'react-hot-toast';

// Create auth context
const AuthContext = createContext({});

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Check if user has valid token
  const hasValidToken = () => {
    const token = localStorage.getItem('auth_token');
    const expiry = localStorage.getItem('token_expiry');
    
    if (!token || !expiry) return false;
    
    // Check if token is expired
    return new Date().getTime() < parseInt(expiry);
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      // Auto-login for development mode
      if (process.env.NODE_ENV === 'development' && !token) {
        const devToken = 'dev-token-123';
        const devUser = {
          id: 1,
          fullName: 'أحمد محمد السعد',
          email: 'ahmed.alsaad@email.com',
          phone: '+966501234567',
          address: 'الرياض، حي المروج',
          role: 'parent',
          avatar: null,
        };
        
        localStorage.setItem('auth_token', devToken);
        localStorage.setItem('user_data', JSON.stringify(devUser));
        localStorage.setItem('token_expiry', (new Date().getTime() + 24 * 60 * 60 * 1000).toString());
        
        console.log('🔧 Development mode: Auto-logged in as parent');
      }
      
      setIsInitialized(true);
    };

    initAuth();
  }, []);

  // Fetch user profile
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      if (!hasValidToken()) {
        throw new Error('No valid token');
      }
      
      // In development mode, return mock data
      if (process.env.NODE_ENV === 'development') {
        return {
          id: 1,
          fullName: 'أحمد محمد السعد',
          email: 'ahmed.alsaad@email.com',
          phone: '+966501234567',
          address: 'الرياض، حي المروج',
          region: 'الرياض',
          avatar: null,
          language: 'ar',
          notifications: {
            email: true,
            sms: false,
            inApp: true,
          },
          children: [
            { id: 1, name: 'محمد أحمد', grade: 'الصف الثالث الابتدائي', school: 'مدرسة الأمل' },
            { id: 2, name: 'سارة أحمد', grade: 'الصف الأول المتوسط', school: 'مدرسة النجاح' }
          ],
          settings: {
            theme: localStorage.getItem('theme') || 'light',
            language: 'ar',
            notifications: {
              email: true,
              sms: false,
              inApp: true,
            },
            privacy: {
              profileVisible: true,
              showOnlineStatus: true,
            },
          },
        };
      }
      
      const response = await apiHelpers.get(endpoints.profile);
      return response.data;
    },
    enabled: isInitialized && hasValidToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry profile fetch failures
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await apiHelpers.post(endpoints.login, {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Store auth data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      localStorage.setItem('token_expiry', (new Date().getTime() + data.expiresIn).toString());
      
      // Update query cache
      queryClient.setQueryData(queryKeys.profile, data.user);
      
      toast.success('تم تسجيل الدخول بنجاح');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'فشل في تسجيل الدخول');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await apiHelpers.post(endpoints.logout);
      } catch (error) {
        // Ignore logout API errors, still proceed with local logout
        console.warn('Logout API error:', error);
      }
    },
    onSettled: () => {
      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('token_expiry');
      
      // Clear query cache
      queryClient.clear();
      
      toast.success('تم تسجيل الخروج بنجاح');
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await apiHelpers.put(endpoints.updateProfile, profileData);
      return response.data;
    },
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.profile });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(queryKeys.profile);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKeys.profile, (old) => ({
        ...old,
        ...newData,
      }));

      return { previousProfile };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousProfile) {
        queryClient.setQueryData(queryKeys.profile, context.previousProfile);
      }
      toast.error(error.response?.data?.message || 'فشل في تحديث الملف الشخصي');
    },
    onSuccess: (data) => {
      toast.success('تم تحديث الملف الشخصي بنجاح');
      // Update local storage
      localStorage.setItem('user_data', JSON.stringify(data));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file) => {
      const response = await apiHelpers.upload(endpoints.uploadAvatar, file, (progress) => {
        console.log('Upload progress:', progress + '%');
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Update profile with new avatar
      queryClient.setQueryData(queryKeys.profile, (old) => ({
        ...old,
        avatar: data.avatarUrl,
      }));
      
      toast.success('تم تحديث الصورة الشخصية بنجاح');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'فشل في رفع الصورة');
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }) => {
      const response = await apiHelpers.put(endpoints.updatePassword, {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('تم تغيير كلمة المرور بنجاح');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'فشل في تغيير كلمة المرور');
    },
  });

  // Auth state calculations
  const isAuthenticated = Boolean(hasValidToken() && profile);
  const isLoading = !isInitialized || (hasValidToken() && isLoadingProfile);
  const user = profile;

  const authValue = {
    // State
    isAuthenticated,
    isLoading,
    isInitialized,
    user,
    profile,
    
    // Actions
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,
    refetchProfile,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    
    // Errors
    loginError: loginMutation.error,
    profileError,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
