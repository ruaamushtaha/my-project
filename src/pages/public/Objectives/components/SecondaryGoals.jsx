import React from "react";

import fileSchool from "../../../../assets/icons/fileSchool.svg";
import monitor2 from "../../../../assets/icons/monitor2.svg";
import folders from "../../../../assets/icons/folders.svg";
import connection from "../../../../assets/icons/connection.svg";
import www from "../../../../assets/icons/www.svg";
import ok from "../../../../assets/icons/ok.svg";

export default function SecondaryGoals() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      
      <section className="bg-primary py-20 px-4" >
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* العنوان */}
          <h2
            className="text-3xl font-semibold text-center text-primary mb-10  underline decoration-[#D9D9D9]"
            style={{ textUnderlineOffset: '10px' }}
          >
            الأهداف الفرعيَّة
          </h2>

          {/* المستطيلات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* العمود الأول */}
            <div className="space-y-4">
              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={fileSchool} alt="file School" className="w-10 h-10" />
                <p className="text-primary  font-semibold whitespace-pre-line">
                  {` تطوير بيئة تعليميَّة عادلة وشفّافة 
        عبر مقاييس موحّدة وموثوقة`}
                </p>
              </div>

              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={folders} alt="folders" className="w-10 h-10" />
                <p className="text-primary  font-semibold whitespace-pre-line">
                  {`معايير مُوحَّدة: جودة أكاديميَّة، بيئة
تعليميَّة، مرافق..`}
                </p>
              </div>

              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={www} alt="www" className="w-10 h-10" />
                <p className="text-primary  font-semibold">
                  التقارير: تقارير دورية  دائمة للمتابعة.
                </p>
              </div>
            </div>

            {/* العمود الثاني */}
            <div className="space-y-4">
              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={monitor2} alt="monitor " className="w-10 h-10" />
                <p className="text-primary  font-semibold whitespace-pre-line">
                  {` تجميع البيانات: نظام موحّد لجمع 
  وتنظيم تقييمات المدارس `}
                </p>
              </div>

              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={connection} alt="connection" className="w-10 h-10" />
                <p className="text-primary  font-semibold whitespace-pre-line">
                  {`التفاعل: تعزيز قنوات التواصل بين 
 الأهالي والمشرفين والمدارس `}
                </p>
              </div>

              <div
                className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl h-[100px]"
                style={{ background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)' }}
              >
                <img src={ok} alt="ok" className="w-10 h-10" />
                <p className="text-primary  font-semibold whitespace-pre-line">
                  {` الموثوقية والشفافية: آليَّات تحقّق  
 ومراجعة دقيقة.`}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
