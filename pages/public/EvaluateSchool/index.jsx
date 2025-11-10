
import React from 'react';
import headerimg from '../../../assets/images/headerimg1.png';
import Header from "../components/Header";
import Footer from "../components/Footer";
import EvaluateFormSection from "../EvaluateSchool/components/EvaluateFormSection";

const stars = '★★★★★';

const StatCard = ({ title, value, showStars}) => (
  <div className="bg-babyBlue shadow-md  rounded-xl  p-4  w-full sm:w-[22%] text-center ">
    <p className=" text-[#686868E3] font-normal ">{title}</p>
    <p className="text-xl mt-2 text-primary font-medium ">{value}</p>
    {showStars && <div className="text-yellow-500 text-lg mt-2">{stars}</div>}
  </div>
);



export default function EvaluationPage() {
  return (
    
    <div className="bg-white font-sans" dir="rtl">
 {/* Header Section */}

 {/* الهيدر مع الخلفية */}
      <div className="relative h-[210px]">
        <img 
          src={headerimg} 
          alt="خلفية الهيدر" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/50 to-cyan-950/10"></div>
        <Header title="التقييمات" variant="default" />
      </div>




      {/* القسم الأول */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-10  m-6 mt-10 rounded-xl shadow-md border border-gray-100 p-5">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl font-medium text-primary mt-10">تقييم مدرسة البيان الثانويّة</h2>
          <p className="text-[#A3A3A3] font-normal mt-3 ">ساعدنا على تحسين الارتقاء بالمدرسة عبر تقييم شفاف وموضوعي.</p>
        </div>
        <div className="flex flex-wrap gap-4 md:w-1/2 ">
          <StatCard title="التقييم العام" value="4.3" showStars />
          <StatCard title="عدد التقييمات" value="220" />
          <StatCard title=" أحدث تقييم" value="8:00  AM " />
          <StatCard title="عدد الشكاوي" value="0" />
        </div>
      </div>


      {/* القسم الثاني */}
<EvaluateFormSection/>
      
            {/* Footer Section */}
            <Footer />
    </div>
);
}
