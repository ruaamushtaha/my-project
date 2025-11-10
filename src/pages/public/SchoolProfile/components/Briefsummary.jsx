import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Infinity from "../../../../assets/icons/Infinity.svg";
import alofoq from "../../../../assets/images/alofoq.png";
import lab1 from "../../../../assets/images/lab1.png";
import lab2 from "../../../../assets/images/lab2.png";

const slides = [
  {
    image: alofoq,
    text: <div><p className="whitespace-pre-line text-white text-3xl font-medium">
                  {`
تأسست مدرسة الأفق الحديثة عام 2005 كمدرسة خاصة 
         تهدف إلى توفير تعليم متكامل وفق أعلى المعايير التربوية. `}
         
                </p>
                <p className="whitespace-pre-line text-white  font-normal">
                  {`
بدأت المدرسة بعدد صغير من الصفوف والطلاب، ومع مرور السنوات
         توسعت لتشمل المراحل التعليمية كافة من الروضة وحتى الثانوية..  `}
         
                </p>
                </div>
                
                ,
  },
  {
    image: lab1,
    text: <div><p className="whitespace-pre-line text-white text-3xl font-medium">
                  {`
شهدت المدرسة عدة محطات بارزة في مسيرتها:  `}
         
                </p>
                <p className="whitespace-pre-line text-white  font-normal">
                  {`
منها افتتاح مختبرات العلوم والحاسوب عام 2010،
          وإطلاق برنامج الأنشطة اللامنهجية عام 2013، 
          وحصولها على اعتماد الوزارة كمدرسة متميزة عام 2018.  `}
         
                </p>
                </div>,
  },
  {
    image: lab2,
    text: <div><p className="whitespace-pre-line text-white text-3xl font-medium">
                  {`
تتبنّى المدرسة رؤية واضحة تقوم على إعداد جيل واعٍ ومبدع `}
         
                </p>
                <p className="whitespace-pre-line text-white  font-normal">
                  {`
وتحرص على دمج التكنولوجيا في التعليم وتوفير بيئة محفزة على البحث والاكتشاف.
          `}
         
                </p>
                </div>,
  },
];

export default function Briefsummary() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      {/* العنوان   */}
      <div className="relative w-full h-[553px] rounded-xl overflow-hidden mt-14">
        {/* الصورة */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={slides[activeIndex].image}
            alt="school"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Overlay شفاف */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* النص في وسط الصورة */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeIndex}
              className="text-right px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {slides[activeIndex].text}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* الدوائر بأسفل يسار الصورة */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === idx
                  ? "w-20 h-4 bg-white" 
                  : "w-3 h-3 bg-gray-300"  
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}