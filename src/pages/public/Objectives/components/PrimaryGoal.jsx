import React from "react";

import greenschool from "../../../../assets/images/greenschool.png";

export default function PrimaryGoal() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="grid md:grid-cols-2 gap-4 py-20 items-center px-0" >
        <div className="text-gray-700 leading-relaxed  font-semibold space-y-6 md:order-2 text-2xl px-20">
          <div>
            <p>
              ساهم معنا في <span className="text-[#4CAF50]">تحقيق</span> أهدافنا وكن
            </p>
            <p>
              جزءًا من تطوير التعليم في فلسطين.
            </p>
          </div>

          <button className="bg-primary w-[320px]  font-medium text-white px-6 py-3 mr-4 rounded-md hover:bg-secondary transition duration-300">
            قيّم مدرستك الآن
          </button>
        </div>

        {/* الصورة مع الكلام */}
        <div className="flex justify-start md:order-1">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
            <img
              src={greenschool}
              alt="green school"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/20 z-0"></div>

            {/* النص في منتصف الصورة */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-4 space-y-2">
              <h3 className="text-yallow text-3xl font-semibold ml-36">
                الهدف الأساسي
              </h3>
              <div>
                <p className="whitespace-pre-line text-white text-xl font-semibold">
                  {`
        تمكين الأهالي من اختيار المدارس المناسبة
                لأبنائهم من خلال تقييمات موثوقة وشفَّافة`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
