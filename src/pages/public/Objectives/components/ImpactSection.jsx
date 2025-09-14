import React from "react";

import family from "../../../../assets/icons/family.svg";
import manager from "../../../../assets/icons/manager.svg";
import female from "../../../../assets/icons/female.svg";
import school from "../../../../assets/icons/school2.svg";

export default function ImpactSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-20 px-4">
        <div className="w-full mx-auto bg-babyBlue rounded-xl shadow-md p-10">

          {/* العنوان الأول */}
          <h2
            className="text-3xl font-semibold text-center text-primary mb-10 underline decoration-[#D9D9D9]"
            style={{ textUnderlineOffset: '10px' }}
          >
            تأثير الأهداف على المجتمع التعليمي
          </h2>

          {/* المجموعة الأولى */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-6 mb-16">

            {/* مربع 1 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={family} alt="family icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">الأهالي</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`قرارات واعية ومدروسة في اختيار              
 المدرسة المناسبة للأطفال`}
                </p>
              </div>
            </div>

            {/* مربع 2 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={manager} alt="manager icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">المُشرفين</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`أدوات فعّالة لمتابعة وتطوير    
 جودة التعليم في المنطقة`}
                </p>
              </div>
            </div>

            {/* مربع 3 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={female} alt="female icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">الطلاب</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`بيئة تعليمية محسّنة ومناسبة 
   لاحتياجاتهم التعليمية`}
                </p>
              </div>
            </div>
          </div>

          {/* العنوان الثاني */}
          <h2
            className="text-3xl font-semibold text-center text-primary mb-10 underline decoration-[#D9D9D9]"
            style={{ textUnderlineOffset: '10px' }}
          >
            تأثير الأهداف على البيئة المُجتمعيَّة
          </h2>

          {/* المجموعة الثانية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-6">

            {/* مربع 4 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={family} alt="family icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">الأهالي</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`تقليل الحيرة وتوفير الوقت والجهد عند              
 اختيار المدرسة المناسبة لأطفالهم`}
                </p>
              </div>
            </div>

            {/* مربع 5 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={manager} alt="manager icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">المُشرفين</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`تعزيز دورهم في تحسين جودة التعليم 
    ومتابعة الأداء بشكل منتظم`}
                </p>
              </div>
            </div>

            {/* مربع 6 */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm w-full max-w-[300px] min-h-[200px] mx-auto flex flex-col justify-center items-center text-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={school} alt="school icon" className="w-15 h-14" />
                  <h3 className="text-lg font-semibold">المدارس</h3>
                </div>
                <p className="whitespace-pre-line text-sm font-normal leading-relaxed">
                  {`رفع مستوى الخدمات والتحفيز على 
    التطوير المستمر والتميز التعليمي`}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
