// =============================================================================
// API Services for Parents Dashboard
// وظائف استدعاء البيانات وإدارتها من الخادم
// =============================================================================

/**
 * تكوين عام لطلبات API
 * Base configuration for API requests
 */
const API_CONFIG = {
  baseURL: 'https://api.schoolsystem.com/v1', // يتم تغييرها حسب الخادم الفعلي
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

/**
 * محاكاة تأخير الشبكة لأغراض التطوير
 * Simulate network delay for development purposes
 */
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * خدمات البيانات الخاصة بأولياء الأمور
 * Parent-specific data services
 */
export const parentsAPI = {
  
  /**
   * جلب بيانات ولي الأمر الأساسية
   * Fetch parent's basic information
   */
  async getParentProfile() {
    await simulateDelay(800);
    return {
      id: 'parent_001',
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@email.com',
      phone: '+966501234567',
      avatar: 'https://via.placeholder.com/120x120/4f46e5/ffffff?text=أ.ع',
      address: 'حي النخيل، الرياض 12345',
      joinDate: '2023-09-01',
      children: [
        { id: 'child_001', name: 'محمد أحمد', grade: 'الصف الخامس', school: 'مدرسة النور' },
        { id: 'child_002', name: 'فاطمة أحمد', grade: 'الصف الثالث', school: 'مدرسة الفجر' }
      ]
    };
  },

  /**
   * جلب إحصائيات لوحة التحكم
   * Fetch dashboard statistics
   */
  async getDashboardStats() {
    await simulateDelay(600);
    return {
      totalSchools: 3,
      activeEvaluations: 2,
      averageRating: 4.2,
      pendingNotifications: 5,
      recentActivities: [
        {
          id: 'act_001',
          type: 'evaluation',
          title: 'تقييم جديد لمدرسة النور',
          description: 'تم إضافة تقييم للبيئة التعليمية',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: 'act_002',
          type: 'message',
          title: 'رسالة من إدارة مدرسة الفجر',
          description: 'تم الرد على استفسارك حول النشاطات',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ]
    };
  },

  /**
   * جلب قائمة المدارس
   * Fetch schools list
   */
  async getSchools(filters = {}) {
    await simulateDelay(1000);
    
    const allSchools = [
      {
        id: 'school_001',
        name: 'مدرسة النور الابتدائية',
        location: 'حي الزهراء، الرياض',
        overallRating: 4.2,
        studentsCount: 450,
        teachersCount: 25,
        image: 'https://via.placeholder.com/400x200/4f46e5/ffffff?text=مدرسة+النور',
        description: 'مدرسة متميزة تهتم بالتعليم الحديث والأنشطة اللامنهجية',
        achievements: ['جائزة أفضل مدرسة 2023', 'المركز الأول في مسابقة العلوم'],
        vision: 'تقديم تعليم متميز وشامل لبناء جيل مبدع ومتطور',
        mission: 'نسعى لتوفير بيئة تعليمية محفزة ومبتكرة',
        type: 'ابتدائية',
        isMyChild: true,
        contact: {
          phone: '+966112345678',
          email: 'info@alnoor.edu.sa',
          website: 'www.alnoor.edu.sa'
        },
        facilities: [
          'مختبرات علمية حديثة',
          'مكتبة رقمية',
          'ملاعب رياضية',
          'قاعة متعددة الأغراض',
          'مقصف صحي'
        ]
      },
      {
        id: 'school_002',
        name: 'مدرسة الفجر المتوسطة',
        location: 'حي النخيل، جدة',
        overallRating: 3.8,
        studentsCount: 320,
        teachersCount: 18,
        image: 'https://via.placeholder.com/400x200/059669/ffffff?text=مدرسة+الفجر',
        description: 'مدرسة تركز على التطوير الشخصي والأكاديمي للطلاب',
        achievements: ['شهادة الجودة التعليمية', 'المركز الثاني في الرياضيات'],
        vision: 'إعداد جيل قادر على مواجهة تحديات المستقبل',
        mission: 'تطوير مهارات الطلاب الأكاديمية والاجتماعية',
        type: 'متوسطة',
        isMyChild: true,
        contact: {
          phone: '+966112345679',
          email: 'info@alfajr.edu.sa',
          website: 'www.alfajr.edu.sa'
        },
        facilities: [
          'معامل حاسوب متقدمة',
          'استوديو فنون',
          'صالة رياضية',
          'حديقة تعليمية'
        ]
      },
      {
        id: 'school_003',
        name: 'مدرسة الأمل الثانوية',
        location: 'حي الملز، الرياض',
        overallRating: 4.6,
        studentsCount: 280,
        teachersCount: 22,
        image: 'https://via.placeholder.com/400x200/dc2626/ffffff?text=مدرسة+الأمل',
        description: 'مدرسة ثانوية متقدمة بمناهج حديثة ومرافق متطورة',
        achievements: ['أفضل نتائج الثانوية العامة', 'مدرسة صديقة للبيئة'],
        vision: 'تخريج طلاب قادرين على الإبداع والتميز في الحياة الجامعية',
        mission: 'تقديم تعليم ثانوي عالي الجودة مع التركيز على الإعداد الجامعي',
        type: 'ثانوية',
        isMyChild: false,
        contact: {
          phone: '+966112345680',
          email: 'info@alamal.edu.sa',
          website: 'www.alamal.edu.sa'
        },
        facilities: [
          'مختبرات متقدمة',
          'مركز إعلامي',
          'قاعة محاضرات',
          'مسرح مدرسي',
          'مركز استشارات تعليمية'
        ]
      }
    ];

    // تطبيق الفلاتر
    let filteredSchools = allSchools;
    
    if (filters.search) {
      filteredSchools = filteredSchools.filter(school =>
        school.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        school.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.type && filters.type !== 'all') {
      filteredSchools = filteredSchools.filter(school => school.type === filters.type);
    }
    
    if (filters.myChildren) {
      filteredSchools = filteredSchools.filter(school => school.isMyChild);
    }

    return {
      schools: filteredSchools,
      total: filteredSchools.length,
      filters: filters
    };
  },

  /**
   * جلب تفاصيل مدرسة محددة
   * Fetch specific school details
   */
  async getSchoolDetails(schoolId) {
    await simulateDelay(600);
    
    const schools = await this.getSchools();
    const school = schools.schools.find(s => s.id === schoolId);
    
    if (!school) {
      throw new Error('المدرسة غير موجودة');
    }

    // إضافة تفاصيل إضافية
    return {
      ...school,
      detailedRatings: {
        educationQuality: 4.3,
        facilities: 4.1,
        environment: 4.5,
        mentalHealth: 3.8,
        communication: 4.2,
        sustainability: 4.0
      },
      teachers: [
        {
          id: 'teacher_001',
          name: 'أ. فاطمة أحمد',
          subject: 'اللغة العربية',
          experience: '8 سنوات',
          rating: 4.5,
          qualifications: ['ماجستير في اللغة العربية', 'دبلوم تربوي'],
          image: 'https://via.placeholder.com/80x80/4f46e5/ffffff?text=ف.أ'
        },
        {
          id: 'teacher_002',
          name: 'أ. محمد عبدالله',
          subject: 'الرياضيات',
          experience: '12 سنة',
          rating: 4.2,
          qualifications: ['بكالوريوس رياضيات', 'دبلوم تربوي'],
          image: 'https://via.placeholder.com/80x80/059669/ffffff?text=م.ع'
        }
      ],
      activities: [
        {
          id: 'activity_001',
          name: 'مسابقة العلوم',
          date: '2024-02-15',
          description: 'مسابقة علمية على مستوى المدرسة',
          image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=مسابقة+العلوم'
        },
        {
          id: 'activity_002',
          name: 'يوم المهن',
          date: '2024-02-20',
          description: 'يوم تعريفي بالمهن المختلفة',
          image: 'https://via.placeholder.com/300x200/059669/ffffff?text=يوم+المهن'
        }
      ],
      gallery: [
        'https://via.placeholder.com/400x300/4f46e5/ffffff?text=صورة+1',
        'https://via.placeholder.com/400x300/059669/ffffff?text=صورة+2',
        'https://via.placeholder.com/400x300/dc2626/ffffff?text=صورة+3'
      ]
    };
  },

  /**
   * إرسال تقييم لمدرسة
   * Submit school evaluation
   */
  async submitEvaluation(schoolId, evaluation) {
    await simulateDelay(800);
    
    // محاكاة إرسال التقييم
    console.log('تم إرسال التقييم:', { schoolId, evaluation });
    
    return {
      success: true,
      message: 'تم إرسال تقييمك بنجاح',
      evaluationId: `eval_${Date.now()}`
    };
  },

  /**
   * جلب الإشعارات
   * Fetch notifications
   */
  async getNotifications() {
    await simulateDelay(500);
    
    return [
      {
        id: 'notif_001',
        title: 'تقييم جديد متاح',
        message: 'يمكنك الآن تقييم مدرسة النور الابتدائية',
        type: 'evaluation',
        read: false,
        timestamp: new Date().toISOString(),
        action: {
          type: 'link',
          label: 'عرض التقييم',
          url: '/schools/school_001/evaluate'
        }
      },
      {
        id: 'notif_002',
        title: 'رسالة من المدرسة',
        message: 'تم الرد على استفسارك من قبل إدارة مدرسة الفجر',
        type: 'message',
        read: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        action: {
          type: 'link',
          label: 'قراءة الرسالة',
          url: '/messages'
        }
      },
      {
        id: 'notif_003',
        title: 'نشاط جديد في المدرسة',
        message: 'تم إضافة نشاط جديد في مدرسة الأمل الثانوية',
        type: 'activity',
        read: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        action: {
          type: 'link',
          label: 'عرض النشاط',
          url: '/schools/school_003/activities'
        }
      }
    ];
  },

  /**
   * تحديث حالة قراءة الإشعار
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId) {
    await simulateDelay(300);
    
    return {
      success: true,
      notificationId
    };
  },

  /**
   * إرسال رسالة إلى المدرسة
   * Send message to school
   */
  async sendMessage(schoolId, message) {
    await simulateDelay(600);
    
    return {
      success: true,
      message: 'تم إرسال الرسالة بنجاح',
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * جلب الرسائل
   * Fetch messages
   */
  async getMessages(schoolId) {
    await simulateDelay(700);
    
    return [
      {
        id: 'msg_001',
        from: 'parent',
        text: 'أريد الاستفسار عن أداء ابني في الرياضيات',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg_002',
        from: 'school',
        text: 'نشكرك على استفسارك. أداء ابنك في الرياضيات متميز ويحصل على درجات عالية.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false
      }
    ];
  }
};

/**
 * معالج الأخطاء العام
 * Global error handler
 */
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error.message.includes('timeout')) {
    return 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.';
  }
  
  if (error.message.includes('Network')) {
    return 'خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت.';
  }
  
  return error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
};
