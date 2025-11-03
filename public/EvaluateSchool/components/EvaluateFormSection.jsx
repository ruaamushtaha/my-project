
import React from 'react';

import {FiMail} from 'react-icons/fi';
import { ReactComponent as ChevronRight } from "../../../../assets/icons/whiteSlide.svg";

const stars = '★★★★★';


const RatingCard = ({ title, description}) => (
  <div className="bg-white rounded-xl p-4  w-full sm:w-[30%]">
    <p className="font-normal text-primary">{title}</p>
    <p className="text-sm mt-1 font-light text-[#757777]">{description}</p>
    <div className="text-yellow-500 text-lg text-center mt-4">{stars}</div>
  </div>
);

export default function EvaluateFormSection() {
  return (
    
    <div className="bg-white font-sans" dir="rtl">
 


      {/* القسم الثاني */}
      <div className="bg-white  m-6 rounded-xl shadow-md border border-gray-100 ">

<h3 className="inline-block bg-primary text-white px-4 rounded-l  mb-6 mt-5 text-sm font-medium py-2">
  نموذج التقييم (ساهم بتقييمكَ؛ لبناء بيئة تعليميَّة أفضل!) 

</h3>


        {/* الهوية والإيميل */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 mx-5">
          
<div className="flex-1 bg-[#F6F8F8] p-5  rounded-xl ">
  <label className="block font-normal text-primary mb-2">هِويِّة المُقيِّم:</label>
  <select className="w-full border rounded p-2">
    <option value="" className="text-[#A9A9A9]">اختر </option>
    <option value="طالب">مشرف تربوي </option>
    <option value="ولي أمر">ولي أمر</option>
    <option value="معلم">مدير مدرسة</option>
  </select>
</div>


         

<div className="flex-1 bg-[#F6F8F8] p-5 rounded-xl">
  <label className="block font-normal text-primary mb-2">البريد الإلكتروني:<span className="font-light">(اختياري)</span></label>

  <div className="relative">
    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
    <input
      type="email"
      className="w-full border rounded pl-10 pr-3 py-2 text-left placeholder:text-left text-[#A9A9A9] outline-none"
      placeholder="name1587@example.com"
    />
  </div>
</div>


        </div>

        {/* المعايير */}
        <div className="mb-6 p-5 bg-[#F6F8F8] mx-5 rounded-xl">
          <label className="block font-normal my-4 text-primary text-center">المعايير الخاصّة بالتقييم<span className="font-light">(قيِّم باستخدام النجوم)</span></label>
          <div className="flex flex-wrap gap-4">
            <RatingCard title="الأداء الأكاديمي" description="(كفاءة المعلمين ووضوح الشرح وأساليب التدريس المستخدمة 
في رفع مستوى الطلاب وتحفيزهم على التعلم.)" />
            <RatingCard title="الإدارة والانضباط" description="(مدى التزام المدرسة بتطبيق الأنظمة والقوانين
 وتنظيم أوقات الحصص والتعامل مع الطلاب بعدل واحترا..)" />
            <RatingCard title=" الأنشطة والفعاليات" description="(تنوّع الأنشطة والبرامج اللامنهجيَّة و صقل مهارات الطلاب.)" />
            <RatingCard title="المرافق والخدمات" description="(كفاءة المعلمين ووضوح الشرح وأساليب التدريس المستخدمة 
في رفع مستوى الطلاب وتحفيزهم على التعلم.)" />
            <RatingCard title="النظافة والبيئة المدرسيَّة" description="(نظافة الصفوف والساحات ودورات المياه وتوفير بيئة آمنة وصحية للطلاب.)" />
  </div>
        </div>

        {/* الملاحظات */}
        <div className="mb-6 bg-[#F6F8F8] mx-5 p-4 rounded-xl">
          <label className="block font-normal text-primary mb-2">ملاحظاتك حول المدرسة:</label>
          <textarea rows="4" className="w-full border rounded p-2"
           placeholder="شاركنا جميع ملاحظات؟ ما الذي أعجبك أو لم يعجبك في المدرسة؟ هل يوجد أي اقتراح تحسيني؟.."></textarea>
</div>{/* الخصوصية */}
        <div className="mb-6 rounded-xl  items-center gap-2 bg-[#F6F8F8] mx-5 p-4">
         <h3 className=" font-normal text-primary mb-2">الخصوصيَّة والموافقة:</h3>
          <input type="checkbox" id="agree" />
          <label htmlFor="agree" className="text-sm text-[#757777]" >    أُقرّ بأنَّ تقييمي صادق وغير مسييء وأوافق على سياسة النشر.</label>
        </div>

        {/* زر الإرسال */}


<div className="flex justify-center">
  <button className="bg-primary text-white px-6 py-2 hover:bg-cyan-600 rounded-xl w-72 h-12 border-b-2 ml-2 mb-12 flex items-center justify-center gap-2">
    <span>إرسال التقييم</span>
    <ChevronRight className="w-6 h-6 text-white" />
  </button>
</div>


      </div>
      
    </div>
);
}
