import React from "react";

import star from "../../../../assets/icons/star.svg";
import school from "../../../../assets/icons/school.svg";
import location from "../../../../assets/icons/location.svg";
import Infinity from "../../../../assets/icons/Infinity.svg";

// بيانات المربعات
const items = [
  {
    icon: location,
    text: `توسيع نطاق التغطية ليشمل كـــــــافة المــــــــــدارس
الفلسطيــــنية دون استثنــــاء.`,
  },
  {
    icon: school,
    text: `تعزيز الشراكات مع الجامعات ومراكـــــز البحث لتطويــــر
مؤشرات جودة تعليمية مبتكرة.`,
  },
  {
    icon: star,
    text: `تطوير أدوات تقييم أكثر تخصصًا تراعي خصوصية المراحل
التعليمية المختلفة.`,
  },
  {
    icon: location,
    text: `تطوير أدوات تقييم أكثر تخصصًا تراعي خصوصية المراحل
التعليمية المختلفة.`,
  },
];

export default function DevelopmentPlanSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-4">

        {/* العنوان */}
        <div className="relative w-full mb-4">
          <img src={Infinity} alt="Infinity" />
          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-black z-10 mr-6">
            خطة التطوير المستقبلية
          </h2>
        </div>

        {/* المربعات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-babyBlue w-16 h-16 flex items-center justify-center rounded-md">
                <img
                  src={item.icon}
                  alt={`icon-${i}`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-secondary font-medium whitespace-pre-line">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}