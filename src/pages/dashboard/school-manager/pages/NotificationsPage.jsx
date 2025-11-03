import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle,
  FileText,
  Mail,
  Calendar,
  Settings,
  CheckCircle,
  Trash2,
  Filter
} from 'lucide-react';
import mockNotificationsService from '../../../../services/mock/mockNotificationsService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({ read: undefined, type: 'all' });
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();
  }, [filters]);

  const loadNotifications = async () => {
    try {
      const response = await mockNotificationsService.getNotifications(filters);
      setNotifications(response.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الإشعارات',
        variant: 'destructive'
      });
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await mockNotificationsService.getUnreadCount();
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Failed to load unread count');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await mockNotificationsService.markAsRead(id);
      loadNotifications();
      loadUnreadCount();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في وضع الإشعار كمقروء',
        variant: 'destructive'
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await mockNotificationsService.markAllAsRead();
      loadNotifications();
      loadUnreadCount();
      toast({
        title: 'نجح',
        description: 'تم وضع جميع الإشعارات كمقروءة'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث الإشعارات',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await mockNotificationsService.deleteNotification(id);
      loadNotifications();
      toast({
        title: 'نجح',
        description: 'تم حذف الإشعار'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الإشعار',
        variant: 'destructive'
      });
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      AlertTriangle,
      FileText,
      Mail,
      Calendar,
      Settings
    };
    return icons[iconName] || Bell;
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'from-blue-500 to-indigo-600',
      success: 'from-emerald-500 to-green-600',
      warning: 'from-amber-500 to-orange-600',
      danger: 'from-rose-500 to-red-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="container mx-auto" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              الإشعارات
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              تابع جميع التحديثات والتنبيهات المهمة
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button
              onClick={handleMarkAllAsRead}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              وضع الكل كمقروء
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {notifications.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">الإجمالي</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-primary dark:text-accent mb-1">
            {unreadCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">غير مقروء</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-success mb-1">
            {notifications.filter(n => n.read).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">مقروء</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold text-warning mb-1">
            {notifications.filter(n => n.type === 'complaint').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">شكاوى</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={filters.read === undefined ? 'all' : filters.read ? 'read' : 'unread'}
            onChange={(e) => {
              const value = e.target.value;
              setFilters({
                ...filters,
                read: value === 'all' ? undefined : value === 'read'
              });
            }}
            className="glass-card px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الإشعارات</option>
            <option value="unread">غير مقروء</option>
            <option value="read">مقروء</option>
          </select>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="glass-card px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الأنواع</option>
            <option value="complaint">شكاوى</option>
            <option value="report">تقارير</option>
            <option value="message">رسائل</option>
            <option value="activity">أنشطة</option>
            <option value="system">النظام</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = getIcon(notification.icon);
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card rounded-2xl p-4 cursor-pointer hover:shadow-2xl transition-all ${
                !notification.read ? 'border-2 border-primary/30' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(notification.color)} text-white flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-3 h-3 bg-primary dark:bg-accent rounded-full flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(notification.timestamp).toLocaleString('ar-SA', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">لا توجد إشعارات</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
