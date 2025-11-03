/**
 * =============================================================================
 * EVALUATION FORM SECTION COMPONENT
 * =============================================================================
 * 
 * Main form component for school evaluation.
 * Handles all form fields, validation, and submission with smooth animations.
 * 
 * Features:
 * - Comprehensive form validation with real-time feedback
 * - Smooth entrance and interaction animations
 * - Dark mode support
 * - RTL layout
 * - Accessible form controls
 * - Character counter for comment field
 * - Loading states during submission
 * 
 * @component
 * @category UI Components
 * =============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { ReactComponent as ChevronRight } from "../../../../assets/icons/whiteSlide.svg";
import StarRating from './StarRating';
import { useEvaluationForm } from '../hooks/useEvaluationForm';
import { 
  RATING_CATEGORIES, 
  IDENTITY_OPTIONS,
  VALIDATION_RULES,
  ANIMATION_VARIANTS,
  MESSAGES
} from '../constants/evaluationConfig';

/**
 * EvaluateFormSection Component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function for form submission
 * @param {boolean} props.isSubmitting - Whether form is currently submitting
 * 
 * @returns {JSX.Element} Rendered evaluation form
 * 
 * @example
 * <EvaluateFormSection 
 *   onSubmit={handleSubmit}
 *   isSubmitting={isLoading}
 * />
 */
export default function EvaluateFormSection({ onSubmit, isSubmitting }) {
  // Use custom hook for form management
  const {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleRatingChange,
    handleBlur,
    handleSubmit
  } = useEvaluationForm(onSubmit);

  /**
   * Render error message with animation
   */
  const ErrorMessage = ({ message }) => (
    <motion.p
      variants={ANIMATION_VARIANTS.error}
      initial="hidden"
      animate="visible"
      className="text-red-500 dark:text-red-400 text-sm mt-1"
    >
      {message}
    </motion.p>
  );

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-900 font-sans"
      dir="rtl"
    >
      <div className="bg-white dark:bg-gray-800 m-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        {/* Form Header */}
        <h3 className="
          inline-block 
          bg-primary 
          dark:bg-primary-light
          text-white 
          px-4 
          rounded-l 
          mb-6 
          mt-5 
          text-sm 
          font-medium 
          py-2
        ">
          نموذج التقييم (ساهم بتقييمكَ؛ لبناء بيئة تعليميَّة أفضل!)
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          {/* ==================== Identity and Email Section ==================== */}
          <div className="flex flex-col md:flex-row gap-6 mb-6 mx-5">
            
            {/* Identity Field */}
            <motion.div 
              variants={ANIMATION_VARIANTS.item}
              className="flex-1 bg-[#F6F8F8] dark:bg-gray-700 p-5 rounded-xl"
            >
              <label 
                htmlFor="identity"
                className="block font-normal text-primary dark:text-primary-light mb-2"
              >
                هِويِّة المُقيِّم:
                <span className="text-red-500 dark:text-red-400 mr-1">*</span>
              </label>
              
              <select
                id="identity"
                className="
                  w-full 
                  border 
                  border-gray-300
                  dark:border-gray-600
                  rounded 
                  p-2
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  dark:focus:ring-primary-light
                  transition-all
                "
                value={formData.identity}
                onChange={(e) => handleFieldChange('identity', e.target.value)}
                onBlur={() => handleBlur('identity')}
                aria-invalid={touched.identity && errors.identity ? 'true' : 'false'}
                aria-describedby={errors.identity ? 'identity-error' : undefined}
              >
                <option value="" className="text-[#A9A9A9]">اختر</option>
                {IDENTITY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {touched.identity && errors.identity && (
                <ErrorMessage message={errors.identity} />
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div 
              variants={ANIMATION_VARIANTS.item}
              className="flex-1 bg-[#F6F8F8] dark:bg-gray-700 p-5 rounded-xl"
            >
              <label 
                htmlFor="email"
                className="block font-normal text-primary dark:text-primary-light mb-2"
              >
                البريد الإلكتروني:
                <span className="font-light">(اختياري)</span>
              </label>
              
              <div className="relative">
                <FiMail className="
                  absolute 
                  left-3 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  text-gray-400 
                  dark:text-gray-500
                  text-xl
                " />
                
                <input
                  id="email"
                  type="email"
                  className="
                    w-full 
                    border 
                    border-gray-300
                    dark:border-gray-600
                    rounded 
                    pl-10 
                    pr-3 
                    py-2 
                    text-left 
                    placeholder:text-left 
                    text-gray-900
                    dark:text-gray-100
                    bg-white
                    dark:bg-gray-800
                    outline-none
                    focus:ring-2
                    focus:ring-primary
                    dark:focus:ring-primary-light
                    transition-all
                  "
                  placeholder="name1587@example.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              
              {touched.email && errors.email && (
                <ErrorMessage message={errors.email} />
              )}
            </motion.div>
          </div>

          {/* ==================== Rating Categories Section ==================== */}
          <div className="mb-6 p-5 bg-[#F6F8F8] dark:bg-gray-700 mx-5 rounded-xl">
            <label className="
              block 
              font-normal 
              my-4 
              text-primary 
              dark:text-primary-light
              text-center
            ">
              المعايير الخاصّة بالتقييم
              <span className="font-light">(قيِّم باستخدام النجوم)</span>
              <span className="text-red-500 dark:text-red-400 mr-1">*</span>
            </label>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {RATING_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={ANIMATION_VARIANTS.item}
                  custom={index}
                  className="
                    bg-white 
                    dark:bg-gray-800
                    rounded-xl 
                    p-4 
                    w-full 
                    sm:w-[calc(50%-0.5rem)]
                    lg:w-[calc(33.333%-0.75rem)]
                    shadow-sm
                    hover:shadow-md
                    transition-shadow
                    duration-200
                  "
                >
                  <p className="
                    font-normal 
                    text-primary 
                    dark:text-primary-light
                    mb-1
                  ">
                    {category.title}
                  </p>
                  
                  <p className="
                    text-sm 
                    mt-1 
                    font-light 
                    text-[#757777]
                    dark:text-gray-400
                    leading-relaxed
                  ">
                    {category.description}
                  </p>
                  
                  <div className="text-center mt-4">
                    <StarRating
                      rating={formData.ratings[category.id] || 0}
                      onRatingChange={(rating) => handleRatingChange(category.id, rating)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {touched.ratings && errors.ratings && (
              <motion.div 
                variants={ANIMATION_VARIANTS.error}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                <ErrorMessage message={errors.ratings} />
              </motion.div>
            )}
          </div>

          {/* ==================== Comment Section ==================== */}
          <motion.div 
            variants={ANIMATION_VARIANTS.item}
            className="mb-6 bg-[#F6F8F8] dark:bg-gray-700 mx-5 p-4 rounded-xl"
          >
            <label 
              htmlFor="comment"
              className="
                block 
                font-normal 
                text-primary 
                dark:text-primary-light
                mb-2
              "
            >
              ملاحظاتك حول المدرسة:
              <span className="text-red-500 dark:text-red-400 mr-1">*</span>
            </label>
            
            <textarea
              id="comment"
              rows="4"
              className="
                w-full 
                border 
                border-gray-300
                dark:border-gray-600
                rounded 
                p-2
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-gray-100
                placeholder:text-gray-400
                dark:placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                dark:focus:ring-primary-light
                transition-all
                resize-none
              "
              placeholder="شاركنا جميع ملاحظاتك. ما الذي أعجبك أو لم يعجبك في المدرسة؟ هل يوجد أي اقتراح تحسيني؟"
              value={formData.comment}
              onChange={(e) => handleFieldChange('comment', e.target.value)}
              onBlur={() => handleBlur('comment')}
              maxLength={VALIDATION_RULES.comment.maxLength}
              aria-invalid={touched.comment && errors.comment ? 'true' : 'false'}
              aria-describedby="comment-counter comment-error"
            />
            
            <div className="flex justify-between items-center mt-1">
              <span 
                id="comment-counter"
                className={`
                  text-xs 
                  ${formData.comment.length > VALIDATION_RULES.comment.maxLength - 20
                    ? 'text-red-500 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {formData.comment.length}/{VALIDATION_RULES.comment.maxLength} حرف
              </span>
              
              {touched.comment && errors.comment && (
                <ErrorMessage message={errors.comment} />
              )}
            </div>
          </motion.div>

          {/* ==================== Terms Agreement Section ==================== */}
          <motion.div 
            variants={ANIMATION_VARIANTS.item}
            className="
              mb-6 
              rounded-xl 
              items-center 
              gap-2 
              bg-[#F6F8F8] 
              dark:bg-gray-700
              mx-5 
              p-4
            "
          >
            <h3 className="
              font-normal 
              text-primary 
              dark:text-primary-light
              mb-2
            ">
              الخصوصيَّة والموافقة:
            </h3>
            
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={formData.agreeTerms}
                onChange={(e) => handleFieldChange('agreeTerms', e.target.checked)}
                onBlur={() => handleBlur('agreeTerms')}
                className="
                  mt-1
                  w-4
                  h-4
                  text-primary
                  dark:text-primary-light
                  border-gray-300
                  dark:border-gray-600
                  rounded
                  focus:ring-2
                  focus:ring-primary
                  dark:focus:ring-primary-light
                  cursor-pointer
                "
                aria-invalid={touched.agreeTerms && errors.agreeTerms ? 'true' : 'false'}
              />
              
              <label 
                htmlFor="agree" 
                className="
                  text-sm 
                  text-[#757777]
                  dark:text-gray-400
                  cursor-pointer
                  select-none
                "
              >
                أُقرّ بأنَّ تقييمي صادق وغير مسيء وأوافق على سياسة النشر.
                <span className="text-red-500 dark:text-red-400 mr-1">*</span>
              </label>
            </div>
            
            {touched.agreeTerms && errors.agreeTerms && (
              <ErrorMessage message={errors.agreeTerms} />
            )}
          </motion.div>

          {/* ==================== Submit Button ==================== */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
              whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
              className={`
                bg-primary 
                hover:bg-cyan-600
                dark:bg-primary-light
                dark:hover:bg-cyan-500
                text-white 
                px-6 
                py-2 
                rounded-xl 
                w-72 
                h-12 
                border-b-2 
                ml-2 
                mb-12 
                flex 
                items-center 
                justify-center 
                gap-2
                shadow-lg
                hover:shadow-xl
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                focus:ring-offset-2
                dark:focus:ring-offset-gray-800
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              aria-label={isSubmitting ? MESSAGES.loading : MESSAGES.submit}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="
                    animate-spin 
                    rounded-full 
                    h-5 
                    w-5 
                    border-b-2 
                    border-white
                  " />
                  <span>{MESSAGES.loading}</span>
                </div>
              ) : (
                <>
                  <span>{MESSAGES.submit}</span>
                  <ChevronRight className="w-6 h-6 text-white" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

/**
 * PropTypes documentation
 * 
 * EvaluateFormSection.propTypes = {
 *   onSubmit: PropTypes.func.isRequired,
 *   isSubmitting: PropTypes.bool.isRequired
 * };
 */
