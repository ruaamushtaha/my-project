import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4'
  };

  const colors = {
    primary: 'border-blue-200 border-t-blue-600',
    secondary: 'border-gray-200 border-t-gray-600',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div className="relative inline-block">
      <motion.div
        className={`${sizes[size]} ${colors[color]} rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={`absolute inset-0 ${sizes[size]} border-2 border-transparent rounded-full ${className}`}
        style={{ 
          borderTopColor: 'currentColor',
          opacity: 0.3,
        }}
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
