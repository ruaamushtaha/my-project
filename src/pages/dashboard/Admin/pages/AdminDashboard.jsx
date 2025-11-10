import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSchool,FaLink,FaUserFriends, FaUserShield, FaUser,FaUserTie,FaTimes 
} from 'react-icons/fa';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { Card, Loading } from '../components/ui';
import { useParentProfile, useDashboardStats } from '../hooks/useData';


// ======= StatsCard Component =======
const StatsCard = ({ title, value, icon: Icon, color, loading = false, suffix }) => {
  const colorClasses = {
    blue: 'text-sky-700',
    success: 'text-green-500', 
    danger: 'text-cyan-500',
    info: 'text-yellow-500',
    purple:'text-purple-500',
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
              {loading ? <Loading type="spinner" size="sm" /> : `${value} ${suffix || ''}`}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ======= AdminDashboard Page =======
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useParentProfile();
  const { stats, loading: statsLoading } = useDashboardStats();

  const [showModal, setShowModal] = useState(false);
const ChooseDashboards = ({ onClose }) => {
  const panels = [
    { title: 'لوحة الآدمن', description: 'إدارة شاملة للنظام', icon: FaUserShield, bgColor: 'bg-[#3083FF33]', iconColor: 'text-[#3083FF]' },
    { title: 'لوحة المشرف', description: 'مراقبة وتقييم المدارس', icon: FaUserTie, bgColor: 'bg-[#25980026]', iconColor: 'text-[#259800]' },
    { title: 'لوحة مدير المدرسة', description: 'إدارة المدرسة والطلاب', icon: FaSchool, bgColor: 'bg-[#4CDBC433]', iconColor: 'text-[#4CDBC4]' },
    { title: 'لوحة ولي الأمر', description: 'متابعة الأطفال والمدارس', icon: FaUser, bgColor: 'bg-[#9F45F233]', iconColor: 'text-[#8785FF]' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl"
      >
        <div className="flex items-center justify-between p-2 mb-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-right text-gray-900 dark:text-white">اختر لوحة التحكم</h2>
          <button onClick={onClose} className="text-slate-900 hover:text-red-700 dark:text-white">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panels.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <div key={index} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col justify-between h-full">
                <div className="flex items-center justify-start mb-2">
                  <div className={`ml-2 p-2 rounded-full ${panel.bgColor}`}>
                    <Icon className={`text-xl ${panel.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{panel.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{panel.description}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition">انتقال</button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};


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
          أهلا {profile?.fullName?.split(' ')[0] || 'أدمن'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
هذه لوحة التحكّم الخاصَّة بك لمتابعة المنصّة.        </p>
      </motion.div>

      {/* Top Stats Cards */}
<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatsCard title="إجمالي المستخدمين" value={statsLoading ? '...' : stats?.totalSchools || 0} suffix="  طالب وطالبة .  " icon={FaUserFriends} color="danger" loading={statsLoading} />
  <StatsCard title=" المستخدمون النشطون" value="مديريّة" icon={FaUserFriends} color="success" />
  <StatsCard title=" عدد المدارس" value={statsLoading ? '...' : stats?.activeEvaluations || 0} suffix=" مدرسة" icon={FaSchool} color="blue" loading={statsLoading} />
  <StatsCard title="المستخدمون المعلقون" value={statsLoading ? '...' : stats?.pendingNotifications || 0} suffix="  معلم ومعلمة" icon={FaUserFriends} color="info" loading={statsLoading} />
</motion.div>
<motion.div className="flex justify-center gap-6 mb-8">
  <div className="w-[250px]">
    <StatsCard title="إجمالي الروابط" value={statsLoading ? '...' : stats?.totalSchools || 0} suffix=" مديريّة" icon={FaLink} color="purple" loading={statsLoading}  />
  </div>
  <div className="w-[250px]">
    <StatsCard title="الروابط النشطة"  value={statsLoading ? '...' : stats?.totalSchools || 0} suffix=" مدرسة" icon={FaLink} color="success" loading={statsLoading} />
  </div>
</motion.div>

<div className="mt-12">
  <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 dark:text-white">
    أحدث التسجيلات
  </h2>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="py-3 px-6 text-right text-gray-500 dark:text-gray-200 font-bold">الاسم</th>
          <th className="py-3 px-6 text-right text-gray-500 dark:text-gray-200 font-bold">البريد الإلكتروني</th>
          <th className="py-3 px-6 text-right text-gray-500 dark:text-gray-200 font-bold">نوع المستخدم</th>
          <th className="py-3 px-6 text-right text-gray-500 dark:text-gray-200 font-bold">تاريخ التسجيل</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200 dark:border-gray-600">
          <td className="py-3 px-6 text-right text-slate-950 dark:text-white">قاسم عبدالعال </td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">qw@gmail.com</td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">مدير</td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">July 1, 2024</td>
        </tr>
        <tr className="border-b border-gray-200 dark:border-gray-600">
          <td className="py-3 px-6 text-right text-slate-950 dark:text-white">أحمد علي</td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">ahmed@gmail.com</td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">مشرف</td>
          <td className="py-3 px-6 text-right text-gray-500 dark:text-white">July 8, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div className="flex justify-end mt-8">
  <button onClick={() => setShowModal(true)} className="flex flex-col items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
    <FaArrowRight className="text-sm" />
    <FaArrowLeft className="text-sm mt-1" />
  </button>
</div>
{showModal && <ChooseDashboards onClose={() => setShowModal(false)} />}


    </div>
  );
  
};

export default AdminDashboard;
