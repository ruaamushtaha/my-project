import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaBell,
  FaComments,
  FaMoon,
  FaSun,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTrophy,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import { ParentProfileProvider, useParentProfileContext } from '../../contexts/ParentProfileContext';
import { useUISettings, useNotifications, useParentProfile } from '../../hooks/useData';
import { Card, Button } from '../ui';

/**
 * مكون الإشعارات المنسدلة
 * Notifications Dropdown Component
 */
const NotificationsDropdown = ({ notifications, unreadCount, onMarkAsRead, onMarkAllAsRead, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { profile: parentProfile } = useParentProfile();

  if (!isOpen) return null;

  // Filter achievement notifications
  const achievementNotifications = notifications.filter(n => 
    n.type === 'achievement' || n.type === 'grades'
  );

  // Get child name by school ID
  const getChildNameBySchoolId = (schoolId) => {
    if (!parentProfile || !parentProfile.children) return null;
    const child = parentProfile.children.find(child => child.school.id === schoolId);
    return child ? child.name : null;
  };

  const handleNotificationClick = (notification) => {
    onMarkAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    onClose();
  };

  return (
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
      
      {/* Achievement Highlights Section */}
      {achievementNotifications.length > 0 && (
        <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-b border-green-100 dark:border-green-900/30">
          <div className="flex items-center mb-2">
            <FaTrophy className="text-green-600 mr-2" />
            <h4 className="font-bold text-green-800 dark:text-green-300 text-sm">إنجازات مدارس أبنائك</h4>
          </div>
          <div className="space-y-2">
            {achievementNotifications.slice(0, 2).map((notification) => {
              const childName = notification.schoolId ? getChildNameBySchoolId(notification.schoolId) : null;
              return (
                <div 
                  key={`achievement-${notification.id}`}
                  className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start">
                    {notification.type === 'achievement' && <FaTrophy className="text-green-500 mt-0.5 mr-2 flex-shrink-0 text-sm" />}
                    {notification.type === 'grades' && <FaChartLine className="text-blue-500 mt-0.5 mr-2 flex-shrink-0 text-sm" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                        {notification.message}
                      </p>
                      {childName && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded text-xs">
                          مدرسة {childName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="max-h-64 overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => {
          const childName = notification.schoolId ? getChildNameBySchoolId(notification.schoolId) : null;
          return (
            <motion.div
              key={notification.id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              whileHover={{ x: 5 }}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  !notification.read ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {notification.type === 'achievement' && <FaTrophy className="text-green-500 text-xs" />}
                    {notification.type === 'grades' && <FaChartLine className="text-blue-500 text-xs" />}
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {notification.title}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {notification.message}
                  </p>
                  {childName && (
                    <div className="mt-1">
                      <span className="inline-block px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        أبناء: {childName}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={() => {
            navigate('/dashboard/parents/notifications');
            onClose();
          }}
        >
          عرض جميع الإشعارات
        </Button>
      </div>
    </motion.div>
  );
};

/**
 * مكون الإعدادات السريعة
 * Quick Settings Component
 */
const QuickSettings = ({ theme, onThemeToggle, onProfileClick, onSettingsClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, loading } = useParentProfileContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.quick-settings-container') === null) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative quick-settings-container">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 space-x-reverse"
      >
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
          {loading ? '...' : (profile?.fullName?.charAt(0) || 'ا')}
        </div>
        <span className="hidden lg:inline text-gray-700 dark:text-gray-300">
          {loading ? '...' : profile?.fullName?.split(' ')[0] || 'ولي الأمر'}
        </span>
        <FaChevronDown className="text-xs" />
      </Button>

      {isOpen && (
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
                {loading ? '...' : (profile?.fullName?.charAt(0) || 'ا')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {loading ? '...' : profile?.fullName || 'ولي الأمر'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {loading ? '...' : profile?.email || 'email@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button 
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right"
              onClick={() => {
                onProfileClick();
                setIsOpen(false);
              }}
            >
              <FaUser className="text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">الملف الشخصي</span>
            </button>
            
            <button 
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right"
              onClick={() => {
                onSettingsClick();
                setIsOpen(false);
              }}
            >
              <FaCog className="text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">الإعدادات</span>
            </button>
            
            <button 
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right"
              onClick={() => {
                onThemeToggle();
                setIsOpen(false);
              }}
            >
              {theme === 'light' ? <FaMoon className="text-gray-400" /> : <FaSun className="text-gray-400" />}
              <span className="text-gray-700 dark:text-gray-300">
                {theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء'}
              </span>
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-600 py-2">
            <button 
              className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-right"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <FaSignOutAlt className="text-red-400" />
              <span className="text-red-600 dark:text-red-400">تسجيل الخروج</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * مكون التخطيط الرئيسي مع إدارة الحالات والتبديل
 * Main Layout component with state management and theme switching
 */
const Layout = ({ children, title, subtitle, breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const { settings, toggleTheme } = useUISettings();
  const { profile, loading: profileLoading } = useParentProfileContext();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  
  const [sidebarOpen, setSidebarOpen] = useState(!settings.sidebarCollapsed);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update sidebar state when settings change
  useEffect(() => {
    setSidebarOpen(!settings.sidebarCollapsed);
  }, [settings.sidebarCollapsed]);

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`البحث عن: ${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Handle notification mark as read
  const handleMarkAsRead = (id) => {
    markAsRead(id);
    toast.success('تم وضع علامة مقروء على الإشعار');
  };

  // Handle mark all notifications as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success('تم وضع علامة مقروء على جميع الإشعارات');
  };

  return (
    <div className={`
      min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 
      dark:from-gray-900 dark:to-blue-900 
      transition-all duration-300 rtl
      ${settings.compactMode ? 'text-sm' : ''}
    `}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary/20" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={
        `transition-all duration-300 relative z-10 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-20'}`
      }>
        {/* Header Section - Fixed at top */}
        <motion.div
          className="mb-6 sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Left Section - Title */}
              <div className="flex items-center space-x-4 space-x-reverse flex-1">
                <div className="min-w-0 flex-1">
                  <div>
                    <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {getGreeting()}, {profileLoading ? '...' : profile?.name?.split(' ')[0] || 'ولي الأمر'}! 👋
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      إليك نظرة سريعة على أداء مدارس أطفالك وآخر التحديثات
                    </p>
                  </div>
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

                  <NotificationsDropdown
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    isOpen={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                  />
                </div>

                {/* Chat Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard/parents/chat')}
                  className="relative"
                >
                  <FaComments />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </Button>

                {/* Quick Settings */}
                <QuickSettings
                  theme={settings.theme}
                  onThemeToggle={toggleTheme}
                  onProfileClick={() => navigate('/dashboard/parents/profile')}
                  onSettingsClick={() => navigate('/dashboard/parents/settings')}
                  onLogout={() => {
                    toast.success('تم تسجيل الخروج بنجاح');
                    // In a real app, you would clear auth state here
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
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
        </motion.div>

        {/* Page Content */}
        <motion.main
          className="p-4 lg:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          className="mt-8 py-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>© 2024 نظام تقييم المدارس. جميع الحقوق محفوظة.</p>
              </div>
              <div className="flex items-center space-x-6 space-x-reverse">
                <a 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  الخصوصية
                </a>
                <a 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  الشروط والأحكام
                </a>
                <a 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  الدعم
                </a>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

// Wrap the Layout component with ParentProfileProvider
const LayoutWithProvider = (props) => {
  return (
    <ParentProfileProvider>
      <Layout {...props} />
    </ParentProfileProvider>
  );
};

export default LayoutWithProvider;
