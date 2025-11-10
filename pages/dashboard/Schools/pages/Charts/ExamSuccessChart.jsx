import React from "react";

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
    <div className="bg-[#F9F9FA] dark:bg-gray-800 rounded-3xl p-6 shadow-md">
      {/* العنوان */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          نسب النجاح في الاختبارات
        </h2>
        <div className="flex gap-2">
           <select className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1 text-sm">
            <option>Exam</option>
            <option>Quiz</option>
          </select>
          <select className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-1 text-sm">
            <option>Monthly</option>
            <option>Final</option>
          </select>
         
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        {/* الأعمدة 1 */}
        <div className="flex flex-col gap-4">
          {arabicSubjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg  h-8 relative overflow-hidden"
            >
              <div
                className="absolute right-0 top-0 h-full bg-green-300"
                style={{ width: `${subject.percent}%` }}
              ></div>
              <span className="relative z-10 text-gray-800 dark:text-gray-100 text-sm pr-3">
                {subject.name}
              </span>
            </div>
          ))}
        </div>
         {/* الأعمدة 2 */}
          <div className="flex flex-col gap-4">
          {englishSubjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg h-8 relative overflow-hidden"
            >
              <div
                className="absolute right-0 top-0 h-full bg-green-300"
                style={{ width: `${subject.percent}%` }}
              ></div>
              <span className="relative z-10 text-gray-800 dark:text-gray-100 text-sm pr-3 ">
                {subject.name}
              </span>
            </div>
          ))}
        </div>

      

      </div>
    </div>
  );
};

export default ExamSuccessBars;
