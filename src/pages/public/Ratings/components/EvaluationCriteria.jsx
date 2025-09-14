import React from "react";

import Infinity from "../../../../assets/icons/Infinity.svg";
import SchoolCard from "../components/SchoolCard";

export default function EvaluationCriteria() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-4" >
        <div className="max-w-6xl mx-auto">

          {/* العنوان */}
          <div className="relative w-full pb-8">
            <img src={Infinity} alt="رمز لا نهائي يمثل الاستمرارية" />
            <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-primary z-10 mr-8">
              معايير التقييم:
            </h2>
          </div>

          {/* البطاقات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

            {/* بطاقة مدرسة النجاح الحديثة */}
            <SchoolCard
              name="مدرسة النجاح الحديثة"
              description="حصلت على أعلى تقييم في جودة التعليم لهذا الشهر"
              rating="4.5"
              votes="6,896"
              criteria={[
                { label: "جودة التعليم", percentage: 95 },
                { label: "الإدارة والانضباط المدرسي", percentage: 90 },
                { label: "النظافة والبيئة المدرسية", percentage: 75 },
                { label: "الأنشطة والفعاليات", percentage: 65 },
                { label: "المرافق والخدمات", percentage: 90 },
              ]}
            />

            {/* بطاقة مدرسة الأمل النموذجية */}
            <SchoolCard
              name="مدرسِة الأمل النموذجيّة"
              description="حصلت على أعلى تقييم في الأنشطة لهذا الشهر."
              rating="4.2"
              votes="2,896"
              criteria={[
                { label: "جودة التعليم", percentage: 80 },
                { label: "الإدارة والانضباط المدرسي", percentage: 90 },
                { label: "النظافة والبيئة المدرسية", percentage: 80 },
                { label: "الأنشطة والفعاليات", percentage: 100 },
                { label: "المرافق والخدمات", percentage: 95 },
              ]}
            />
          </div>

          {/* زر التقييم */}
          <div className="text-center mt-12">
            <button className="bg-primary w-[320px] font-medium text-white px-6 py-3 rounded-md hover:bg-secondary transition duration-300">
              قيّم مدرستك الآن
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}