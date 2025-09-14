import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";


import StatisticsSection from "../../public/Ratings/components/StatisticsSection";
import ParentsRate from "../../public/Ratings/components/ParentsRate";
import EvaluationCriteria from "../../public/Ratings/components/EvaluationCriteria";

export default function Ratings() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">

      {/* الهيدر */}
      <Header title="التقييمات" />

      {/* القسم الأول: الإحصائيات العامة */}
      <StatisticsSection />

      {/* القسم الثاني: تقييمات أولياء الأمور */}
      <ParentsRate />

      {/* القسم الثالث: معايير التقييم */}
      <EvaluationCriteria />

      {/* الفوتر */}
      <Footer />
    </div>
);
}
