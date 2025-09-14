import React from "react";

import building from "../../../../assets/icons/building.svg";
import transparency from "../../../../assets/icons/transparencyblue.svg";
import improvement from "../../../../assets/icons/improvementblue.svg";
import Infinity from "../../../../assets/icons/Infinity.svg";
import StatCard from "../components/StatCard";

export default function StatisticsSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-4">
        {/* العنوان */}
        <div className="relative w-full pb-8">
          <img src={Infinity} alt="Infinity" />
          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-secondary z-10 mr-8">
            إحصائيات عامّة
          </h2>
        </div>

        {/* البطاقات */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <StatCard
              icon={building}
              value="23"
              description={`تمكّنا حتى الآن من تقييم ثلاث وعشرون مدارس
مختلفة، مما يوفّر صورة أوّلية عن جودة التعليم
والخدمات المقدّمة`}
              dashArray="210"
              dashOffset="45"
              rotation="50"
            />

            <StatCard
              icon={transparency}
              value="1,142"
              description={`أُجري حتى الآن عشرات التقييمات تفصيلية من قِبل
المشرفين والأهالي لتغطية مختلف الجوانب التعليمية
والإدارية`}
              height="h-[300px]"
              dashArray="251"
              dashOffset="37"
              rotation="160"
            />

            <StatCard
              icon={improvement}
              value="%85"
              description={`المؤشرات تُظهر أن الأداء العام للمدارس مصنّف عند
مستوى "جيد جداً"، مع فرص للتحسين نحو التميّز.`}
              dashArray="200"
              dashOffset="0"
              rotation="30"
            />
          </div>
        </div>
      </section>
    </div>
  );
}