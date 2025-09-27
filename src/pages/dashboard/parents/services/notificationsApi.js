/**
 * Notifications API Service
 * This service provides mock implementations that can easily be replaced with real API calls
 */

// Mock delay to simulate network requests
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock notifications data
const mockNotifications = [
  {
    id: 'n-001',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    directorate: 'مديرية شرق غزة',
    type: 'achievement',
    title: 'فوز في مسابقة الرياضيات',
    message: 'مدرسة الأمل الابتدائية حصلت على جائزة المركز الأول في مسابقة الرياضيات على مستوى المحافظة.',
    date: '2025-09-20T10:30:00Z',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'n-002',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    directorate: 'مديرية شرق غزة',
    type: 'improvement',
    title: 'تحسين المرافق العامة',
    message: 'مدرسة النجاح المتوسطة قامت بتحسين المرافق العامة: ترميم الفناء وتجديد دورات المياه.',
    date: '2025-09-18T09:00:00Z',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'n-003',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    directorate: 'مديرية شرق غزة',
    type: 'achievement',
    title: 'الحصول على جائزة التميز',
    message: 'مدرسة الأمل الابتدائية حصلت على جائزة التميز كأفضل مدرسة ابتدائية لعام 2025.',
    date: '2025-09-15T14:00:00Z',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'n-004',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    directorate: 'مديرية شرق غزة',
    type: 'improvement',
    title: 'تطوير مختبر العلوم',
    message: 'مدرسة النجاح المتوسطة قامت بتطوير مختبر العلوم بإضافة معدات ومختبرات جديدة.',
    date: '2025-09-10T11:30:00Z',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'n-005',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    directorate: 'مديرية شرق غزة',
    type: 'achievement',
    title: 'النجاح في مسابقة القراءة',
    message: 'فريق مدرسة الأمل الابتدائية حصل على المركز الثاني في مسابقة القراءة على مستوى المنطقة.',
    date: '2025-09-05T16:45:00Z',
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'n-006',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    directorate: 'مديرية شرق غزة',
    type: 'improvement',
    title: 'تحديث المكتبة',
    message: 'مدرسة النجاح المتوسطة قامت بتحديث مكتبتها بإضافة أكثر من 300 كتاب جديد.',
    date: '2025-08-28T09:15:00Z',
    timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'n-007',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    directorate: 'مديرية شرق غزة',
    type: 'achievement',
    title: 'الحصول على جائزة الابتكار',
    message: 'مدرسة الأمل الابتدائية حصلت على جائزة الابتكار في التعليم للعام الدراسي 2024-2025.',
    date: '2025-08-20T13:20:00Z',
    timestamp: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'n-008',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    directorate: 'مديرية شرق غزة',
    type: 'improvement',
    title: 'تحسين نظام الأمان',
    message: 'مدرسة النجاح المتوسطة قامت بتحسين نظام الأمان بإضافة كاميرات مراقبة وتحديث نظام الدخول.',
    date: '2025-08-15T10:00:00Z',
    timestamp: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(),
    read: false
  }
];

// Load notifications from localStorage or use mock data
const loadNotifications = () => {
  try {
    const saved = localStorage.getItem('parentNotifications');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockNotifications;
  } catch (error) {
    console.warn('Failed to load notifications from localStorage, using mock data:', error);
    return mockNotifications;
  }
};

// Save notifications to localStorage
const saveNotifications = (notifications) => {
  try {
    localStorage.setItem('parentNotifications', JSON.stringify(notifications));
  } catch (error) {
    console.warn('Failed to save notifications to localStorage:', error);
  }
};

// Initialize notifications
let notifications = loadNotifications();

/**
 * Fetch notifications for a specific parent
 * @param {string} parentId - The ID of the parent
 * @returns {Promise<Array>} Array of notifications
 */
export const fetchForParent = async (parentId) => {
  await simulateDelay(800);
  return [...notifications];
};

/**
 * Mark a notification as read
 * @param {string} id - The ID of the notification
 * @returns {Promise<Object>} Success response
 */
export const markAsRead = async (id) => {
  await simulateDelay(300);
  notifications = notifications.map(notification => 
    notification.id === id ? { ...notification, read: true } : notification
  );
  saveNotifications(notifications);
  return { success: true, message: 'تم وضع علامة مقروء على الإشعار' };
};

/**
 * Mark a notification as unread
 * @param {string} id - The ID of the notification
 * @returns {Promise<Object>} Success response
 */
export const markAsUnread = async (id) => {
  await simulateDelay(300);
  notifications = notifications.map(notification => 
    notification.id === id ? { ...notification, read: false } : notification
  );
  saveNotifications(notifications);
  return { success: true, message: 'تم وضع علامة غير مقروء على الإشعار' };
};

/**
 * Archive a notification
 * @param {string} id - The ID of the notification
 * @returns {Promise<Object>} Success response
 */
export const archive = async (id) => {
  await simulateDelay(300);
  notifications = notifications.map(notification => 
    notification.id === id ? { ...notification, archived: true } : notification
  );
  saveNotifications(notifications);
  return { success: true, message: 'تم أرشفة الإشعار' };
};

/**
 * Mark all notifications as read
 * @returns {Promise<Object>} Success response
 */
export const markAllAsRead = async () => {
  await simulateDelay(500);
  notifications = notifications.map(notification => ({ ...notification, read: true }));
  saveNotifications(notifications);
  return { success: true, message: 'تم وضع علامة مقروء على جميع الإشعارات' };
};

/**
 * Get unread count
 * @returns {Promise<number>} Number of unread notifications
 */
export const getUnreadCount = async () => {
  await simulateDelay(200);
  return notifications.filter(n => !n.read).length;
};

export default {
  fetchForParent,
  markAsRead,
  markAsUnread,
  archive,
  markAllAsRead,
  getUnreadCount
};