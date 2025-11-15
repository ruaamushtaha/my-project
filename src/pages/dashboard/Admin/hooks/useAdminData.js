// =============================================================================
// Admin Dashboard Custom Hooks
// هوكات مخصصة لداشبورد  Admin
// =============================================================================

import { useState, useEffect } from 'react';
import adminApi from '../services/adminApi';

/**
 * Hook to manage users data
 * هوك لإدارة بيانات المستخدمين
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const newUser = await adminApi.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const updatedUser = await adminApi.updateUser(userId, userData);
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await adminApi.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};

/**
 * Hook to manage invitations data
 * هوك لإدارة بيانات الدعوات
 */
export const useInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getInvitations();
      setInvitations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching invitations:', err);
    } finally {
      setLoading(false);
    }
  };

  const createInvitation = async (invitationData) => {
    try {
      const newInvitation = await adminApi.createInvitation(invitationData);
      setInvitations(prev => [...prev, newInvitation]);
      return newInvitation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return {
    invitations,
    loading,
    error,
    fetchInvitations,
    createInvitation
  };
};

/**
 * Hook to manage registration requests
 * هوك لإدارة طلبات التسجيل
 */
export const useRegistrationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.getRegistrationRequests();
      setRequests(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await adminApi.acceptRequest(requestId);
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await adminApi.rejectRequest(requestId);
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    acceptRequest,
    rejectRequest
  };
};

export default {
  useUsers,
  useInvitations,
  useRegistrationRequests
};