import React from 'react';
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
  };

  return (
    <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-96 flex flex-col">
      {/* Header */}
       <div className="flex justify-between items-center mb-12">
        <h3 className="text-right font-bold text-slate-950 dark:text-gray-100">الطلاب</h3>
        <div className="flex flex-row-reverse space-x-1">
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between px-15">
        {/* دائرة الإناث */}
        <div className="relative flex-1 max-w-[140px] h-full">
          <Doughnut data={femaleData} options={{ ...options, maintainAspectRatio: false }} />
          <div className="absolute inset-0 flex flex-row justify-center items-center gap-2">
            <span className="font-bold text-gray-800 dark:text-white text-lg">52%</span>
            <FaFemale className="text-[#FFC4C0] text-2xl" />
          </div>
        </div>

        {/* دائرة الذكور */}
        <div className="relative flex-1 max-w-[140px] h-full">
          <Doughnut data={maleData} options={{ ...options, maintainAspectRatio: false }} />
          <div className="absolute inset-0 flex flex-row justify-center items-center gap-2">
            <span className="font-bold text-gray-800 dark:text-white text-lg">48%</span>
            <FaMale className="text-[#64C8CC] text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsChart;
