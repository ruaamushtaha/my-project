import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaTrophy, FaImages, FaComments } from 'react-icons/fa';

const HorizontalNavbar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'about', label: 'عن المدرسة', icon: FaUser },
    { id: 'achievements', label: 'الإنجازات', icon: FaTrophy },
    { id: 'activities', label: 'الأنشطة', icon: FaImages },
    { id: 'posts', label: 'المنشورات', icon: FaComments }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // For posts tab, we need to scroll to the section
    if (tabId === 'posts') {
      // Wait a bit for the tab to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(tabId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
    // For other tabs, they are already visible in the tab panel, no need to scroll
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 overflow-x-auto" dir="rtl">
      <div className="flex space-x-1 md:space-x-2 min-w-max">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="ml-2" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalNavbar;