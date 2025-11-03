// =============================================================================
// Authentication Service - Modular
// خدمة المصادقة - معيارية
// =============================================================================

import api from '../../api/axios';

/**
 * Login user
 * تسجيل دخول المستخدم
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * Register new user
 * تسجيل مستخدم جديد
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Logout user
 * تسجيل خروج المستخدم
 */
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Request password reset
 * طلب إعادة تعيين كلمة المرور
 */
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Reset password with token
 * إعادة تعيين كلمة المرور باستخدام الرمز
 */
export const resetPassword = async (token, newPassword) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password: newPassword,
  });
  return response.data;
};

/**
 * Verify email
 * التحقق من البريد الإلكتروني
 */
export const verifyEmail = async (token) => {
  const response = await api.post(`/auth/verify-email/${token}`);
  return response.data;
};

/**
 * Fetch current user profile
 * جلب الملف الشخصي للمستخدم الحالي
 */
export const fetchProfile = async () => {
  // Development mode mock
  if (process.env.NODE_ENV === 'development') {
    return {
      id: 1,
      fullName: 'أحمد محمد السعد',
      email: 'ahmed.alsaad@email.com',
      phone: '+966501234567',
      role: 'parent',
      avatar: null,
    };
  }

  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Refresh token
 * تحديث الرمز
 */
export const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

/**
 * Change password
 * تغيير كلمة المرور
 */
export const changePassword = async (oldPassword, newPassword) => {
  const response = await api.post('/auth/change-password', {
    oldPassword,
    newPassword,
  });
  return response.data;
};

export default {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  fetchProfile,
  refreshToken,
  changePassword,
};
