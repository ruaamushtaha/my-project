import React, { useState } from 'react';
import { 
  FaSchool, 
  FaExclamationTriangle, 
  FaCog,
  FaSearch,
  FaStar,
  FaUsers,
  FaHome,
  FaMapMarkerAlt,
  FaHeart,
  FaBalanceScale,
  FaUserCircle
} from 'react-icons/fa';
// Charts import - uncomment when recharts is installed
// import { 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   BarChart,
//   Bar
// } from 'recharts';

const ParentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
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

  const [children, setChildren] = useState([
    { id: 1, name: 'محمد أحمد', grade: 'الرابع الابتدائي', school: 'مدرسة النجاح' },
    { id: 2, name: 'سارة أحمد', grade: 'الثاني المتوسط', school: 'مدارس التربية' },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          tempProfileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (formData.tempProfileImage) {
      setFormData(prev => ({
        ...prev,
        profileImage: prev.tempProfileImage,
        tempProfileImage: null
      }));
    }
    setIsEditing(false);
    console.log('Saving changes:', formData);
  };

  const handleCancelEdit = () => {
    setFormData(prev => ({
      ...prev,
      tempProfileImage: null
    }));
    setIsEditing(false);
  };

  // Sample data for parents dashboard
  const statsData = [
    { title: 'المدارس المفضلة', value: '5', change: '+2', icon: FaHeart, color: 'bg-red-500' },
    { title: 'الشكاوى المقدمة', value: '3', change: '+1', icon: FaExclamationTriangle, color: 'bg-orange-500' },
    { title: 'التقييمات المقدمة', value: '8', change: '+3', icon: FaStar, color: 'bg-yellow-500' },
    { title: 'المدارس المقارنة', value: '4', change: '+1', icon: FaBalanceScale, color: 'bg-blue-500' }
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

  // Parent's complaints data
  const complaintsData = [
    { 
      id: 1, 
      school: 'مدرسة النجاح الابتدائية', 
      subject: 'تأخير الحافلة المدرسية', 
      description: 'الحافلة تتأخر يومياً مما يؤثر على وصول الطلاب في الوقت المحدد',
      status: 'قيد المراجعة', 
      priority: 'عالية',
      date: '2024-01-15',
      response: null
    },
    { 
      id: 2, 
      school: 'مدرسة الأمل المتوسطة', 
      subject: 'نظافة دورات المياه', 
      description: 'دورات المياه تحتاج إلى تحسين في النظافة والصيانة',
      status: 'تم الرد', 
      priority: 'متوسطة',
      date: '2024-01-10',
      response: 'تم اتخاذ الإجراءات اللازمة وسيتم تحسين النظافة'
    }
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
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-green-600 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">أضفت مدرسة للمفضلة</p>
                  <p className="text-xs text-gray-500">منذ أسبوع</p>
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

  const renderSchoolSearch = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">البحث عن المدارس</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse">
              <FaBalanceScale className="text-sm" />
              <span>مقارنة المدارس ({selectedSchools.length})</span>
            </button>
          </div>
          
          {/* Search Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="اسم المدرسة..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>جميع المواقع</option>
              <option>حي النرجس</option>
              <option>حي الملقا</option>
              <option>حي العليا</option>
              <option>حي الياسمين</option>
            </select>
            <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>جميع الأنواع</option>
              <option>ابتدائي</option>
              <option>متوسط</option>
              <option>ثانوي</option>
            </select>
            <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>جميع التقييمات</option>
              <option>5 نجوم</option>
              <option>4+ نجوم</option>
              <option>3+ نجوم</option>
            </select>
          </div>
        </div>
        
        {/* Schools Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolsData.map((school) => (
              <div key={school.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <FaSchool className="text-4xl text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">{school.name}</h4>
                    <button 
                      onClick={() => {
                        if (selectedSchools.includes(school.id)) {
                          setSelectedSchools(selectedSchools.filter(id => id !== school.id));
                        } else {
                          setSelectedSchools([...selectedSchools, school.id]);
                        }
                      }}
                      className={`p-2 rounded-full ${
                        selectedSchools.includes(school.id) 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaBalanceScale className="text-sm" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-xs" />
                      <span>{school.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <FaUsers className="text-xs" />
                      <span>{school.students} طالب</span>
                      <span>•</span>
                      <span>{school.teachers} معلم</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <span className="font-medium">{school.fees}</span>
                      <span>•</span>
                      <span>{school.distance}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">التقييم العام</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-medium">{school.overallRating}</span>
                        <span className="text-xs text-gray-500">({school.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">جودة التعليم</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm">{school.educationQuality}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">المرافق</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm">{school.facilities}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">البيئة</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm">{school.environment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                      عرض التفاصيل
                    </button>
                    <button 
                      onClick={() => setActiveTab('ratings')}
                      className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 text-sm"
                    >
                      تقييم
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

      {/* My Complaints */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">شكاواي المقدمة</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {complaintsData.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{complaint.subject}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.priority === 'عالية' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.status === 'قيد المراجعة' ? 'bg-blue-100 text-blue-800' :
                        complaint.status === 'تم الرد' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">المدرسة:</span>
                        <p>{complaint.school}</p>
                      </div>
                      <div>
                        <span className="font-medium">تاريخ التقديم:</span>
                        <p>{complaint.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{complaint.description}</p>
                    {complaint.response && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-800 mb-1">رد إدارة المدرسة:</p>
                        <p className="text-sm text-green-700">{complaint.response}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRatings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">تقييم مدرسة</h3>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدرسة</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>اختر المدرسة</option>
                {schoolsData.map(school => (
                  <option key={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">جودة التعليم</label>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500" />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">المرافق</label>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500" />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">البيئة المدرسية</label>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 flex items-center space-x-2 space-x-reverse"
            >
              <FaStar />
              <span>إرسال التقييم</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderComparison = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">مقارنة المدارس</h3>
        </div>
        <div className="p-6">
          {selectedSchools.length === 0 ? (
            <div className="text-center py-12">
              <FaBalanceScale className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">لم تختر أي مدارس للمقارنة بعد</p>
              <button 
                onClick={() => setActiveTab('search')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                اختر مدارس للمقارنة
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600">مقارنة المدارس المحددة</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => {
    // Read-only mode for parent's information
    const formData = {
      fullName: 'أحمد محمد السعد',
      email: 'ahmed.alsaad@email.com',
      phone: '+966501234567',
      address: 'الرياض، حي المروج، شارع الملك فهد',
      preferredLanguage: 'ar',
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      children: [
        { id: 1, name: 'محمد أحمد', grade: 'الرابع الابتدائي', school: 'مدرسة النجاح الابتدائية' },
        { id: 2, name: 'سارة أحمد', grade: 'الأول المتوسط', school: 'مدرسة الأمل المتوسطة' }
      ]
    };

    // No handlers needed as the form is read-only
    const handleSubmit = (e) => e.preventDefault();

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">البيانات الشخصية</h3>
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
                  <div className="text-gray-900">{formData.children.length} أبناء</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة المفضلة</label>
                  <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-900">
                    {formData.preferredLanguage === 'ar' ? 'العربية' : 'English'}
                  </div>
                </div>
              </div>

              {/* Children's Information Section - Read Only */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">بيانات الأبناء</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.children.map((child, index) => (
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

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">تفضيلات الإشعارات</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">تفعيل الإشعارات</label>
                      <p className="text-xs text-gray-500">استلام تنبيهات حول تحديثات المدارس والشكاوى</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <div className={`w-11 h-6 rounded-full ${formData.notifications ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">الإشعارات عبر البريد الإلكتروني</label>
                      <p className="text-xs text-gray-500">استلام إشعارات على بريدك الإلكتروني</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <div className={`w-11 h-6 rounded-full ${formData.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">الإشعارات النصية (SMS)</label>
                      <p className="text-xs text-gray-500">استلام إشعارات على هاتفك الجوال</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <div className={`w-11 h-6 rounded-full ${formData.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    </label>
                  </div>
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
    { id: 'search', label: 'البحث عن مدارس', icon: FaSearch },
    { id: 'complaints', label: 'الشكاوى', icon: FaExclamationTriangle },
    { id: 'ratings', label: 'التقييمات', icon: FaStar },
    { id: 'comparison', label: 'مقارنة المدارس', icon: FaBalanceScale },
    { id: 'settings', label: 'الإعدادات', icon: FaCog }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم أولياء الأمور</h1>
            <p className="text-gray-600">إدارة وتتبع المدارس والتقييمات والشكاوى</p>
          </div>
          
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'search' && renderSchoolSearch()}
          {activeTab === 'complaints' && renderComplaints()}
          {activeTab === 'ratings' && renderRatings()}
          {activeTab === 'comparison' && renderComparison()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default ParentsDashboard;