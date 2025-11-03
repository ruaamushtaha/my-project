import React from "react";
import person from "../../../../assets/images/person.png";
import Infinity from "../../../../assets/icons/Infinity.svg";

export default function SchoolEvaluation() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="py-10 px-4" >
        <div className="max-w-6xl mx-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* جهة التقييمات */}
          <div className=" space-y-6 order-2 md:order-1">
            <div className="relative w-full py-2">
          <img src={Infinity} alt="Infinity" loading="lazy" />
          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-primary z-10 mr-8">تقييم المدرسة:          </h2>
        </div>


            {/* تعليق 1 */}
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none p-4 w-[450px] h-[110px] flex items-center justify-between  shadow-md">
              <div className="bg-[#F1F4F8] rounded-full w-12 h-12 flex items-center justify-center">
                <img src={person} alt="صورة ولي الأمر" className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center text-right w-[80%]">
                <p className="text-xs mb-1 text-black font-medium">
                  ولي أمر -أب- <span className="text-[#19191966] font-normal">الآن</span>
                </p>
                <p className="text-sm text-[#191919] font-light leading-relaxed whitespace-pre-line">
                  {`المدرسة وفّرت بيئة تعليمية ممتازة لبنتي، مستوى الاهتمام
بالطلاب عالي جداً.`}
                </p>
              </div>
            </div>

            {/* تعليق 2 */}
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none p-4 w-[450px] h-[110px] flex items-center justify-between mr-20  shadow-md">
              <div className="bg-[#F1F4F8] rounded-full w-12 h-12 flex items-center justify-center">
                <img src={person} alt="صورة ولي الأمر" className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center text-right w-[80%]">
                <p className="text-xs mb-1 text-black font-medium">
               مشرف <span className="text-[#19191966] font-normal">قبل يومين</span>
                </p>
                <p className="text-sm text-[#191919] font-light leading-relaxed whitespace-pre-line">
                  {`تطوّر ملحُوظ في الأنشطة الرياضيّة واللامنهجيّة.`}
                </p>
              </div>
            </div>

          </div>

          {/* جهة الدعوة للتقييم */}
          <div className="text-gray-700 leading-relaxed font-semibold space-y-6 md:order-2 text-2xl px-20 mt-40 text-center">
            <div className="space-y-3">
              <p className="text-4xl">
                ساهم <span className="text-yallow">بتقييمك</span> الآن!
              </p>
              <p className="text-xl">
                لتشجيع التطوير وبناء بيئة تعليمية أفضل.
              </p>
            </div>
            <button className="bg-primary w-[320px] font-medium text-white px-6 py-3 rounded-md hover:bg-secondary transition duration-300">
              قيّم مدرستك الآن
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}