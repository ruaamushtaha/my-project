import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const Input = ({
  label,
  error,
  hint,
  icon,
  iconPosition = 'right',
  className = '',
  containerClassName = '',
  required = false,
  ...props
}) => {
  return (
    <motion.div
      className={`space-y-2 ${containerClassName}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}

        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}

        <input
          className={`
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:border-primary-500 focus:ring-2 focus:ring-primary-200
            transition-all duration-200 text-right
            dark:bg-gray-800 dark:border-gray-700 dark:text-white
            dark:focus:border-primary-500 dark:focus:ring-primary-800
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <motion.p
          className="text-sm text-red-500 flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationTriangle className="text-xs" />
          {error}
        </motion.p>
      )}

      {hint && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </motion.div>
  );
};

export default Input;

