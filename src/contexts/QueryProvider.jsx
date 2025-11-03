import React from 'react';
import api from '../services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client with sensible defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Retry failed requests 3 times with exponential backoff
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Query keys factory
export const queryKeys = {
  // Authentication
  profile: ['profile'],
  
  // Schools
  schools: (filters) => ['schools', filters],
  school: (id) => ['school', id],
  schoolReviews: (id) => ['schoolReviews', id],
  schoolStats: (id) => ['schoolStats', id],
  
  // Evaluations
  evaluations: (filters) => ['evaluations', filters],
  evaluation: (id) => ['evaluation', id],
  myEvaluations: (filters) => ['myEvaluations', filters],
  
  // Complaints
  complaints: (filters) => ['complaints', filters],
  complaint: (id) => ['complaint', id],
  myComplaints: (filters) => ['myComplaints', filters],
  
  // Notifications
  notifications: (filters) => ['notifications', filters],
  unreadNotifications: ['notifications', { unread: true }],
  
  // Chat
  chats: ['chats'],
  chat: (id) => ['chat', id],
  chatMessages: (id) => ['chatMessages', id],
  
  // Children
  children: ['children'],
  
  // Settings
  settings: ['settings'],
  notificationSettings: ['notificationSettings'],
  privacySettings: ['privacySettings'],
};

// Query invalidation helpers
export const queryInvalidation = {
  // Invalidate all profile related queries
  profile: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.profile });
  },
  
  // Invalidate schools queries
  schools: (filters = {}) => {
    queryClient.invalidateQueries({ queryKey: ['schools'] });
  },
  
  // Invalidate specific school
  school: (id) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.school(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.schoolReviews(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.schoolStats(id) });
  },
  
  // Invalidate evaluations
  evaluations: () => {
    queryClient.invalidateQueries({ queryKey: ['evaluations'] });
    queryClient.invalidateQueries({ queryKey: ['myEvaluations'] });
  },
  
  // Invalidate complaints
  complaints: () => {
    queryClient.invalidateQueries({ queryKey: ['complaints'] });
    queryClient.invalidateQueries({ queryKey: ['myComplaints'] });
  },
  
  // Invalidate notifications
  notifications: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  },
  
  // Invalidate chat
  chat: (id) => {
    queryClient.invalidateQueries({ queryKey: ['chats'] });
    if (id) {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chatMessages(id) });
    }
  },
  
  // Invalidate all queries (use sparingly)
  all: () => {
    queryClient.invalidateQueries();
  },
};

// Optimistic updates helpers
export const optimisticUpdates = {
  // Update profile optimistically
  updateProfile: (newData) => {
    queryClient.setQueryData(queryKeys.profile, (old) => ({
      ...old,
      ...newData,
    }));
  },
  
  // Add notification optimistically
  addNotification: (notification) => {
    queryClient.setQueryData(queryKeys.notifications({}), (old) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: [notification, ...old.data],
      };
    });
  },
  
  // Mark notification as read optimistically
  markNotificationRead: (notificationId) => {
    queryClient.setQueryData(queryKeys.notifications({}), (old) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: old.data.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        ),
      };
    });
  },
  
  // Add evaluation optimistically
  addEvaluation: (evaluation) => {
    queryClient.setQueryData(queryKeys.myEvaluations({}), (old) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: [evaluation, ...old.data],
      };
    });
  },
};

// Pre-fetch helpers
export const prefetchHelpers = {
  // Pre-fetch school details
  school: async (id) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.school(id),
      queryFn: () => api.get(`/schools/${id}`),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  },
  
  // Pre-fetch chat messages
  chatMessages: async (chatId) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.chatMessages(chatId),
      queryFn: () => api.get(`/chats/${chatId}/messages`),
      staleTime: 30 * 1000, // 30 seconds for real-time data
    });
  },
};

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};

export { queryClient };
export default QueryProvider;
