import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <FaExclamationTriangle className="text-3xl text-red-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          عذراً، حدث خطأ غير متوقع
        </h2>

        <p className="text-gray-600 mb-6">
          نعتذر عن هذا الإزعاج. حدث خطأ أثناء تحميل الصفحة.
        </p>

        {error && (
          <details className="mb-6 text-right">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
              عرض تفاصيل الخطأ
            </summary>
            <div className="bg-gray-50 rounded-lg p-4 text-xs text-red-600 font-mono text-left overflow-auto max-h-40">
              {error.toString()}
            </div>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={resetErrorBoundary}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaRedo />
            إعادة المحاولة
          </motion.button>

          <motion.button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            العودة للرئيسية
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;

