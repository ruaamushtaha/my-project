// =============================================================================
// Services Barrel Export
// تصدير مركزي للخدمات
// =============================================================================

export * as authService from './auth/authService';
export * as profileService from './profile/profileService';
export * as schoolsService from './schools/schoolsService';
export * as complaintsService from './complaints/complaintsService';
export * as notificationsService from './notifications/notificationsService';

// Legacy exports for backward compatibility
export { default as api } from './api';
// =============================================================================
// Unified Authentication Context
// سياق المصادقة الموحد
// =============================================================================

import React, { createContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import * as authService from '../services/auth/authService';
import { AUTH_CONFIG } from '../constants';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
      const user = localStorage.getItem(AUTH_CONFIG.USER_KEY);

      // Auto-login for development mode
      if (process.env.NODE_ENV === 'development' && !token) {
        const devToken = 'dev-token-123';
        const devUser = {
          id: 1,
          fullName: 'أحمد محمد السعد',
          email: 'ahmed.alsaad@email.com',
          role: 'parent',
        };

        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, devToken);
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(devUser));

        console.log('🔧 Development: Auto-logged in as parent');
      }

      setIsInitialized(true);
    };

    initAuth();
  }, []);

  // Check token validity
  const hasValidToken = () => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    return !!token;
  };

  // Get current user from localStorage
  const getCurrentUser = () => {
    const userData = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  };

  // Fetch user profile
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.fetchProfile,
    enabled: hasValidToken(),
    staleTime: 5 * 60 * 1000,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(data.user));
      queryClient.invalidateQueries(['profile']);
      toast.success('تم تسجيل الدخول بنجاح');
    },
    onError: (error) => {
      toast.error(error.message || 'فشل تسجيل الدخول');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
      queryClient.clear();
      toast.success('تم تسجيل الخروج بنجاح');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(data.user));
      toast.success('تم التسجيل بنجاح');
    },
    onError: (error) => {
      toast.error(error.message || 'فشل التسجيل');
    },
  });

  const value = {
    // State
    user: profile || getCurrentUser(),
    isAuthenticated: hasValidToken(),
    isLoading: !isInitialized || isLoadingProfile,
    error: profileError,

    // Actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    register: registerMutation.mutate,
    refetchProfile,

    // Utils
    hasValidToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

