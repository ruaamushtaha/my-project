import React from "react";
import { motion } from 'framer-motion';

const ExamSuccessBars = () => {
  // المواد 1
  const arabicSubjects = [
    { name: "اللغة العربية", percent: 90 },
    { name: "التربية الإسلامية", percent: 85 },
    { name: "العلوم", percent: 78 },
    { name: "الرياضيات", percent: 92 },
    { name: "الجغرافيا", percent: 80 },
  ];

  // المواد 2
  const englishSubjects = [
    { name: "English", percent: 88 },
    { name: "الحاسوب", percent: 75 },
    { name: "التاريخ", percent: 82 },
    { name: "Chemistry", percent: 70 },
    { name: "Physics", percent: 90 },
  ];

  return (
    <motion.div 
      className="bg-[#F9F9FA] dark:bg-gray-800 rounded-3xl p-6 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* العنوان */}
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h2 
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          نسب النجاح في الاختبارات
        </motion.h2>
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.select 
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <option>Exam</option>
            <option>Quiz</option>
          </motion.select>
          <motion.select 
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <option>Monthly</option>
            <option>Final</option>
          </motion.select>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* الأعمدة 1 */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          {arabicSubjects.map((subject, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg h-8 relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="absolute right-0 top-0 h-full bg-green-300"
                initial={{ width: 0 }}
                animate={{ width: `${subject.percent}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 + index * 0.1 }}
              ></motion.div>
              <motion.span 
                className="relative z-10 text-gray-800 dark:text-gray-100 text-sm pr-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              >
                {subject.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* الأعمدة 2 */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          {englishSubjects.map((subject, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg h-8 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              whileHover={{ x: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="absolute right-0 top-0 h-full bg-green-300"
                initial={{ width: 0 }}
                animate={{ width: `${subject.percent}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 + index * 0.1 }}
              ></motion.div>
              <motion.span 
                className="relative z-10 text-gray-800 dark:text-gray-100 text-sm pr-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
              >
                {subject.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExamSuccessBars;