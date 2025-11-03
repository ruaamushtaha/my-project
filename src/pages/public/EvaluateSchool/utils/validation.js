/**
 * =============================================================================
 * VALIDATION UTILITIES
 * =============================================================================
 * 
 * Comprehensive validation functions for the evaluation form.
 * Provides both field-level and form-level validation with Arabic error messages.
 * 
 * @module ValidationUtils
 * @category Utils
 * =============================================================================
 */

import { VALIDATION_RULES } from '../constants/evaluationConfig';

/**
 * Validates the complete evaluation form
 * Checks all required fields and returns validation result with errors
 * 
 * @param {Object} formData - The complete form data object
 * @param {string} formData.identity - Evaluator's identity
 * @param {string} formData.email - Evaluator's email (optional)
 * @param {Object} formData.ratings - Star ratings for each category
 * @param {string} formData.comment - Evaluation comment
 * @param {boolean} formData.agreeTerms - Terms agreement checkbox
 * @param {Array<Object>} ratingCategories - Array of rating categories to validate against
 * 
 * @returns {Object} Validation result
 * @returns {boolean} returns.isValid - Whether form is valid
 * @returns {Object} returns.errors - Object containing error messages for invalid fields
 * 
 * @example
 * const { isValid, errors } = validateEvaluationForm(formData, RATING_CATEGORIES);
 * if (!isValid) {
 *   console.log('Validation errors:', errors);
 * }
 */
export const validateEvaluationForm = (formData, ratingCategories) => {
  const errors = {};

  // Validate identity field
  if (!formData.identity || formData.identity.trim() === '') {
    errors.identity = 'يجب اختيار هوية المقيّم';
  }

  // Validate email (optional but must be valid format if provided)
  if (formData.email && formData.email.trim() !== '') {
    if (!VALIDATION_RULES.email.pattern.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }
  }

  // Validate ratings - all categories must be rated
  const allRated = ratingCategories.every(
    category => formData.ratings[category.id] && 
                formData.ratings[category.id] >= VALIDATION_RULES.ratings.minRating
  );
  
  if (!allRated) {
    errors.ratings = 'يجب تقييم جميع المعايير';
  }

  // Validate comment field
  const commentLength = formData.comment ? formData.comment.trim().length : 0;
  
  if (commentLength === 0) {
    errors.comment = 'الملاحظات مطلوبة';
  } else if (commentLength < VALIDATION_RULES.comment.minLength) {
    errors.comment = `يجب أن تكون الملاحظات ${VALIDATION_RULES.comment.minLength} حرف على الأقل`;
  } else if (commentLength > VALIDATION_RULES.comment.maxLength) {
    errors.comment = `يجب أن تكون الملاحظات ${VALIDATION_RULES.comment.maxLength} حرف كحد أقصى`;
  }

  // Validate terms agreement
  if (!formData.agreeTerms) {
    errors.agreeTerms = 'يجب الموافقة على سياسة النشر';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates a single form field
 * Used for real-time validation as user types or on blur
 * 
 * @param {string} fieldName - Name of the field to validate
 * @param {any} value - Current value of the field
 * @param {Array<Object>} ratingCategories - Rating categories (needed for ratings validation)
 * 
 * @returns {string|null} Error message if invalid, null if valid
 * 
 * @example
 * const error = validateField('email', 'invalid-email', RATING_CATEGORIES);
 * if (error) {
 *   setFieldError(error);
 * }
 */
export const validateField = (fieldName, value, ratingCategories = []) => {
  switch (fieldName) {
    case 'identity':
      // Identity is required
      if (!value || value.trim() === '') {
        return 'يجب اختيار هوية المقيّم';
      }
      break;

    case 'email':
      // Email is optional but must be valid format if provided
      if (value && value.trim() !== '') {
        if (!VALIDATION_RULES.email.pattern.test(value)) {
          return 'البريد الإلكتروني غير صحيح';
        }
      }
      break;

    case 'ratings':
      // All rating categories must be rated
      const allRated = ratingCategories.every(
        category => value[category.id] && 
                    value[category.id] >= VALIDATION_RULES.ratings.minRating
      );
      
      if (!allRated) {
        return 'يجب تقييم جميع المعايير';
      }
      break;

    case 'comment':
      // Comment validation with length constraints
      const commentLength = value ? value.trim().length : 0;
      
      if (commentLength === 0) {
        return 'الملاحظات مطلوبة';
      } else if (commentLength < VALIDATION_RULES.comment.minLength) {
        return `يجب أن تكون الملاحظات ${VALIDATION_RULES.comment.minLength} حرف على الأقل`;
      } else if (commentLength > VALIDATION_RULES.comment.maxLength) {
        return `يجب أن تكون الملاحظات ${VALIDATION_RULES.comment.maxLength} حرف كحد أقصى`;
      }
      break;

    case 'agreeTerms':
      // Terms agreement is required
      if (!value) {
        return 'يجب الموافقة على سياسة النشر';
      }
      break;

    default:
      return null;
  }

  return null;
};

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes potentially dangerous characters and scripts
 * 
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 * 
 * @example
 * const safeInput = sanitizeInput(userInput);
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Checks if email format is valid
 * More comprehensive than simple regex
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 * 
 * @example
 * if (isValidEmail(userEmail)) {
 *   // Process email
 * }
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  // Basic format check
  if (!VALIDATION_RULES.email.pattern.test(email)) return false;
  
  // Additional checks
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const [localPart, domain] = parts;
  
  // Local part should not be empty and not too long
  if (localPart.length === 0 || localPart.length > 64) return false;
  
  // Domain should have at least one dot and valid format
  if (!domain.includes('.') || domain.length < 3) return false;
  
  return true;
};
