import React from "react";

import search from "../../../../assets/icons/search.svg";
import analytics from "../../../../assets/icons/analytics.svg";
import monitor from "../../../../assets/icons/monitor.svg";
import google from "../../../../assets/icons/google.svg";
import handStar from "../../../../assets/icons/handStar.svg";

import ServiceCard from "../components/ServiceCard";

export default function ServicesSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-4">
        <div className="bg-[#E5F5F9] p-10 rounded-xl shadow-lg max-w-6xl mx-auto flex flex-col items-center">
          {/* وصف القسم */}
          <p className="text-primary pb-8 text-center  font-semibold text-2xl whitespace-pre-line">
            {`
    نوفر مجموعة من الخدمات لدعم المدارس، المشرفين،
    وأولياء الأمور في تحسين العملية التعليمية.
    
    `}
          </p>

          {/* الصف الأول: 3 بطاقات */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <ServiceCard
              icon={search}
              title="التقييمات الأكاديميّة والسلوكيَّة"
              desc={
                <>
                  {`
  تمكين أولياء الأمور والمشرفين من تقييم
  المدارس أكاديميًّا وسلوكيًا بدقّة.
   `}
                </>
              }
            />
            <ServiceCard
              icon={analytics}
              title="إعداد التقارير وتحليل البيانات"
              desc={
                <>
                  {`
  تمكين أولياء الأمور والمشرفيين من تقييم
  المدارس أكاديميًّا وسلوكيًا بدقّة.
   `}
                </>
              }
            />
            <ServiceCard
              icon={monitor}
              title="مراقبة الأداء التعليمي للمدارس"
              desc={
                <>
                  {`
  متابعة التطور الأكاديمي والإداري
  المدارس بشكل دوري.
  `}
                </>
              }
            />
          </div>

          {/* الصف الثاني: 2 بطاقتين */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
            <ServiceCard
              icon={google}
              title={`التفاعل بين أولياء الأمور\nوالمعلمين`}
              desc={
                <>
                  {`
تعزيز التواصل الفعّال بين الأهالي والمعلمين
لمصلحة الطلاب.`}
                </>
              }
            />
            <ServiceCard
              icon={handStar}
              title="إمكانية تقييم المدارس مباشرة"
              desc={
                <>
                  {`
  سهولة تقييم المدرسة بضغطة زر
  مع واجهة مستخدم واضحة وبسيطة.
  `}
                </>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
