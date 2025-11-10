import React from 'react';
import { motion } from 'framer-motion';

const RatingChart = ({ value = 1.648 }) => {
  const radius = 100; 
  const center = radius + 20;
  const angleStart = -180;

  const segments = [
    { color: '#22C55E', angle: 100 },
    { color: '#FACC15', angle: 50 },
    { color: '#86EFAC', angle: 20 },
    { color: '#8B5CF6', angle: 10 },
  ];

  return (
    <motion.div 
      className="w-full h-full bg-[#F9F9FA] dark:bg-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Chart */}
      <motion.div 
        className="relative w-full flex justify-center items-center mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg
          viewBox={`0 0 ${center * 2} ${center}`}
          className="w-full h-auto max-h-[300px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Arc */}
          <motion.path
            d={`M${center - radius},${center} A${radius},${radius} 0 0,1 ${center + radius},${center}`}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          />

          {/* Colored Arcs */}
          {segments.reduce(
            (acc, seg, i) => {
              const startAngle = acc.prevAngle;
              const endAngle = startAngle + seg.angle;
              const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
              acc.paths.push(
                <motion.path
                  key={i}
                  d={`M${x1},${y1} A${radius},${radius} 0 ${seg.angle > 180 ? 1 : 0},1 ${x2},${y2}`}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.2 }}
                />
              );
              acc.prevAngle = endAngle;
              return acc;
            },
            { prevAngle: angleStart, paths: [] }
          ).paths}
        </svg>

        {/* Center Value */}
        <motion.div 
          className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-800 dark:text-white"
            whileHover={{ scale: 1.05 }}
          >
            {value.toFixed(2)}
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            تقييمات المستخدمين
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Legend */}
      <motion.div 
        className="w-full mt-6 space-y-4 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
          whileHover={{ x: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="w-3 h-3 bg-green-500 rounded-full"
              whileHover={{ scale: 1.3 }}
            ></motion.span>
            <span className="text-[#64C8CC] dark:text-gray-200">تقييمات إيجابية</span>
          </div>
          <motion.span 
            className="font-bold text-[#64C8CC] dark:text-white"
            whileHover={{ scale: 1.1 }}
          >
            1,024
          </motion.span>
        </motion.div>
        
        <motion.hr 
          className="border-t border-gray-300 dark:border-gray-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />
        
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          whileHover={{ x: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="w-3 h-3 bg-yellow-500 rounded-full"
              whileHover={{ scale: 1.3 }}
            ></motion.span>
            <span className="text-[#64C8CC] dark:text-gray-200">تقييمات بنّاءة</span>
          </div>
          <motion.span 
            className="font-bold text-[#64C8CC] dark:text-white"
            whileHover={{ scale: 1.1 }}
          >
            546
          </motion.span>
        </motion.div>
        
        <motion.hr 
          className="border-t border-gray-300 dark:border-gray-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />
        
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 2.0 }}
          whileHover={{ x: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="w-3 h-3 bg-green-300 rounded-full"
              whileHover={{ scale: 1.3 }}
            ></motion.span>
            <span className="text-[#64C8CC] dark:text-gray-200">ملاحظات</span>
          </div>
          <motion.span 
            className="font-bold text-[#64C8CC] dark:text-white"
            whileHover={{ scale: 1.1 }}
          >
            78
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RatingChart;