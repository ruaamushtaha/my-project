import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome, FaSchool, FaComments, FaBell, FaUser, FaCog,
  FaChevronLeft, FaChevronRight, FaGraduationCap, FaBars,
  FaExclamationTriangle, FaFileAlt, FaCalendarAlt,FaUserFriends,FaUserTie, FaHeadphones} from 'react-icons/fa';
import Logo from '../../../../../assets/icons/LOGO.svg';

const navigationItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: FaHome, path: '/dashboard/Admin/dashboard' },
  { id: 'users', label: 'المستخدمون', icon: FaUserFriends, path: '/dashboard/Admin/UsersPage' },
  // { id: 'schools', label: 'المدارس', icon: FaSchool, path: '/dashboard/Admin/Schools' },
  { id: 'InvitationsPage', label: 'دعوات المشرفين', icon: FaUserTie, path: '/dashboard/Admin/InvitationsPage' },

  { id: 'reports', label: 'التقارير', icon: FaFileAlt, path: '/dashboard/Admin/reports' },
  { id: 'complaints', label: ' الشكاوي', icon: FaExclamationTriangle, path: '/dashboard/Admin/complaints' },

  { id: 'support', label: 'الدعم الفني ', icon: FaHeadphones, path: '/dashboard/Admin/SupportPage' },
];

const bottomItems = [
  { id: 'profile', label: 'الملف الشخصي', icon: FaUser, path: '/dashboard/Admin/profile' },
  { id: 'settings', label: 'الإعدادات', icon: FaCog, path: '/dashboard/Admin/settings' },
];



const NavItem = ({ item, isActive, isCollapsed, onItemClick, index }) => {
  const IconComponent = item.icon;

  return (
    <motion.button
      onClick={() => onItemClick(item)}
      className={`
        w-full flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
        ${isActive
          ? 'bg-[#E0F4F5] text-[#30A1DB] shadow'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }
        ${isCollapsed ? 'justify-center px-3' : 'justify-start'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={isCollapsed ? item.label : undefined}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 flex items-center justify-center mr-2">
        <IconComponent className={`${isCollapsed ? 'text-xl' : 'text-lg'} ${isActive ? 'text-[#30A1DB]' : ''}`} />
      </div>
      {!isCollapsed && (
        <motion.span
          className="flex-1 text-right font-medium truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {item.label}
        </motion.span>
      )}
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

  // تعيين العنوان حسب المسار الحالي
  switch (path) {
    case '/dashboard/Admin/dashboard':
      document.title = 'لوحة التحكم   ';
      break;
    case '/dashboard/Admin/UsersPage':
      document.title = 'المستخدمون ';
      break;
    case '/dashboard/Admin/InvitationsPage':
      document.title = 'دعوات المشرفين   ';
      break;
    case '/dashboard/Admin/reports':
      document.title = 'التقارير ';
      break;
    case '/dashboard/Admin/complaints':
      document.title = 'الشكاوي ';
      break;
    case '/dashboard/Admin/SupportPage':
      document.title = 'الدعم الفني ';
      break;
    case '/dashboard/Admin/profile':
      document.title = 'الملف الشخصي  ';
      break;
    case '/dashboard/Admin/settings':
      document.title = 'الإعدادات ';
      break;
    default:
      document.title = ' لوحة مدير النظام';
      break;
  }

  // تحديث العنصر النشط في السايد بار
  const currentItem =
    navigationItems.find(item => {
      const itemPathSegments = item.path.split('/');
      const lastSegment = itemPathSegments[itemPathSegments.length - 1];
      return path.endsWith('/' + lastSegment) || path.endsWith('/' + lastSegment + '/');
    }) ||
    bottomItems.find(item => {
      const itemPathSegments = item.path.split('/');
      const lastSegment = itemPathSegments[itemPathSegments.length - 1];
      return path.endsWith('/' + lastSegment) || path.endsWith('/' + lastSegment + '/');
    });

  if (currentItem) {
    setActiveItem(currentItem.id);
  } else if (path === '/dashboard/Admin' || path === '/dashboard/Admin/') {
    setActiveItem('Admin');
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
        dir="rtl"
        className={`
          fixed right-0 top-0 z-40 h-full bg-[#FFFFFF] dark:bg-gray-800/80 shadow-lg
          border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300
          ${isOpen ? (isCollapsed ? 'translate-x-0 w-20' : 'translate-x-0 w-64') : 'translate-x-full w-64'}
          lg:translate-x-0
        `}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: isOpen ? 0 : '100%', opacity: isOpen ? 1 : 0 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-3' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <motion.div
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={Logo} 
                  alt="Logo" 
                  className="w-10 h-10 object-contain" 
                />
              </motion.div>
              {!isCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h1 className="font-bold text-gray-900 dark:text-white">تقييم المدارس</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة مدير النظام </p>
                </motion.div>
              )}
            </div>
            {!isCollapsed && (
              <Button variant="ghost" size="sm" onClick={handleCollapseToggle} className="hidden lg:flex">
                <FaChevronRight />
              </Button>
            )}
          </div>
        </div>

        {isCollapsed && (
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" onClick={handleCollapseToggle} className="w-full" title="توسيع القائمة">
              <FaChevronLeft />
            </Button>
          </div>
        )}

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
