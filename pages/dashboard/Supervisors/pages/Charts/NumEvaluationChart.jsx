
import { useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line} from 'react-chartjs-2';

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
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'هذا العام',
      data: [500, 800, 1200, 2000, 2400, 1800, 1600],
      borderColor: isDarkMode? '#8A8A8F': '#8A8A8F', 
      backgroundColor: 'transparent',
      tension: 0.9,
      borderWidth: 1,
},
    {
      label: 'السنة الماضية',
      data: [300, 600, 900, 1200, 1800, 2200, 2000],
      borderColor: '#64C8CC',
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      tension: 0.9,
      borderWidth: 1,
},
  ],
};


  const options = {
    responsive: true,
    plugins: {
      datalabels: { display: false},
      legend: { display: false},
},
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false},
        ticks: {
          callback: (value) => `${value / 1000}K`,
          color: isDarkMode? '#8A8A8F': '#8A8A8F',
},
},
      x: {
        grid: { display: false},
        ticks: {
          color: isDarkMode? '#8A8A8F': '#8A8A8F',
},
},
},
};

  return (
    <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
            <span className="w-3 h-3 bg-black rounded-full"></span>
            هذه السنة
          </span>
          <span className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
            <span className="w-3 h-3 bg-[#64C8CC] rounded-full"></span>
             السنة الماضية
          </span>
        </div>
        <h2 className="font-bold text-right text-gray-800 dark:text-gray-100">عدد التقييمات</h2>
      </div>
      <Line data={data} options={options} />
    </div>
);
};

export default NumEvaluationChart;


