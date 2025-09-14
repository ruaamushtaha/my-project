import React from "react";
import person from "../../../../assets/images/person.png";

export default function ParentsRate() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-babyBlue py-16 px-4" >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* جهة التقييمات */}
          <div className="p-6 space-y-6 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-primary mb-2">
              جزء من تقييمات أولياء الأمور
            </h3>

            {/* تعليق 1 */}
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none p-4 w-[450px] h-[110px] flex items-center justify-between">
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
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none p-4 w-[450px] h-[110px] flex items-center justify-between mr-20">
              <div className="bg-[#F1F4F8] rounded-full w-12 h-12 flex items-center justify-center">
                <img src={person} alt="صورة ولي الأمر" className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center text-right w-[80%]">
                <p className="text-xs mb-1 text-black font-medium">
                  ولي أمر -أم- <span className="text-[#19191966] font-normal">قبل يومين</span>
                </p>
                <p className="text-sm text-[#191919] font-light leading-relaxed whitespace-pre-line">
                  {`هناك بعض الملاحظات على المرافق، لكن بشكل عام التجربة
إيجابية والتعليم مميز.`}
                </p>
              </div>
            </div>

            {/* تعليق 3 */}
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none p-4 w-[450px] h-[110px] flex items-center justify-between">
              <div className="bg-[#F1F4F8] rounded-full w-12 h-12 flex items-center justify-center">
                <img src={person} alt="صورة ولي الأمر" className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-center text-right w-[80%]">
                <p className="text-xs mb-1 text-black font-medium">
                  ولي أمر -أم- <span className="text-[#19191966] font-normal">قبل ساعة</span>
                </p>
                <p className="text-sm text-[#191919] font-light leading-relaxed">
                  أتمنى إضافة أنشطة أكثر في الرياضيات.
                </p>
              </div>
            </div>
          </div>

          {/* جهة الدعوة للتقييم */}
          <div className="text-gray-700 leading-relaxed font-semibold space-y-6 md:order-2 text-2xl px-20 mt-20 text-center">
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