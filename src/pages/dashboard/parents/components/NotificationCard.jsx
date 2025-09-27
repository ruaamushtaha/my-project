import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaWrench, FaArchive, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onMarkAsUnread, 
  onArchive,
  onClick,
  showActions = true
}) => {
  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get type-specific styling
  const getTypeStyles = () => {
    if (notification.type === 'achievement') {
      return {
        borderClass: 'border-r-4 border-yellow-500',
        badgeClass: 'bg-yellow-100 text-yellow-800',
        icon: <FaTrophy className="text-yellow-500" />,
        bgColor: 'bg-yellow-50',
        accentColor: 'bg-yellow-500'
      };
    } else if (notification.type === 'improvement') {
      return {
        borderClass: 'border-r-4 border-blue-500',
        badgeClass: 'bg-blue-100 text-blue-800',
        icon: <FaWrench className="text-blue-500" />,
        bgColor: 'bg-blue-50',
        accentColor: 'bg-blue-500'
      };
    }
    // Default styling
    return {
      borderClass: 'border-r-4 border-gray-300',
      badgeClass: 'bg-gray-100 text-gray-800',
      icon: null,
      bgColor: 'bg-gray-50',
      accentColor: 'bg-gray-500'
    };
  };

  const typeStyles = getTypeStyles();

  return (
    <motion.div
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
        notification.read 
          ? 'bg-white border-gray-200' 
          : `${typeStyles.bgColor} border-gray-300 shadow-sm`
      } ${typeStyles.borderClass}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {!notification.read && (
              <motion.div 
                className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              ></motion.div>
            )}
            <div className="flex items-center gap-2">
              {typeStyles.icon}
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${typeStyles.badgeClass}`}>
                {notification.type === 'achievement' ? 'إنجاز' : 'تحسين'}
              </span>
            </div>
          </div>
          
          <h3 className={`font-bold ${notification.read ? 'text-gray-800' : 'text-gray-900'}`}>
            {notification.title}
          </h3>
          
          <p className={`mt-1 text-sm ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
            {notification.message}
          </p>
          
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {notification.schoolName}
              </span>
              {notification.directorate && (
                <span className="text-xs text-gray-500 mt-1">
                  {notification.directorate}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDate(notification.timestamp)}
            </span>
          </div>
        </div>
      </div>

      {showActions && (
        <motion.div 
          className="mt-3 pt-3 border-t border-gray-100 flex gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {!notification.read ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <FaCheck size={12} />
              <span>تمييز كمقروء</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsUnread(notification.id);
              }}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <FaEye size={12} />
              <span>تمييز كغير مقروء</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onArchive(notification.id);
            }}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
          >
            <FaArchive size={12} />
            <span>أرشفة</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotificationCard;