import React from "react";
import Infinity from "../../../../assets/icons/Infinity.svg";

export default function Statistics() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-0">

        {/* عنوان الإحصائيات */}
        <div className="relative w-full">
          <img src={Infinity} alt="Infinity" />
          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-black z-10 mr-8">
            الإحصائيات
          </h2>
        </div>

        {/* البطاقات الإحصائية */}
        <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* إحصائية المديريات */}
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">23+</h3>
            <div className="text-gray-700 font-light leading-relaxed">
              <p className="font-bold">مديــــرية تعليـمية</p>
              <p className="text-gray-700 font-semibold leading-relaxed whitespace-pre-line">
                {`تم تغطيتــــــــها في
مختلف المحافظات.`}
              </p>
            </div>
          </div>

          {/* إحصائية المدارس */}
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">700+</h3>
            <div className="text-gray-700 font-light leading-relaxed">
              <p className="font-bold">مدرســــــــــــــــــــة</p>
              <p className="font-semibold whitespace-pre-line">
                {`أُدرجـــــــــت وقُيِّمت
عبر المنصـــــــــــــة.`}
              </p>
            </div>
          </div>

          {/* إحصائية المشرفين */}
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">69+</h3>
            <div className="text-gray-700 font-light leading-relaxed">
              <p className="font-bold">مشرفًا ومعلمًــــــــا</p>
              <p className="font-semibold whitespace-pre-line">
                {`شاركوا في عمليـــــة
التقييـــــــــــــــــــــم.`}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}