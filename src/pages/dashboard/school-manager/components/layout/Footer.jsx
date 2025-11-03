import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="mt-auto py-6 px-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 نظام تقييم المدارس. جميع الحقوق محفوظة.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
