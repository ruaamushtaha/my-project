/**
 * =============================================================================
 * EVALUATION FORM CONFIGURATION
 * =============================================================================
 * 
 * This file contains all configuration constants for the school evaluation form.
 * Centralizing these values makes the application more maintainable and easier
 * to update without touching component logic.
 * 
 * @module EvaluationConfig
 * @category Configuration
 * =============================================================================
 */

/**
 * Rating categories for school evaluation
 * Each category represents a different aspect of school quality
 * 
 * @constant {Array<Object>} RATING_CATEGORIES
 * @property {string} id - Unique identifier for the category
 * @property {string} title - Display title in Arabic
 * @property {string} description - Detailed description of what the category evaluates
 * @property {string} icon - Icon identifier (for future icon implementation)
 */
export const RATING_CATEGORIES = [
  {
    id: 'academic',
    title: "الأداء الأكاديمي",
    description: "(كفاءة المعلمين ووضوح الشرح وأساليب التدريس المستخدمة في رفع مستوى الطلاب وتحفيزهم على التعلم.)",
    icon: 'academic'
  },
  {
    id: 'management',
    title: "الإدارة والانضباط",
    description: "(مدى التزام المدرسة بتطبيق الأنظمة والقوانين وتنظيم أوقات الحصص والتعامل مع الطلاب بعدل واحترام.)",
    icon: 'management'
  },
  {
    id: 'activities',
    title: "الأنشطة والفعاليات",
    description: "(تنوّع الأنشطة والبرامج اللامنهجيَّة وصقل مهارات الطلاب.)",
    icon: 'activities'
  },
  {
    id: 'facilities',
    title: "المرافق والخدمات",
    description: "(جودة المرافق مثل المكتبات والمختبرات والملاعب وتوفير الخدمات الصحية والنقل.)",
    icon: 'facilities'
  },
  {
    id: 'cleanliness',
    title: "النظافة والبيئة المدرسيَّة",
    description: "(نظافة الصفوف والساحات ودورات المياه وتوفير بيئة آمنة وصحية للطلاب.)",
    icon: 'cleanliness'
  }
];

/**
 * Identity options for evaluators
 * Defines who can submit evaluations
 * 
 * @constant {Array<Object>} IDENTITY_OPTIONS
 */
export const IDENTITY_OPTIONS = [
  { value: 'مشرف', label: 'مشرف تربوي' },
  { value: 'ولي أمر', label: 'ولي أمر' },
  { value: 'مدير', label: 'مدير مدرسة' }
];

/**
 * Validation constraints for form fields
 * 
 * @constant {Object} VALIDATION_RULES
 */
export const VALIDATION_RULES = {
  comment: {
    minLength: 20,
    maxLength: 300,
    required: true
  },
  identity: {
    required: true
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  ratings: {
    required: true,
    minRating: 1,
    maxRating: 5
  },
  agreeTerms: {
    required: true
  }
};

/**
 * Animation configuration for form elements
 * Using framer-motion variants for consistent animations
 * 
 * @constant {Object} ANIMATION_VARIANTS
 */
export const ANIMATION_VARIANTS = {
  // Container fade-in animation
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  },
  
  // Individual item animation
  item: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  
  // Error message animation
  error: {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  },
  
  // Modal animation
  modal: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  },
  
  // Overlay animation
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

/**
 * API configuration
 * 
 * @constant {Object} API_CONFIG
 */
export const API_CONFIG = {
  mockDelay: 1500, // Milliseconds
  successRate: 0.95 // 95% success rate for mock API
};

/**
 * UI Messages in Arabic
 * 
 * @constant {Object} MESSAGES
 */
export const MESSAGES = {
  success: {
    title: 'تم إرسال التقييم بنجاح!',
    description: 'شكراً لمساهمتك في تحسين جودة التعليم. تقييمك يساعد في بناء بيئة تعليمية أفضل للجميع.'
  },
  error: {
    title: 'حدث خطأ',
    description: 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.'
  },
  loading: 'جاري الإرسال...',
  submit: 'إرسال التقييم'
};
