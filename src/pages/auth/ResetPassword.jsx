import React from "react";
import { Formik, Form } from "formik";
import { useParams, Link } from "react-router-dom";
import { resetPasswordSchema } from "../../utils/validationForms";

import AuthLayout from "../../components/layout/AuthLayout";
import PasswordInput from "../../components/inputs/PasswordInput";
import { getButtonState } from "../../utils/buttonState";
import { showAlert } from "../../utils/SweetAlert";

import ResetHero from "../../assets/images/Reset password.svg";
import PasswordStartIcon from "../../assets/icons/Group 22.svg";
import PasswordEndIcon from "../../assets/icons/basil_eye-closed-solid.svg";

export default function ResetPassword() {
  const { token } = useParams();

  return (
    <AuthLayout expressiveImage={ResetHero} title="إعادة تعيين كلمة المرور">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, { setSubmitting, validateForm }) => {
          const errors = await validateForm();
          const errorMessages = Object.values(errors);
          if (errorMessages.length === 0) {
            showAlert("success", "تم تغيير كلمة المرور بنجاح!");
            console.log("Reset password data:", { token, ...values });
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => {
          const btnState = getButtonState(
            !values.password || !values.confirmPassword
          );

          return (
            <Form className="w-full">
              {/* New Password */}
              <PasswordInput
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="كلمة المرور الجديدة"
                startIcon={PasswordStartIcon}
                endIcon={PasswordEndIcon}
                error={touched.password && errors.password ? errors.password : ""}
              />

              {/* Confirm New Password */}
              <PasswordInput
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="تأكيد كلمة المرور"
                startIcon={PasswordStartIcon}
                endIcon={PasswordEndIcon}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={btnState.disabled || isSubmitting}
                className={`w-full h-12 bg-primary text-white text-lg font-cairo font-medium rounded-full hover:bg-secondary transition mt-8 mb-2 ${btnState.className}`}
              >
                {isSubmitting ? "جاري التعيين..." : "تعيين كلمة المرور"}
              </button>

              {/* Link to login page */}
              <div className="text-center text-sm mb-8 font-cairo">
                <span className="text-black font-semibold">
                  العودة إلى تسجيل الدخول؟{" "}
                </span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
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
