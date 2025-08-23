import React from "react";
import { Link } from "react-router-dom";

// Page images
import Points from "../../assets/images/points.svg";
import LOGO from "../../assets/images/LOGO.svg";
import PasswordSuccess from "../../assets/images/Password Reset Success.svg";

export default function PasswordResetSuccess() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden font-arabic" dir="rtl">
      {/* Header with logo and points */}
      <header className="flex justify-between items-center px-12 py-2 flex-shrink-0">
        {/* Logo on the right */}
        <img src={LOGO} alt="LOGO" className="w-24 h-24" />

        {/* Points on the left */}
        <img src={Points} alt="Points" className="w-16 h-12 ml-[-37px]" />
      </header>

      {/* Main content centered */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Success image */}
        <div className="mb-8 flex justify-center">
          <img
            src={PasswordSuccess}
            alt="Password Reset Success"
            className="w-[500px] h-[500px] mt-15 object-contain"
          />
        </div>

        {/* Login button */}
        <Link to="/login">
          <button
            type="button"
            className="w-80 h-8 mb-15 bg-[#4682B4] text-white text-lg font-semibold rounded-full hover:bg-[#002147] transition"
          >
            تسجيل دخول
          </button>
        </Link>
      </main>
    </div>
  );
}
