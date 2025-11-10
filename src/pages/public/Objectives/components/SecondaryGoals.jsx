import React, { useState, useEffect, useRef } from "react";

import fileSchool from "../../../../assets/icons/fileSchool.svg";
import monitor2 from "../../../../assets/icons/monitor2.svg";
import folders from "../../../../assets/icons/folders.svg";
import connection from "../../../../assets/icons/connection.svg";
import www from "../../../../assets/icons/www.svg";
import ok from "../../../../assets/icons/ok.svg";

// Custom hook for staggered animations
const useStaggeredAnimation = (itemCount) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isVisible, elementRef };
};

// Secondary Goal Card Component
const SecondaryGoalCard = ({ goal, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconSrc = (iconName) => {
    const iconMap = {
      fileSchool,
      monitor2,
      folders,
      connection,
      www,
      ok
    };
    return iconMap[iconName] || fileSchool;
  };

  return (
    <div
      className={`flex flex-col items-start text-right gap-2 p-6 min-h-[200px] rounded-lg cursor-pointer transform transition-all duration-500 ${
    isVisible? 'translate-x-0 opacity-100': 'translate-x-8 opacity-0'
} ${isHovered? 'scale-105 shadow-lg': 'shadow-sm'}`}
      style={{ 
        // background: 'linear-gradient(to left, #F1F4F8, #CFD8E8)',
        animationDelay: `${index * 150}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        <div className="bg-babyBlue p-3 rounded-md flex items-center justify-center shadow-sm">
      <img
        src={getIconSrc(goal.icon)}
        alt={`${goal.category} icon`}
        className="w-10 h-10"
      />
    </div>
      </div>
      <p className={`text-slate-950 font-semibold whitespace-pre-line transition-all duration-300 ${
        isHovered ? 'text-blue-700' : ''
      }`}>
        {goal.title}
      </p>
      <p className={`text-[#263238] font-light whitespace-pre-line transition-all duration-300 ${
        isHovered ? 'text-blue-700' : ''
      }`}>
        {goal.text}
      </p>
    </div>
  );
};

export default function SecondaryGoals({ data }) {
  const { isVisible, elementRef } = useStaggeredAnimation();
  
  // Fallback to default data if no data prop provided
  const defaultData = {
    title: "الأهداف الفرعيَّة لإطلاق منصّة رؤى التعليم المستقبليّة",
    goals: [
      {
        id: 1,
        icon: "fileSchool",
        title:"تطوير البيئة التعليميَّة",
        text: "تطوير بيئة تعليميّة عادلة وشفّافة\nعبر مقاييس موحّدة وموثوقة",
        category: "quality"
      },
      {
        id: 2,
        icon: "www",
                title:"تجميع البيانات",

        text: " نظام موحّد لجمع وتنظيم تقييمات المدارس",
        category: "data"
      },
      {
        id: 3,
        icon: "folders",
                title:"معايير موحَّدة",

        text: "جودة التعليم، البيئة التعليميَّة، الإدارة \n والانضباط المدرسي، المرافق والخدمات..",
        category: "standards"
      },
      {
        id: 4,
        icon: "connection",
                title:"التفاعل",

        text: "تعزيز التواصل بين أولياء الأمور والمعلمين \n المشرفين والمدارس " ,
        category: "communication"
      },
      {
        id: 5,
        icon: "monitor2",
                title:"التقارير",

        text: "تقارير دوريَّة دائمة للمتابعة..",
        category: "reporting"
      },
      {
        id: 6,
        icon: "ok",
                title:"الموثوقيَّة والشفافيَّة",

        text: "آليَّات تحقّق ومراجعة دقيقة..",
        category: "reliability"
      }
    ]
  };

  const secondaryGoalsData = data || defaultData;

  // Split goals into two columns
const leftColumnGoals = [
  secondaryGoalsData.goals.find(g => g.id === 1), // تطوير بيئة تعليميّة عادلة وشفّافة
   secondaryGoalsData.goals.find(g => g.id === 4), // التفاعل: تعزيز قنوات التواصل...

 

];

const centerColumnGoals = [
  secondaryGoalsData.goals.find(g => g.id === 2), // تجميع البيانات: نظام موحّد...
    secondaryGoalsData.goals.find(g => g.id === 5) , // التقارير: تقارير دورية دائمة


];

const rightColumnGoals = [
    secondaryGoalsData.goals.find(g => g.id === 3), // معايير مُوحَّدة: جودة أكاديميّة...

  secondaryGoalsData.goals.find(g => g.id === 6)  // الموثوقية والشفافية: آليَّات تحقّق...
];


  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="bg-white py-20 px-4">
        <div 
          ref={elementRef}
          className={`w-full max-w-[1200px] mx-auto bg-white rounded-lg shadow-lg p-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* العنوان */}
          <h2
            className={`text-3xl font-semibold text-center text-primary mb-10   transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ textUnderlineOffset: '10px' }}
          >
            {secondaryGoalsData.title}
          </h2>

          {/* المستطيلات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* العمود الأول */}
            <div className="space-y-4">
              {leftColumnGoals.map((goal, index) => (
                <SecondaryGoalCard 
                  key={goal.id} 
                  goal={goal} 
                  index={index} 
                  isVisible={isVisible}
                />
              ))}
            </div>
{/* العمود الثالث */}
            <div className="space-y-4">
              {centerColumnGoals.map((goal, index) => (
                <SecondaryGoalCard 
                  key={goal.id} 
                  goal={goal} 
                  index={index + 3} 
                  isVisible={isVisible}
                />
              ))}
            </div>
            {/* العمود الثاني */}
            <div className="space-y-4">
              {rightColumnGoals.map((goal, index) => (
                <SecondaryGoalCard 
                  key={goal.id} 
                  goal={goal} 
                  index={index + 3} 
                  isVisible={isVisible}
                />
              ))}
            </div>



 


          </div>
        </div>
      </section>
    </div>
  );
}