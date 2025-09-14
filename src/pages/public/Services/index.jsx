import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesSection from "../Services/components/ServicesSection";

export default function Services() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      {/* الهيدر */}
      <Header title="الخدمات" />

      {/* القسم الرئيسي */}
      <ServicesSection />

      {/* القسم الأخير */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-cairo font-semibold text-[#5F5959] mb-6">
            ابدأ الآن في استكشاف المدارس{" "}
            <span className="text-[#F9CA54]">وتقييمها</span> عبر منصتنا.
          </h2>
          <button className="bg-primary w-[317px] text-white px-6 py-3 rounded-md hover:bg-[#001a39] transition duration-300">
            قيّم مدرستك الآن
          </button>
        </div>
      </section>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}
