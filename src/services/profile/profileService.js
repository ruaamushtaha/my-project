// =============================================================================
// Profile Service - Modular
// خدمة الملف الشخصي - معيارية
// =============================================================================

import api from '../api/axios';

/**
 * Get user profile
 * الحصول على الملف الشخصي
 */
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

/**
 * Update user profile
 * تحديث الملف الشخصي
 */
export const updateProfile = async (data) => {
  const response = await api.put('/profile', data);
  return response.data;
};

/**
 * Upload avatar
 * رفع الصورة الشخصية
 */
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await api.post('/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete avatar
 * حذف الصورة الشخصية
 */
export const deleteAvatar = async () => {
  const response = await api.delete('/profile/avatar');
  return response.data;
};

/**
 * Update preferences
 * تحديث التفضيلات
 */
export const updatePreferences = async (preferences) => {
  const response = await api.put('/profile/preferences', preferences);
  return response.data;
};

/**
 * Get notification settings
 * الحصول على إعدادات الإشعارات
 */
export const getNotificationSettings = async () => {
  const response = await api.get('/profile/notifications');
  return response.data;
};

/**
 * Update notification settings
 * تحديث إعدادات الإشعارات
 */
export const updateNotificationSettings = async (settings) => {
  const response = await api.put('/profile/notifications', settings);
  return response.data;
};

export default {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  updatePreferences,
  getNotificationSettings,
  updateNotificationSettings,
};

