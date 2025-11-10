import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBell, FaCheck, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { fetchNotifications, markAsRead } from '../services/notificationsApi';

const SharedNotifications = ({ 
  variant = 'dropdown',
  maxItems = 5,
  onNotificationClick,
  showFilters = false,
  showSearch = false,
  customFilter = null,
  customSearch = null
}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Use custom filter/search if provided (for page variant)
  const effectiveFilter = customFilter !== null ? customFilter : currentFilter;
  const effectiveSearch = customSearch !== null ? customSearch : searchTerm;

  const filteredNotifications = notifications.filter(notification => {
    // Apply filter
    if (effectiveFilter === 'unread' && notification.read) return false;
    if (effectiveFilter === 'read' && !notification.read) return false;
    
    // Apply search
    if (effectiveSearch) {
      const term = effectiveSearch.toLowerCase();
      return (
        notification.schoolName.toLowerCase().includes(term) || 
        notification.description.toLowerCase().includes(term) ||
        (notification.studentName && notification.studentName.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const displayNotifications = variant === 'dropdown' 
    ? filteredNotifications.slice(0, maxItems) 
    : filteredNotifications;

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }
    if (onNotificationClick) onNotificationClick(notification);
  };

  const handleFilterChange = (type) => setCurrentFilter(type);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const getUnreadCount = () => notifications.filter(n => !n.read).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000*60*60));
    return diffInHours < 24
      ? date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true })
      : date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getTypeLabel = (type) => {
    if (type === 'success') return 'نجاح';
    if (type === 'warning') return 'تحذير';
    if (type === 'error') return 'خطأ';
    if (type === 'info') return 'معلومات';
    return 'إشعار';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12" dir="rtl">
      <motion.div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">جاري تحميل الإشعارات...</p>
    </div>
  );

  if (error) return (
    <motion.div 
      className="text-center py-12 bg-red-50 rounded-xl border border-red-200" 
      dir="rtl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <FaExclamationTriangle className="text-red-500 text-2xl mx-auto mb-2" />
      <p className="text-red-600 font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        إعادة المحاولة
      </button>
    </motion.div>
  );

  if (displayNotifications.length === 0) return (
    <motion.div 
      className="text-center py-12" 
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
        <FaBell className="text-3xl text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد إشعارات</h3>
      <p className="text-gray-500">ستظهر الإشعارات هنا عند توفرها</p>
    </motion.div>
  );

  return (
    <div dir="rtl">
      {/* Header with unread count */}
      {variant === 'page' && (
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">الإشعارات</h2>
          <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {getUnreadCount()} غير مقروء
          </div>
        </motion.div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              onClick={() => handleNotificationClick(notification)}
              className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                notification.read 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm'
              }`}
            >
              {/* Unread indicator */}
              {!notification.read && (
                <div className="absolute top-3 left-3 w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
              )}
              
              <div className="flex items-start">
                <div className={`p-3 rounded-xl mr-4 ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-800">{notification.schoolName}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {notification.description}
                  </p>
                  
                  {notification.studentName && (
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      الطالب: {notification.studentName}
                    </div>
                  )}
                  
                  <div className="flex items-center mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                      {getTypeLabel(notification.type)}
                    </span>
                    {!notification.read && (
                      <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        جديد
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SharedNotifications;