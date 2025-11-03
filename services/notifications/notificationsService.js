// =============================================================================
// Notifications Service - Modular
// خدمة الإشعارات - معيارية
// =============================================================================

import api from '../api/axios';

/**
 * Get all notifications
 * الحصول على جميع الإشعارات
 */
export const getNotifications = async (filters = {}) => {
  const response = await api.get('/notifications', { params: filters });
  return response.data;
};

/**
 * Get unread notifications count
 * الحصول على عدد الإشعارات غير المقروءة
 */
export const getUnreadCount = async () => {
  const response = await api.get('/notifications/unread/count');
  return response.data;
};

/**
 * Mark notification as read
 * تحديد الإشعار كمقروء
 */
export const markAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

/**
 * Mark all as read
 * تحديد الكل كمقروء
 */
export const markAllAsRead = async () => {
  const response = await api.patch('/notifications/read-all');
  return response.data;
};

/**
 * Delete notification
 * حذف الإشعار
 */
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

/**
 * Clear all notifications
 * مسح جميع الإشعارات
 */
export const clearAll = async () => {
  const response = await api.delete('/notifications');
  return response.data;
};

/**
 * Get notification preferences
 * الحصول على تفضيلات الإشعارات
 */
export const getPreferences = async () => {
  const response = await api.get('/notifications/preferences');
  return response.data;
};

/**
 * Update notification preferences
 * تحديث تفضيلات الإشعارات
 */
export const updatePreferences = async (preferences) => {
  const response = await api.put('/notifications/preferences', preferences);
  return response.data;
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
  getPreferences,
  updatePreferences,
};

