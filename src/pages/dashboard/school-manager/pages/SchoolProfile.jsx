import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Info, 
  Calendar, 
  FolderKanban,
  School,
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import mockSchoolService from '../../../../services/mock/mockSchoolService';
import { toast } from '../../../../hooks/use-toast';

const tabs = [
  { id: 'general', label: 'معلومات عامة', icon: Info, path: '' },
  { id: 'activities', label: 'الأنشطة', icon: Calendar, path: 'activities' },
  { id: 'projects', label: 'المشاريع', icon: FolderKanban, path: 'projects' }
];

const GeneralInfo = ({ school, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(school || {});

  const handleSave = async () => {
    try {
      await mockSchoolService.updateSchoolInfo(school.id, formData);
      toast({ title: 'تم تحديث البيانات بنجاح' });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* School Header */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/10">
          <img 
            src={school?.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop'} 
            alt="School" 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="relative -mt-16 rtl">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl">
              <img 
                src={school?.logo || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop'} 
                alt="Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{school?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{school?.type}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? 'إلغاء' : 'تعديل'}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* School Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl">
              <School className="w-5 h-5" />
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 rtl">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              ) : (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">العنوان</p>
                  <p className="text-gray-600 dark:text-gray-400">{school?.address}</p>
                </div>
              )}
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              ) : (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">الهاتف</p>
                  <p className="text-gray-600 dark:text-gray-400" dir="ltr">{school?.phone}</p>
                </div>
              )}
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-1" />
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              ) : (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">البريد الإلكتروني</p>
                  <p className="text-gray-600 dark:text-gray-400" dir="ltr">{school?.email}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 rtl">
              <Users className="w-5 h-5" />
              الإحصائيات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3 rtl">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">عدد الطلاب</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{school?.studentsCount}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3 rtl">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">عدد المعلمين</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{school?.teachersCount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            حفظ التغييرات
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Activities = ({ school, onUpdate }) => {
  const [activities, setActivities] = useState(school?.activities || []);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center rtl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الأنشطة المدرسية</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة نشاط جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden h-full">
              {activity.images && activity.images.length > 0 && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.images[0]} 
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6 rtl">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activity.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'قادم' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{activity.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = ({ school, onUpdate }) => {
  const [projects, setProjects] = useState(school?.projects || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center rtl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المشاريع المدرسية</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع جديد
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 rtl">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>من: {new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
                      <span>إلى: {new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    project.status === 'مكتمل'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">نسبة الإنجاز</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-primary h-2.5 rounded-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SchoolProfile = () => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchool();
  }, []);

  const loadSchool = async () => {
    try {
      const response = await mockSchoolService.getSchool(1);
      setSchool(response.data);
    } catch (error) {
      toast({ title: 'حدث خطأ في تحميل البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Tabs Navigation */}
      <Card>
        <CardContent className="p-6">
          <nav className="flex gap-4 overflow-x-auto rtl">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                end={tab.path === ''}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <Routes>
        <Route index element={<GeneralInfo school={school} onUpdate={loadSchool} />} />
        <Route path="activities" element={<Activities school={school} onUpdate={loadSchool} />} />
        <Route path="projects" element={<Projects school={school} onUpdate={loadSchool} />} />
      </Routes>
    </motion.div>
  );
};

export default SchoolProfile;
