
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
};



  return (
    <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        
        <h2 className="font-bold text-left text-[#64C8CC] dark:text-">التقييمات لهذا العام</h2>
      </div>
<div className="w-full h-72 bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md">
  <Line data={data} options={options} />
</div>

    </div>
);
};

export default NumEvaluationChart;


