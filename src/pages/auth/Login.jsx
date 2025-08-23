import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginSchema } from "../../utils/validationForms";

import AuthLayout from "../../components/layout/AuthLayout";
import TextInput from "../../components/inputs/TextInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert"; // <-- SweetAlert2

import LoginHero from "../../assets/images/login-hero.svg";
import UserIcon from "../../assets/icons/person.svg";
import PasswordStartIcon from "../../assets/icons/Group 22.svg";
import PasswordEndIcon from "../../assets/icons/basil_eye-closed-solid.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <AuthLayout expressiveImage={LoginHero} title="تسجيل الدخول">
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          const errorMessages = Object.values(errors);
          if (errorMessages.length === 0) {
            showAlert("success", "تم تسجيل الدخول بنجاح!");
            console.log("Login data:", { ...values, rememberMe });
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(!values.name || !values.password);

          return (
            <Form className="space-y-4">

              {/* Username input */}
              <TextInput
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="اسم المستخدم"
                icon={UserIcon}
                error={touched.name && errors.name ? errors.name : ""}
              />

              {/* Password input */}
              <PasswordInput
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="كلمة المرور"
                startIcon={PasswordStartIcon}
                endIcon={PasswordEndIcon}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
                error={touched.password && errors.password ? errors.password : ""}
              />

              {/* Remember me and forgot password */}
              <div className="flex justify-between items-center w-full mb-8 text-xs text-[#434343] px-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#4682B4]"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  تذكرني
                </label>
                <Link to="/forgot-password" className="text-[#4682B4] hover:underline text-xs">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-12 text-white text-lg font-semibold rounded-full transition mb-2 ${btnState.className}`}
              >
                تسجيل الدخول
              </button>

              {/* Register link */}
              <div className="text-center text-sm">
                <span className="text-[#434343]">ليس لديك حساب؟ </span>
                <Link to="/register" className="text-[#4682B4] hover:underline">
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
