import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { FiMail, FiLock } from "react-icons/fi";
import TextInput from "../../components/inputs/TextInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { loginSchema } from "../../utils/validationForms";
import { auth } from "../../firebase/firebaseConfig";

// Google icon component بألوانه الحقيقية
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path fill="#4285F4" d="M533.5 278.4c0-17.6-1.4-35.2-4.3-52H272v98.9h146.9c-6.4 34.5-25.5 63.8-54.6 83.3v68h88.3c51.8-47.7 81.9-118.2 81.9-198.2z"/>
    <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.3 180.7-66.1l-88.3-68c-24.5 16.5-55.7 26.3-92.4 26.3-71 0-131-47.8-152.5-112.1H31.6v70.5C76.8 491.2 167.6 544.3 272 544.3z"/>
    <path fill="#FBBC05" d="M119.5 325.4c-7.2-21.4-11.3-44.1-11.3-67.4s4.1-46 11.3-67.4V120H31.6C11.3 166.5 0 218.7 0 278s11.3 111.5 31.6 158l87.9-70.6z"/>
    <path fill="#EA4335" d="M272 109.7c38.4 0 72.7 13.2 99.9 39.1l74.9-74.9C407.3 24.3 345.5 0 272 0 167.6 0 76.8 53.1 31.6 145.7l87.9 70.5c21.5-64.3 81.5-112 152.5-112z"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email/Password Sign In
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-md w-full p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50
                      shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                      transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h2>
          <p className="text-sm text-gray-600">مرحباً بك من جديد</p>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 
                     border border-gray-300 rounded-lg bg-white text-gray-700 
                     hover:bg-gray-100 hover:shadow-md transform hover:scale-105
                     transition-all duration-200"
        >
          <GoogleIcon />
          <span>تسجيل الدخول باستخدام Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">أو</span>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <TextInput
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                icon={FiMail}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />

              <PasswordInput
                name="password"
                placeholder="كلمة المرور"
                icon={FiLock}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-500 rounded border-gray-300 focus:ring-2 focus:ring-indigo-300 transition duration-200"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                    تذكرني
                  </span>
                </label>

                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gray-700 hover:text-indigo-600 hover:underline transition-colors duration-200"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'}`}
              >
                {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>

              <p className="text-center text-sm text-gray-700">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="hover:text-indigo-600 hover:underline transition-colors duration-200">
                  إنشاء حساب جديد
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
