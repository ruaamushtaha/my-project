import { z } from 'zod';

// Common field validations
const emailValidation = z
  .string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('يرجى إدخال بريد إلكتروني صحيح');

const phoneValidation = z
  .string()
  .min(1, 'رقم الهاتف مطلوب')
  .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'يرجى إدخال رقم هاتف صحيح');

const passwordValidation = z
  .string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم');

const nameValidation = z
  .string()
  .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
  .max(50, 'الاسم لا يجب أن يزيد عن 50 حرف')
  .regex(/^[\u0621-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على أحرف فقط');

// Authentication schemas
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

export const registerSchema = z.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: passwordValidation,
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

// Profile schemas
export const profileSchema = z.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  address: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  region: z.string().min(1, 'المنطقة مطلوبة'),
});

export const childSchema = z.object({
  name: nameValidation,
  grade: z.string().min(1, 'الصف الدراسي مطلوب'),
  school: z.string().min(1, 'المدرسة مطلوبة'),
  birthDate: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'الجنس مطلوب' })
  }),
});

// School evaluation schema
export const evaluationSchema = z.object({
  schoolId: z.number().min(1, 'المدرسة مطلوبة'),
  educationQuality: z.number().min(1, 'تقييم جودة التعليم مطلوب').max(5, 'التقييم لا يجب أن يزيد عن 5'),
  facilities: z.number().min(1, 'تقييم المرافق مطلوب').max(5, 'التقييم لا يجب أن يزيد عن 5'),
  environment: z.number().min(1, 'تقييم البيئة المدرسية مطلوب').max(5, 'التقييم لا يجب أن يزيد عن 5'),
  feesValue: z.number().min(1, 'تقييم مقابل الرسوم مطلوب').max(5, 'التقييم لا يجب أن يزيد عن 5'),
  comment: z.string().max(500, 'التعليق لا يجب أن يزيد عن 500 حرف').optional(),
  recommend: z.boolean().optional(),
});

// Complaint schema
export const complaintSchema = z.object({
  schoolId: z.number().min(1, 'المدرسة مطلوبة'),
  category: z.enum([
    'academic',
    'facilities',
    'staff',
    'fees',
    'transport',
    'food',
    'other'
  ], {
    errorMap: () => ({ message: 'فئة الشكوى مطلوبة' })
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    errorMap: () => ({ message: 'أولوية الشكوى مطلوبة' })
  }),
  title: z.string().min(5, 'عنوان الشكوى يجب أن يكون 5 أحرف على الأقل').max(100, 'العنوان لا يجب أن يزيد عن 100 حرف'),
  description: z.string().min(20, 'وصف الشكوى يجب أن يكون 20 حرف على الأقل').max(1000, 'الوصف لا يجب أن يزيد عن 1000 حرف'),
  childId: z.number().optional(),
  anonymous: z.boolean().optional(),
});

// Chat message schema
export const messageSchema = z.object({
  chatId: z.number().min(1, 'معرف المحادثة مطلوب'),
  message: z.string().min(1, 'نص الرسالة مطلوب').max(1000, 'الرسالة لا يجب أن تزيد عن 1000 حرف'),
  type: z.enum(['text', 'image', 'file']).default('text'),
});

// Settings schemas
export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  sms: z.boolean(),
  inApp: z.boolean(),
  evaluationReminders: z.boolean(),
  complaintUpdates: z.boolean(),
  schoolNews: z.boolean(),
  systemUpdates: z.boolean(),
});

export const privacySettingsSchema = z.object({
  profileVisible: z.boolean(),
  showOnlineStatus: z.boolean(),
  allowMessages: z.boolean(),
  shareEvaluations: z.boolean(),
});

// Search and filter schemas
export const schoolSearchSchema = z.object({
  search: z.string().optional(),
  type: z.enum(['primary', 'middle', 'high', 'mixed']).optional(),
  ratingMin: z.number().min(1).max(5).optional(),
  feesMax: z.number().min(0).optional(),
  distance: z.number().min(0).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
  sortBy: z.enum(['name', 'rating', 'fees', 'distance']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const evaluationFiltersSchema = z.object({
  schoolId: z.number().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  ratingMin: z.number().min(1).max(5).optional(),
  ratingMax: z.number().min(1).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

export const complaintFiltersSchema = z.object({
  schoolId: z.number().optional(),
  category: z.enum(['academic', 'facilities', 'staff', 'fees', 'transport', 'food', 'other']).optional(),
  status: z.enum(['pending', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'يجب اختيار ملف' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'حجم الملف لا يجب أن يزيد عن 5 ميجابايت')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword'].includes(file.type),
      'نوع الملف غير مدعوم'
    ),
});

// Validation error messages in Arabic
export const validationMessages = {
  required: 'هذا الحقل مطلوب',
  invalid_email: 'يرجى إدخال بريد إلكتروني صحيح',
  weak_password: 'كلمة المرور ضعيفة جداً',
  passwords_dont_match: 'كلمات المرور غير متطابقة',
  invalid_phone: 'يرجى إدخال رقم هاتف صحيح',
  min_length: (min) => `يجب أن يكون ${min} أحرف على الأقل`,
  max_length: (max) => `لا يجب أن يزيد عن ${max} حرف`,
  invalid_format: 'التنسيق غير صحيح',
  file_too_large: 'حجم الملف كبير جداً',
  invalid_file_type: 'نوع الملف غير مدعوم',
};

// Helper function to get localized error message
export const getErrorMessage = (error) => {
  if (error?.message) {
    return error.message;
  }
  
  if (error?.type) {
    return validationMessages[error.type] || validationMessages.required;
  }
  
  return validationMessages.required;
};

// =============================================================================
// Validation Schemas Barrel Export
// تصدير مركزي لمخططات التحقق
// =============================================================================

export * from './validationSchemas';
export { default as schemas } from './validationSchemas';
