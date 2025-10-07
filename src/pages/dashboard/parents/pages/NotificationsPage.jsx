import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import { markAllAsRead } from '../services/notificationsApi';
import SharedNotifications from '../components/SharedNotifications';

const NotificationsPage = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      // The shared component will handle updating its own state
      window.location.reload();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8" 
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">الإشعارات</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMarkAllAsRead}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors self-start sm:self-auto"
        >
          تمييز الكل كمقروء
        </motion.button>
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SharedNotifications 
          variant="page"
          showFilters={true}
          showSearch={true}
          showMarkAllAsRead={true}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
      </motion.div>
    </motion.div>
  );
};

export default NotificationsPage;