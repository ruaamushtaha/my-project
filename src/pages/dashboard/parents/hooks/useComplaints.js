// =============================================================================
// Complaints Management Hook for Parents Dashboard
// هوك إدارة الشكاوى والاقتراحات لداشبورد أولياء الأمور
// =============================================================================

import { useState, useCallback, useMemo } from 'react';
import { parentsAPI } from '../services/api';

/**
 * هوك لإدارة الشكاوى والاقتراحات
 * Hook for managing complaints and suggestions
 */
export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // جلب قائمة الشكاوى
  // Fetch complaints list
  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await parentsAPI.getComplaints();
      setComplaints(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // تقديم شكوى جديدة
  // Submit new complaint
  const submitComplaint = useCallback(async (complaintData) => {
    try {
      setSubmitting(true);
      setError(null);
      const response = await parentsAPI.submitComplaint(complaintData);
      setComplaints(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  // تحديث حالة شكوى
  // Update complaint status
  const updateComplaintStatus = useCallback(async (complaintId, status) => {
    try {
      setError(null);
      const response = await parentsAPI.updateComplaintStatus(complaintId, status);
      setComplaints(prev =>
        prev.map(complaint =>
          complaint.id === complaintId
            ? { ...complaint, status: response.data.status }
            : complaint
        )
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // إغلاق شكوى
  // Close complaint
  const closeComplaint = useCallback(async (complaintId, resolution) => {
    try {
      setError(null);
      const response = await parentsAPI.closeComplaint(complaintId, resolution);
      setComplaints(prev =>
        prev.map(complaint =>
          complaint.id === complaintId
            ? { ...complaint, status: 'closed', resolution }
            : complaint
        )
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // تصنيف الشكاوى حسب الحالة
  // Group complaints by status
  const groupedComplaints = useMemo(() => {
    return complaints.reduce((groups, complaint) => {
      const status = complaint.status;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(complaint);
      return groups;
    }, {});
  }, [complaints]);

  // إحصائيات الشكاوى
  // Complaints statistics
  const stats = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === 'pending').length,
      inProgress: complaints.filter(c => c.status === 'in_progress').length,
      resolved: complaints.filter(c => c.status === 'resolved').length,
      closed: complaints.filter(c => c.status === 'closed').length
    };
  }, [complaints]);

  return {
    complaints,
    groupedComplaints,
    stats,
    loading,
    submitting,
    error,
    fetchComplaints,
    submitComplaint,
    updateComplaintStatus,
    closeComplaint
  };
};