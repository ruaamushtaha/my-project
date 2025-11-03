import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  shadow = 'shadow-lg',
  rounded = 'rounded-2xl',
  background = 'bg-white dark:bg-gray-800',
  animate = true,
  ...props
}) => {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={`
        ${background} ${rounded} ${shadow} ${padding} ${className}
        ${hover ? 'hover:shadow-xl transition-all duration-300' : ''}
      `}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;

