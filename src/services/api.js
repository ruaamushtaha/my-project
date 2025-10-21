import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    const { response, request, message } = error;

    // Log errors in development
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.error('❌ API Error:', error);
    }

    // Handle different error scenarios
    if (response) {
      // Server responded with error status
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          if (window.location.pathname !== '/login') {
            toast.error('انتهت جلستك، يرجى تسجيل الدخول مرة أخرى');
            window.location.href = '/login';
          }
          break;
          
        case 403:
          toast.error('ليس لديك صلاحية للوصول إلى هذا المحتوى');
          break;
          
        case 404:
          toast.error('المحتوى المطلوب غير موجود');
          break;
          
        case 422:
          // Validation errors
          if (data?.errors) {
            Object.values(data.errors).forEach(error => {
              if (Array.isArray(error)) {
                error.forEach(msg => toast.error(msg));
              } else {
                toast.error(error);
              }
            });
          } else {
            toast.error(data?.message || 'خطأ في التحقق من البيانات');
          }
          break;
          
        case 429:
          toast.error('تم تجاوز الحد المسموح من الطلبات، يرجى المحاولة لاحقاً');
          break;
          
        case 500:
          toast.error('خطأ في الخادم، يرجى المحاولة لاحقاً');
          break;
          
        default:
          toast.error(data?.message || `خطأ غير متوقع (${status})`);
      }
    } else if (request) {
      // Request was made but no response received (network error)
      toast.error('خطأ في الاتصال، تأكد من الاتصال بالإنترنت');
    } else {
      // Something else happened
      toast.error(message || 'حدث خطأ غير متوقع');
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  register: '/auth/register',
  
  // Parent Profile
  profile: '/parents/me',
  updateProfile: '/parents/me',
  updatePassword: '/parents/me/password',
  uploadAvatar: '/uploads/avatar',
  
  // Children
  children: '/parents/me/children',
  addChild: '/parents/me/children',
  updateChild: (id) => `/parents/me/children/${id}`,
  removeChild: (id) => `/parents/me/children/${id}`,
  
  // Schools
  schools: '/schools',
  school: (id) => `/schools/${id}`,
  schoolReviews: (id) => `/schools/${id}/reviews`,
  schoolStats: (id) => `/schools/${id}/stats`,
  
  // Evaluations
  evaluations: '/evaluations',
  evaluation: (id) => `/evaluations/${id}`,
  myEvaluations: '/parents/me/evaluations',
  
  // Complaints
  complaints: '/complaints',
  complaint: (id) => `/complaints/${id}`,
  myComplaints: '/parents/me/complaints',
  
  // Notifications
  notifications: '/notifications',
  markNotificationRead: (id) => `/notifications/${id}/read`,
  markAllNotificationsRead: '/notifications/mark-all-read',
  
  // Chat
  chats: '/chats',
  chat: (id) => `/chats/${id}`,
  chatMessages: (id) => `/chats/${id}/messages`,
  sendMessage: (id) => `/chats/${id}/messages`,
  
  // Uploads
  upload: '/uploads',
  uploadMultiple: '/uploads/multiple',
  
  // Settings
  settings: '/parents/me/settings',
  notificationSettings: '/parents/me/settings/notifications',
  privacySettings: '/parents/me/settings/privacy',
};

// Helper functions for common API patterns
export const apiHelpers = {
  // GET with query params
  get: (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return api.get(url);
  },
  
  // POST with data
  post: (endpoint, data = {}) => api.post(endpoint, data),
  
  // PUT with data  
  put: (endpoint, data = {}) => api.put(endpoint, data),
  
  // PATCH with data
  patch: (endpoint, data = {}) => api.patch(endpoint, data),
  
  // DELETE
  delete: (endpoint) => api.delete(endpoint),
  
  // Upload files
  upload: (endpoint, files, onProgress = null) => {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    } else {
      formData.append('file', files);
    }
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    
    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      };
    }
    
    return api.post(endpoint, formData, config);
  },
};

// Export the axios instance as default
export default api;
