import React, { useState, useRef } from 'react';
import { 
  FaUsers, 
  FaCog, 
  FaFileAlt, 
  FaSchool as FaSchoolIcon,
  FaHome,
  FaChartLine,
  FaExclamationTriangle,
  FaClipboardCheck,
  FaUserTie,
  FaChalkboardTeacher,
  FaSave,
  FaServer,
  FaDatabase,
  FaCloudUploadAlt,
  FaDownload
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SchoolManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: 'سارة أحمد',
    email: 'school.manager@example.com',
    phone: '+966501234569',
    school: 'مدرسة النموذجية',
    profilePicture: null,
    tempProfilePic: null,
    notifications: {
      email: true,
      sms: true,
      push: false,
      announcements: true,
      reports: true,
      updates: false
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);
  const [userSettings] = useState({
    fullName: 'سارة أحمد',
    position: 'مدير المدرسة',
    email: 'school.manager@example.com',
    phone: '+966501234569',
    notifications: {
      email: true,
      sms: true,
      push: false
    }
  });
  
  // Sample data
  const statsData = [
    { title: 'إجمالي الطلاب', value: '1,245', change: '+12%', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'إجمالي المعلمين', value: '68', change: '+5%', icon: FaChalkboardTeacher, color: 'bg-green-500' },
    { title: 'إجمالي الفصول', value: '32', change: '+3%', icon: FaClipboardCheck, color: 'bg-yellow-500' },
    { title: 'متوسط الحضور', value: '94%', change: '+2%', icon: FaUserTie, color: 'bg-purple-500' }
  ];

  const chartData = [
    { name: 'يناير', value: 65 },
    { name: 'فبراير', value: 70 },
    { name: 'مارس', value: 75 },
    { name: 'أبريل', value: 80 },
    { name: 'مايو', value: 85 },
    { name: 'يونيو', value: 90 }
  ];

  // Render functions for each dashboard section
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} من الشهر الماضي
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء المدارس الشهري</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Performance Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع أداء الطلاب</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900">المدرسة</h3>
        <p className="mt-2 text-gray-600">معلومات المدرسة ستظهر هنا</p>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900">الشكاوى والتقييمات</h3>
        <p className="mt-2 text-gray-600">قسم الشكاوى والتقييمات سيتم إضافته قريباً</p>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900">أداء الطلاب</h3>
        <p className="mt-2 text-gray-600">إحصائيات أداء الطلاب ستظهر هنا</p>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900">التقارير</h3>
        <p className="mt-2 text-gray-600">قسم التقارير سيتم إضافته قريباً</p>
      </div>
    </div>
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          tempProfilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus({ type: 'saving', message: 'جاري حفظ التغييرات...' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData(prev => ({
        ...prev,
        profilePicture: prev.tempProfilePic || prev.profilePicture,
        tempProfilePic: null
      }));
      
      setSaveStatus({ type: 'success', message: 'تم حفظ التغييرات بنجاح' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'حدث خطأ أثناء حفظ التغييرات' });
    } finally {
      setIsSaving(false);
      
      // Clear success message after 3 seconds
      if (saveStatus.type === 'success') {
        setTimeout(() => {
          setSaveStatus({ type: '', message: '' });
        }, 3000);
      }
    }
  };

  const renderSettings = () => {
    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    // System status data
    const systemStatus = [
      { service: 'نظام إدارة المدرسة', status: 'يعمل', uptime: '99.9%', color: 'bg-green-500', icon: <FaServer className="text-white" /> },
      { service: 'قاعدة البيانات', status: 'يعمل', uptime: '99.8%', color: 'bg-green-500', icon: <FaDatabase className="text-white" /> },
      { service: 'النسخ الاحتياطي', status: 'نشط', uptime: '100%', color: 'bg-blue-500', icon: <FaCloudUploadAlt className="text-white" /> },
      { service: 'آخر تحديث', status: 'متاح', uptime: '1.2.3', color: 'bg-purple-500', icon: <FaDownload className="text-white" /> }
    ];

    return (
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Save Status */}
        {saveStatus.message && (
          <div className={`p-4 rounded-lg ${
            saveStatus.type === 'success' ? 'bg-green-50 text-green-800' : 
            saveStatus.type === 'error' ? 'bg-red-50 text-red-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {saveStatus.message}
          </div>
        )}

        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">الملف الشخصي</h3>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <FaSave className="ml-2" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      src={formData.tempProfilePic || formData.profilePicture || 'https://via.placeholder.com/150'}
                      alt="صورة الملف الشخصي"
                    />
                  </div>
                </div>
                <div>
                  <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                    <FaCloudUploadAlt className="ml-2" />
                    تغيير الصورة
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدرسة</label>
                  <input
                    type="text"
                    value={formData.school}
                    disabled
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">إعدادات الإشعارات</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">البريد الإلكتروني</h4>
                  <p className="text-sm text-gray-500">تلقي الإشعارات عبر البريد الإلكتروني</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        email: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">رسائل SMS</h4>
                  <p className="text-sm text-gray-500">تلقي الإشعارات عبر رسائل SMS</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.sms}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        sms: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">إشعارات التطبيق</h4>
                  <p className="text-sm text-gray-500">تلقي الإشعارات عبر التطبيق</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        push: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">حالة النظام</h3>
            <p className="text-sm text-gray-500 mt-1">معلومات عن حالة النظام والخدمات</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStatus.map((service, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`w-12 h-12 ${service.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    {service.icon}
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{service.service}</h4>
                  <p className="text-xs text-gray-500 mt-1">{service.status}</p>
                  <p className="text-xs text-gray-400"><FaCog className="text-xl text-gray-400" />{service.uptime}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    );
  };

  // Render the main dashboard layout
  return (
    <div className="flex h-screen bg-gray-50 text-right" dir="rtl">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center border-b border-blue-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          ) : (
            <div className="w-8 h-8"></div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            {sidebarOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-6">
          <div>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'overview' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaHome className="ml-3" />
              {sidebarOpen && <span className="mr-2">نظرة عامة</span>}
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'schools' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaSchoolIcon className="ml-3" />
              {sidebarOpen && <span className="mr-2">المدرسة</span>}
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'complaints' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaExclamationTriangle className="ml-3" />
              {sidebarOpen && <span className="mr-2">الشكاوى</span>}
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'performance' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaChartLine className="ml-3" />
              {sidebarOpen && <span className="mr-2">الأداء</span>}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'reports' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaFileAlt className="ml-3" />
              {sidebarOpen && <span className="mr-2">التقارير</span>}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors duration-200 ${activeTab === 'settings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <FaCog className="ml-3" />
              {sidebarOpen && <span className="mr-2">الإعدادات</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === 'overview' && 'نظرة عامة'}
                {activeTab === 'schools' && 'المدرسة'}
                {activeTab === 'complaints' && 'الشكاوى'}
                {activeTab === 'performance' && 'الأداء'}
                {activeTab === 'reports' && 'التقارير'}
                {activeTab === 'settings' && 'الإعدادات'}
              </h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
                <FaCog className="text-xl" />
              </button>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {userSettings.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                {sidebarOpen && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{userSettings.fullName}</p>
                    <p className="text-xs text-gray-500">{userSettings.position}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'schools' && renderSchools()}
          {activeTab === 'complaints' && renderComplaints()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'reports' && renderReports()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default SchoolManagerDashboard;
