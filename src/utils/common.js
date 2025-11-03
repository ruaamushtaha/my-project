// =============================================================================
// Common Utility Functions
// دوال مساعدة مشتركة
// =============================================================================

/**
 * Format date to Arabic format
 * تنسيق التاريخ بالصيغة العربية
 */
export const formatDate = (date, locale = 'ar-SA') => {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Format time to Arabic format
 * تنسيق الوقت بالصيغة العربية
 */
export const formatTime = (date, locale = 'ar-SA') => {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Format date and time
 * تنسيق التاريخ والوقت
 */
export const formatDateTime = (date, locale = 'ar-SA') => {
  if (!date) return '';
  return `${formatDate(date, locale)} - ${formatTime(date, locale)}`;
};

/**
 * Format number with Arabic numerals
 * تنسيق الأرقام بالأرقام العربية
 */
export const formatNumber = (number, locale = 'ar-SA') => {
  if (number == null) return '';
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Format currency
 * تنسيق العملة
 */
export const formatCurrency = (amount, currency = 'SAR', locale = 'ar-SA') => {
  if (amount == null) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Truncate text with ellipsis
 * اقتطاع النص مع إضافة نقاط
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate unique ID
 * توليد معرف فريد
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 * دالة التأخير
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 * نسخ عميق للكائن
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * التحقق من كون الكائن فارغ
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Get file extension
 * الحصول على امتداد الملف
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Format file size
 * تنسيق حجم الملف
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate email
 * التحقق من البريد الإلكتروني
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number (Saudi format)
 * التحقق من رقم الهاتف (الصيغة السعودية)
 */
export const isValidSaudiPhone = (phone) => {
  const re = /^(05|5)(0|1|2|3|4|5|6|7|8|9)\d{7}$/;
  return re.test(phone);
};

/**
 * Calculate percentage
 * حساب النسبة المئوية
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Get average from array
 * الحصول على المتوسط من المصفوفة
 */
export const getAverage = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/**
 * Capitalize first letter
 * جعل أول حرف كبير
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Sleep function
 * دالة التوقف
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Group array by key
 * تجميع المصفوفة حسب مفتاح
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 * ترتيب المصفوفة حسب مفتاح
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

/**
 * Remove duplicates from array
 * إزالة التكرارات من المصفوفة
 */
export const removeDuplicates = (array, key) => {
  if (!key) {
    return [...new Set(array)];
  }
  return array.filter((item, index, self) =>
    index === self.findIndex((t) => t[key] === item[key])
  );
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatNumber,
  formatCurrency,
  truncateText,
  generateId,
  debounce,
  deepClone,
  isEmpty,
  getFileExtension,
  formatFileSize,
  isValidEmail,
  isValidSaudiPhone,
  calculatePercentage,
  getAverage,
  capitalize,
  sleep,
  groupBy,
  sortBy,
  removeDuplicates,
};
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

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
};

// Status
export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

// Rating Scale
export const RATING_SCALE = {
  MIN: 1,
  MAX: 5,
};

// Complaint Categories
export const COMPLAINT_CATEGORIES = {
  ACADEMIC: 'academic',
  FACILITIES: 'facilities',
  BEHAVIOR: 'behavior',
  ADMINISTRATION: 'administration',
  OTHER: 'other',
};

// School Types
export const SCHOOL_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  INTERNATIONAL: 'international',
};

// Education Levels
export const EDUCATION_LEVELS = {
  KINDERGARTEN: 'kindergarten',
  ELEMENTARY: 'elementary',
  MIDDLE: 'middle',
  HIGH: 'high',
};

export default {
  API_CONFIG,
  AUTH_CONFIG,
  USER_ROLES,
  ROUTES,
  THEME,
  LANGUAGES,
  NOTIFICATION_TYPES,
  STORAGE_KEYS,
  PAGINATION,
  FILE_UPLOAD,
  STATUS,
  RATING_SCALE,
  COMPLAINT_CATEGORIES,
  SCHOOL_TYPES,
  EDUCATION_LEVELS,
};

