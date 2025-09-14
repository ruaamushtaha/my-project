import React from "react";

import partner from "../../../../assets/images/partner.jpg";

export default function Partners() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-secondary py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-6 flex-wrap">

          {/* عنوان القسم */}
          <h2 className="text-white text-4xl font-bold">
            شركاؤنا:
          </h2>

          {/* صورة الشريك */}
          <img
            src={partner}
            alt="شعار وزارة التربية والتعليم العالي"
            className="w-[374px] h-[285px] rounded-lg"
          />

        </div>
      </section>
    </div>
  );
}