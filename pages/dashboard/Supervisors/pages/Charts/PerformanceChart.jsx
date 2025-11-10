
import { useEffect, useState} from 'react';
import { Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PerformanceChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
}, []);

  const data = {
    labels: [
      'الأمل',
      'الفاروق',
      'التميّز',
      'النور',
      'الفارابي',
      'ابن القيّم',
      'المتميِّزون',
      'الشافعي',
      'الرمال',
      'ابن سينا',
      'المبدعون',
      'يافا',
    ],
    datasets: [
  {
        label: 'نسبة الأداء',
        data: [60, 90, 75, 100, 30, 85, 60, 90, 75, 100, 30, 85],
        backgroundColor: [
          '#FFC4C0',
          '#96E2D6',
          '#B59F7C',
          '#92BFFF',
          '#5F5F5F',
          '#94E9B8',
          '#FFC4C0',
          '#96E2D6',
          '#B59F7C',
          '#92BFFF',
          '#5F5F5F',
          '#94E9B8',
        ],
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 6,
          bottomRight: 6,
},
        barThickness: 40,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
},
    ],
};

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          stepSize: 20,
          color: isDarkMode? '#8A8A8F': '#8A8A8F',
},
        grid: { display: false},
},
      x: { grid: { display: false},
        ticks: {
          font: { family: 'Arial', size: 12},
          color: isDarkMode? '#8A8A8F': '#8A8A8F',
},
},
},
    plugins: {
      datalabels: { display: false},
      legend: { display: false},
      title: {
        display: true,
        text: 'أداء المصادر لأول الشهر',
        align: 'start',
        font: { size: 16, family: 'Arial', weight: 'bold'},
        color: isDarkMode? '#ffffff': '#000000',
},
},
    layout: {
      padding: { top: 10, bottom: 10, left: 10, right: 10},
},
};

  return (
    <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md w-full h-96">
      <h3 className="text-gray-800 dark:text-gray-100 font-bold text-right">
        أداء المدارس حسب المعايير لهذا الشهر
      </h3>
      <Bar data={data} options={options} />
    </div>
);
};

export default PerformanceChart;
