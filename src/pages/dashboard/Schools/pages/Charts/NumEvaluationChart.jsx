import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const NumEvaluationChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'السنة الماضية',
        data: [100, 200, 300, 400, 450, 500], 
        borderColor: '#4682B4',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.1,
        pointBackgroundColor: 'transparent',
        pointBorderColor: '#64C8CC',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderDash: [],
        segment: { borderDash: [] },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      datalabels: { display: false },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 550,
        ticks: {
          stepSize: 50,
          color: '#4682B4',
          callback: (value) => `${value}`,
        },
        grid: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#000000',
        },
      },
    },
    animation: {
      duration: 3000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <motion.div 
      className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h2 
          className="font-bold text-left text-[#64C8CC] dark:text-"
          whileHover={{ scale: 1.05 }}
        >
          التقييمات لهذا العام
        </motion.h2>
      </motion.div>
      
      <motion.div 
        className="w-full h-72 bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Line data={data} options={options} />
      </motion.div>
    </motion.div>
  );
};

export default NumEvaluationChart;