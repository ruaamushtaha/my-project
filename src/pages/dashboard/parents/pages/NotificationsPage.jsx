import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import { useNotifications, useParentProfile } from '../hooks/useData';
import NotificationCard from '../components/NotificationCard';
import NotificationsFilters from '../components/NotificationsFilters';
import NotificationModal from '../components/NotificationModal';

const NotificationsPage = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use shared notification state from the hook
  const { 
    notifications: allNotifications, 
    markAsRead, 
    markAsUnread, 
    archiveNotification,
    markAllAsRead, 
    loading,
    getTypeCounts
  } = useNotifications();
  
  const { profile: parentProfile } = useParentProfile();

  // Get notifications related to parent's children schools only
  const schoolRelatedNotifications = useMemo(() => {
    if (!parentProfile || !parentProfile.children) return [];
    
    // Get school IDs of parent's children
    const parentSchoolIds = parentProfile.children.map(child => child.school.id);
    
    // Filter notifications to only show those related to parent's children schools
    return allNotifications.filter(notification => 
      notification.schoolId && parentSchoolIds.includes(notification.schoolId)
    );
  }, [allNotifications, parentProfile]);

  // Apply filters
  const filteredNotifications = useMemo(() => {
    let result = schoolRelatedNotifications;
    
    // Apply type filter
    if (currentFilter !== 'all') {
      result = result.filter(n => n.type === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(n => 
        n.schoolName.toLowerCase().includes(term) || 
        n.title.toLowerCase().includes(term) || 
        n.message.toLowerCase().includes(term) ||
        (n.directorate && n.directorate.toLowerCase().includes(term))
      );
    }
    
    // Exclude archived notifications
    result = result.filter(n => !n.archived);
    
    return result;
  }, [schoolRelatedNotifications, currentFilter, searchTerm]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
    
    // Mark as read when opening
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  if (loading) {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex justify-center items-center" 
        dir="rtl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="mt-4 text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            جاري تحميل الإشعارات...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8" 
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">الإشعارات</h1>
        {filteredNotifications && filteredNotifications.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            تمييز الكل كمقروء
          </motion.button>
        )}
      </motion.div>

      <NotificationsFilters 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        typeCounts={getTypeCounts}
        currentFilter={currentFilter}
      />

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredNotifications && filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NotificationCard
                notification={notification}
                onMarkAsRead={markAsRead}
                onMarkAsUnread={markAsUnread}
                onArchive={archiveNotification}
                onClick={() => handleNotificationClick(notification)}
              />
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FaBell className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد إشعارات</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'لا توجد إشعارات تطابق بحثك' 
                : currentFilter === 'all' 
                  ? 'ستظهر الإشعارات هنا عند توفرها' 
                  : currentFilter === 'achievement' 
                    ? 'لا توجد إنجازات حالياً' 
                    : 'لا توجد تحسينات حالياً'}
            </p>
          </motion.div>
        )}
      </motion.div>

      <NotificationModal
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMarkAsRead={markAsRead}
        onMarkAsUnread={markAsUnread}
        onArchive={archiveNotification}
      />
    </motion.div>
  );
};

export default NotificationsPage;