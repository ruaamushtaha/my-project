import React from "react";

import staryallow from "../../../../assets/icons/staryallow.svg";

import alamal from "../../../../assets/images/alamal.png";
import alfarooq from "../../../../assets/images/alfarooq.png";
import alnoor from "../../../../assets/images/alnoor.png";

const topSchools = [
  {
    title: "مدرسة الأمل",
    image: alamal,
    rating: 4.9,
    description: "نظافة عالية وإدارة فعّالة ",
    location: "خان يونس",
  },
  {
    title: "مدرسة النور",
    image: alnoor,
    rating: 4,
    description: "أداء أكاديمي متميّز",
    location: "طولكرم",
  },
  {
    title: "مدرسة الفاروق",
    image: alfarooq,
    rating: 4.5,
    description: "أنشطة لا صفّية ممتازة",
    location: "رام الله",
  },
];

export default function BestSchools() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="py-16 px-4 bg-babyBlue">
        {/* العنوان */}
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          أبرز المدارس لهذا الشهر
        </h2>

        {/* البطاقات */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSchools.map((school, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 text-right">
              {/* صورة المدرسة */}
              <img
                src={school.image}
                alt={school.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              {/* محتوى البطاقة */}
              <div className="flex justify-between items-start mb-4">
                {/* الجهة اليمنى */}
                <div className="text-sm text-black space-y-1 text-right">
                  <div className="font-semibold text-2xl">{school.title}</div>
                  <div className="flex items-center gap-0 text-yellow-500">
                    {[...Array(5)].map((_, idx) => (
                      <img key={idx} src={staryallow} alt="نجمة" className="w-4 h-4" />
                    ))}
                    <span className="font-light">{school.rating}</span>
                  </div>
                  <div className="font-light">{school.description}</div>
                </div>

                {/* الجهة اليسرى */}
                <span className="text-sm font-light text-[#4CAF50]">{school.location}</span>
              </div>

              {/* الأزرار */}
              <div className="flex justify-between gap-2">
                <button className="w-1/2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-medium">
                  قيّم الآن
                </button>
                <button className="w-1/2 border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium">
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