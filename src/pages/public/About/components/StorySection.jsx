import React from "react";

import girl from "../../../../assets/images/girl.png";
import twoTrue from "../../../../assets/icons/twoTrue.svg";
import Infinity from "../../../../assets/icons/Infinity.svg";

export default function StorySection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="grid md:grid-cols-2 gap-4 py-20 items-center">

        {/* صورة الفتاة */}
        <div className="flex justify-start md:order-2">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <img
              src={girl}
              alt="صورة فتاة فلسطينية"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/30 z-0"></div>
          </div>
        </div>

        {/* النص */}
        <div className="space-y-6 md:order-1 text-2xl">
          <div>

            {/* العنوان */}
            <div className="relative w-full">
              <img src={Infinity} alt="Infinity" />
              <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-black z-10 mr-8">
                القصة وراء المنصة
              </h2>
            </div>

            {/* الفقرة الأولى */}
            <div className="text-gray-700 leading-relaxed font-medium space-y-1 pb-7 pr-20">
              <div className="flex items-center gap-4">
                <img src={twoTrue} alt="رمز تحقق مزدوج" />
                <p>انطلقت فكرة منصة رؤى من الحاجة الملحــة إلى وجود</p>
              </div>
              <p className="text-gray-700 leading-relaxed font-semibold whitespace-pre-line">
                {`مصدر موثوق وموحد يعكس واقع المدارس في فلسطيـن،
ويمنح أولياء الأمور القدرة على اتخاذ قـــــرارات مبنيـــة على
بيانات لا على انطباعات.`}
              </p>
            </div>

            {/* الفقرة الثانية */}
            <div className="text-gray-700 leading-relaxed font-medium space-y-1 pr-20">
              <div className="flex items-center gap-4">
                <img src={twoTrue} alt="رمز تحقق مزدوج" />
                <p>في ظل التباين الكبير بين المدارس من حيث الإمكـانيات</p>
              </div>
              <p className="text-gray-700 leading-relaxed font-semibold whitespace-pre-line">
                {`والبرامج التعليمية والأنشطة، جاءت "رؤى" لتكـون جسرًا بين
المدرسة والمجتمع، تفتح أبواب التقييم والمساءلة، وتدفـع
باتجاه تطوير التعليم كحق أساسي لكل طالب.`}
              </p>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}