import React, { useState, useEffect } from "react";

// Animated counter hook
const useAnimatedCounter = (endValue, duration = 2000, valueType = 'number', startAnimation = false) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    let startTime = null;
    const startValue = 0;
    const targetValue = typeof endValue === 'number' ? endValue : parseInt(endValue);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
      setCurrentValue(currentCount);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [endValue, duration, startAnimation]);

  return valueType === 'percentage' ? `${currentValue}%` : currentValue.toLocaleString();
};

// Circle animation hook
const useCircleAnimation = (isVisible, dashArray, dashOffset, delay = 0) => {
  const [currentOffset, setCurrentOffset] = useState(dashArray);
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setCurrentOffset(dashOffset), delay);
    return () => clearTimeout(timer);
  }, [isVisible, dashArray, dashOffset, delay]);
  return currentOffset;
};

export default function StatCard({
  icon,
  value,
  valueType = 'number',
  description,
  title, 
  animationConfig = {},
  isVisible = false,
  index = 0,
  highlight = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { dashArray = 100, dashOffset = 0, height = "h-[250px]", width = "w-[450px]" } = animationConfig;

  const animatedValue = useAnimatedCounter(value, 2000 + index * 200, valueType, isVisible);
  const animatedOffset = useCircleAnimation(isVisible, dashArray, dashOffset, 500 + index * 200);

  const handleMouseEnter = () => { setIsHovered(true); setTimeout(() => setShowTooltip(true), 300); };
  const handleMouseLeave = () => { setIsHovered(false); setShowTooltip(false); };

  const bgColor = highlight ? 'bg-[#D24D9E2B]' : 'bg-[#F4F4F4]';

  return (
    <div
      className={`relative ${bgColor} rounded-xl shadow-md p-6 ${width} ${height} cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-105 shadow-xl' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between mb-6">
<div className="w-16 h-16 flex items-center justify-center bg-babyBlue rounded-full ml-4">
  <img src={icon} alt="icon" className="w-8 h-8" />
</div>
<h3 className="flex-1 text-right font-bold text-xl text-gray-800">{title}</h3>
        <div className="w-8 h-8 flex flex-row justify-between items-center p-1 border rounded-full border-gray-800">
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-20 h-20 relative mr-6">
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="40%" stroke="#E5E7EB" strokeWidth="6" fill="none" />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="#4CAF50"
              strokeWidth="6"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={animatedOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-black">
            {animatedValue}
          </div>
        </div>

        <p className="text-gray-600 text-sm flex-1">{description}</p>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
          <div className="bg-gray-800 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
            <div className="font-semibold mb-1">تفاصيل الإحصائية</div>
            <div>القيمة الحالية: {animatedValue}</div>
          </div>
        </div>
      )}
    </div>
  );
}
