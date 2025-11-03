import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <motion.button
      type={type}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl font-semibold transition-all duration-200
        flex items-center justify-center gap-2
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : icon && iconPosition === 'left' ? (
        icon
      ) : null}

      {children}

      {icon && iconPosition === 'right' && !loading && icon}
    </motion.button>
  );
};

export default Button;

