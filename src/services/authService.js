import api from "../api/axios";

// تسجيل الدخول
export const loginService = (data) => api.post("/auth/login", data);

// تسجيل جديد
export const registerService = (data) => api.post("/auth/register", data);

// طلب رابط إعادة تعيين كلمة المرور
export const forgotPasswordService = (data) => api.post("/auth/forgot-password", data);

// إعادة تعيين كلمة المرور باستخدام التوكن
export const resetPasswordService = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);
