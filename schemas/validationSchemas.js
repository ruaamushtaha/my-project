// =============================================================================
// Validation Schemas - Modular and Organized
// مخططات التحقق - معيارية ومنظمة
// =============================================================================

import { z } from 'zod';

/**
 * User Registration Schema
 * مخطط التسجيل
 */
export const registerSchema = z.object({
  fullName: z.string()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'الاسم طويل جداً'),
  email: z.string()
    .email('البريد الإلكتروني غير صالح'),
  phone: z.string()
    .regex(/^(05|5)(0|1|2|3|4|5|6|7|8|9)\d{7}$/, 'رقم الهاتف غير صالح'),
  password: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

/**
 * Login Schema
 * مخطط تسجيل الدخول
 */
export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
});

/**
 * Profile Update Schema
 * مخطط تحديث الملف الشخصي
 */
export const profileSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().regex(/^(05|5)(0|1|2|3|4|5|6|7|8|9)\d{7}$/, 'رقم الهاتف غير صالح'),
  address: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل').optional(),
  region: z.string().optional(),
});

/**
 * Change Password Schema
 * مخطط تغيير كلمة المرور
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

/**
 * School Review Schema
 * مخطط تقييم المدرسة
 */
export const schoolReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  comment: z.string().min(20, 'التعليق يجب أن يكون 20 حرفاً على الأقل'),
  criteria: z.object({
    teaching: z.number().min(1).max(5),
    facilities: z.number().min(1).max(5),
    environment: z.number().min(1).max(5),
    fees: z.number().min(1).max(5),
  }),
  wouldRecommend: z.boolean(),
});

/**
 * Complaint Schema
 * مخطط الشكوى
 */
export const complaintSchema = z.object({
  schoolId: z.number(),
  category: z.enum(['academic', 'facilities', 'behavior', 'administration', 'other']),
  title: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل'),
  description: z.string().min(20, 'الوصف يجب أن يكون 20 حرفاً على الأقل'),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  isAnonymous: z.boolean().optional(),
});

/**
 * Contact Form Schema
 * مخطط نموذج الاتصال
 */
export const contactSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().regex(/^(05|5)(0|1|2|3|4|5|6|7|8|9)\d{7}$/, 'رقم الهاتف غير صالح').optional(),
  subject: z.string().min(5, 'الموضوع يجب أن يكون 5 أحرف على الأقل'),
  message: z.string().min(20, 'الرسالة يجب أن تكون 20 حرفاً على الأقل'),
});

/**
 * Search Schema
 * مخطط البحث
 */
export const searchSchema = z.object({
  query: z.string().optional(),
  region: z.string().optional(),
  type: z.enum(['public', 'private', 'international']).optional(),
  level: z.enum(['kindergarten', 'elementary', 'middle', 'high']).optional(),
  minRating: z.number().min(1).max(5).optional(),
  maxFees: z.number().optional(),
});

export default {
  registerSchema,
  loginSchema,
  profileSchema,
  changePasswordSchema,
  schoolReviewSchema,
  complaintSchema,
  contactSchema,
  searchSchema,
};

