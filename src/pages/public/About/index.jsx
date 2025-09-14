import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import GoalVisionSection from "../About/components/GoalVisionSection";
import ValuesSection from "../About/components/ValuesSection";
import StorySection from "../About/components/StorySection";
import StatisticsSection from "../About/components/StatisticsSection";
import PartnersSection from "../About/components/PartnersSection";
import DevelopmentPlanSection from "../About/components/DevelopmentPlanSection";




export default function About() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">

      {/* القسم الأول: الهيدر */}
      <Header title="عن المنصّة" />

      {/* القسم الثاني: الهدف والرؤية */}
      <GoalVisionSection />

      {/* القسم الثالث: القيم */}
      <ValuesSection />

      {/* القسم الرابع: القصة وراء المنصة */}
      <StorySection />

      {/* القسم الخامس: الإحصائيات */}
      <StatisticsSection />

      {/* القسم السادس: شركاؤنا */}
      <PartnersSection />

      {/* القسم السابع: خطة التطوير المستقبلية */}
      <DevelopmentPlanSection />

      {/* القسم الأخير: الفوتر */}
      <Footer />
    </div>
);
}
