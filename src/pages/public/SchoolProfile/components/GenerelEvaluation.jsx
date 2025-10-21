import React from "react";
import staryallow from "../../../../assets/icons/staryallow.svg";

export default function GenerelEvaluation() {
  function SchoolCard({ name, description, rating, votes, criteria }) {
    return (
      <div dir="rtl" className="w-full">
        <div className="flex justify-start mb-6 px-4">
          <div className="text-right">
            <h3 className="text-xl font-semibold text-black">{name}</h3>
            <p className="text-sm text-black font-normal">{description}</p>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="bg-white rounded-xl shadow-md p-12 flex flex-row gap-2 w-full">
          
          <div className="flex items-center gap-4 w-1/3 pr-20">
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-normal">{votes}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={staryallow}
                    alt="نجمة تقييم صفراء"
                    className={`w-4 h-4 ${i < Math.floor(rating) ? "" : "opacity-30"}`}
                  />
                ))}
              </div>
            </div>
            <span className="text-5xl font-bold">{rating}</span>
          </div>

          {/* جهة المعايير */}
          <div className="flex-1 flex flex-col gap-3">
            {criteria.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-[#A3A3A3] font-light w-1/3 text-left">
                  {item.label}
                </span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#3D8C40] h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* البطاقات */}
          <div className="grid grid-cols-1 gap-y-8">
            <SchoolCard
              name="التقييم العام للمدرسة"
              description="(حصلت على أعلى تقييم في الإدارة والانضباط المدرسي لهذا الشهر)"
              rating={4.5}
              votes="6,896"
              criteria={[
                { label: "الإدارة والانضباط المدرسي", percentage: 95 },
                { label: "جودة التعليم", percentage: 92 },
                { label: "المرافق والخدمات", percentage: 95 },
                { label: "النظافة والبيئة المدرسية", percentage: 80 },
                { label: "الأنشطة والفعاليات", percentage: 70 },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
