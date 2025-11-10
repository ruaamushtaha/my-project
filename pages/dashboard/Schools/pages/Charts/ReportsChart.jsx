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
  };

  return (
    <div className="bg-[#F9F9F9] dark:bg-gray-800 p-4 rounded-lg shadow-md w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-right font-bold text-slate-950 dark:text-gray-100">الحضور</h3>
        <div className="flex flex-row-reverse space-x-1">
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-grow flex items-center justify-center">
        <div className="relative w-full h-full max-h-[250px]">
          <Doughnut data={data} options={options} />

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700 dark:text-gray-100">49%</span>
          </div>

          {/* Legend */}
          <div
            className="absolute flex flex-col gap-1 text-sm"
            style={{ top: '0', right: '0' }}
          >
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#69A450] rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-200">الحضور</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#9CA3AF] rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-200">الغياب</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsChart;
