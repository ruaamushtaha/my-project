import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  showIcon = true
}) => {
  const types = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: <FaCheck />
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: <FaExclamationTriangle />
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: <FaExclamationTriangle />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: <FaInfo />
    }
  };

  const config = types[type];

  return (
    <motion.div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-xl p-4 flex items-start gap-3 ${className}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {showIcon && (
        <div className="flex-shrink-0 text-lg">
          {config.icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-bold mb-1">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg hover:opacity-75 transition-opacity"
        >
          <FaTimes />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;

