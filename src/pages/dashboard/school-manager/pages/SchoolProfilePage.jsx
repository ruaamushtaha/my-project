import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  School, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  GraduationCap,
  Calendar,
  Plus,
  Edit,
  Image as ImageIcon,
  TrendingUp,
  Activity
} from 'lucide-react';
import mockSchoolService from '../../../../services/mock/mockSchoolService';
import { useToast } from '@/hooks/use-toast';

const SchoolProfilePage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSchoolData();
  }, []);

  const loadSchoolData = async () => {
    try {
      const response = await mockSchoolService.getSchool(1);
      setSchool(response.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات المدرسة',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'معلومات عامة', icon: School },
    { id: 'activities', label: 'الأنشطة', icon: Activity },
    { id: 'projects', label: 'المشاريع', icon: TrendingUp }
  ];

  if (loading || !school) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          ملف المدرسة
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          معلومات وتفاصيل المدرسة الشاملة
        </p>
      </motion.div>

      {/* School Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 mb-6 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={school.logo}
              alt={school.name}
              className="w-24 h-24 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {school.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{school.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{school.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <School className="w-4 h-4" />
                  <span>{school.type}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="glass-card px-6 py-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary dark:text-accent">
                  {school.studentsCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">طالب</div>
              </div>
              <div className="glass-card px-6 py-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-success">
                  {school.teachersCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">معلم</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="glass-card rounded-2xl p-2 mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'general' && (
          <GeneralInfoTab key="general" school={school} />
        )}
        {activeTab === 'activities' && (
          <ActivitiesTab key="activities" activities={school.activities} schoolId={school.id} />
        )}
        {activeTab === 'projects' && (
          <ProjectsTab key="projects" projects={school.projects} schoolId={school.id} />
        )}
      </AnimatePresence>
    </div>
  );
};

const GeneralInfoTab = ({ school }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="glass-card rounded-2xl p-6"
  >
    <img
      src={school.image}
      alt={school.name}
      className="w-full h-64 object-cover rounded-xl mb-6"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoItem label="اسم المدرسة" value={school.name} />
      <InfoItem label="النوع" value={school.type} />
      <InfoItem label="العنوان" value={school.address} />
      <InfoItem label="رقم التواصل" value={school.phone} />
      <InfoItem label="البريد الإلكتروني" value={school.email} />
      <InfoItem label="عدد الطلاب" value={school.studentsCount} />
      <InfoItem label="عدد المعلمين" value={school.teachersCount} />
    </div>
  </motion.div>
);

const InfoItem = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
  </div>
);

const ActivitiesTab = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        الأنشطة المدرسية
      </h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg"
      >
        <Plus className="w-5 h-5" />
        إضافة نشاط
      </motion.button>
    </div>

    <div className="grid gap-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {activity.images.length > 0 && (
              <img
                src={activity.images[0]}
                alt={activity.name}
                className="w-full md:w-48 h-32 object-cover rounded-xl"
              />
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {activity.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.status === 'قادم'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {activity.status}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{activity.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(activity.date).toLocaleDateString('ar-SA')}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ProjectsTab = ({ projects }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        المشاريع المدرسية
      </h3>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg"
      >
        <Plus className="w-5 h-5" />
        إضافة مشروع
      </motion.button>
    </div>

    <div className="grid gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                project.status === 'مكتمل'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}
            >
              {project.status}
            </span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">نسبة الإنجاز</span>
              <span className="font-bold text-primary dark:text-accent">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>البداية: {new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>النهاية: {new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SchoolProfilePage;
