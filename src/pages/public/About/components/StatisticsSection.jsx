import React, { useState, useEffect, useRef } from "react";
import Infinity from "../../../../assets/icons/Infinity.svg";

// Custom hook for animated counter with enhanced features
const useAnimatedCounter = (targetValue, duration = 2000, delay = 0, startAnimation = false) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!startAnimation || isAnimating) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.floor(easeOutQuad * targetValue);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsAnimating(false);
    };
  }, [targetValue, duration, delay, startAnimation, isAnimating]);

  return count;
};

// Statistics Card Component with enhanced animations
const StatisticsCard = ({ statistic, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const animatedCount = useAnimatedCounter(
    statistic.targetValue || statistic.value,
    2500,
    statistic.animationDelay || index * 200,
    isVisible
  );

  return (
    <div 
      className={`p-6 text-center transform transition-all duration-1000 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      } ${
        isHovered 
          ? 'scale-105 -translate-y-2' 
          : 'scale-100'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-50"></div>
        <h3 className={`text-4xl font-bold text-primary mb-2 relative transition-all duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          {animatedCount}{statistic.suffix}
        </h3>
      </div>
      <div className="text-gray-700 font-light leading-relaxed">
        <p className={`font-bold text-lg transition-colors duration-300  ${
          isHovered ? 'text-primary ' : ' text-secondary'
        }`}>
          {statistic.title}
        </p>
        <p className="font-semibold whitespace-pre-line mt-2 text-secondary">
          {statistic.description}
        </p>
      </div>
    </div>
  );
};

// Custom hook for fade-in animation
const useFadeInAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

export default function StatisticsSection({ data }) {
  // Fallback to default data if no data prop provided
  const defaultStatistics = [
    { 
      id: 1, 
      value: 23, 
      suffix: "+", 
      title: "مديــــرية تعليـمية", 
      description: `تم تغطيتــــــــها في
مختلف المحافظات.`,
      targetValue: 23,
      animationDelay: 0
    },
    { 
      id: 2, 
      value: 700, 
      suffix: "+", 
      title: "مدرســــــــــــــــــــة", 
      description: `أُدرجـــــــــت وقُيِّمت
عبر المنصـــــــــــــة.`,
      targetValue: 700,
      animationDelay: 200
    },
    { 
      id: 3, 
      value: 69, 
      suffix: "+", 
      title: "مشرفًا ومعلمًــــــــا", 
      description: `شاركوا في عمليـــــة
التقييـــــــــــــــــــــم.`,
      targetValue: 69,
      animationDelay: 400
    }
  ];

  const statisticsData = data || defaultStatistics;
  
  // Animation hooks
  const [containerRef, isContainerVisible] = useFadeInAnimation(0.1);
  const [titleRef, isTitleVisible] = useFadeInAnimation(0.2);

  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-16 px-0">
        {/* عنوان الإحصائيات */}
        <div 
          ref={titleRef}
          className={`relative w-full mb-12 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
<div className="relative w-full pr-8">
  <img src={Infinity} alt="Infinity" />
  <h2 className="absolute top-1/2 transform -translate-y-1/2 text-4xl font-bold text-secondary z-10 mr-11">
    الإحصائيات
  </h2>
</div>

        </div>

        {/* البطاقات الإحصائية */}
        <div 
          ref={containerRef}
          className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {statisticsData.map((statistic, index) => (
            <StatisticsCard 
              key={statistic.id} 
              statistic={statistic} 
              index={index}
              isVisible={isContainerVisible}
            />
          ))}
        </div>

        
      </section>
    </div>
  );
}