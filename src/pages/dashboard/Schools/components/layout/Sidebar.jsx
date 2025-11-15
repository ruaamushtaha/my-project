import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome, FaComments, FaBell, FaUser, FaCog,
  FaChevronLeft, FaChevronRight, FaBars,
  FaFileAlt, FaCalendarAlt, FaExclamationTriangle, FaSchool
} from 'react-icons/fa';
import Logo from '../../../../../assets/icons/LOGO.svg';

const navigationItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: FaHome, path: '/dashboard/Schools/dashboard' },
  { id: 'my-school', label: 'مدرستي', icon: FaSchool, path: '/dashboard/Schools/my-school' },
  { id: 'complaints', label: 'الشكاوي', icon: FaExclamationTriangle, path: '/dashboard/Schools/complaints' },
  { id: 'reports', label: 'التقارير', icon: FaFileAlt, path: '/dashboard/Schools/reports' },
  { id: 'calendar', label: 'التقويم', icon: FaCalendarAlt, path: '/dashboard/Schools/calendar' },
  { id: 'chat', label: 'المحادثة', icon: FaComments, path: '/dashboard/Schools/chat' },
  { id: 'notifications', label: 'الإشعارات', icon: FaBell, path: '/dashboard/Schools/notifications' },
];

const bottomItems = [
  { id: 'profile', label: 'الملف الشخصي', icon: FaUser, path: '/dashboard/Schools/profile' },
  { id: 'settings', label: 'الإعدادات', icon: FaCog, path: '/dashboard/Schools/settings' },
];

const NavItem = ({ item, isActive, isCollapsed, onItemClick, index }) => {
  const IconComponent = item.icon;

  return (
    <motion.button
      onClick={() => onItemClick(item)}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
        ${isActive
          ? 'bg-[#E0F4F5] text-[#30A1DB] shadow'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }
        ${isCollapsed ? 'justify-center px-3' : 'justify-between'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={isCollapsed ? item.label : undefined}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      dir="rtl"
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        <IconComponent className={`${isCollapsed ? 'text-xl' : 'text-lg'} ${isActive ? 'text-[#30A1DB]' : ''}`} />
      </div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            className="text-right font-medium truncate flex-1"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Button = ({ children, variant = 'ghost', size = 'md', onClick, className = '', title, ...props }) => (
  <motion.button
    onClick={onClick}
    className={`
      rounded-lg transition-colors duration-200 flex items-center justify-center
      ${variant === 'ghost' ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400' : ''}
      ${size === 'sm' ? 'p-2' : 'px-4 py-2'}
      ${className}
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    title={title}
    {...props}
  >
    {children}
  </motion.button>
);

const Sidebar = ({ isOpen, onToggle, isCollapsed, setIsCollapsed }) => {
  const [activeItem, setActiveItem] = useState('schools');
  const navigate = useNavigate();
  const location = useLocation();

  // Update active item based on current location
  useEffect(() => {
    const path = location.pathname;
    // More precise matching - check if the path ends with the item's path segment
    const currentItem = navigationItems.find(item => {
      const itemPathSegments = item.path.split('/');
      const lastSegment = itemPathSegments[itemPathSegments.length - 1];
      return path.endsWith('/' + lastSegment) || path.endsWith('/' + lastSegment + '/');
    }) || bottomItems.find(item => {
      const itemPathSegments = item.path.split('/');
      const lastSegment = itemPathSegments[itemPathSegments.length - 1];
      return path.endsWith('/' + lastSegment) || path.endsWith('/' + lastSegment + '/');
    });
    
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else if (path === '/dashboard/Schools' || path === '/dashboard/Schools/') {
      // Default to schools page for the base path
      setActiveItem('schools');
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow border border-gray-200 dark:border-gray-700"
      >
        <FaBars className="text-gray-600 dark:text-gray-300" />
      </motion.button>

      <motion.aside
        className={`
          fixed right-0 top-0 z-40 h-full bg-[#FFFFFF] dark:bg-gray-800/80 shadow-lg
          border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300
          ${isOpen ? (isCollapsed ? 'translate-x-0 w-20' : 'translate-x-0 w-64') : 'translate-x-full w-64'}
          lg:translate-x-0
        `}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "tween", duration: 0.3 }}
        dir="rtl"
      >
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-3' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <motion.div
              className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold"
              whileHover={{ rotate: 5 }}
            >
              <img src={Logo} alt="Logo" className="w-8 h-8" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  className="text-right flex-1 overflow-hidden"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-bold text-gray-900 dark:text-white">تقييم المدارس</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة   المدارس/المدراء </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={`absolute ${isCollapsed ? 'left-3 top-4' : 'left-4 top-4'}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCollapseToggle} 
              className="hidden lg:flex"
              title={isCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
            >
              {isCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
          {navigationItems.map((item, index) => (
            <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} onItemClick={handleItemClick} index={index} />
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            {bottomItems.map((item, index) => (
              <NavItem key={item.id} item={item} isActive={activeItem === item.id} isCollapsed={isCollapsed} onItemClick={handleItemClick} index={index + navigationItems.length} />
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;