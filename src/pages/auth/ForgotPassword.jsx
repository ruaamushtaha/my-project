import React from "react";
import { Formik, Form } from "formik";
import { forgotPasswordSchema } from "../../utils/validationForms";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import TextInput from "../../components/inputs/TextInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert"; // <-- SweetAlert2

import ForgotHero from "../../assets/images/Forgot password.svg";
import EmailIcon from "../../assets/icons/email.svg";

export default function ForgotPassword() {
  return (
    <AuthLayout expressiveImage={ForgotHero} title="نسيت كلمة المرور؟">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          const errorMessages = Object.values(errors);
          if (errorMessages.length === 0) {
            showAlert("success", "تم إرسال رابط إعادة تعيين كلمة المرور!");
            console.log("Forgot password email:", values.email);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(!values.email);

          return (
            <Form className="space-y-4">

              {/* Email input */}
              <TextInput
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="البريد الإلكتروني"
                icon={EmailIcon}
                error={touched.email && errors.email ? errors.email : ""}
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-12 text-white text-lg font-semibold rounded-full transition mb-2 ${btnState.className}`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
              </button>

              {/* Link to login page */}
              <div className="text-center text-sm mt-2">
                <span className="text-[#434343]">العودة إلى </span>
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
