// =============================================================================
// Application Configuration
// إعدادات التطبيق
// =============================================================================

export const config = {
  // Application Info
  app: {
    name: 'نظام تقييم المدارس',
    nameEn: 'School Evaluation System',
    version: '1.0.0',
    description: 'نظام تقييم المدارس الشامل لأولياء الأمور',
  },

  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Feature Flags
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableChat: true,
    enableComplaints: true,
    enableReports: true,
    enableSchoolComparison: true,
  },

  // Debug Mode
  debug: process.env.REACT_APP_DEBUG === 'true',

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Google Analytics (if needed)
  analytics: {
    enabled: process.env.REACT_APP_ANALYTICS_ENABLED === 'true',
    trackingId: process.env.REACT_APP_GA_TRACKING_ID || '',
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },

  // Contact Info
  contact: {
    email: 'info@schoolevaluation.com',
    phone: '+966-XX-XXXX-XXXX',
    address: 'الرياض، المملكة العربية السعودية',
  },
};

export default config;

