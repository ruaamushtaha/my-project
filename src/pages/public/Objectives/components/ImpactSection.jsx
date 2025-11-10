

import React, { useState, useEffect, useRef } from "react";
import studentIcon from "../../../../assets/icons/female.svg";
import parentIcon from "../../../../assets/icons/family.svg";
import schoolBg from "../../../../assets/images/focus1.png";
import school from "../../../../assets/icons/school2.svg";

// Custom hook for section animation

const useSectionAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isVisible, elementRef };
};

export default function GoalsBoardSection() {
  const rightSection = useSectionAnimation();
  const leftSection = useSectionAnimation();

  return (
    <section className="font-cairo py-16 px-6 bg-white" dir="rtl">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
        {/* القسم الأيمن */}
        <div
          ref={rightSection.elementRef}
          className={`bg-secondary text-white rounded-2xl p-8 flex flex-col w-auto h-fit transform transition-all duration-1000 ease-out ${
            rightSection.isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-[#FFC4C0] text-white font-bold text-xs px-4 py-2 rounded-xl w-36 h-auto mb-4">
            التأثير على المجتمع
          </div>

          <p className="text-2xl leading-loose my-2">
            لهذه الأهداف تأثير نافع كبير وقيّم على<br />
            كل من المجتمع التعليميّ بشكل خاصّ<br />
            والمجتمع ككل.
          </p>

          {/* الطلاب وأولياء الأمور */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-start text-right space-y-2 transition-transform duration-500 hover:scale-105">
              <img
                src={parentIcon}
                alt="ولي أمر"
                className="w-12 h-12 bg-gray-300 rounded-lg p-1"
              />
              <h3 className="font-semibold text-lg">أولياء الأمور</h3>
              <p className="text-sm text-gray-300">
                قرارات واعية ومدروسة في اختيار
                <br />
                المدرسة المناسبة للأطفال
              </p>
            </div>

            <div className="flex flex-col items-start text-right space-y-2 transition-transform duration-500 hover:scale-105">
              <img
                src={studentIcon}
                alt="طالب"
                className="w-12 h-12 bg-gray-300 rounded-lg p-1"
              />
              <h3 className="font-semibold text-lg text-right">الطلاب</h3>
              <p className="text-sm text-gray-300">
                بيئة تعليمية محسّنة ومناسبة
                <br />
                لاحتياجاتهم التعليمية
              </p>
            </div>
          </div>
        </div>

        {/* القسم الأيسر */}
        <div
          ref={leftSection.elementRef}
          className={`relative rounded-2xl overflow-hidden shadow-lg w-auto h-96 transform transition-all duration-1000 ease-out delay-200 ${
            leftSection.isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <img
            src={schoolBg}
            alt="خلفية المدرسة"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* المربع الأبيض الشفاف */}
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 p-6 rounded-xl w-96 h-50 hover:scale-105 transition-transform duration-500">
            <div className="pb-10">
              <div className="bg-secondary text-white font-bold text-xs px-4 py-2 rounded-xl w-36 h-auto mb-4">
                تأثيرها على المدارس
              </div>

              <ul className="text-sm text-secondary space-y-2">
                <li>
                  رفع مستوى الخدمات والتحفيز على
                  <br /> التطوير المستمر والتميز التعليمي
                </li>
                <li>
                  تحسين جودة التعليم
                  <br /> ومتابعة الأداء بشكل منتظم..
                </li>
              </ul>
            </div>

            <div className="absolute bottom-2 left-2 ">
              <img src={school} alt="أيقونة" className="w-40 h-40 pt-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
