import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { registerSchema } from "../../utils/validationForms";

import AuthLayout from "../../layouts/AuthLayout";
import { EmailInput, PasswordInput,UsernameInput } from "../../components/inputs/FormInput";

import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert";

import RegisterHero from "../../assets/images/Sign up.svg";
import { AuthContext } from "../../contexts/AuthContext";// Auth context
// Api Axios
import { registerService } from "../../services/authService";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  return (
    <AuthLayout
      expressiveImage={RegisterHero}
      title="إنشاء حساب"
      userPhotoClassName="mt-15"
      titleClassName="mb-8"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          if (Object.keys(errors).length === 0) {
            try {
              // استخدام خدمة التسجيل الجاهزة
              const data = await registerService(values);
        
              // حفظ التوكن والدور
              const token = data.token;
              const role = data.role;
        
              login(token, role);
        
              showAlert("success", "تم إنشاء الحساب بنجاح!");
              navigate(`/dashboard/${role}`);
            } catch (error) {
              showAlert("error", "حدث خطأ أثناء التسجيل");
              console.error(error);
            }
          }
          setSubmitting(false);
        }}
        
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(
            !values.email ||
              !values.password ||
              !values.confirmPassword ||
              !values.agreeTerms
          );

          return (
            <Form className="space-y-4 w-full">
               {/* Username input */}
               <UsernameInput
  value={values.username}
  onChange={handleChange("username")}
  onBlur={handleBlur("username")}
  placeholder="اسم المستخدم"
  error={touched.username && errors.username ? errors.username : ""}
/>

              {/* Email input */}
              <EmailInput
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="البريد الإلكتروني"
                error={touched.email && errors.email ? errors.email : ""}
                className="transition-all duration-300 ease-in-out focus:border-primary focus:shadow-sm"
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
                className="transition-all duration-300 ease-in-out focus:border-primary focus:shadow-sm"
              />

              {/* Confirm password input */}
              <PasswordInput
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="تأكيد كلمة المرور"
                showPassword={showConfirmPassword}
                toggleShowPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
                className="transition-all duration-300 ease-in-out focus:border-primary focus:shadow-sm"
              />

              {/* Agree to terms */}
              <div className="flex items-center gap-2 font-cairo font-normal pr-2 mb-7 text-sm text-black">
                <input
                  type="checkbox"
                  checked={values.agreeTerms}
                  onChange={handleChange("agreeTerms")}
                  className="w-4 h-4 accent-primary"
                />
                <span>
                  أوافق على{" "}
                  <Link to="/terms" className="text-primary underline text-sm">
                    شروط الاستخدام
                  </Link>{" "}
                  و{" "}
                  <Link to="/privacy" className="text-primary underline text-sm">
                    سياسة الخصوصية
                  </Link>
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-12 text-white text-lg font-bold rounded-full transition-all duration-300 ease-in-out mb-2 ${btnState.className} hover:shadow-md hover:bg-secondary`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إنشاء الحساب"}
              </button>

              {/* Login link */}
              <div className="text-center text-sm font-cairo mt-4">
                <span className="text-black font-bold">هل لديك حساب؟ </span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  تسجيل الدخول.
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
}
