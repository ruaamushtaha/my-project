import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarCheck, FaStar, FaClipboardList, FaChartBar, FaBook } from 'react-icons/fa';
import { Card } from '../components/ui';

const ReportsPage = () => {
  // قائمة الأبناء
  const childrenList = [
    { id: 'ahmed', name: 'أحمد' },
    { id: 'khaled', name: 'خالد' }
  ];
  const [activeChildId, setActiveChildId] = useState('ahmed');

  // بيانات وهمية للعرض
  const grades = [
    { id: 1, childId: 'ahmed', subject: 'الرياضيات', grade: 90, maxGrade: 100, letterGrade: 'A+' },
    { id: 2, childId: 'ahmed', subject: 'اللغة العربيّة', grade: 85, maxGrade: 100, letterGrade: 'A' },
    { id: 3, childId: 'ahmed', subject: 'العلوم', grade: 70, maxGrade: 100, letterGrade: 'B' },
    { id: 4, childId: 'ahmed', subject: 'اللغة الإنجليزية', grade: 75, maxGrade: 100, letterGrade: 'B+' },
    { id: 5, childId: 'khaled', subject: 'الرياضيات', grade: 80, maxGrade: 100, letterGrade: 'A' },
    { id: 6, childId: 'khaled', subject: 'اللغة العربيّة', grade: 78, maxGrade: 100, letterGrade: 'B+' },
    { id: 7, childId: 'khaled', subject: 'العلوم', grade: 72, maxGrade: 100, letterGrade: 'B' },
    { id: 8, childId: 'khaled', subject: 'إنجليزي', grade: 88, maxGrade: 100, letterGrade: 'A' },
  ];

  const performance = [
    { childId: 'ahmed', rank: 'السابع مكرر', status: 'ممتاز' },
    { childId: 'khaled', rank: 'السابع مكرّر', status: 'جيد جدًا' },
  ];

  const projects = [
    { id: 1, childId: 'ahmed', subject: 'رياضيات', assignment: ' التكليف الرابع', status: 'تم التسليم', date: '2025-10-20' },
    { id: 2, childId: 'ahmed', subject: 'علوم', assignment: 'التكليف الثالث', status: 'آخر موعد ', date: '2025-10-22' },
    { id: 3, childId: 'khaled', subject: 'لغة عربية', assignment: 'التكليف الأول', status: 'تم التسليم', date: '2025-10-21' },
  ];

  const activeGrades = grades.filter(g => g.childId === activeChildId);
  const activePerformance = performance.find(p => p.childId === activeChildId) || {};
  const activeProjects = projects.filter(p => p.childId === activeChildId);

  return (
    <motion.div 
      className="container mx-auto p-4" 
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">التقارير</h1>
          <p className="text-gray-600 mt-1 dark:text-white">عرض جميع التقارير المُتعلِّقة بأبنائك</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-md flex gap-2 p-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {childrenList.map((child, index) => (
            <motion.button
              key={child.id}
              onClick={() => setActiveChildId(child.id)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                child.id === activeChildId 
                  ? 'bg-[#64C8CC] text-white' 
                  : 'bg-gray-100 text-[#64C8CC] hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              {child.name}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 flex flex-col justify-between h-full">
            {/* بطاقة الحضور */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">الحضور</span>
              <FaCalendarCheck className="text-purple-600" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="bg-[#DCFCE7] text-green-700 px-3 py-1 rounded-full text-sm">Good</div>
              <span className="text-xl font-bold">85.6%</span>
            </div>
            <div className="h-1 bg-black mt-3"></div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>العدد الكلي للأيام: 160</span>
              <span>أيام الحضور: 137</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 flex flex-col justify-between h-full">
            {/* بطاقة الأنشطة */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">الأنشطة والتفاعل</span>
              <FaCalendarCheck className="text-purple-600" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="bg-[#DCFCE7] text-green-700 px-3 py-1 rounded-full text-sm">Good</div>
              <span className="text-xl font-bold">85.6%</span>
            </div>
            <div className="h-1 bg-black mt-3"></div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>المجموع الكلي: 100%</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 flex flex-col justify-between h-full">
            {/* بطاقة الترتيب */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">الترتيب</span>
              <FaChartBar className="text-[#009689]" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="font-bold text-xl">{activePerformance.rank || '-'}</div>
              <div className="bg-green-700 text-white px-3 py-1 rounded-full text-sm">{activePerformance.status || '-'}</div>
            </div>
            <div className="mt-2 text-sm text-gray-600">آخر تقييم: September 15, 2025</div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 flex flex-col justify-between h-full">
            {/* بطاقة الدرجات */}
            <div className="flex items-center gap-2 mb-4">
              <FaBook className="text-[#009689]" />
              <span className="font-bold text-lg">الدرجات</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {activeGrades.map((g, index) => (
                <motion.div 
                  key={g.id} 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="text-right">
                    <div className="font-medium">{g.subject}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 font-bold">
                        {g.letterGrade}
                      </div>
                      <span>{g.grade}/{g.maxGrade}</span>
                    </div>
                  </div>

                  <div className="w-24"> 
                    <div className="bg-gray-200 h-2 rounded-full w-full">
                      <motion.div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${(g.grade / g.maxGrade) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(g.grade / g.maxGrade) * 100}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 flex flex-col justify-between h-full">
            {/* بطاقة الواجبات */}
            <div className="flex items-center gap-2 mb-4">
              <FaClipboardList className="text-[#4F39F6]" />
              <span className="font-bold text-lg">الواجبات</span>
            </div>
            <div className="flex flex-col gap-4">
              {activeProjects.map((p, index) => (
                <motion.div
                  key={p.id}
                  className="bg-white rounded-xl shadow p-4 flex justify-between items-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{p.subject}</div>
                    <div className="text-sm text-gray-600">{p.assignment}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500 mb-1">{p.date}</span>
                    <motion.div
                      className={`text-center text-white px-3 py-1 rounded-full text-sm ${
                        p.status === 'تم التسليم'
                          ? 'bg-gray-400'
                          : p.status === 'آخر موعد'
                          ? 'bg-gray-400'
                          : 'bg-red-500'
                      }`}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {p.status}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportsPage;