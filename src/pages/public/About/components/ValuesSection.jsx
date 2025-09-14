import React from "react";

import transparency from "../../../../assets/icons/transparency.svg";
import improvement from "../../../../assets/icons/improvement.svg";
import Credibility from "../../../../assets/icons/Credibility.svg";

export default function ValuesSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-[#AEC8DEA8] py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* العنوان والوصف */}
          <div className="flex items-start gap-4 text-white mr-60">
            <h2 className="text-3xl font-bold whitespace-nowrap inline-block bg-primary px-6 py-1">
              القيم
            </h2>
            <p className="text-3xl leading-relaxed font-bold text-secondary whitespace-pre-line">
              {`قيمنا ليست مجرد مبادئ مكتوبة، بل هي
بوصلة توجه خطواتنا وتحدد طريقة عملنا`}
            </p>
          </div>

          {/* المربعات الثلاثة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">

            {/* الشفافية */}
            <div className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-start h-[400px]">
              <div className="w-full h-[200px] flex items-center justify-center">
                <img
                  src={transparency}
                  alt="رمز الشفافية"
                  className="h-[160px] object-contain pt-5"
                />
              </div>
              <div className="p-4 space-y-1 text-center">
                <h3 className="text-xl font-bold text-black mt-4 mb-4">الشفافية</h3>
                <p className="text-sm leading-relaxed font-semibold text-primary whitespace-pre-line">
                  {`تقديم معلومات واضحــــة
موثوقة بعيداً عن أي تحيّز`}
                </p>
              </div>
            </div>

            {/* المصداقية */}
            <div className="bg-primary text-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-start h-[400px]">
              <div className="w-full h-[200px] flex items-center justify-center">
                <img
                  src={Credibility}
                  alt="رمز المصداقية"
                  className="h-[160px] object-contain pt-5"
                />
              </div>
              <div className="p-4 space-y-1 text-center">
                <h3 className="text-xl font-bold text-white mt-4 mb-4">المصداقية</h3>
                <p className="text-sm leading-relaxed font-semibold text-white whitespace-pre-line">
                  {`الاعتماد على أدوات تقييم
دقيقة ومعايير موضوعية`}
                </p>
              </div>
            </div>

            {/* التطوير المستمر */}
            <div className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-start h-[400px]">
              <div className="w-full h-[200px] flex items-center justify-center">
                <img
                  src={improvement}
                  alt="رمز التطوير المستمر"
                  className="h-[160px] object-contain pt-5"
                />
              </div>
              <div className="p-4 space-y-1 text-center">
                <h3 className="text-xl font-bold text-black mt-4 mb-4">التطوير المستمر</h3>
                <p className="text-sm leading-relaxed font-semibold text-primary whitespace-pre-line">
                  {`دعم المدارس لرفع جودة 
التعليم والارتقــــاء بالبيئة
المدرسية`}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}