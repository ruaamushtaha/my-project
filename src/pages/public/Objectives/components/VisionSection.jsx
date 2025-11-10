import React from "react";
import bigSchool from "../../../../assets/icons/bigSchool.svg";

export default function VisionSection({ data }) {
  const defaultData = {
    title: "الرؤية المُستقبليَّة",
    visionItems: [
      {
        id: 1,
        text: "توسيع نطاق التقييم ليشمل المعلمين والطلاب.",
        priority: "high",
        timeline: "نوفمبر 2025"
      },
      {
        id: 2,
        text: "إدخال أدوات ذكاء اصطناعي للتوصية بالمدارس بناءً على تفضيلات الأسرة.",
        priority: "medium",
        timeline: "يناير 2026"
      },
      {
        id: 3,
        text: "تطوير تطبيق محمول لسهولة الوصول للتقييمات والبيانات.",
        priority: "high",
        timeline: "مارس 2026"
      },
      {
        id: 4,
        text: "ربط النظام بمنصات تعليمية أخرى على المستوى الوطني.",
        priority: "medium",
        timeline: "يونيو 2026"
      }
    ]
  };

  const visionData = data || defaultData;

  return (
    <section className="flex flex-col md:flex-row items-start p-8 bg-white font-cairo" dir="rtl">
      {/* الجدول الزمني */}
      <div className="w-full md:w-2/3 relative mr-10">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-right flex items-center gap-2">
          {visionData.title}
        </h2>

        <div className="absolute top-11 right-5 h-[28rem] w-0.5 bg-gray-300"></div>

        <ul className="space-y-12 relative">
          {visionData.visionItems.map((item, index) => (
            <li key={item.id} className="flex items-start relative">
              <span className="w-3 h-3 bg-secondary rounded-full absolute right-0 -translate-x-3 translate-y-1 flex items-center justify-center">
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </span>

              {index > 0 && (
                <div className="absolute right-0 mr-9 top-0 w-96 border-t-2 border-gray-200"></div>
              )}

              {/* النصوص */}
              <div className="mr-8 text-right">
                <p className="text-sm text-slate-900 font-semibold mt-2">{item.timeline}</p>
                <p className="text-gray-700">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* صورة  */}
      <div className="w-full md:w-1/1 flex justify-center mb-8 md:mb-0">
        <div className="w-100 h-100 flex justify-center items-center">
          <img src={bigSchool} alt="أيقونة" className="w-full h-full object-contain" />
        </div>
      </div>
    </section>
  );
}