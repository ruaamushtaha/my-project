import React from "react";
import { motion } from "framer-motion";
import staryallow from "../../../../assets/icons/staryallow.svg";

export default function GenerelEvaluation() {
  function SchoolCard({ name, description, rating, votes, criteria }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0px 0px 20px rgba(100, 200, 204, 0.4)" 
        }}
        dir="rtl" 
        className="w-full"
      >
        <div className="flex justify-start mb-6 px-4">
          <div className="text-right">
            <motion.h3 
              className="text-xl font-semibold text-black"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-sm text-black font-normal"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="bg-white rounded-xl shadow-md p-12 flex flex-row gap-2 w-full">
          <motion.div 
            className="flex items-center gap-4 w-1/3 pr-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-normal">{votes}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.img
                    key={i}
                    src={staryallow}
                    alt="نجمة تقييم صفراء"
                    className={`w-4 h-4 ${i < Math.floor(rating) ? "" : "opacity-30"}`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  />
                ))}
              </div>
            </div>
            <motion.span 
              className="text-5xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {rating}
            </motion.span>
          </motion.div>

          {/* جهة المعايير */}
          <div className="flex-1 flex flex-col gap-3">
            {criteria.map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              >
                <span className="text-xs text-[#A3A3A3] font-light w-1/3 text-left">
                  {item.label}
                </span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-[#3D8C40] h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="font-cairo bg-white text-black"
      dir="rtl"
    >
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* البطاقات */}
          <div className="grid grid-cols-1 gap-y-8">
            <SchoolCard
              name="التقييم العام للمدرسة"
              description="(حصلت على أعلى تقييم في الإدارة والانضباط المدرسي لهذا الشهر)"
              rating={4.5}
              votes="6,896"
              criteria={[
                { label: "الإدارة والانضباط المدرسي", percentage: 95 },
                { label: "جودة التعليم", percentage: 92 },
                { label: "المرافق والخدمات", percentage: 95 },
                { label: "النظافة والبيئة المدرسية", percentage: 80 },
                { label: "الأنشطة والفعاليات", percentage: 70 },
              ]}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}