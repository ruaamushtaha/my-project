// =============================================================================
// Schools Service - Modular
// خدمة المدارس - معيارية
// =============================================================================

import api from '../api/axios';

/**
 * Get all schools with filters
 * الحصول على جميع المدارس مع الفلاتر
 */
export const getSchools = async (filters = {}) => {
  const response = await api.get('/schools', { params: filters });
  return response.data;
};

/**
 * Get school by ID
 * الحصول على مدرسة بالمعرف
 */
export const getSchoolById = async (id) => {
  const response = await api.get(`/schools/${id}`);
  return response.data;
};

/**
 * Search schools
 * البحث عن المدارس
 */
export const searchSchools = async (query) => {
  const response = await api.get('/schools/search', {
    params: { q: query },
  });
  return response.data;
};

/**
 * Get school reviews
 * الحصول على تقييمات المدرسة
 */
export const getSchoolReviews = async (schoolId) => {
  const response = await api.get(`/schools/${schoolId}/reviews`);
  return response.data;
};

/**
 * Add school review
 * إضافة تقييم للمدرسة
 */
export const addSchoolReview = async (schoolId, review) => {
  const response = await api.post(`/schools/${schoolId}/reviews`, review);
  return response.data;
};

/**
 * Update school review
 * تحديث تقييم المدرسة
 */
export const updateSchoolReview = async (schoolId, reviewId, review) => {
  const response = await api.put(`/schools/${schoolId}/reviews/${reviewId}`, review);
  return response.data;
};

/**
 * Delete school review
 * حذف تقييم المدرسة
 */
export const deleteSchoolReview = async (schoolId, reviewId) => {
  const response = await api.delete(`/schools/${schoolId}/reviews/${reviewId}`);
  return response.data;
};

/**
 * Get school statistics
 * الحصول على إحصائيات المدرسة
 */
export const getSchoolStats = async (schoolId) => {
  const response = await api.get(`/schools/${schoolId}/stats`);
  return response.data;
};

/**
 * Compare schools
 * مقارنة المدارس
 */
export const compareSchools = async (schoolIds) => {
  const response = await api.post('/schools/compare', { schoolIds });
  return response.data;
};

/**
 * Get nearby schools
 * الحصول على المدارس القريبة
 */
export const getNearbySchools = async (latitude, longitude, radius = 5) => {
  const response = await api.get('/schools/nearby', {
    params: { lat: latitude, lng: longitude, radius },
  });
  return response.data;
};

/**
 * Save/bookmark school
 * حفظ/إضافة مدرسة للمفضلة
 */
export const bookmarkSchool = async (schoolId) => {
  const response = await api.post(`/schools/${schoolId}/bookmark`);
  return response.data;
};

/**
 * Remove bookmark
 * إزالة من المفضلة
 */
export const removeBookmark = async (schoolId) => {
  const response = await api.delete(`/schools/${schoolId}/bookmark`);
  return response.data;
};

/**
 * Get bookmarked schools
 * الحصول على المدارس المحفوظة
 */
export const getBookmarkedSchools = async () => {
  const response = await api.get('/schools/bookmarks');
  return response.data;
};

export default {
  getSchools,
  getSchoolById,
  searchSchools,
  getSchoolReviews,
  addSchoolReview,
  updateSchoolReview,
  deleteSchoolReview,
  getSchoolStats,
  compareSchools,
  getNearbySchools,
  bookmarkSchool,
  removeBookmark,
  getBookmarkedSchools,
};

