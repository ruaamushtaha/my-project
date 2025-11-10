import React from 'react';
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
  };

  return (
    <div className="dark:text-white">
      <h2 className="font-bold text-right dark:text-white mb-4">المراحل الدراسيَّة</h2>

      <div className="flex items-center justify-between p-6 bg-[#F9F9FA] dark:bg-gray-700 rounded-xl shadow-md w-full h-96 transition-colors">
        {/* التشارت + النسب */}
        <div className="w-1/2 flex items-center gap-8">
          {/* التشارت */}
          <div className="w-1/2 h-full flex items-center">
            <Pie data={data} options={{ ...options, maintainAspectRatio: false }} />
          </div>

          {/* النسب */}
          <div className="flex flex-col justify-center gap-4 text-right text-lg">
            {data.datasets[0].data.map((value, idx) => (
              <span key={idx} className="font-semibold text-gray-700 dark:text-gray-200">{value}%</span>
            ))}
          </div>
        </div>

        {/* أسماء المراحل */}
        <div className="w-1/2 flex flex-col justify-center gap-4 text-right pr-6 text-lg">
          {data.labels.map((label, idx) => (
            <div key={idx} className="flex flex-row-reverse items-center gap-2">
              <span
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[idx] }}
              ></span>
              <span className="text-gray-700 dark:text-gray-200 font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationStagesChart;
