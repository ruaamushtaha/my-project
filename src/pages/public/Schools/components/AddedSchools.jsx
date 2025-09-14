import React from "react";

import alfajr from "../../../../assets/images/alfajr.png";
import alqema from "../../../../assets/images/alqema.png";
import alawda from "../../../../assets/images/alawda.png";

// بيانات المدارس
const addedSchools = [
  {
    name: "مدرسة الفجر",
    location: "بيت لحم",
    image: alfajr,
  },
  {
    name: "مدرسة القمّة",
    location: "النصيرات",
    image: alqema,
  },
  {
    name: "مدرسة العودة",
    location: "نابلس",
    image: alawda,
  },
];

export default function AddedSchools() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="py-16 px-4 bg-babyBlue">
        {/* العنوان والزر */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
          <h2 className="text-2xl font-semibold text-primary">
            مدارس مُضافة مُؤخرًا
          </h2>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
            عرض الكل
          </button>
        </div>

        {/* البطاقات */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {addedSchools.map((school, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden p-4"
            >
              {/* صورة المدرسة */}
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-48 object-cover rounded-3xl"
              />

              {/* المحتوى أسفل الصورة */}
              <div className="flex justify-between items-center px-4 pb-4 pt-2">
                {/* الجهة اليمنى */}
                <div className="text-right text-sm text-gray-700 space-y-1">
                  <div className="font-semibold text-2xl">{school.name}</div>
                  <div className="text-[#888E99] font-normal">
                    {school.location}
                  </div>
                </div>

                {/* الجهة اليسرى */}
                <button className="bg-white text-primary border border-primary px-3 py-1 rounded-lg hover:bg-primary-dark transition font-medium text-sm">
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
