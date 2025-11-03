import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  School,
  Users,
  GraduationCap as Teacher,
  AlertTriangle,
  FileText,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  GraduationCap,
  Bell,
  MessageSquare
} from 'lucide-react';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'لوحة التحكم',
    icon: Home,
    path: '/dashboard/school-manager/dashboard',
  },
  {
    id: 'school-profile',
    label: 'ملف المدرسة',
    icon: School,
    path: '/dashboard/school-manager/school-profile',
  },
  {
    id: 'schools',
    label: 'إدارة المدارس',
    icon: School,
    path: '/dashboard/school-manager/schools',
  },
  {
    id: 'students',
    label: 'الطلاب',
    icon: Users,
    path: '/dashboard/school-manager/students',
  },
  {
    id: 'complaints',
    label: 'الشكاوى',
    icon: AlertTriangle,
    path: '/dashboard/school-manager/complaints',
  },
  {
    id: 'reports',
    label: 'التقارير',
    icon: FileText,
    path: '/dashboard/school-manager/reports',
  },
  {
    id: 'notifications',
    label: 'الإشعارات',
    icon: Bell,
    path: '/dashboard/school-manager/notifications',
  },
  {
    id: 'messages',
    label: 'الرسائل',
    icon: MessageSquare,
    path: '/dashboard/school-manager/messages',
  },
];

const bottomItems = [
  {
    id: 'settings',
    label: 'الإعدادات',
    icon: Settings,
    path: '/dashboard/school-manager/settings',
  },
];

const NavItem = ({ item, isActive, isCollapsed, onItemClick, index }) => {
  const IconComponent = item.icon;

  return (
    <motion.button
      onClick={() => onItemClick(item)}
      className={`
        relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
        ${isActive 
          ? 'glass-card text-primary dark:text-accent shadow-lg border-primary/30' 
          : 'text-gray-600 dark:text-gray-300 hover:glass-card hover:text-primary dark:hover:text-accent'
        }
        ${isCollapsed ? 'justify-center px-3' : 'justify-start'}
      `}
      whileHover={{ scale: 1.02, x: -4 }}
      whileTap={{ scale: 0.98 }}
      title={isCollapsed ? item.label : undefined}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {isActive && (
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary dark:bg-accent rounded-l-full"
          layoutId="activeIndicator"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="flex-shrink-0 flex items-center justify-center">
        <IconComponent className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
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

const Sidebar = ({ isOpen, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const currentItem = navigationItems.find(item => path.includes(item.id)) || 
                       bottomItems.find(item => path.includes(item.id));
    
    if (currentItem) {
      setActiveItem(currentItem.id);
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 lg:hidden glass-card p-3 rounded-xl shadow-lg"
      >
        <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </motion.button>

      <motion.aside
        className={`
          fixed right-0 top-0 z-40 h-full glass-dark
          border-l border-white/10
          flex flex-col transition-all duration-300
          ${isOpen ? (isCollapsed ? 'translate-x-0 w-20' : 'translate-x-0 w-64') : 'translate-x-full w-64'}
          lg:translate-x-0
        `}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`p-4 border-b border-white/10 ${isCollapsed ? 'px-3' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <motion.div 
                className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-primary dark:text-accent font-bold shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="font-bold text-gray-900 dark:text-white">نظام إدارة المدارس</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة مدير المدرسة</p>
                </motion.div>
              )}
            </div>
            {!isCollapsed && (
              <motion.button
                onClick={handleCollapseToggle}
                className="hidden lg:flex p-2 hover:glass-card rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>
            )}
          </div>
        </div>

        {isCollapsed && (
          <div className="p-3 border-b border-white/10">
            <motion.button
              onClick={handleCollapseToggle}
              className="w-full p-2 hover:glass-card rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="توسيع القائمة"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 mx-auto" />
            </motion.button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                isCollapsed={isCollapsed}
                onItemClick={handleItemClick}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10 space-y-1">
          {bottomItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isCollapsed={isCollapsed}
              onItemClick={handleItemClick}
              index={index + navigationItems.length}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
