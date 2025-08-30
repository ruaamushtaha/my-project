import React from "react";
import { Formik, Form } from "formik";
import { forgotPasswordSchema } from "../../utils/validationForms";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import { EmailInput} from "../../components/inputs/FormInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert";

import ForgotHero from "../../assets/images/Forgot password.svg";
import EmailIcon from "../../assets/icons/email.svg";

export default function ForgotPassword() {
  return (
    <AuthLayout
      expressiveImage={ForgotHero}
      title="نسيت كلمة المرور؟"
      //  titleClassName="mt-10"
        userPhotoClassName="mt-28"

    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          const errorMessages = Object.values(errors);
          if (errorMessages.length === 0) {
            showAlert(
              "success",
              "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني!"
            );
            console.log("Forgot password email:", values.email);
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
                icon={EmailIcon}
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
