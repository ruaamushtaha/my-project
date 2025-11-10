import React from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const ReportsChart = () => {
  const data = {
    labels: ['الحضور', 'الغياب'],
    datasets: [
      {
        data: [49, 51],
        backgroundColor: ['#EDEDED','#69A450'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <motion.div 
      className="bg-[#F9F9F9] dark:bg-gray-800 p-4 rounded-lg shadow-md w-full h-full flex flex-col justify-between"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h3 
          className="text-right font-bold text-slate-950 dark:text-gray-100"
          whileHover={{ scale: 1.05 }}
        >
          الحضور
        </motion.h3>
        <div className="flex flex-row-reverse space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.span 
              key={index}
              className="w-1.5 h-1.5 bg-slate-950 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.5 }}
            ></motion.span>
          ))}
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div 
        className="relative flex-grow flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="relative w-full h-full max-h-[250px]">
          <Doughnut data={data} options={options} />

          {/* Center Text */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <motion.span 
              className="text-2xl font-bold text-gray-700 dark:text-gray-100"
              whileHover={{ scale: 1.1 }}
            >
              49%
            </motion.span>
          </motion.div>

          {/* Legend */}
          <motion.div
            className="absolute flex flex-col gap-1 text-sm"
            style={{ top: '0', right: '0' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ x: -5, transition: { duration: 0.2 } }}
            >
              <motion.span 
                className="w-3 h-3 bg-[#69A450] rounded-full"
                whileHover={{ scale: 1.3 }}
              ></motion.span>
              <span className="text-gray-700 dark:text-gray-200">الحضور</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ x: -5, transition: { duration: 0.2 } }}
            >
              <motion.span 
                className="w-3 h-3 bg-[#9CA3AF] rounded-full"
                whileHover={{ scale: 1.3 }}
              ></motion.span>
              <span className="text-gray-700 dark:text-gray-200">الغياب</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportsChart;