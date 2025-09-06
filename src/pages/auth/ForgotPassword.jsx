import React from "react";
import { Formik, Form } from "formik";
import { forgotPasswordSchema } from "../../utils/validationForms";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import { EmailInput } from "../../components/inputs/FormInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert";

import ForgotHero from "../../assets/images/Forgot password.svg";
// Api Axios
import { forgotPasswordService } from "../../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      expressiveImage={ForgotHero}
      title="نسيت كلمة المرور؟"
      userPhotoClassName="mt-28"
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        //api
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          if (Object.keys(errors).length === 0) {
            try {
              //  استخدام خدمة forgotPasswordService
              await forgotPasswordService(values.email);
        
              showAlert("success", "تم إرسال رابط إعادة التعيين إلى بريدك!");
              navigate("/reset-success");
            } catch (error) {
              showAlert("error", "فشل إرسال البريد! حاول مجددًا");
              console.error(error);
            }
          }
          setSubmitting(false);
        }}        
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(!values.email);

          return (
            <Form className="w-full mt-10">
              {/* Email input */}
              <EmailInput
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="أدخل بريدك الإلكتروني الخاص بالحساب"
                error={touched.email && errors.email ? errors.email : ""}
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-10 bg-primary text-white text-lg font-cairo font-medium rounded-full hover:bg-secondary transition mb-4 ${btnState.className}`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
              </button>

              {/* Link to login page */}
              <div className="text-center text-sm font-cairo">
                <span className="text-black font-bold">العودة إلى تسجيل الدخول؟ </span>
                <Link
                  to="/login"
                  className="text-primary mr-2 font-medium hover:underline"
                >
                  سجّل الدخول.
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
}
