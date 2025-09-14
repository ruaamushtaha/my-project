// =============================================================================
// Parents Dashboard API Services - Complete Implementation
// خدمات API كاملة لداشبورد أولياء الأمور مع بيانات واقعية
// =============================================================================

/**
 * محاكاة تأخير الشبكة لتجربة واقعية
 * Simulate network delay for realistic experience
 */
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * بيانات وهمية واقعية لأولياء الأمور والأطفال
 * Realistic mock data for parents and children
 */
const MOCK_DATA = {
  // بيانات ولي الأمر
  parentProfile: {
    id: 'parent_001',
    fullName: 'أحمد محمد السعد',
    email: 'ahmed.alsaad@gmail.com',
    phone: '+966501234567',
    address: 'الرياض، حي المروج، شارع الأمير سلطان',
    region: 'منطقة الرياض',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateJoined: '2023-09-15',
    preferences: {
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'ar',
      theme: 'light'
    }
  },

  // بيانات الأطفال
  children: [
    {
      id: 'child_001',
      name: 'محمد أحمد السعد',
      grade: 'الصف السادس الابتدائي',
      school: {
        id: 'school_001',
        name: 'مدرسة الأمل الابتدائية',
        type: 'ابتدائية',
        location: 'الرياض - حي المروج'
      },
      age: 12,
      profileImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face',
      academicYear: '2024-2025',
      studentId: 'STU001234'
    },
    {
      id: 'child_002',
      name: 'سارة أحمد السعد',
      grade: 'الصف الثاني المتوسط',
      school: {
        id: 'school_002',
        name: 'مدرسة النجاح المتوسطة',
        type: 'متوسطة',
        location: 'الرياض - حي النرجس'
      },
      age: 14,
      profileImage: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=150&h=150&fit=crop&crop=face',
      academicYear: '2024-2025',
      studentId: 'STU001235'
    }
  ],

  // بيانات المدارس التفصيلية
  schools: [
    {
      id: 'school_001',
      name: 'مدرسة الأمل الابتدائية',
      type: 'ابتدائية',
      location: 'الرياض - حي المروج',
      address: 'شارع الأمير سلطان، حي المروج، الرياض 12345',
      phone: '+966112345678',
      email: 'info@alamal-primary.edu.sa',
      website: 'www.alamal-primary.edu.sa',
      principalName: 'أ. عبدالرحمن السالم',
      establishedYear: 1995,
      studentsCount: 450,
      teachersCount: 24,
      classroomsCount: 18,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
      overallRating: 4.5,
      ratingsCount: 127,
      description: 'مدرسة الأمل الابتدائية هي إحدى المدارس الرائدة في منطقة الرياض، تتميز بالتعليم الحديث والبيئة التعليمية المحفزة. نسعى لتقديم تعليم متميز يهدف لإعداد جيل واعٍ ومبدع.',
      facilities: [
        'مختبرات علوم متطورة',
        'مكتبة رقمية',
        'ملاعب رياضية',
        'قاعة متعددة الأغراض',
        'مقصف صحي',
        'عيادة طبية',
        'نظام أمان متطور'
      ],
      achievements: [
        'المركز الأول في مسابقة العلوم على مستوى المنطقة 2024',
        'شهادة الجودة التعليمية من وزارة التعليم',
        'أفضل برنامج للأنشطة اللاصفية 2023'
      ],
      ratings: {
        educationQuality: 4.6,
        facilities: 4.3,
        teachers: 4.7,
        administration: 4.4,
        cleanliness: 4.5,
        safety: 4.8,
        communication: 4.2
      },
      workingHours: {
        start: '07:00',
        end: '14:30',
        breakTime: '10:00-10:30'
      },
      tuitionFees: 15000,
      hasMyChild: true
    },
    {
      id: 'school_002',
      name: 'مدرسة النجاح المتوسطة',
      type: 'متوسطة',
      location: 'الرياض - حي النرجس',
      address: 'طريق الملك فهد، حي النرجس، الرياض 12234',
      phone: '+966112345679',
      email: 'contact@alnajah-middle.edu.sa',
      website: 'www.alnajah-middle.edu.sa',
      principalName: 'أ. فاطمة الخالد',
      establishedYear: 2001,
      studentsCount: 320,
      teachersCount: 28,
      classroomsCount: 15,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',
      overallRating: 4.2,
      ratingsCount: 89,
      description: 'مدرسة النجاح المتوسطة تركز على التعليم الشامل والتربية الإيجابية، مع برامج متنوعة تهدف لإعداد الطلاب للمرحلة الثانوية بكفاءة عالية.',
      facilities: [
        'معامل حاسوب متقدمة',
        'مختبرات فيزياء وكيمياء',
        'مكتبة شاملة',
        'صالة رياضية مغطاة',
        'مسرح المدرسة',
        'مقصف متنوع',
        'موقف آمن للسيارات'
      ],
      achievements: [
        'التميز في الأنشطة الثقافية 2024',
        'أفضل مشروع علمي على مستوى الإدارة',
        'برنامج متميز للطلاب الموهوبين'
      ],
      ratings: {
        educationQuality: 4.3,
        facilities: 4.0,
        teachers: 4.4,
        administration: 4.1,
        cleanliness: 4.2,
        safety: 4.5,
        communication: 4.0
      },
      workingHours: {
        start: '07:30',
        end: '15:00',
        breakTime: '10:30-11:00'
      },
      tuitionFees: 18000,
      hasMyChild: true
    },
    {
      id: 'school_003',
      name: 'مدرسة المستقبل الثانوية',
      type: 'ثانوية',
      location: 'الرياض - حي العليا',
      address: 'شارع العليا العام، حي العليا، الرياض 12211',
      phone: '+966112345680',
      email: 'info@almostaqbal-high.edu.sa',
      website: 'www.almostaqbal-high.edu.sa',
      principalName: 'أ. خالد العمري',
      establishedYear: 2005,
      studentsCount: 280,
      teachersCount: 35,
      classroomsCount: 20,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop',
      overallRating: 4.8,
      ratingsCount: 156,
      description: 'مدرسة المستقبل الثانوية تتميز بالتعليم المتقدم والإعداد المتميز للجامعات، مع تركيز على التفكير النقدي والإبداع.',
      facilities: [
        'مختبرات علمية متطورة',
        'استوديو تسجيل',
        'مركز تقنية المعلومات',
        'قاعات محاضرات مجهزة',
        'مكتبة إلكترونية',
        'كافتيريا حديثة',
        'مواقف واسعة'
      ],
      achievements: [
        'أعلى نسبة قبول جامعي في المنطقة 2024',
        'مركز التميز في التعليم الإلكتروني',
        'جائزة أفضل مدرسة ثانوية 2023'
      ],
      ratings: {
        educationQuality: 4.9,
        facilities: 4.7,
        teachers: 4.8,
        administration: 4.6,
        cleanliness: 4.8,
        safety: 4.9,
        communication: 4.5
      },
      workingHours: {
        start: '07:00',
        end: '15:30',
        breakTime: '10:00-10:30'
      },
      tuitionFees: 22000,
      hasMyChild: false
    }
  ],

  // الإشعارات
  notifications: [
    {
      id: 'notif_001',
      title: 'تم الرد على تقييمك',
      message: 'شكرًا لتقييمك مدرسة الأمل الابتدائية. تم أخذ ملاحظاتك بعين الاعتبار.',
      type: 'evaluation',
      priority: 'medium',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/evaluations'
    },
    {
      id: 'notif_002',
      title: 'تحديث درجات محمد',
      message: 'تم رفع درجات الطالب محمد أحمد في مادة الرياضيات للفصل الدراسي الحالي.',
      type: 'grades',
      priority: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/academic-reports'
    },
    {
      id: 'notif_003',
      title: 'اجتماع أولياء الأمور',
      message: 'يسعدنا دعوتكم لحضور اجتماع أولياء الأمور يوم الخميس القادم في تمام الساعة 4:00 مساءً.',
      type: 'meeting',
      priority: 'high',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/events'
    }
  ],

  // إحصائيات الداشبورد
  dashboardStats: {
    totalEvaluations: 8,
    pendingIssues: 2,
    upcomingEvents: 3,
    childrenCount: 2,
    averageRating: 4.35,
    lastLoginDate: new Date().toISOString(),
    monthlyActivity: {
      evaluations: 3,
      communications: 12,
      eventAttendance: 2
    }
  }
};

/**
 * استدعاء بيانات ملف ولي الأمر
 * Fetch parent profile data
 * @returns {Promise<Object>} بيانات ملف ولي الأمر
 */
export const getParentProfile = async () => {
  await simulateDelay(500);
  return {
    success: true,
    data: MOCK_DATA.parentProfile
  };
};

/**
 * تحديث بيانات ملف ولي الأمر
 * Update parent profile data
 * @param {Object} profileData - البيانات المحدثة
 * @returns {Promise<Object>} نتيجة التحديث
 */
export const updateParentProfile = async (profileData) => {
  await simulateDelay(800);
  // محاكاة تحديث البيانات
  MOCK_DATA.parentProfile = { ...MOCK_DATA.parentProfile, ...profileData };
  return {
    success: true,
    message: 'تم تحديث البيانات بنجاح',
    data: MOCK_DATA.parentProfile
  };
};

/**
 * استدعاء بيانات الأطفال
 * Fetch children data
 * @returns {Promise<Object>} قائمة الأطفال
 */
export const getChildren = async () => {
  await simulateDelay(600);
  return {
    success: true,
    data: MOCK_DATA.children
  };
};

/**
 * استدعاء بيانات المدارس المرتبطة بالأطفال
 * Fetch schools associated with children
 * @returns {Promise<Object>} قائمة المدارس
 */
export const getMyChildrenSchools = async () => {
  await simulateDelay(700);
  const mySchools = MOCK_DATA.schools.filter(school => school.hasMyChild);
  return {
    success: true,
    data: mySchools,
    total: mySchools.length
  };
};

/**
 * استدعاء جميع المدارس المتاحة
 * Fetch all available schools
 * @param {Object} filters - فلاتر البحث
 * @returns {Promise<Object>} قائمة المدارس مع الفلاتر
 */
export const getAllSchools = async (filters = {}) => {
  await simulateDelay(800);
  let filteredSchools = [...MOCK_DATA.schools];

  // تطبيق فلاتر البحث
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredSchools = filteredSchools.filter(school =>
      school.name.toLowerCase().includes(searchTerm) ||
      school.location.toLowerCase().includes(searchTerm) ||
      school.description.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.type && filters.type !== 'all') {
    filteredSchools = filteredSchools.filter(school => school.type === filters.type);
  }

  if (filters.minRating) {
    filteredSchools = filteredSchools.filter(school => school.overallRating >= parseFloat(filters.minRating));
  }

  if (filters.myChildren) {
    filteredSchools = filteredSchools.filter(school => school.hasMyChild);
  }

  // ترتيب النتائج
  if (filters.sortBy) {
    filteredSchools.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ar');
        case 'overallRating':
          return b.overallRating - a.overallRating;
        case 'studentsCount':
          return b.studentsCount - a.studentsCount;
        default:
          return 0;
      }
    });
  }

  return {
    success: true,
    data: filteredSchools,
    total: filteredSchools.length,
    filters: filters
  };
};

/**
 * استدعاء تفاصيل مدرسة محددة
 * Fetch specific school details
 * @param {string} schoolId - معرف المدرسة
 * @returns {Promise<Object>} تفاصيل المدرسة
 */
export const getSchoolDetails = async (schoolId) => {
  await simulateDelay(600);
  const school = MOCK_DATA.schools.find(s => s.id === schoolId);
  
  if (!school) {
    return {
      success: false,
      error: 'المدرسة غير موجودة'
    };
  }

  return {
    success: true,
    data: school
  };
};

/**
 * تقييم مدرسة
 * Evaluate a school
 * @param {string} schoolId - معرف المدرسة
 * @param {Object} evaluation - بيانات التقييم
 * @returns {Promise<Object>} نتيجة التقييم
 */
export const evaluateSchool = async (schoolId, evaluation) => {
  await simulateDelay(1000);
  
  // محاكاة حفظ التقييم
  const newEvaluation = {
    id: `eval_${Date.now()}`,
    schoolId,
    parentId: MOCK_DATA.parentProfile.id,
    ...evaluation,
    timestamp: new Date().toISOString(),
    status: 'submitted'
  };

  return {
    success: true,
    message: 'تم إرسال تقييمك بنجاح. شكرًا لمساهمتك في تحسين التعليم.',
    data: newEvaluation
  };
};

/**
 * استدعاء تقييمات ولي الأمر
 * Fetch parent's evaluations
 * @returns {Promise<Object>} قائمة التقييمات
 */
export const getMyEvaluations = async () => {
  await simulateDelay(700);
  
  // بيانات وهمية للتقييمات السابقة
  const evaluations = [
    {
      id: 'eval_001',
      schoolId: 'school_001',
      schoolName: 'مدرسة الأمل الابتدائية',
      ratings: {
        educationQuality: 5,
        facilities: 4,
        teachers: 5,
        administration: 4,
        cleanliness: 4,
        safety: 5,
        communication: 4
      },
      overallRating: 4.4,
      comment: 'مدرسة ممتازة والمعلمون متعاونون جداً',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'approved'
    },
    {
      id: 'eval_002',
      schoolId: 'school_002',
      schoolName: 'مدرسة النجاح المتوسطة',
      ratings: {
        educationQuality: 4,
        facilities: 4,
        teachers: 4,
        administration: 4,
        cleanliness: 4,
        safety: 4,
        communication: 3
      },
      overallRating: 3.9,
      comment: 'مدرسة جيدة لكن يحتاج تحسين التواصل مع أولياء الأمور',
      timestamp: '2024-01-10T14:20:00Z',
      status: 'approved'
    }
  ];

  return {
    success: true,
    data: evaluations,
    total: evaluations.length
  };
};

/**
 * استدعاء الإشعارات
 * Fetch notifications
 * @param {Object} options - خيارات الاستدعاء (unreadOnly, limit)
 * @returns {Promise<Object>} قائمة الإشعارات
 */
export const getNotifications = async (options = {}) => {
  await simulateDelay(400);
  
  let notifications = [...MOCK_DATA.notifications];
  
  if (options.unreadOnly) {
    notifications = notifications.filter(n => !n.read);
  }
  
  if (options.limit) {
    notifications = notifications.slice(0, options.limit);
  }
  
  // ترتيب حسب التاريخ (الأحدث أولاً)
  notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    success: true,
    data: notifications,
    unreadCount: MOCK_DATA.notifications.filter(n => !n.read).length
  };
};

/**
 * تحديد الإشعار كمقروء
 * Mark notification as read
 * @param {string} notificationId - معرف الإشعار
 * @returns {Promise<Object>} نتيجة التحديث
 */
export const markNotificationAsRead = async (notificationId) => {
  await simulateDelay(200);
  
  const notification = MOCK_DATA.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }

  return {
    success: true,
    message: 'تم وضع علامة مقروء على الإشعار'
  };
};

/**
 * تحديد جميع الإشعارات كمقروءة
 * Mark all notifications as read
 * @returns {Promise<Object>} نتيجة التحديث
 */
export const markAllNotificationsAsRead = async () => {
  await simulateDelay(300);
  
  MOCK_DATA.notifications.forEach(n => n.read = true);

  return {
    success: true,
    message: 'تم وضع علامة مقروء على جميع الإشعارات'
  };
};

/**
 * استدعاء إحصائيات الداشبورد
 * Fetch dashboard statistics
 * @returns {Promise<Object>} إحصائيات الداشبورد
 */
export const getDashboardStats = async () => {
  await simulateDelay(500);
  
  return {
    success: true,
    data: MOCK_DATA.dashboardStats
  };
};

/**
 * البحث في المدارس
 * Search schools
 * @param {string} query - كلمة البحث
 * @param {Object} filters - فلاتر إضافية
 * @returns {Promise<Object>} نتائج البحث
 */
export const searchSchools = async (query, filters = {}) => {
  await simulateDelay(600);
  
  const searchFilters = {
    ...filters,
    search: query
  };
  
  return await getAllSchools(searchFilters);
};

/**
 * استدعاء الأحداث والفعاليات القادمة
 * Fetch upcoming events
 * @returns {Promise<Object>} قائمة الأحداث
 */
export const getUpcomingEvents = async () => {
  await simulateDelay(400);
  
  const events = [
    {
      id: 'event_001',
      title: 'اجتماع أولياء الأمور - مدرسة الأمل',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'قاعة المدرسة الرئيسية',
      type: 'meeting',
      schoolId: 'school_001',
      description: 'اجتماع دوري لمناقشة تطوير العملية التعليمية'
    },
    {
      id: 'event_002',
      title: 'يوم مفتوح - مدرسة النجاح',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'باحة المدرسة',
      type: 'open_day',
      schoolId: 'school_002',
      description: 'يوم مفتوح للطلاب وأولياء الأمور'
    }
  ];

  return {
    success: true,
    data: events
  };
};

// تصدير جميع الوظائف
export default {
  getParentProfile,
  updateParentProfile,
  getChildren,
  getMyChildrenSchools,
  getAllSchools,
  getSchoolDetails,
  evaluateSchool,
  getMyEvaluations,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getDashboardStats,
  searchSchools,
  getUpcomingEvents
};
