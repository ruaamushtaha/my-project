import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  animate = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const Component = animate ? motion.span : 'span';
  const animationProps = animate ? {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  } : {};

  return (
    <Component
      className={`
        inline-flex items-center justify-center font-semibold rounded-full
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Badge;

