/**
 * =============================================================================
 * EVALUATION FORM HOOK
 * =============================================================================
 * 
 * Custom React hook for managing evaluation form state and logic.
 * Encapsulates all form management concerns including:
 * - Form state management
 * - Field validation
 * - Touch tracking
 * - Form submission
 * - Form reset
 * 
 * @module useEvaluationForm
 * @category Hooks
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { validateEvaluationForm, validateField } from '../utils/validation';
import { RATING_CATEGORIES } from '../constants/evaluationConfig';

/**
 * Initial form state
 * Provides a clean starting point for the form
 */
const INITIAL_FORM_STATE = {
  identity: '',
  email: '',
  ratings: {},
  comment: '',
  agreeTerms: false
};

/**
 * Custom hook for evaluation form management
 * 
 * @param {Function} onSubmit - Callback function to handle form submission
 * @returns {Object} Form state and handlers
 * 
 * @example
 * const {
 *   formData,
 *   errors,
 *   touched,
 *   handleFieldChange,
 *   handleBlur,
 *   handleSubmit,
 *   resetForm
 * } = useEvaluationForm(handleSubmitCallback);
 */
export const useEvaluationForm = (onSubmit) => {
  // Form data state
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  
  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Field touch tracking (for showing validation only after user interaction)
  const [touched, setTouched] = useState({});

  /**
   * Generic field change handler
   * Updates form data and validates if field has been touched
   * 
   * @param {string} fieldName - Name of the field being updated
   * @param {any} value - New value for the field
   */
  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Only validate if field has been touched before
    if (touched[fieldName]) {
      const error = validateField(fieldName, value, RATING_CATEGORIES);
      setErrors(prev => {
        if (error) {
          return { ...prev, [fieldName]: error };
        } else {
          const { [fieldName]: removed, ...rest } = prev;
          return rest;
        }
      });
    }
  }, [touched]);

  /**
   * Rating change handler
   * Special handler for rating fields since they're stored as nested objects
   * 
   * @param {string} categoryId - ID of the rating category
   * @param {number} rating - Star rating value (1-5)
   */
  const handleRatingChange = useCallback((categoryId, rating) => {
    const newRatings = { ...formData.ratings, [categoryId]: rating };
    setFormData(prev => ({ ...prev, ratings: newRatings }));
    
    if (touched.ratings) {
      const error = validateField('ratings', newRatings, RATING_CATEGORIES);
      setErrors(prev => {
        if (error) {
          return { ...prev, ratings: error };
        } else {
          const { ratings: removed, ...rest } = prev;
          return rest;
        }
      });
    }
  }, [formData.ratings, touched.ratings]);

  /**
   * Field blur handler
   * Marks field as touched and triggers validation
   * 
   * @param {string} fieldName - Name of the field that lost focus
   */
  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const value = fieldName === 'ratings' ? formData.ratings : formData[fieldName];
    const error = validateField(fieldName, value, RATING_CATEGORIES);
    
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    } else {
      setErrors(prev => {
        const { [fieldName]: removed, ...rest } = prev;
        return rest;
      });
    }
  }, [formData]);

  /**
   * Form submission handler
   * Validates all fields and submits if valid
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show all validation errors
    setTouched({
      identity: true,
      email: true,
      ratings: true,
      comment: true,
      agreeTerms: true
    });

    // Validate entire form
    const validation = validateEvaluationForm(formData, RATING_CATEGORIES);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submit form if valid
    const result = await onSubmit(formData);
    
    // Reset form on successful submission
    if (result && result.success) {
      resetForm();
    }
  }, [formData, onSubmit]);

  /**
   * Reset form to initial state
   * Clears all data, errors, and touch tracking
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
  }, []);

  // Return form state and handlers
  return {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleRatingChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};
