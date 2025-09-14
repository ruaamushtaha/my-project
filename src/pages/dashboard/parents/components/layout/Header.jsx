// =============================================================================
// Enhanced Header Component for Parents Dashboard
// مكون الهيدر المتطور لداشبورد أولياء الأمور
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaSearch, 
  FaBell, 
  FaUser, 
  FaMoon, 
  FaSun,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaChevronLeft,
  FaGlobe
} from 'react-icons/fa';
import { Button } from '../ui';
import { useParentProfile, useNotifications, useUISettings } from '../../hooks/useData';

/**
 * مكون الهيدر المتطور مع البحث والإشعارات
 * Enhanced Header component with search and notifications
 */
const Header = ({ title, subtitle, breadcrumbs = [], onMenuClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { profile, loading: profileLoading } = useParentProfile();
  const { notifications, unreadCount } = useNotifications();
  const { settings, toggleTheme, updateSetting } = useUISettings();

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('البحث عن:', searchQuery);
      // Here you would implement search functionality
      // يمكنك هنا تنفيذ وظيفة البحث
    }
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false);
      setProfileMenuOpen(false);
    };

    if (notificationsOpen || profileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [notificationsOpen, profileMenuOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Section - Menu & Title */}
          <div className="flex items-center space-x-4 space-x-reverse flex-1">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <FaBars />
            </Button>

            {/* Breadcrumbs & Title */}
            <div className="min-w-0 flex-1">
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <FaHome />
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <FaChevronLeft className="w-3 h-3 transform rotate-180" />
                      <span 
                        className={`
                          ${index === breadcrumbs.length - 1 
                            ? 'text-primary-600 dark:text-primary-400 font-medium' 
                            : 'hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                          }
                        `}
                      >
                        {crumb}
                      </span>
                    </React.Fragment>
                  ))}
                </nav>
              )}
              
              {/* Page Title */}
              {title && (
                <div>
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <motion.form
              className="relative w-full"
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في المدارس والتقييمات..."
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800
                           transition-all duration-200 text-right font-arabic"
                />
              </div>
            </motion.form>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden"
            >
              <FaSearch />
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateSetting('language', settings.language === 'ar' ? 'en' : 'ar')}
              title="تغيير اللغة"
            >
              <FaGlobe />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              title={settings.theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء'}
            >
              {settings.theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationsOpen(!notificationsOpen);
                }}
                className="relative"
              >
                <FaBell />
                {unreadCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">الإشعارات</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {unreadCount} غير مقروء
                        </span>
                      </div>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <motion.div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {new Date(notification.timestamp).toLocaleDateString('ar-SA')}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                      <Button variant="ghost" size="sm" className="w-full">
                        عرض جميع الإشعارات
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                  {profileLoading ? '...' : (profile?.name?.charAt(0) || 'ا')}
                </div>
                <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
                  {profileLoading ? '...' : profile?.name?.split(' ')[0]}
                </span>
              </Button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Profile Info */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg font-bold">
                          {profile?.name?.charAt(0) || 'ا'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {profile?.name || 'ولي الأمر'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {profile?.email || 'email@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right">
                        <FaUser className="text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">الملف الشخصي</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right">
                        <FaCog className="text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">الإعدادات</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-600 py-2">
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-right">
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

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 dark:border-gray-700 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث..."
                className="w-full pr-10 pl-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800
                         transition-all duration-200 text-right font-arabic"
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
