
import React from "react";

import Infinity from "../../../../assets/icons/Infinity.svg";
import schoolicon from "../../../../assets/icons/schoolicon.svg";
import team from "../../../../assets/icons/team.svg";
import office from "../../../../assets/icons/office.svg";
import StatCard from "../components/StatCard";

export default function StatisticsSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="py-16 px-4">
        <div className="relative w-full pb-8">
          <img src={Infinity} alt="Infinity" loading="lazy" />
          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-secondary z-10 mr-8">
            إحصائيات عامّة
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <StatCard
              icon={office}
              value="23"
              description={`23 مديريّة موزّعة ما بين الضفّة الغربيّة و قطاع غزّة المحاصر.`}
              dashArray="210"
              dashOffset="45"
              rotation="50"
            />
            <StatCard
              icon={schoolicon}
              value="3,142"
              description={`3,142 مدرسة موزّعة على 23 مديريّة في مناطق الضّفّة وقطاع غزّة.`}
              height="h-[300px]"
              dashArray="251"dashOffset="37"
              rotation="160"
            />
            <StatCard
              icon={team}
              value="480"
              description={`لدينا 480 مشرف مسؤوليين عن عملية التقييم، موزّعين على المديريات.`}
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
