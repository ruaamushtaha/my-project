import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaSchool,
  FaStar,
  FaChartLine,
  FaComments,
  FaBell,
  FaCalendarAlt,
  FaFileAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaUserGraduate,
  FaChalkboard,
} from 'react-icons/fa';

import { Card, Loading } from '../components/ui';
import { useParentProfile, useDashboardStats } from '../hooks/useData';

import Chart from './Charts/NumEvaluationChart';
import ExamSuccessChart from './Charts/ExamSuccessChart';
import RatingChart from './Charts/RatingChart';
import EducationStagesChart from './Charts/EducationStagesChart';
import ReportsChart from './Charts/ReportsChart';
import StudentsChart from './Charts/StudentsChart';

// ======= Gauge Component =======
const Gauge = ({ value = 1.2, max = 1.8 }) => {
  const ticks = 15;
  const radius = 80;
  const center = radius + 20;
  const angleStart = -180;
  const angleEnd = 20;
  const angleRange = angleEnd - angleStart;
  const needleAngle = angleStart + (value / max) * angleRange;
  const needleRadians = (needleAngle * Math.PI) / 180;
  const needleLength = radius - 20;
  const needleX = center + needleLength * Math.cos(needleRadians);
  const needleY = center + needleLength * Math.sin(needleRadians);

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="200">
        {/* Base Arc */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 0,1 ${center + radius},${center}`}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 0,1 ${center + radius},${center}`}
          fill="none"
          stroke="#64C8CC"
          strokeWidth="15"
          strokeDasharray={`${(value / max) * Math.PI * radius},${Math.PI * radius}`}
          strokeLinecap="round"
        />
        {/* Ticks */}
        {[...Array(ticks)].map((_, i) => {
          const angle = angleStart + (i / ticks) * angleRange;
          const rad = (angle * Math.PI) / 180;
          const outerRadius = radius - 10;
          const innerRadius = radius - 18;
          const x1 = center + innerRadius * Math.cos(rad);
          const y1 = center + innerRadius * Math.sin(rad);
          const x2 = center + outerRadius * Math.cos(rad);
          const y2 = center + outerRadius * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="2" />;
        })}
        {/* Center Circle */}
        <circle cx={center} cy={center} r="6" fill="none" stroke="#64C8CC" strokeWidth="4" />
        {/* Needle */}
        <polygon
          points={`${center - 4},${center} ${center + 4},${center} ${center},${center - needleLength}`}
          fill="#64C8CC"
          transform={`rotate(${needleAngle} ${center} ${center})`}
        />
      </svg>
      <p className="text-center dark:text-white font-semibold mt-2">
        النتيجة: {value.toFixed(3)}
      </p>
    </div>
  );
};

// ======= StatsCard Component =======
const StatsCard = ({ title, value, icon: Icon, color, loading = false, suffix }) => {
  const colorClasses = {
    primary: 'text-primary-500',
    success: 'text-cyan-500',
    warning: 'text-sky-400',
    danger: 'text-purple-400',
    info: 'text-yellow',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden h-full group bg-[#F9F9FA] dark:bg-gray-700 transition-colors">
        <div className="absolute inset-0 bg-slate-200 dark:bg-gray-600 opacity-30 group-hover:opacity-70 transition-opacity" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-end mb-2">
            <div className={`${colorClasses[color]}`}>
              <Icon className="text-2xl" />
            </div>
          </div>
          <div className="space-y-1 mt-auto text-center">
            <p
              className="text-lg text-gray-900 dark:text-white font-bold truncate overflow-hidden whitespace-nowrap"
              title={title}
            >
              {title}
            </p>
            <h3
              className="text-sm font-thin text-gray-500 dark:text-gray-300 truncate overflow-hidden whitespace-nowrap"
              title={value}
            >
              {loading ? (
                <Loading type="spinner" size="sm" />
              ) : (
                `${value} ${suffix || ''}`
              )}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ======= SchoolsDashboard Page =======
const SchoolsDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useParentProfile();
  const { stats, loading: statsLoading } = useDashboardStats();

  const quickActions = [
    {
      label: 'تقييم مدرسة',
      icon: FaStar,
      color: 'text-[#64C8CC]',
      action: () => navigate('/dashboard/Schools/evaluations'),
      description: 'تقييم مدارس',
    },
    {
      label: 'إرسال رسالة',
      icon: FaComments,
      color: 'text-[#30A1DB]',
      action: () => navigate('/dashboard/Schools/chat'),
      description: 'التواصل المباشر مع إدارة المدارس',
    },
    {
      label: 'التقارير',
      icon: FaFileAlt,
      color: 'text-[#1CB654]',
      action: () => navigate('/dashboard/Schools/reports'),
      description: 'عرض جميع التقارير',
    },
    {
      label: 'التقويم',
      icon: FaCalendarAlt,
      color: 'text-[#9F45F2]',
      action: () => navigate('/dashboard/Schools/calendar'),
      description: 'عرض التواريخ والفعاليات المهمة',
    },
  ];

  return (
    <div className="container mx-auto bg-white dark:bg-gray-900 p-4 transition-colors" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          أهلا {profile?.fullName?.split(' ')[0] || 'مدير'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          هذه لوحة التحكّم الخاصَّة بك لمتابعة المدارس والتقييمات.
        </p>
      </motion.div>

      {/* Top Stats Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="المعلمون"
          value={statsLoading ? '...' : stats?.totalSchools || 0}
          suffix=" معلم ومعلمة في مدرستك.  "
          icon={FaChalkboardTeacher}
          color="danger"
          loading={statsLoading}
        />
        <StatsCard
          title="الطلاب"
          value="1200 طالب وطالبة في المدرسة."
          icon={FaUserGraduate}
          color="warning"
        />
        <StatsCard
          title="عدد الفصول"
          value={statsLoading ? '...' : stats?.activeEvaluations || 0}
          suffix=" فصل"
          icon={FaChalkboard}
          color="success"
          loading={statsLoading}
        />
        <StatsCard
          title="الإنجازات"
          value={statsLoading ? '...' : stats?.pendingNotifications || 0}
          suffix=" من الإنجازات لهذا العام"
          icon={FaTrophy}
          color="info"
          loading={statsLoading}
        />
      </motion.div>

      {/* Charts Section */}
      <Card className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl mb-8">
        <Chart />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* الكارد الأول */}
        <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <ReportsChart className="h-full w-full" />
          </div>
        </div>

        {/* الكارد الثاني */}
        <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-full flex flex-col">
          <div className="flex-1">
            <EducationStagesChart className="h-full w-full" />
          </div>
        </div>

        {/* الكارد الثالث */}
        <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-full flex flex-col">
          <StudentsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-full flex flex-col">
          <RatingChart />
        </div>

        <div className="bg-[#F9F9FA] dark:bg-gray-700 p-4 rounded-xl shadow-md h-fit flex flex-col mt-14">
          <ExamSuccessChart />
        </div>
      </div>
    </div>
  );
};

export default SchoolsDashboard;
