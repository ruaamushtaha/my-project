// =============================================================================
// Main Parents Dashboard - Redesigned and Enhanced
// داشبورد أولياء الأمور الجديد المتطور والمحسن
// =============================================================================

import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// New Enhanced Pages
import Dashboard from './pages/Dashboard';
import SchoolsPage from './pages/SchoolsPage';
import EvaluationsPage from './pages/EvaluationsPage';
import ComingSoon from './components/ComingSoon';

// Original Components (for backwards compatibility)
import { 
  FaSchool, 
  FaExclamationTriangle, 
  FaCog,
  FaSearch,
  FaStar,
  FaHome,
  FaUserCircle,
  FaBell,
  FaQuestionCircle,
  FaTimes,
  FaComments
} from 'react-icons/fa';
import ChatWidget from './components/ChatWidget';
import SchoolEvaluationInterface from './components/SchoolEvaluationInterface';


const ParentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'تم الرد على شكواك',
      message: 'تم الرد على شكوتك بخصوص تأخير الحافلة المدرسية',
      time: 'منذ 5 دقائق',
      read: false,
      type: 'complaint'
    },
    {
      id: 2,
      title: 'تقرير شهري جديد',
      message: 'تم رفع التقرير الشهري لمدرسة النجاح',
      time: 'منذ ساعة',
      read: false,
      type: 'report'
    }
  ]);
  const [formData] = useState({
    fullName: 'أحمد محمد السعد',
    email: 'ahmed.alsaad@email.com',
    phone: '+966501234567',
    address: 'الرياض، حي المروج',
    region: 'الرياض',
    profileImage: null,
    tempProfileImage: null,
    notifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [children] = useState([
    { id: 1, name: 'محمد أحمد', grade: 'الصف الثالث الابتدائي', school: 'مدرسة الأمل' },
    { id: 2, name: 'سارة أحمد', grade: 'الصف الأول المتوسط', school: 'مدرسة النجاح' }
  ]);

  // Chat contacts based on children's schools
  const [chatContacts] = useState([
    { id: 1, schoolName: 'مدرسة الأمل', managerName: 'أ. عبدالرحمن السالم' },
    { id: 2, schoolName: 'مدرسة النجاح', managerName: 'أ. فاطمة الخالد' }
  ]);

  // Form handling functions would be implemented here

  // Sample data for parents dashboard
  const statsData = [
    { title: 'الشكاوى المقدمة', value: '3', change: '+1', icon: FaExclamationTriangle, color: 'bg-orange-500' },
    { title: 'التقييمات المقدمة', value: '8', change: '+3', icon: FaStar, color: 'bg-yellow-500' },
  ];

  // Available schools data
  const schoolsData = [
    { 
      id: 1, 
      name: 'مدرسة النجاح الابتدائية', 
      location: 'الرياض - حي النرجس', 
      type: 'ابتدائي', 
      students: 450, 
      teachers: 18, 
      overallRating: 4.5,
      educationQuality: 4.6,
      facilities: 4.3,
      environment: 4.7,
      fees: '15000 ريال/سنة',
      distance: '2.5 كم',
      reviews: 127,
      image: '/images/school1.jpg'
    },
    { 
      id: 2, 
      name: 'مدرسة الأمل المتوسطة', 
      location: 'الرياض - حي الملقا', 
      type: 'متوسط', 
      students: 320, 
      teachers: 15, 
      overallRating: 4.2,
      educationQuality: 4.3,
      facilities: 4.0,
      environment: 4.4,
      fees: '18000 ريال/سنة',
      distance: '3.2 كم',
      reviews: 89,
      image: '/images/school2.jpg'
    },
    { 
      id: 3, 
      name: 'مدرسة المستقبل الثانوية', 
      location: 'الرياض - حي العليا', 
      type: 'ثانوي', 
      students: 280, 
      teachers: 20, 
      overallRating: 4.8,
      educationQuality: 4.9,
      facilities: 4.7,
      environment: 4.8,
      fees: '22000 ريال/سنة',
      distance: '4.1 كم',
      reviews: 156,
      image: '/images/school3.jpg'
    },
    { 
      id: 4, 
      name: 'مدرسة التميز الابتدائية', 
      location: 'الرياض - حي الياسمين', 
      type: 'ابتدائي', 
      students: 380, 
      teachers: 16, 
      overallRating: 4.4,
      educationQuality: 4.5,
      facilities: 4.2,
      environment: 4.5,
      fees: '16500 ريال/سنة',
      distance: '1.8 كم',
      reviews: 98,
      image: '/images/school4.jpg'
    }
  ];

  // Sample complaints data - would be fetched from backend
  // Removed unused complaintsData state

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
                <p className="text-sm text-green-600">
                  {stat.change} هذا الشهر
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('search')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse"
            >
              <FaSearch />
              <span>البحث عن مدارس</span>
            </button>
            <button 
              onClick={() => setActiveTab('complaints')}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 flex items-center space-x-2 space-x-reverse"
            >
              <FaExclamationTriangle />
              <span>تقديم شكوى</span>
            </button>
            <button 
              onClick={() => setActiveTab('ratings')}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 flex items-center space-x-2 space-x-reverse"
            >
              <FaStar />
              <span>تقييم مدرسة</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">النشاط الأخير</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-blue-600 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">قيمت مدرسة النجاح</p>
                  <p className="text-xs text-gray-500">منذ يومين</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-orange-600 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">تم الرد على شكواك</p>
                  <p className="text-xs text-gray-500">منذ 3 أيام</p>
                </div>
              </div>
           
            </div>
          </div>
        </div>

        {/* Top Rated Schools */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">أعلى المدارس تقييماً</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {schoolsData.slice(0, 3).map((school) => (
                <div key={school.id} className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaSchool className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{school.name}</p>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-xs text-gray-600">{school.overallRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

 

  const renderComplaints = () => (
    <div className="space-y-6">
      {/* Submit New Complaint */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">تقديم شكوى جديدة</h3>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدرسة</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>اختر المدرسة</option>
                  {schoolsData.map(school => (
                    <option key={school.id}>{school.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>عالية</option>
                  <option>متوسطة</option>
                  <option>منخفضة</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">موضوع الشكوى</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اكتب موضوع الشكوى..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل الشكوى</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اكتب تفاصيل الشكوى..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2 space-x-reverse"
            >
              <FaExclamationTriangle />
              <span>إرسال الشكوى</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderRatings = () => (
    <div className="space-y-6">
      <SchoolEvaluationInterface children={children} />
    </div>
  );



  const renderHelpCenter = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900">مركز المساعدة</h3>
          <p className="text-gray-600 mt-1">دليل المستخدم وأسئلة متكررة</p>
        </div>
        
        <div className="p-6 space-y-8">
          {/* FAQ Section */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">الأسئلة الشائعة</h4>
            <div className="space-y-4">
              {[
                {
                  question: 'كيف يمكنني تقديم شكوى؟',
                  answer: 'يمكنك تقديم شكوى من خلال الذهاب إلى قسم الشكاوى والنقر على زر "تقديم شكوى جديدة" وملء النموذج المطلوب.'
                },
                {
                  question: 'كيف يمكنني تقييم مدرسة؟',
                  answer: 'يمكنك تقييم المدرسة من خلال الذهاب إلى قسم التقييمات واختيار المدرسة المطلوبة وإعطائها التقييم المناسب.'
                },
                {
                  question: 'كيف يمكنني متابعة حالة شكواي؟',
                  answer: 'يمكنك متابعة حالة جميع شكواك من خلال قسم الشكاوى حيث يتم تحديث حالة كل شكوى فور الرد عليها.'
                }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900">{item.question}</h5>
                  <p className="mt-2 text-gray-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">تواصل مع الدعم</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ما هو موضوع استفسارك؟"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                <textarea 
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب رسالتك بالتفصيل..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => {
    // Notification settings would be implemented here

    return (
      <div className="space-y-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header with Profile Image */}
            <div className="p-6 border-b border-gray-100 flex items-center space-x-6">
              <img
                src={formData.profileImage || "/default-profile.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.fullName}</h3>
                <p className="text-sm text-gray-500">{formData.email}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                    {formData.fullName}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                    {formData.email}
                  </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                  {formData.phone}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                  {formData.address}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأبناء</label>
                <div className="text-gray-900">{children.length} أبناء</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللغة المفضلة</label>
                <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                  العربية
                </div>
              </div>
            </div>

            {/* Children's Information Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">بيانات الأبناء</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children.map((child) => (
                  <div key={child.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="space-y-3">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">الاسم</span>
                        <span className="text-gray-900">{child.name}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">الصف الدراسي</span>
                        <span className="text-gray-900">{child.grade}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">المدرسة</span>
                        <span className="text-gray-900">{child.school}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Preferences Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">تفضيلات الإشعارات</h4>
              <div className="space-y-4">
                {[
                  { label: "تفعيل الإشعارات", desc: "استلام تنبيهات حول تحديثات المدارس والشكاوى", value: formData.notifications },
                  { label: "الإشعارات عبر البريد الإلكتروني", desc: "استلام إشعارات على بريدك الإلكتروني", value: formData.emailNotifications },
                  { label: "الإشعارات النصية (SMS)", desc: "استلام إشعارات على هاتفك الجوال", value: formData.smsNotifications }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{notif.label}</label>
                      <p className="text-xs text-gray-500">{notif.desc}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full ${notif.value ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: FaHome },
    { id: 'complaints', label: 'الشكاوى', icon: FaExclamationTriangle },
    { id: 'ratings', label: 'التقييمات', icon: FaStar },
    { id: 'help', label: 'مركز المساعدة', icon: FaQuestionCircle },
    { id: 'settings', label: 'الإعدادات', icon: FaCog }
  ];

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // State لاختيار النظام الجديد أو القديم
  const location = useLocation();
  const [useNewSystem, setUseNewSystem] = useState(false);

  // إذا كان النظام الجديد مفعل، استخدم الـ Routes الجديدة
  if (useNewSystem || location.pathname.includes('/new')) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <Routes>
            {/* الصفحة الرئيسية - لوحة التحكم */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* إدارة المدارس */}
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/schools/*" element={<SchoolsPage />} />
            
            {/* نظام التقييمات المتطور */}
            <Route path="/evaluations" element={<EvaluationsPage />} />
            <Route path="/evaluations/*" element={<EvaluationsPage />} />
            
            {/* صفحات قيد التطوير */}
            <Route path="/analytics" element={<ComingSoon page="التحليلات والتقارير" />} />
            <Route path="/messages" element={<ComingSoon page="الرسائل" />} />
            <Route path="/notifications" element={<ComingSoon page="الإشعارات" />} />
            <Route path="/calendar" element={<ComingSoon page="التقويم" />} />
            <Route path="/reports" element={<ComingSoon page="التقارير" />} />
            <Route path="/profile" element={<ComingSoon page="الملف الشخصي" />} />
            <Route path="/settings" element={<ComingSoon page="الإعدادات" />} />
            <Route path="/help" element={<ComingSoon page="المساعدة" />} />
            
            {/* العودة للنظام القديم */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* زر التبديل للنظام الجديد */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setUseNewSystem(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 animate-pulse"
        >
          <FaStar className="animate-spin" />
          <span className="font-bold">النظام الجديد!</span>
        </button>
      </div>
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">أحمد محمد السعد</h3>
              <p className="text-sm text-gray-600">ولي أمر</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-right transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-start w-full">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم أولياء الأمور</h1>
                <p className="text-gray-600">إدارة وتتبع المدارس والتقييمات والشكاوى</p>
              </div>
              <div className="relative flex items-center gap-2">
                {/* Chat Icon */}
                <button 
                  onClick={() => {
                    setShowChat(!showChat);
                    setShowNotifications(false);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <FaComments className="text-gray-600 text-xl" />
                  <span className="absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                </button>

                {/* Notifications Icon */}
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowChat(false);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <FaBell className="text-gray-600 text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Chat Widget */}
                <ChatWidget 
                  isOpen={showChat} 
                  onClose={() => setShowChat(false)}
                  contacts={chatContacts}
                />

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">الإشعارات</h3>
                      <div className="flex space-x-2 space-x-reverse">
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          تعيين الكل كمقروء
                        </button>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                              markAsRead(notification.id);
                              // Navigate to relevant section based on notification type
                              if (notification.type === 'complaint') {
                                setActiveTab('complaints');
                              }
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          لا توجد إشعارات جديدة
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        عرض الكل
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {activeTab === 'overview' && renderOverview()}

          {activeTab === 'complaints' && renderComplaints()}
          {activeTab === 'ratings' && renderRatings()}
          {activeTab === 'help' && renderHelpCenter()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default ParentsDashboard;
