// =============================================================================
// Complaints Service - Modular
// خدمة الشكاوى - معيارية
// =============================================================================

import api from '../api/axios';

/**
 * Get all complaints
 * الحصول على جميع الشكاوى
 */
export const getComplaints = async (filters = {}) => {
  const response = await api.get('/complaints', { params: filters });
  return response.data;
};

/**
 * Get complaint by ID
 * الحصول على شكوى بالمعرف
 */
export const getComplaintById = async (id) => {
  const response = await api.get(`/complaints/${id}`);
  return response.data;
};

/**
 * Create new complaint
 * إنشاء شكوى جديدة
 */
export const createComplaint = async (complaint) => {
  const response = await api.post('/complaints', complaint);
  return response.data;
};

/**
 * Update complaint
 * تحديث الشكوى
 */
export const updateComplaint = async (id, updates) => {
  const response = await api.put(`/complaints/${id}`, updates);
  return response.data;
};

/**
 * Delete complaint
 * حذف الشكوى
 */
export const deleteComplaint = async (id) => {
  const response = await api.delete(`/complaints/${id}`);
  return response.data;
};

/**
 * Add reply to complaint
 * إضافة رد على الشكوى
 */
export const addComplaintReply = async (complaintId, reply) => {
  const response = await api.post(`/complaints/${complaintId}/replies`, reply);
  return response.data;
};

/**
 * Upload complaint attachment
 * رفع مرفق للشكوى
 */
export const uploadComplaintAttachment = async (complaintId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/complaints/${complaintId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Close complaint
 * إغلاق الشكوى
 */
export const closeComplaint = async (id) => {
  const response = await api.post(`/complaints/${id}/close`);
  return response.data;
};

/**
 * Reopen complaint
 * إعادة فتح الشكوى
 */
export const reopenComplaint = async (id) => {
  const response = await api.post(`/complaints/${id}/reopen`);
  return response.data;
};

/**
 * Get complaint categories
 * الحصول على فئات الشكاوى
 */
export const getComplaintCategories = async () => {
  const response = await api.get('/complaints/categories');
  return response.data;
};

export default {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  addComplaintReply,
  uploadComplaintAttachment,
  closeComplaint,
  reopenComplaint,
  getComplaintCategories,
};

