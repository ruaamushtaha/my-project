import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryGoal from "../Objectives/components/PrimaryGoal";
import SecondaryGoals from "../Objectives/components/SecondaryGoals";
import ImpactSection from "../Objectives/components/ImpactSection";
import VisionSection from "../Objectives/components/VisionSection";

export default function Objectives() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">

      {/* الهيدر */}
      <Header title="الأهداف" />

      {/* القسم الثاني: الهدف الأساسي */}
      <PrimaryGoal />

      {/* القسم الثالث: الأهداف الفرعية */}
      <SecondaryGoals />

      {/* القسم الرابع: تأثير الأهداف */}
      <ImpactSection />

      {/* القسم الخامس: الرؤية المستقبلية */}
      <VisionSection />

      {/* الفوتر */}
      <Footer />

    </div>
  );
}
