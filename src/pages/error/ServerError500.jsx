import React from "react";
import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-blue-100 text-center px-6">
      <h1 className="text-[120px] font-extrabold text-blue-600 animate-bounce">500</h1>
      <p className="text-2xl text-gray-700 mb-4">عذراً، حدث خطأ بالخادم</p>
      <p className="text-gray-500 mb-8">حصل خلل غير متوقع في النظام، برجاء المحاولة لاحقًا</p>

      <div className="flex gap-4">
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition"
        >
          الرئيسية
        </Link>
        <Link 
          to="/contact" 
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-400 transition"
        >
          اتصل بنا
        </Link>
      </div>
    </div>
  );
}
