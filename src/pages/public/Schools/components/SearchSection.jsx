import React from "react";

import building from "../../../../assets/icons/buildingsblack.svg";
import students from "../../../../assets/icons/studentss.svg";
import locate from "../../../../assets/icons/locate.svg";

import school from "../../../../assets/images/School 1.jpg";
import school2 from "../../../../assets/images/School 2.jpg";
import school3 from "../../../../assets/images/School 3.jpg";

import search2 from "../../../../assets/icons/search2.svg";
import staryallow from "../../../../assets/icons/staryallow.svg";

const schoolCards = [
  {
    title: "مدرسة النجاح الحديثة",
    image: school,
    rating: "4.8",
    ratingText: "(430 تقييم)",
    students: "500 طالب",
    level: "إبتدائي-ثانوي",
    location: "غزة-الرمال",
  },
  {
    title: "مدرسة الأمل النموذجيَّة",
    image: school2,
    rating: "4.8",
    ratingText: "(430 تقييم)",
    students: "1100 طالب",
    level: "ابتدائي",
    location: "طولكرم",
  },
  {
    title: "مدرسة النجاح الحديثة",
    image: school3,
    rating: "4.8",
    ratingText: "(430 تقييم)",
    students: "720 طالب",
    level: "ثانوي",
    location: "خليل الرحمن",
  },
];

export default function SearchSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">

      {/* قسم البحث */}
      <section className="py-10 px-4 bg-white w-full">
        <div className="mx-auto">
          <div className="flex items-center bg-[#F2F3F0] rounded-lg px-4 py-3 shadow-sm border border-gray-300">
            {/* أيقونة البحث */}
            <img
              src={search2}
              alt="أيقونة البحث"
              className="h-5 w-5 object-contain ml-2"
            />

            {/* حقل الإدخال */}
            <input
              type="text"
              placeholder="ابحث عن اسم المدرسة أو اسم المنطقة"
              className="w-full bg-[#F2F3F0] text-right focus:outline-none placeholder-[#A9A9A9] font-light"
            />
          </div>
        </div>
      </section>

      {/* قسم المدارس */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {schoolCards.map((school, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">

              {/* صورة المدرسة */}
              <div className="relative h-48">
                <img
                  src={school.image}
                  alt="صورة مدرسة"
                  className="w-full h-full object-cover"
                />

                {/* تقييم داخل الصورة */}
                <div className="absolute left-2 top-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <img src={staryallow} alt="نجمة التقييم" className="w-4 h-4" />
                  <span className="text-[#4CAF50] font-medium">{school.rating}</span>
                  <span className="text-black font-light">{school.ratingText}</span>
                </div>
              </div>

              {/* عنوان ومعلومات المدرسة */}
              <div className="p-4 text-right">
                <h3 className="text-lg font-semibold mb-3">{school.title}</h3>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <img src={locate} alt="موقع المدرسة" className="w-4 h-4" />
                    <span className="font-normal">{school.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src={students} alt="عدد الطلاب" className="w-4 h-4" />
                    <span className="font-normal">{school.students}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img src={building} alt="المستوى التعليمي" className="w-4 h-4" />
                    <span className="font-normal">{school.level}</span>
                  </div>
                </div>

                {/* زر عرض التفاصيل */}
                <button className="w-full font-medium text-primary border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition">
                  عرض التفاصيل
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}