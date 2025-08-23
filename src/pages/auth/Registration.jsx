import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { registerSchema } from "../../utils/validationForms";

import AuthLayout from "../../components/layout/AuthLayout";
import TextInput from "../../components/inputs/TextInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert"; // <-- SweetAlert2

import RegisterHero from "../../assets/images/Sign up.svg";
import UserIcon from "../../assets/icons/person.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PasswordStartIcon from "../../assets/icons/Group 22.svg";
import PasswordEndIcon from "../../assets/icons/basil_eye-closed-solid.svg";

export default function Registration() {
  return (
    <AuthLayout expressiveImage={RegisterHero} title="إنشاء حساب">
      <Formik
        initialValues={{ name: "", email: "", password: "", confirmPassword: "", agreeTerms: false }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          const errorMessages = Object.values(errors);
          if (errorMessages.length === 0) {
            showAlert("success", "تم إنشاء الحساب بنجاح!");
            console.log("Register data:", values);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(
            !values.name || !values.email || !values.password || !values.confirmPassword || !values.agreeTerms
          );

          return (
            <Form className="space-y-4">

              {/* Name input */}
              <TextInput
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="اسم المستخدم"
                icon={UserIcon}
                error={touched.name && errors.name ? errors.name : ""}
              />

              {/* Email input */}
              <TextInput
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="البريد الإلكتروني"
                icon={EmailIcon}
                error={touched.email && errors.email ? errors.email : ""}
              />

              {/* Password input */}
              <PasswordInput
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="كلمة المرور"
                startIcon={PasswordStartIcon}
                endIcon={PasswordEndIcon}
                error={touched.password && errors.password ? errors.password : ""}
              />

              {/* Confirm password input */}
              <PasswordInput
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="تأكيد كلمة المرور"
                startIcon={PasswordStartIcon}
                endIcon={PasswordEndIcon}
                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
              />

              {/* Agree to terms */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <input
                  type="checkbox"
                  checked={values.agreeTerms}
                  onChange={handleChange("agreeTerms")}
                  className="w-4 h-4 accent-[#4682B4]"
                />
                <span className="text-[#434343]">
                  أوافق على{" "}
                  <Link to="/terms" className="text-[#4682B4] hover:underline">شروط الاستخدام</Link> و{" "}
                  <Link to="/privacy" className="text-[#4682B4] hover:underline">سياسة الخصوصية</Link>
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-12 text-white text-lg font-semibold rounded-full transition mb-2 ${btnState.className}`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إنشاء الحساب"}
              </button>

              {/* Login link */}
              <div className="text-center text-sm">
                <span className="text-[#434343]">هل لديك حساب؟ </span>
                <Link to="/login" className="text-[#4682B4] hover:underline">
                  تسجيل الدخول
                </Link>
              </div>

            </Form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
}
