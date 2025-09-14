import React from "react";

import logo from "../../../../assets/icons/LOGO.svg";
import females from "../../../../assets/images/females.png";

export default function GoalVisionSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="grid md:grid-cols-2 gap-4 py-20 items-center px-0">

        {/* الفقرات */}
        <div className="space-y-6 md:order-2 text-2xl px-4">

          {/* الهدف */}
          <div>
            <h3 className="inline-block text-xl bg-primary text-white font-bold px-6 py-2 mb-2">
              الهدف
            </h3>
            <p className="text-gray-700 leading-relaxed font-semibold whitespace-pre-line">
              {`منصة رؤى هي منصـــة فلسطيـــــنية مستقــــلة تهدف إلى تقييـــم المدارس بمختلف مستوياتها، بطريــقة مهنية وشفافة، بما يســـاعد
إدارات المدارس على تطوير أدائها، ويمنح أوليــاء الأمــور معلومــــات دقيــقة وموضوعية لاختيار المدرسة الأنسب لأبنائهم.`}
            </p>
          </div>

          {/* الرؤية */}
          <div>
            <h3 className="inline-block text-xl bg-primary text-white font-bold px-6 py-2 mb-2">
              الرؤية
            </h3>
            <p className="text-gray-700 leading-relaxed font-semibold whitespace-pre-line">
              {`أن تكون "رؤى" المرجع الأول في فلسطين لتقييـــــم المدارس وتعزيز
ثقافة الجودة والتميز في التعليم، بما ينعكس على بنــــــاء أجيال أكثر
وعياً وكفاءة.`}
            </p>
          </div>
        </div>

        {/* الصورة داخلها اللوقو */}
        <div className="flex justify-start md:order-1">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md">
            <img
              src={females}
              alt="صورة لطالبات فلسطينيات"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/60 z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img
                src={logo}
                alt="شعار منصة رؤى"
                className="w-20 md:w-24 lg:w-32 h-auto"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}