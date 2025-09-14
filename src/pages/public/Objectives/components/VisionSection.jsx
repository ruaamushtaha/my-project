

import React from "react";


import Infinity from "../../../../assets/icons/Infinity.svg";


export default function VisionSection() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      


<section className="bg-white py-1 px-4" >
    
<div className="relative w-full pb-8">
  <img src={Infinity} className="" alt="Infinity" />

  <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl  font-bold text-primary z-10 mr-8">
الرؤية المستقبلية  </h2>
</div>

  <div className="max-w-4xl mx-2 space-y-6">
    {/* مستطيل 1 */}
    <div className="flex items-center gap-4 p-4  border-r-8 border-primary rounded-r-xl rounded-l-xl shadow-sm" style={{
    background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)',
}}>
      
        <p className="text-sm  font-medium text-primary leading-relaxed">
 توسيع نطاق التقييم ليشمل المعلمين والطلاب..        </p>
    </div>

    {/* مستطيل 2 */}
    <div className="flex items-center gap-4 p-4  border-r-8 border-primary rounded-r-xl rounded-l-xl shadow-sm" style={{
    background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)',
}}>
      
        <p className="text-sm   font-medium text-primary leading-relaxed">إدخال أدوات ذكاء اصطناعي للتوصية بالمدارس بناءً على تفضيلات الأسرة.        </p>
    </div>

    {/* مستطيل 3 */}
    <div className="flex items-center gap-4 p-4  border-r-8 border-primary rounded-r-xl rounded-l-xl shadow-sm" style={{
    background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)',
}}>
      
        <p className="text-sm   font-medium text-primary leading-relaxed">تطوير تطبيق محمول لسهولة الوصول للتقييمات والبيانات.        </p>
    </div>

    {/* مستطيل 4 */}
    <div className="flex items-center gap-4 p-4 border-r-8 border-primary rounded-r-xl rounded-l-xl shadow-sm" style={{
    background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)',
}}>
     
        <p className="text-sm   font-medium text-primary leading-relaxed">ربط النظام بمنصات تعليمية أخرى على المستوى الوطني.        </p>
    </div>
  </div>
</section>

    </div>
);
}
