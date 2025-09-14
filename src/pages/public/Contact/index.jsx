import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactCard from "../../public/Contact/components/ContactCard";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen font-cairo font-arabic bg-white" dir="rtl">

      {/* الهيدر */}
      <Header title="تواصل معنا" />

      {/* نموذج التواصل */}
      <ContactCard />

      {/* الفوتر */}
      <Footer />
      
    </div>
  );
}