/**
 * Mock Notifications Service
 * Handles notifications for school manager
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockNotifications = [
  {
    id: 1,
    type: 'complaint',
    title: 'شكوى جديدة',
    message: 'تم استلام شكوى جديدة من ولي أمر بخصوص نظافة المرافق',
    read: false,
    timestamp: new Date(2024, 2, 14, 10, 0).toISOString(),
    icon: 'AlertTriangle',
    color: 'danger',
    link: '/dashboard/school-manager/complaints'
  },
  {
    id: 2,
    type: 'report',
    title: 'تقرير إشرافي جديد',
    message: 'وصل تقرير زيارة إشرافية من د. سارة خالد',
    read: false,
    timestamp: new Date(2024, 2, 14, 9, 30).toISOString(),
    icon: 'FileText',
    color: 'primary',
    link: '/dashboard/school-manager/reports'
  },
  {
    id: 3,
    type: 'message',
    title: 'رسالة جديدة',
    message: 'رسالة جديدة من أحمد محمد العلي (ولي أمر)',
    read: true,
    timestamp: new Date(2024, 2, 13, 15, 20).toISOString(),
    icon: 'Mail',
    color: 'success',
    link: '/dashboard/school-manager/messages'
  },
  {
    id: 4,
    type: 'activity',
    title: 'نشاط قادم',
    message: 'تذكير: معرض العلوم السنوي بعد يومين',
    read: true,
    timestamp: new Date(2024, 2, 13, 8, 0).toISOString(),
    icon: 'Calendar',
    color: 'warning',
    link: '/dashboard/school-manager/school-profile'
  },
  {
    id: 5,
    type: 'system',
    title: 'تحديث النظام',
    message: 'تم تحديث النظام بنجاح، اطلع على الميزات الجديدة',
    read: true,
    timestamp: new Date(2024, 2, 12, 14, 0).toISOString(),
    icon: 'Settings',
    color: 'primary',
    link: null
  }
];

const mockNotificationsService = {
  async getNotifications({ read, type, page = 1, limit = 20 }) {
    await delay(400);
    
    let filtered = [...mockNotifications];
    
    if (read !== undefined) {
      filtered = filtered.filter(n => n.read === read);
    }
    
    if (type && type !== 'all') {
      filtered = filtered.filter(n => n.type === type);
    }
    
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: paginated,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  },

  async markAsRead(id) {
    await delay(300);
    const notification = mockNotifications.find(n => n.id === parseInt(id, 10));
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    notification.read = true;
    
    return {
      success: true,
      data: notification,
      message: 'تم وضع الإشعار كمقروء'
    };
  },

  async markAllAsRead() {
    await delay(400);
    mockNotifications.forEach(n => n.read = true);
    
    return {
      success: true,
      message: 'تم وضع جميع الإشعارات كمقروءة'
    };
  },

  async getUnreadCount() {
    await delay(200);
    const count = mockNotifications.filter(n => !n.read).length;
    return { success: true, data: { count } };
  },

  async deleteNotification(id) {
    await delay(300);
    const index = mockNotifications.findIndex(n => n.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Notification not found');
    }
    
    mockNotifications.splice(index, 1);
    
    return {
      success: true,
      message: 'تم حذف الإشعار'
    };
  }
};

export default mockNotificationsService;
