import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const NotificationsFilters = ({ 
  onFilterChange, 
  onSearchChange, 
  typeCounts,
  currentFilter 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterChange = (filterType) => {
    onFilterChange(filterType);
  };

  return (
    <div className="mb-6" dir="rtl">
      {/* Search Input */}
      <motion.div 
        className="relative mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="البحث في الإشعارات..."
          className="w-full pr-10 pl-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800
                   transition-all duration-200 text-right font-arabic"
        />
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === 'all'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={`عرض الكل (${typeCounts.total})`}
        >
          الكل ({typeCounts.total})
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFilterChange('achievement')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            currentFilter === 'achievement'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={`إنجازات (${typeCounts.achievement})`}
        >
          <span>🏆</span>
          <span>إنجازات ({typeCounts.achievement})</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFilterChange('improvement')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            currentFilter === 'improvement'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={`تحسينات (${typeCounts.improvement})`}
        >
          <span>🔧</span>
          <span>تحسينات ({typeCounts.improvement})</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotificationsFilters;