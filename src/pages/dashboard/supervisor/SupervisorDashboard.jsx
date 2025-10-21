import React, { useState } from 'react';
import { 
  FaSchool, 
  FaExclamationTriangle, 
  FaClipboardCheck, 
  FaFileAlt, 
  FaPaperPlane,
  FaChartBar,
  FaCog,
  FaSearch,
  FaBell,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload,
  FaFilter,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers
} from 'react-icons/fa';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SupervisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({
    fullName: 'محمد أحمد',
    email: 'supervisor@example.com',
    phone: '+966501234568',
    position: 'مشرف تربوي',
    notifications: true,
    emailNotifications: true
  });

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    // Here you would typically save to the backend
    console.log('Saving supervisor settings:', newSettings);
  };

  // Sample data for supervisor dashboard
  const statsData = [
    { title: 'المدارس المُشرف عليها', value: '12', change: '+2%', icon: FaSchool, color: 'bg-blue-500' },
    { title: 'الشكاوى المعلقة', value: '8', change: '+15%', icon: FaExclamationTriangle, color: 'bg-red-500' },
    { title: 'التقييمات المكتملة', value: '45', change: '+8%', icon: FaClipboardCheck, color: 'bg-green-500' },
    { title: 'التقارير الميدانية', value: '23', change: '+12%', icon: FaFileAlt, color: 'bg-yellow-500' }
  ];

  const chartData = [
    { name: 'يناير', visits: 15, reports: 12, evaluations: 8 },
    { name: 'فبراير', visits: 18, reports: 15, evaluations: 10 },
    { name: 'مارس', visits: 22, reports: 18, evaluations: 12 },
    { name: 'أبريل', visits: 20, reports: 16, evaluations: 11 },
    { name: 'مايو', visits: 25, reports: 20, evaluations: 15 },
    { name: 'يونيو', visits: 28, reports: 23, evaluations: 18 }
  ];

  const pieData = [
    { name: 'ممتاز', value: 35, color: '#10B981' },
    { name: 'جيد جداً', value: 40, color: '#3B82F6' },
    { name: 'جيد', value: 20, color: '#F59E0B' },
    { name: 'يحتاج تحسين', value: 5, color: '#EF4444' }
  ];

  // Schools under supervision
  const supervisedSchools = [
    { id: 1, name: 'مدرسة النجاح الابتدائية', location: 'الرياض', students: 450, rating: 4.5, lastVisit: '2024-01-10', status: 'ممتاز' },
    { id: 2, name: 'مدرسة الأمل المتوسطة', location: 'جدة', students: 320, rating: 4.2, lastVisit: '2024-01-08', status: 'جيد جداً' },
    { id: 3, name: 'مدرسة المستقبل الثانوية', location: 'الدمام', students: 280, rating: 4.8, lastVisit: '2024-01-05', status: 'ممتاز' },
    { id: 4, name: 'مدرسة الفجر الابتدائية', location: 'الرياض', students: 380, rating: 3.9, lastVisit: '2024-01-03', status: 'جيد' },
    { id: 5, name: 'مدرسة الضياء المتوسطة', location: 'مكة', students: 290, rating: 4.1, lastVisit: '2024-01-01', status: 'جيد جداً' }
  ];

  // Parent complaints
  const parentComplaints = [
    { id: 1, parent: 'أحمد محمد علي', school: 'مدرسة النجاح', complaint: 'تأخير في الحافلة المدرسية', priority: 'عالية', status: 'جديد', date: '2024-01-15', category: 'نقل' },
    { id: 2, parent: 'فاطمة حسن', school: 'مدرسة الأمل', complaint: 'عدم توفر كتب مدرسية', priority: 'متوسطة', status: 'قيد المراجعة', date: '2024-01-14', category: 'تعليمي' },
    { id: 3, parent: 'محمد عبدالله', school: 'مدرسة المستقبل', complaint: 'مشكلة في نظافة المرافق', priority: 'منخفضة', status: 'تم الحل', date: '2024-01-13', category: 'مرافق' },
    { id: 4, parent: 'سارة أحمد', school: 'مدرسة الفجر', complaint: 'عدم وضوح في التقييم', priority: 'متوسطة', status: 'جديد', date: '2024-01-12', category: 'تعليمي' }
  ];

  // Field reports
  const fieldReports = [
    { id: 1, school: 'مدرسة النجاح', visitDate: '2024-01-10', reportDate: '2024-01-11', status: 'مكتمل', rating: 4.5, issues: 2, recommendations: 3 },
    { id: 2, school: 'مدرسة الأمل', visitDate: '2024-01-08', reportDate: '2024-01-09', status: 'مكتمل', rating: 4.2, issues: 3, recommendations: 4 },
    { id: 3, school: 'مدرسة المستقبل', visitDate: '2024-01-05', reportDate: '2024-01-06', status: 'مكتمل', rating: 4.8, issues: 1, recommendations: 2 },
    { id: 4, school: 'مدرسة الفجر', visitDate: '2024-01-03', reportDate: '', status: 'معلق', rating: 0, issues: 0, recommendations: 0 }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: FaChartBar },
    { id: 'schools', label: 'المدارس المُشرف عليها', icon: FaSchool },
    { id: 'complaints', label: 'شكاوى أولياء الأمور', icon: FaExclamationTriangle },
    { id: 'evaluations', label: 'التقييمات الميدانية', icon: FaClipboardCheck },
    { id: 'reports', label: 'التقارير الميدانية', icon: FaFileAlt },
    { id: 'send-reports', label: 'إرسال التقارير', icon: FaPaperPlane },
    { id: 'settings', label: 'الإعدادات', icon: FaCog }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
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
        {/* Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">نشاطات الإشراف الشهرية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#3B82F6" name="الزيارات الميدانية" />
              <Bar dataKey="reports" fill="#10B981" name="التقارير" />
              <Bar dataKey="evaluations" fill="#F59E0B" name="التقييمات" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Schools Rating Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع تقييمات المدارس</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent School Visits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">الزيارات الميدانية الأخيرة</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                عرض الكل
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {supervisedSchools.slice(0, 3).map((school) => (
                <div key={school.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaSchool className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{school.name}</p>
                      <p className="text-xs text-gray-500">{school.location} • آخر زيارة: {school.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm text-gray-700 mr-1">{school.rating}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      school.status === 'ممتاز' ? 'bg-green-100 text-green-800' :
                      school.status === 'جيد جداً' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {school.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">الشكاوى الحديثة</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                عرض الكل
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {parentComplaints.slice(0, 3).map((complaint) => (
                <div key={complaint.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{complaint.complaint}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      complaint.priority === 'عالية' ? 'bg-red-100 text-red-800' :
                      complaint.priority === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {complaint.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">بواسطة: {complaint.parent} • {complaint.school}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      complaint.status === 'جديد' ? 'bg-blue-100 text-blue-800' :
                      complaint.status === 'قيد المراجعة' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {complaint.status}
                    </span>
                    <span className="text-xs text-gray-400">{complaint.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">المدارس المُشرف عليها</h3>
            <div className="flex items-center space-x-3 space-x-reverse">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse">
                <FaCalendarAlt className="text-sm" />
                <span>جدولة زيارة</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 space-x-reverse">
                <FaDownload className="text-sm" />
                <span>تصدير</span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 space-x-reverse">
            <div className="flex-1 relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن المدارس..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 space-x-reverse">
              <FaFilter className="text-sm" />
              <span>تصفية</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">المدرسة</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">عدد الطلاب</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">آخر زيارة</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supervisedSchools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaSchool className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{school.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <FaMapMarkerAlt className="text-gray-400 text-xs" />
                      <span className="text-sm text-gray-900">{school.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <FaUsers className="text-gray-400 text-xs" />
                      <span className="text-sm text-gray-900">{school.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm text-gray-900">{school.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {school.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      school.status === 'ممتاز' ? 'bg-green-100 text-green-800' :
                      school.status === 'جيد جداً' ? 'bg-blue-100 text-blue-800' :
                      school.status === 'جيد' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {school.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900" title="عرض التفاصيل">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="زيارة ميدانية">
                        <FaCalendarAlt />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="تقييم">
                        <FaClipboardCheck />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">شكاوى أولياء الأمور</h3>
            <div className="flex items-center space-x-3 space-x-reverse">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 space-x-reverse">
                <FaDownload className="text-sm" />
                <span>تصدير</span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 space-x-reverse">
            <div className="flex-1 relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الشكاوى..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>جميع الأولويات</option>
              <option>عالية</option>
              <option>متوسطة</option>
              <option>منخفضة</option>
            </select>
            <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>جميع الحالات</option>
              <option>جديد</option>
              <option>قيد المراجعة</option>
              <option>تم الحل</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {parentComplaints.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h4 className="text-lg font-medium text-gray-900">#{complaint.id} - {complaint.complaint}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.priority === 'عالية' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.status === 'جديد' ? 'bg-blue-100 text-blue-800' :
                        complaint.status === 'قيد المراجعة' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">ولي الأمر:</span>
                        <p>{complaint.parent}</p>
                      </div>
                      <div>
                        <span className="font-medium">المدرسة:</span>
                        <p>{complaint.school}</p>
                      </div>
                      <div>
                        <span className="font-medium">التصنيف:</span>
                        <p>{complaint.category}</p>
                      </div>
                      <div>
                        <span className="font-medium">التاريخ:</span>
                        <p>{complaint.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    مراجعة الشكوى
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                    إضافة للتقرير
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                    تواصل مع المدرسة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvaluations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">التقييمات الميدانية</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse">
              <FaPlus className="text-sm" />
              <span>تقييم جديد</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {supervisedSchools.map((school) => (
              <div key={school.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaSchool className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{school.name}</h4>
                      <p className="text-sm text-gray-500">{school.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 space-x-reverse mb-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-lg font-bold text-gray-900">{school.rating}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      school.status === 'ممتاز' ? 'bg-green-100 text-green-800' :
                      school.status === 'جيد جداً' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {school.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">عدد الطلاب:</span>
                    <p className="font-medium">{school.students}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">آخر زيارة:</span>
                    <p className="font-medium">{school.lastVisit}</p>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                    إجراء تقييم
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm">
                    عرض التاريخ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">التقارير الميدانية</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse">
              <FaPlus className="text-sm" />
              <span>تقرير جديد</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {fieldReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{report.school}</h4>
                    <p className="text-sm text-gray-500">زيارة ميدانية - {report.visitDate}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    report.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                {report.status === 'مكتمل' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{report.rating}</div>
                      <div className="text-xs text-gray-500">التقييم العام</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{report.issues}</div>
                      <div className="text-xs text-gray-500">المشاكل المحددة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{report.recommendations}</div>
                      <div className="text-xs text-gray-500">التوصيات</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{report.reportDate}</div>
                      <div className="text-xs text-gray-500">تاريخ التقرير</div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3 space-x-reverse">
                  {report.status === 'معلق' ? (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      إكمال التقرير
                    </button>
                  ) : (
                    <>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        عرض التقرير
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                        تحميل PDF
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSendReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">إرسال التقارير لإدارة المدارس</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">إرسال تقارير فردية</h4>
              {fieldReports.filter(report => report.status === 'مكتمل').map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">{report.school}</h5>
                      <p className="text-sm text-gray-500">تقرير الزيارة - {report.visitDate}</p>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm font-medium">{report.rating}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                      إرسال للمدرسة
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700">
                      إرسال للإدارة
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">إرسال جماعي</h4>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اختر التقارير للإرسال
                    </label>
                    <div className="space-y-2">
                      {fieldReports.filter(report => report.status === 'مكتمل').map((report) => (
                        <label key={report.id} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="mr-2 text-sm">{report.school} - {report.visitDate}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium">
                    إرسال التقارير المحددة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    const tabContent = {
      overview: renderOverview,
      schools: renderSchools,
      complaints: renderComplaints,
      evaluations: renderEvaluations,
      reports: renderReports,
      'send-reports': renderSendReports,
      settings: () => (
        <div className="space-y-6">
          {/*  <SettingsForm 
            initialData={settings} 
            onSave={handleSaveSettings} 
          />*/}
        </div>
      )
    };

    return tabContent[activeTab]();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      <div className="flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 min-h-screen`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900">لوحة المشرف</h2>
                  <p className="text-sm text-gray-500">المشرف التعليمي</p>
                </div>
              )}
            </div>
          </div>
          
          <nav className="mt-6">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-right hover:bg-gray-50 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="text-lg" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaCog className="text-lg" />
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {sidebarItems.find(item => item.id === activeTab)?.label}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button className="relative p-2 text-gray-500 hover:text-gray-700">
                    <FaBell className="text-lg" />
                    <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">م</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">محمد المشرف</p>
                      <p className="text-xs text-gray-500">مشرف تعليمي</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;