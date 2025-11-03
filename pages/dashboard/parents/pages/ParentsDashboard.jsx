import React, { useState, useEffect } from 'react';
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
  FaUsers,
  FaGraduationCap,
  FaTrophy,
  FaEye,
  FaPaperPlane,
  FaBook,
  FaClipboardList,
  FaTasks
} from 'react-icons/fa';

import { Card, Button, Badge, Loading } from '../components/ui';
import { useParentProfile, useDashboardStats, useSchools, useNotifications } from '../hooks/useData';

/**
 * مكون بطاقة الإحصائية
 * Statistics Card Component
 */
const StatsCard = ({ title, value, icon: Icon, color, loading = false }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-green-500 to-green-600', 
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
    info: 'from-blue-500 to-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden h-full group">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white shadow-lg`}>
              <Icon className="text-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? <Loading type="spinner" size="sm" /> : value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{title}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * مكون بطاقة المدرسة
 * School Card Component
 */
const SchoolCard = ({ school, index, onViewDetails, onEvaluateSchool, onSendMessage }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-purple-500';
    if (rating >= 3.5) return 'text-green-500';
    if (rating >= 3.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Extract directorate from location (assuming format "تابعة لمديرية [اسم المديرية]")
  const getDirectorate = (location) => {
    if (location.includes('مديرية')) {
      return location.split('مديرية')[1].trim();
    }
    return location;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5" />
        
        <div className="relative z-10">
          {/* School Image */}
          <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
            <img 
              src={school.image} 
              alt={school.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Rating Overlay */}
            <div className="absolute bottom-3 right-3">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur bg-white/90 ${getRatingColor(school.overallRating).split(' ')[0]}`}>
                <FaStar className="text-xs" />
                <span className="text-xs font-bold">{school.overallRating}</span>
              </div>
            </div>
          </div>

          {/* School Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {school.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">{school.type}</Badge>
              </div>
            </div>

            {/* Directorate Info */}
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <FaGraduationCap className="flex-shrink-0" />
              <span>تابعة لمديرية {getDirectorate(school.location)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <Button 
                variant="primary" 
                size="sm"
                className="w-full"
                onClick={() => onViewDetails(school)}
              >
                <FaEye className="ml-1" />
                عرض التفاصيل
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={() => onEvaluateSchool(school)}
              >
                <FaStar className="ml-1" />
                تقييم المدرسة
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full"
                onClick={() => onSendMessage(school)}
              >
                <FaPaperPlane className="ml-1" />
                إرسال رسالة
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * مكون بطاقة النشاط الحديث
 * Recent Activity Card Component
 */
const ActivityCard = ({ activity, index }) => {
  const typeIcons = {
    evaluation: FaStar,
    message: FaComments,
    school: FaSchool,
    achievement: FaTrophy
  };

  const typeColors = {
    evaluation: 'text-yellow-500',
    message: 'text-blue-500', 
    school: 'text-green-500',
    achievement: 'text-purple-500'
  };

  const Icon = typeIcons[activity.type];

  return (
    <motion.div
      className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ x: 5 }}
    >
      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${typeColors[activity.type]}`}>
        <Icon className="text-lg" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
          {activity.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
          {activity.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {new Date(activity.timestamp).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * الصفحة الرئيسية للداشبورد
 * Main Dashboard Page Component
 */
const ParentsDashboard = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useParentProfile();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { mySchools, loading: schoolsLoading } = useSchools({ myChildren: true });
  const { notifications } = useNotifications();
  
  // Handle view details
  const handleViewDetails = (school) => {
    navigate(`/dashboard/parents/schools/${school.id}`);
  };

  // Handle evaluate school
  const handleEvaluateSchool = (school) => {
    navigate(`/dashboard/parents/evaluations?schoolId=${school.id}`);
  };

  // Handle send message
  const handleSendMessage = (school) => {
    navigate('/dashboard/parents/chat', { state: { schoolId: school.id } });
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            مرحباً بك، {profile?.fullName?.split(' ')[0] || 'ولي الأمر'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            هذه لوحة التحكم الخاصة بك لمتابعة مدارس أبنائك والأنشطة المتعلقة بهم
          </p>
        </div>
      </motion.div>

      {/* Top Cards Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatsCard
          title="مدارس أبنائي"
          value={statsLoading ? '...' : stats?.totalSchools || 0}
          icon={FaSchool}
          color="primary"
          loading={statsLoading}
        />
        
        <StatsCard
          title="متوسط التقييمات"
          value={statsLoading ? '...' : `${stats?.averageRating?.toFixed(1) || 0}/5`}
          icon={FaStar}
          color="warning"
          loading={statsLoading}
        />
        
        <StatsCard
          title="التقييمات النشطة"
          value={statsLoading ? '...' : stats?.activeEvaluations || 0}
          icon={FaChartLine}
          color="success"
          loading={statsLoading}
        />
        
        <StatsCard
          title="الإشعارات الجديدة"
          value={statsLoading ? '...' : stats?.pendingNotifications || 0}
          icon={FaBell}
          color="info"
          loading={statsLoading}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Children's Schools Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FaSchool className="text-2xl text-primary-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      مدارس أبنائي
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      المدارس المسجل بها أبناؤك حالياً
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {schoolsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-700 animate-pulse rounded-xl h-64" />
                    ))}
                  </div>
                ) : mySchools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mySchools.map((school, index) => (
                      <SchoolCard 
                        key={school.id} 
                        school={school} 
                        index={index}
                        onViewDetails={handleViewDetails}
                        onEvaluateSchool={handleEvaluateSchool}
                        onSendMessage={handleSendMessage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaSchool className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      لا توجد مدارس مسجلة حالياً لأبنائك
                    </p>
                    <Button variant="primary" onClick={() => navigate('/dashboard/parents/schools')}>
                      استعراض المدارس
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FaBell className="text-2xl text-primary-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      النشاط الحديث
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      آخر التحديثات والأنشطة
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                {statsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2" />
                          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats?.recentActivities?.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {stats.recentActivities.map((activity, index) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaBell className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      لا توجد أنشطة حديثة
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate('/dashboard/parents/notifications')}
                >
                  <FaEye className="ml-2" />
                  عرض جميع الأنشطة
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            الإجراءات السريعة
          </h2>
          
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                label: 'تقييم مدرسة', 
                icon: FaStar, 
                color: 'from-yellow-500 to-yellow-600',
                action: () => navigate('/dashboard/parents/evaluations'),
                description: 'تقييم مدارس أبنائك ومشاركة تجربتكم'
              },
              { 
                label: 'إرسال رسالة', 
                icon: FaComments, 
                color: 'from-blue-500 to-blue-600',
                action: () => navigate('/dashboard/parents/chat'),
                description: 'التواصل المباشر مع إدارة مدارس أبنائك'
              },
              { 
                label: 'التقارير', 
                icon: FaFileAlt, 
                color: 'from-green-500 to-green-600',
                action: () => navigate('/dashboard/parents/reports'),
                description: 'عرض جميع التقارير المتعلقة بأبنائك'
              },
              { 
                label: 'التقويم', 
                icon: FaCalendarAlt, 
                color: 'from-purple-500 to-purple-600',
                action: () => navigate('/dashboard/parents/calendar'),
                description: 'عرض التواريخ والفعاليات المهمة'
              }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                className={`p-6 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-200 text-right group`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                onClick={action.action}
              >
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-bold text-lg">{action.label}</p>
                    <p className="text-sm opacity-90 mt-1">{action.description}</p>
                  </div>
                  <action.icon className="text-2xl group-hover:scale-110 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ParentsDashboard;