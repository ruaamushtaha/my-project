import React from 'react';

const RatingChart = ({ value = 1.648 }) => {
  const radius = 100; 
  const center = radius + 20;
  const angleStart = -180;

  const segments = [
    { color: '#22C55E', angle: 100 },
    { color: '#FACC15', angle: 50 },
    { color: '#86EFAC', angle: 20 },
    { color: '#8B5CF6', angle: 10 },
  ];

  return (
    <div className="w-full h-full bg-[#F9F9FA] dark:bg-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-center items-center">
      {/* Chart */}
      <div className="relative w-full flex justify-center items-center mb-4">
        <svg
          viewBox={`0 0 ${center * 2} ${center}`}
          className="w-full h-auto max-h-[300px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Arc */}
          <path
            d={`M${center - radius},${center} A${radius},${radius} 0 0,1 ${center + radius},${center}`}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Colored Arcs */}
          {segments.reduce(
            (acc, seg, i) => {
              const startAngle = acc.prevAngle;
              const endAngle = startAngle + seg.angle;
              const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
              acc.paths.push(
                <path
                  key={i}
                  d={`M${x1},${y1} A${radius},${radius} 0 ${seg.angle > 180 ? 1 : 0},1 ${x2},${y2}`}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              );
              acc.prevAngle = endAngle;
              return acc;
            },
            { prevAngle: angleStart, paths: [] }
          ).paths}
        </svg>

        {/* Center Value */}
        <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%]">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{value.toFixed(2)}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap mt-1">
            تقييمات المستخدمين
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full mt-6 space-y-4 text-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-[#64C8CC] dark:text-gray-200">تقييمات إيجابية</span>
          </div>
          <span className="font-bold text-[#64C8CC] dark:text-white">1,024</span>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-[#64C8CC] dark:text-gray-200">تقييمات بنّاءة</span>
          </div>
          <span className="font-bold text-[#64C8CC] dark:text-white">546</span>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-300 rounded-full"></span>
            <span className="text-[#64C8CC] dark:text-gray-200">ملاحظات</span>
          </div>
          <span className="font-bold text-[#64C8CC] dark:text-white">78</span>
        </div>
      </div>
    </div>
  );
};

export default RatingChart;
