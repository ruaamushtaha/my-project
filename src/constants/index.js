// =============================================================================
// Application Constants
// ثوابت التطبيق
// =============================================================================

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user_data',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
};

// User Roles
export const USER_ROLES = {
  PARENT: 'parent',
  SCHOOL_MANAGER: 'school-manager',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Public Routes
  ABOUT: '/about',
  OBJECTIVES: '/objectives',
  RATINGS: '/ratings',
  SCHOOLS: '/schools',
  SERVICES: '/services',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',

  // Dashboard Routes
  DASHBOARD: {
    PARENT: '/dashboard/parents',
    SCHOOL_MANAGER: '/dashboard/school-manager',
    SUPERVISOR: '/dashboard/supervisor',
    ADMIN: '/dashboard/admin',
  },
};

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Languages
export const LANGUAGES = {
  AR: 'ar',
  EN: 'en',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  USER_PREFERENCES: 'user_preferences',
};

// Status
export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

