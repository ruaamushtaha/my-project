// =============================================================================
// Enhanced Sidebar Component for Parents Dashboard
// مكون الشريط الجانبي المتطور لداشبورد أولياء الأمور
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome,
  FaSchool,
  FaStar,
  FaChartLine,
  FaComments,
  FaBell,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaCalendarAlt,
  FaFileAlt,
  FaUsers
} from 'react-icons/fa';

/**
 * قائمة العناصر في الشريط الجانبي
 * Sidebar navigation items configuration
 */
const navigationItems = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    icon: FaHome,
    path: '/dashboard',
    badge: null
  },
  {
    id: 'schools',
    label: 'المدارس',
    icon: FaSchool,
    path: '/schools',
    badge: null,
    submenu: [
      { id: 'my-schools', label: 'مدارس أطفالي', path: '/schools/my-schools', icon: FaGraduationCap },
      { id: 'all-schools', label: 'جميع المدارس', path: '/schools/all', icon: FaUsers },
      { id: 'search-schools', label: 'البحث عن مدارس', path: '/schools/search', icon: FaSchool }
    ]
  },
  {
    id: 'evaluations',
    label: 'التقييمات',
    icon: FaStar,
    path: '/evaluations',
    badge: '2'
  },
  {
    id: 'analytics',
    label: 'التحليلات والتقارير',
    icon: FaChartLine,
    path: '/analytics'
  },
  {
    id: 'messages',
    label: 'الرسائل',
    icon: FaComments,
    path: '/messages',
    badge: '3'
  },
  {
    id: 'notifications',
    label: 'الإشعارات',
    icon: FaBell,
    path: '/notifications',
    badge: '5'
  },
  {
    id: 'calendar',
    label: 'التقويم',
    icon: FaCalendarAlt,
    path: '/calendar'
  },
  {
    id: 'reports',
    label: 'التقارير',
    icon: FaFileAlt,
    path: '/reports'
  }
];

const bottomItems = [
  {
    id: 'profile',
    label: 'الملف الشخصي',
    icon: FaUser,
    path: '/profile'
  },
  {
    id: 'settings',
    label: 'الإعدادات',
    icon: FaCog,
    path: '/settings'
  },
  {
    id: 'help',
    label: 'المساعدة',
    icon: FaQuestionCircle,
    path: '/help'
  }
];

/**
 * مكون عنصر التنقل في الشريط الجانبي
 * Navigation item component
 */
const NavItem = ({ item, isActive, isCollapsed, onItemClick, hasSubmenu, isSubmenuOpen, onSubmenuToggle, level = 0 }) => {
  const IconComponent = item.icon;
  const isParent = item.submenu && item.submenu.length > 0;

  const handleClick = () => {
    if (isParent) {
      onSubmenuToggle(item.id);
    } else {
      onItemClick(item);
    }
  };

  return (
    <div>
      <motion.button
        onClick={handleClick}
        className={`
          w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
          ${level > 0 ? 'mr-4' : ''}
          ${isActive 
            ? 'bg-primary-500 text-white shadow-lg' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          }
          ${isCollapsed ? 'justify-center px-3' : 'justify-start'}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title={isCollapsed ? item.label : undefined}
      >
        {/* Icon */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <IconComponent className={`${isCollapsed ? 'text-xl' : 'text-lg'}`} />
        </div>

        {/* Label & Badge */}
        {!isCollapsed && (
          <>
            <span className="flex-1 text-right font-medium truncate">
              {item.label}
            </span>
            
            {/* Badge */}
            {item.badge && (
              <motion.span
                className="bg-danger text-white text-xs px-2 py-1 rounded-full font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {item.badge}
              </motion.span>
            )}

            {/* Submenu Arrow */}
            {isParent && (
              <motion.div
                animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <FaChevronLeft className="text-sm" />
              </motion.div>
            )}
          </>
        )}
      </motion.button>

      {/* Submenu */}
      {isParent && !isCollapsed && (
        <AnimatePresence>
          {isSubmenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-1 space-y-1"
            >
              {item.submenu.map((subItem) => (
                <NavItem
                  key={subItem.id}
                  item={subItem}
                  isActive={false} // You would implement submenu active state logic
                  isCollapsed={false}
                  onItemClick={onItemClick}
                  level={level + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

/**
 * مكون الشريط الجانبي الرئيسي
 * Main Sidebar component
 */
const Sidebar = ({ isOpen, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [openSubmenus, setOpenSubmenus] = useState(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle item click
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    console.log('Navigate to:', item.path);
    // Here you would implement navigation logic
    // يمكنك هنا تنفيذ منطق التنقل
  };

  // Handle submenu toggle
  const handleSubmenuToggle = (itemId) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Handle collapse toggle
  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
    // Close all submenus when collapsing
    if (!isCollapsed) {
      setOpenSubmenus(new Set());
    }
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        className={`
          fixed right-0 top-0 z-50 h-full bg-white dark:bg-gray-800 shadow-xl
          border-l border-gray-200 dark:border-gray-700 
          flex flex-col transition-all duration-300
          ${isOpen ? (isCollapsed ? 'translate-x-0 w-20' : 'translate-x-0 w-64') : 'translate-x-full w-64'}
          lg:translate-x-0
        `}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        {/* Logo & Brand */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-3' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                <FaGraduationCap />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-bold text-gray-900 dark:text-white">تقييم المدارس</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة أولياء الأمور</p>
                </div>
              )}
            </div>
            
            {/* Collapse Toggle - Desktop Only */}
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCollapseToggle}
                className="hidden lg:flex"
              >
                <FaChevronRight />
              </Button>
            )}
          </div>
        </div>

        {/* Collapsed Toggle Button */}
        {isCollapsed && (
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapseToggle}
              className="w-full"
              title="توسيع القائمة"
            >
              <FaChevronLeft />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                isCollapsed={isCollapsed}
                onItemClick={handleItemClick}
                hasSubmenu={item.submenu && item.submenu.length > 0}
                isSubmenuOpen={openSubmenus.has(item.id)}
                onSubmenuToggle={handleSubmenuToggle}
              />
            ))}
          </div>

          {/* Quick Stats Card - Only when expanded */}
          {!isCollapsed && (
            <motion.div
              className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl border border-primary-100 dark:border-primary-800"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-primary-800 dark:text-primary-200 mb-3">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">المدارس</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">التقييمات</span>
                  <span className="font-bold text-success">4.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">الرسائل الجديدة</span>
                  <span className="font-bold text-warning">3</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {bottomItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isCollapsed={isCollapsed}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
};

// Import Button component locally for this file
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = '',
  title,
  ...props 
}) => {
  return (
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
};

export default Sidebar;
