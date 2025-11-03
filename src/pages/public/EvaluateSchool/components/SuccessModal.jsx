/**
 * =============================================================================
 * SUCCESS MODAL COMPONENT
 * =============================================================================
 * 
 * Modal dialog that displays success message after evaluation submission.
 * Features smooth animations, backdrop blur, and dark mode support.
 * 
 * Features:
 * - Spring animation for modal entrance
 * - Backdrop blur effect
 * - Click outside to close
 * - Escape key support
 * - Dark mode compatible
 * - RTL layout support
 * 
 * @component
 * @category UI Components
 * =============================================================================
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { MESSAGES, ANIMATION_VARIANTS } from '../constants/evaluationConfig';

/**
 * SuccessModal Component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback to close the modal
 * @param {string} [props.title] - Custom title (defaults to config)
 * @param {string} [props.message] - Custom message (defaults to config)
 * 
 * @returns {JSX.Element} Rendered success modal
 * 
 * @example
 * <AnimatePresence>
 *   {showSuccess && (
 *     <SuccessModal onClose={handleClose} />
 *   )}
 * </AnimatePresence>
 */
export default function SuccessModal({ 
  onClose, 
  title = MESSAGES.success.title,
  message = MESSAGES.success.description
}) {
  /**
   * Handle escape key press to close modal
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  /**
   * Handle backdrop click
   * Only closes if clicked on backdrop, not modal content
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.overlay}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="
        fixed inset-0 
        bg-black/50 
        backdrop-blur-sm
        flex items-center justify-center 
        z-50 
        p-4
      "
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <motion.div
        variants={ANIMATION_VARIANTS.modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="
          bg-white 
          dark:bg-gray-800
          rounded-2xl 
          p-8 
          max-w-md 
          w-full 
          shadow-2xl
          relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
          className="flex justify-center mb-6"
        >
          <div className="
            relative
            p-4
            rounded-full
            bg-green-100
            dark:bg-green-900/30
          ">
            <FaCheckCircle className="
              text-green-500 
              dark:text-green-400
              text-6xl
            " />
            
            {/* Animated ring around icon */}
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="
                absolute inset-0
                rounded-full
                border-4
                border-green-500
                dark:border-green-400
              "
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          id="success-modal-title"
          className="
            text-2xl 
            font-bold 
            text-center 
            text-primary 
            dark:text-primary-light
            mb-4
          "
        >
          {title}
        </motion.h2>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
            text-center 
            text-gray-600 
            dark:text-gray-300
            mb-6
            leading-relaxed
          "
        >
          {message}
        </motion.p>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="
            w-full 
            bg-primary 
            hover:bg-primary/90
            dark:bg-primary-light
            dark:hover:bg-primary-light/90
            text-white 
            py-3 
            rounded-xl 
            font-medium 
            transition-all
            duration-200
            shadow-lg
            hover:shadow-xl
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:ring-offset-2
            dark:focus:ring-offset-gray-800
          "
          aria-label="إغلاق النافذة"
        >
          إغلاق
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/**
 * PropTypes documentation
 * 
 * SuccessModal.propTypes = {
 *   onClose: PropTypes.func.isRequired,
 *   title: PropTypes.string,
 *   message: PropTypes.string
 * };
 */
