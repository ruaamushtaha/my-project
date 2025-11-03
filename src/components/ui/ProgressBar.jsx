import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
  value = 0,
  max = 100,
  className = '',
  showPercentage = true,
  color = 'primary',
  size = 'md',
  animated = true,
  label
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-semibold">{percentage.toFixed(0)}%</span>}
        </div>
      )}

      <div className={`bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className={`${colors[color]} ${sizes[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.8 : 0, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

