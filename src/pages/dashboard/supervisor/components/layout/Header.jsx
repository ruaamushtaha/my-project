import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaBell, 
  FaUser, 
  FaSignOutAlt,
  FaCog,
  FaMoon,
  FaSun
} from 'react-icons/fa';

const Header = ({ onMenuClick }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Section */}
          <div className="flex items-center space-x-4 space-x-reverse flex-1">
            <motion.button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBars className="text-gray-600 dark:text-gray-300" />
            </motion.button>

            <div className="min-w-0 flex-1">
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                {getGreeting()}، المشرف التربوي
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBell className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                  م
                </div>
              </motion.button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg font-bold">
                          م
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">المشرف التربوي</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">supervisor@edu.sa</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button 
                        className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right"
                        onClick={() => navigate('/dashboard/supervisor/profile')}
                      >
                        <FaUser className="text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">الملف الشخصي</span>
                      </button>
                      
                      <button 
                        className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right"
                        onClick={() => navigate('/dashboard/supervisor/settings')}
                      >
                        <FaCog className="text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">الإعدادات</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-600 py-2">
                      <button 
                        className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-right"
                        onClick={() => navigate('/login')}
                      >
                        <FaSignOutAlt className="text-red-400" />
                        <span className="text-red-600 dark:text-red-400">تسجيل الخروج</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
