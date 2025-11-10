import React from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const EducationStagesChart = () => {
  const data = {
    labels: ['الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع'],
    datasets: [
      {
        data: [52.1, 22.8, 13.9, 11.2],
        backgroundColor: ['#000000', '#2DA1DE', '#B59F7C', '#FFC4C0'],
        borderWidth: 2,     
        borderRadius: 10,    
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '50%',
    plugins: {
      datalabels: { display: false },
      legend: { display: false },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: 'المراحل الدراسية',
        align: 'start',
        font: { size: 16, family: 'Arial', weight: 'bold' },
        color: '#374151', 
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
      className="dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="font-bold text-right dark:text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        المراحل الدراسيَّة
      </motion.h2>

      <motion.div 
        className="flex items-center justify-between p-6 bg-[#F9F9FA] dark:bg-gray-700 rounded-xl shadow-md w-full h-96 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        {/* التشارت + النسب */}
        <motion.div 
          className="w-1/2 flex items-center gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* التشارت */}
          <motion.div 
            className="w-1/2 h-full flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Pie data={data} options={{ ...options, maintainAspectRatio: false }} />
          </motion.div>

          {/* النسب */}
          <motion.div 
            className="flex flex-col justify-center gap-4 text-right text-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            {data.datasets[0].data.map((value, idx) => (
              <motion.span 
                key={idx} 
                className="font-semibold text-gray-700 dark:text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 + idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {value}%
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* أسماء المراحل */}
        <motion.div 
          className="w-1/2 flex flex-col justify-center gap-4 text-right pr-6 text-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {data.labels.map((label, idx) => (
            <motion.div 
              key={idx} 
              className="flex flex-row-reverse items-center gap-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
              whileHover={{ x: -10, transition: { duration: 0.2 } }}
            >
              <motion.span
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[idx] }}
                whileHover={{ scale: 1.3 }}
              ></motion.span>
              <motion.span 
                className="text-gray-700 dark:text-gray-200 font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                {label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EducationStagesChart;