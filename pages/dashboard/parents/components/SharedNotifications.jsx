import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import { fetchNotifications, markAsRead } from '../services/notificationsApi';

/**
 * Shared Notifications Component
 * Used in both the header dropdown and the notifications page
 */
const SharedNotifications = ({ 
  variant = 'dropdown', // 'dropdown' or 'page'
  maxItems = 5,
  onNotificationClick,
  showFilters = false,
  showSearch = false,
  showMarkAllAsRead = false,
  onMarkAllAsRead
}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch notifications
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل الإشعارات');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Apply filters
  const filteredNotifications = notifications.filter(notification => {
    // Apply type filter
    if (currentFilter !== 'all' && notification.type !== currentFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        notification.schoolName.toLowerCase().includes(term) || 
        notification.description.toLowerCase().includes(term) ||
        (notification.studentName && notification.studentName.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  // Limit notifications for dropdown
  const displayNotifications = variant === 'dropdown' 
    ? filteredNotifications.slice(0, maxItems) 
    : filteredNotifications;

  const handleNotificationClick = (notification) => {
    // Mark as read when clicking
    if (!notification.read) {
      markAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, read: true } : n
        )
      );
    }
    
    // Call parent handler if provided
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Get counts for each notification type
  const getTypeCounts = () => {
    const counts = {
      all: notifications.length,
      performance: notifications.filter(n => n.type === 'performance').length,
      achievement: notifications.filter(n => n.type === 'achievement').length,
      improvement: notifications.filter(n => n.type === 'improvement').length,
      principal: notifications.filter(n => n.type === 'principal').length,
      chat: notifications.filter(n => n.type === 'chat').length
    };
    return counts;
  };

  const typeCounts = getTypeCounts();

  // Format date in Arabic locale
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Get type-specific styling
  const getTypeStyles = (type) => {
    const styles = {
      performance: {
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-500',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      achievement: {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      improvement: {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
      },
      principal: {
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-500',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600'
      },
      chat: {
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-500',
        iconBg: 'bg-pink-100',
        iconColor: 'text-pink-600'
      }
    };
    
    return styles[type] || {
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-500',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className={`flex justify-center items-center ${variant === 'page' ? 'py-12' : 'py-8'}`} dir="rtl">
        <div className="text-center">
          <motion.div 
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            جاري تحميل الإشعارات...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center ${variant === 'page' ? 'py-12' : 'py-8'}`} dir="rtl">
        <FaBell className="mx-auto text-red-500 text-2xl mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error}
        </p>
      </div>
    );
  }

  // Empty state
  if (displayNotifications.length === 0) {
    return (
      <div className={`text-center ${variant === 'page' ? 'py-12' : 'py-8'}`} dir="rtl">
        <FaBell className="mx-auto text-gray-400 text-2xl mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          لا توجد إشعارات
        </p>
      </div>
    );
  }

  return (
    <div className={variant === 'page' ? '' : ''} dir="rtl">
      {/* Filters - only for page variant */}
      {variant === 'page' && showFilters && (
        <motion.div 
          className="mb-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-1 mb-3">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              الكل ({typeCounts.all})
            </button>
            <button
              onClick={() => handleFilterChange('performance')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'performance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
              }`}
            >
              أداء ({typeCounts.performance})
            </button>
            <button
              onClick={() => handleFilterChange('achievement')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'achievement'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
              }`}
            >
              إنجازات ({typeCounts.achievement})
            </button>
            <button
              onClick={() => handleFilterChange('improvement')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'improvement'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50'
              }`}
            >
              تحسينات ({typeCounts.improvement})
            </button>
            <button
              onClick={() => handleFilterChange('principal')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'principal'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50'
              }`}
            >
              ردود ({typeCounts.principal})
            </button>
            <button
              onClick={() => handleFilterChange('chat')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilter === 'chat'
                  ? 'bg-pink-600 text-white'
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50'
              }`}
            >
              محادثات ({typeCounts.chat})
            </button>
          </div>
          
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في الإشعارات..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 pr-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <svg 
                className="absolute left-2 top-2 h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </motion.div>
      )}

      {/* Notifications List */}
      <div className={variant === 'page' ? 'space-y-3' : ''}>
        {displayNotifications.map((notification, index) => {
          const typeStyles = getTypeStyles(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                notification.read 
                  ? 'bg-white border-gray-200' 
                  : `${typeStyles.bgColor} border-gray-300 shadow-sm`
              } ${variant === 'page' ? 'border-r-4 ' + typeStyles.borderColor : ''}`}
              onClick={() => handleNotificationClick(notification)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ y: -1, boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 5px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex items-start">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${typeStyles.iconBg} ${typeStyles.iconColor} mr-2`}>
                  <span className="text-base">{notification.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {!notification.read && (
                        <motion.div 
                          className="w-2 h-2 bg-blue-500 rounded-full mr-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        ></motion.div>
                      )}
                      <h3 className={`font-medium text-sm ${notification.read ? 'text-gray-800' : 'text-gray-900'}`}>
                        {notification.type === 'performance' 
                          ? 'تقييم جديد' 
                          : notification.type === 'achievement' 
                            ? 'إنجاز مدرسي' 
                            : notification.type === 'improvement' 
                              ? 'تحسن في المدرسة' 
                              : notification.type === 'principal' 
                                ? 'رد من المدير' 
                                : 'رسالة جديدة'}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  
                  <p className={`mt-1 text-xs ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                    {notification.description}
                  </p>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
                      {notification.schoolName}
                    </span>
                    {notification.studentName && (
                      <span className="text-xs text-gray-500">
                        {notification.studentName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SharedNotifications;