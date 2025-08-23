// src/pages/error/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
      <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gray-50 text-center px-4">
        <h1 className="text-8xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">
          الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
  );
}
