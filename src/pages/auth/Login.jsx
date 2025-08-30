import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginSchema } from "../../utils/validationForms";

import AuthLayout from "../../components/layout/AuthLayout";
import { EmailInput, PasswordInput } from "../../components/inputs/FormInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert"; // SweetAlert2

import LoginHero from "../../assets/images/login-hero.svg";

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.6-1.4-35.2-4.3-52H272v98.9h146.9c-6.4 34.5-25.5 63.8-54.6 83.3v68h88.3c51.8-47.7 81.9-118.2 81.9-198.2z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c73.7 0 135.5-24.3 180.7-66.1l-88.3-68c-24.5 16.5-55.7 26.3-92.4 26.3-71 0-131-47.8-152.5-112.1H31.6v70.5C76.8 491.2 167.6 544.3 272 544.3z"
    />
    <path
      fill="#FBBC05"
      d="M119.5 325.4c-7.2-21.4-11.3-44.1-11.3-67.4s4.1-46 11.3-67.4V120H31.6C11.3 166.5 0 218.7 0 278s11.3 111.5 31.6 158l87.9-70.6z"
    />
    <path
      fill="#EA4335"
      d="M272 109.7c38.4 0 72.7 13.2 99.9 39.1l74.9-74.9C407.3 24.3 345.5 0 272 0 167.6 0 76.8 53.1 31.6 145.7l87.9 70.5c21.5-64.3 81.5-112 152.5-112z"
    />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <AuthLayout
      expressiveImage={LoginHero}
      title="تسجيل الدخول"
      userPhotoClassName="mt-20"
      titleClassName="mb-8"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          if (Object.keys(errors).length === 0) {
            showAlert("success", "تم تسجيل الدخول بنجاح!");
            console.log("Login data:", { ...values, rememberMe });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => {
          const btnState = getButtonState(!values.email || !values.password);

          return (
            <Form className="space-y-4">
              {/* email input */}
              <EmailInput
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="البريد الإلكتروني"
                error={touched.email && errors.email ? errors.email : ""}
              />

              {/* Password input */}
              <PasswordInput
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="كلمة المرور"
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
                error={touched.password && errors.password ? errors.password : ""}
              />

              {/* Remember me + forgot password */}
              <div className="flex justify-between items-center w-full mb-12 text-xs text-black px-4 font-cairo font-bold">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  تذَّكرني
                </label>
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline text-xs pl-2 font-semibold font-cairo"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-10 mt-5 bg-primary text-white text-lg font-bold font-cairo rounded-full hover:bg-secondary transition ${btnState.className}`}
              >
                تسجيل الدخول
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-400 font-cairo">
                  أو تسجيل باستخدام
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google login button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full py-2 hover:shadow-md transition-all duration-300"
              >
                <GoogleIcon />
                <span className="font-cairo font-medium">
                  تسجيل الدخول باستخدام Google
                </span>
              </button>

              {/* Register link */}
              <div className="text-center text-sm font-cairo mt-4">
                <span className="text-black font-bold">ليس لديك حساب؟ </span>
                <Link
                  to="/register"
                  className="text-primary mr-2 font-medium hover:underline"
                >
                  إنشاء حساب
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
}
