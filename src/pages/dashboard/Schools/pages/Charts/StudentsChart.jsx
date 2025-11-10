import React from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { FaFemale, FaMale } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const StudentsChart = () => {
  const femaleData = {
    labels: ['إناث', 'غيرهن'],
    datasets: [
      {
        data: [52, 48],
        backgroundColor: ['#FFC4C0', '#E5E5E5'],
        borderWidth: 0, 
      },
    ],
  };

  const maleData = {
    labels: ['ذكور', 'غيرهم'],
    datasets: [
      {
        data: [48, 52],
        backgroundColor: [ '#E5E5E5','#64C8CC'],
        borderWidth: 0, 
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <motion.div 
      className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-96 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h3 
          className="text-right font-bold text-slate-950 dark:text-gray-100"
          whileHover={{ scale: 1.05 }}
        >
          الطلاب
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

      <motion.div 
        className="flex-1 flex items-center justify-between px-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* دائرة الإناث */}
        <motion.div 
          className="relative flex-1 max-w-[140px] h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Doughnut data={femaleData} options={{ ...options, maintainAspectRatio: false }} />
          <motion.div 
            className="absolute inset-0 flex flex-row justify-center items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <motion.span 
              className="font-bold text-gray-800 dark:text-white text-lg"
              whileHover={{ scale: 1.1 }}
            >
              52%
            </motion.span>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaFemale className="text-[#FFC4C0] text-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* دائرة الذكور */}
        <motion.div 
          className="relative flex-1 max-w-[140px] h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Doughnut data={maleData} options={{ ...options, maintainAspectRatio: false }} />
          <motion.div 
            className="absolute inset-0 flex flex-row justify-center items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            <motion.span 
              className="font-bold text-gray-800 dark:text-white text-lg"
              whileHover={{ scale: 1.1 }}
            >
              48%
            </motion.span>
            <motion.div
              whileHover={{ scale: 1.2, rotate: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaMale className="text-[#64C8CC] text-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StudentsChart;