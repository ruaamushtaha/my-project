import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap,
  UserCheck,
  AlertTriangle,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    primary: 'from-blue-500 via-blue-600 to-indigo-600',
    success: 'from-emerald-500 via-green-600 to-teal-600',
    warning: 'from-amber-500 via-orange-600 to-yellow-600',
    danger: 'from-rose-500 via-red-600 to-pink-600',
  };

  const isTrendingUp = trend?.includes('+') || trend?.includes('-');
  const isPositive = trend?.includes('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="glass-card relative overflow-hidden h-full group rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${colorClasses[color]} opacity-5 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-7 h-7" strokeWidth={2} />
            </motion.div>
            {trend && (
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                isPositive 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{trend}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <motion.h3 
              className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {value}
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const statsData = [
    { title: 'إجمالي الطلاب', value: '1,245', trend: '+12%', icon: Users, color: 'primary' },
    { title: 'إجمالي المعلمين', value: '68', trend: '+5%', icon: GraduationCap, color: 'success' },
    { title: 'معدل الحضور', value: '94%', trend: '+2%', icon: UserCheck, color: 'warning' },
    { title: 'الشكاوى المعلقة', value: '8', trend: '-15%', icon: AlertTriangle, color: 'danger' },
  ];

  const performanceData = [
    { name: 'يناير', value: 85 },
    { name: 'فبراير', value: 88 },
    { name: 'مارس', value: 82 },
    { name: 'أبريل', value: 90 },
    { name: 'مايو', value: 87 },
    { name: 'يونيو', value: 92 }
  ];

  const gradeDistribution = [
    { name: 'ممتاز', value: 35, color: '#10B981' },
    { name: 'جيد جداً', value: 40, color: '#3B82F6' },
    { name: 'جيد', value: 20, color: '#F59E0B' },
    { name: 'مقبول', value: 5, color: '#EF4444' }
  ];

  const quickActions = [
    { 
      label: 'إدارة الطلاب', 
      icon: Users, 
      color: 'from-blue-500 via-blue-600 to-indigo-600',
      action: () => navigate('/dashboard/school-manager/students')
    },
    { 
      label: 'إدارة المعلمين', 
      icon: GraduationCap, 
      color: 'from-emerald-500 via-green-600 to-teal-600',
      action: () => navigate('/dashboard/school-manager/teachers')
    },
    { 
      label: 'الشكاوى', 
      icon: AlertTriangle, 
      color: 'from-rose-500 via-red-600 to-pink-600',
      action: () => navigate('/dashboard/school-manager/complaints')
    },
    { 
      label: 'التقارير', 
      icon: FileText, 
      color: 'from-purple-500 via-violet-600 to-fuchsia-600',
      action: () => navigate('/dashboard/school-manager/reports')
    }
  ];

  return (
    <div className="container mx-auto" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          لوحة التحكم
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          نظرة عامة على إحصائيات وأداء المدرسة
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="glass-card rounded-2xl p-6 h-full hover:shadow-2xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              أداء المدرسة الشهري
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    fill="url(#performanceGradient)"
                    dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 8, fill: '#3B82F6', strokeWidth: 3, stroke: '#fff' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="glass-card rounded-2xl p-6 h-full hover:shadow-2xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
              توزيع التقديرات
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-fuchsia-600 rounded-full" />
            الإجراءات السريعة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg group`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <action.icon className="w-10 h-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  </motion.div>
                  <span className="font-semibold text-lg">{action.label}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
