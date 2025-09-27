


import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SchoolInfo from "../../public/SchoolProfile/components/SchoolInfo";
import Briefsummary from "../../public/SchoolProfile/components/Briefsummary";
import SchoolEvaluation from "../../public/SchoolProfile/components/SchoolEvaluation";
import GenerelEvaluation from "../../public/SchoolProfile/components/GenerelEvaluation";


export default function About() {
  return (
    <div className="flex flex-col min-h-screen font-cairo font-arabic bg-white" dir="rtl">

      {/* الهيدر */}
      <Header title="المدارس" />

      {/* نموذج التواصل */}
      <SchoolInfo />
<Briefsummary/>
<SchoolEvaluation/>
<GenerelEvaluation/>
      {/* الفوتر */}
      <Footer />
      
    </div>
  );
}