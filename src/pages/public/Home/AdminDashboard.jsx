import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">

      {/* الهيدر */}
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">لوحة التحكم</h1>

          <div className="flex items-center space-x-4">
            <button className="material-symbols-rounded">notifications</button>
            <div className="flex items-center space-x-2">
              <img
                src="./assets/images/avatar-1.jpg"
                alt="المشرف"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-semibold">المشرف</p>
                <p className="text-xs">مدير</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-grow container mx-auto p-6">

        {/* ترحيب */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">مرحبًا بك!</h2>
          <p className="text-gray-700">هذه لوحة التحكم الخاصة بك.</p>
        </div>

        {/* البطاقات الرئيسية */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* بطاقة الملف الشخصي */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-4">
              <img
                src="./assets/images/avatar-1.jpg"
                alt="المشرف"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">المشرف</p>
                <p className="text-gray-500 text-sm">مدير النظام</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>البريد: xyz@mail.com</li>
              <li>الهاتف: +00 123-456-789</li>
            </ul>
          </div>

          {/* بطاقة المهام */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center">
            <p className="text-lg font-semibold mb-2">المهام المكتملة</p>
            <p className="text-3xl font-bold text-green-500">21</p>
          </div>

          {/* بطاقة المشاريع */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">المشاريع الأخيرة</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>تصميم جديد للموقع</li>
              <li>تحديث واجهة المستخدم</li>
              <li>تحسين الأداء</li>
            </ul>
          </div>

        </section>

      </main>

      {/* الفوتر */}
      <footer className="bg-blue-700 text-white p-4 text-center mt-6">
        <p className="text-sm">&copy; 2025 لوحة التحكم. جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}
