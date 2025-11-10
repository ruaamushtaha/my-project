/**
 * Supervisor API Service
 * This service provides mock implementations for supervisor dashboard data
 * that can easily be replaced with real API calls
 */

// Mock delay to simulate network requests
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock supervisor profile data
const mockSupervisorProfile = {
  id: 'sup_001',
  fullName: 'سارة محمد عبدالله',
  email: 'sara.mohammed@supervisor.edu.sa',
  phone: '+966501234567',
  address: 'الرياض، حي المروج، شارع الأمير سلطان',
  region: 'منطقة الرياض',
  profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  dateJoined: '2023-09-15',
  preferences: {
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    language: 'ar',
    theme: 'light'
  }
};

// Mock schools data that supervisor oversees
const mockSupervisorSchools = [
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
      communication: 4.2,
      activities: 3.8
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
      communication: 4.0,
      activities: 3.9
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
      'مقاعد واسعة'
    ],
    achievements: [
      'المركز الأول في مسابقة الرياضيات على مستوى المدينة',
      'أعلى نسبة نجاح في اختبارات القدرات 2024',
      'برنامج التفوق الأكاديمي'
    ],
    ratings: {
      educationQuality: 4.9,
      facilities: 4.7,
      teachers: 4.8,
      administration: 4.6,
      cleanliness: 4.8,
      safety: 4.9,
      communication: 4.5,
      activities: 4.3
    },
    workingHours: {
      start: '07:00',
      end: '15:30',
      breakTime: '10:00-10:30'
    },
    tuitionFees: 22000,
    hasMyChild: false
  }
];

// Mock evaluations data
const mockEvaluations = [
  {
    id: 'eval_001',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    date: '2024-10-15',
    evaluator: 'سارة محمد عبدالله',
    status: 'completed',
    overallRating: 4.5,
    criteria: {
      educationQuality: 4.6,
      facilities: 4.3,
      teachers: 4.7,
      administration: 4.4,
      cleanliness: 4.5,
      safety: 4.8,
      communication: 4.2,
      activities: 3.8
    },
    comments: 'مدرسة ممتازة مع بيئة تعليمية محفزة. تحتاج إلى تحسين في الأنشطة اللاصفية.',
    recommendations: [
      'زيادة الأنشطة الرياضية',
      'تطوير برامج المواهب',
      'تحسين التواصل مع الأهالي'
    ]
  },
  {
    id: 'eval_002',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    date: '2024-10-20',
    evaluator: 'سارة محمد عبدالله',
    status: 'completed',
    overallRating: 4.2,
    criteria: {
      educationQuality: 4.3,
      facilities: 4.0,
      teachers: 4.4,
      administration: 4.1,
      cleanliness: 4.2,
      safety: 4.5,
      communication: 4.0,
      activities: 3.9
    },
    comments: 'مدرسة جيدة مع تحسن ملحوظ في الأداء الأكاديمي. تحتاج إلى تطوير المرافق.',
    recommendations: [
      'تحديث المختبرات',
      'زيادة الأنشطة الثقافية',
      'تحسين جودة وجبات المقصف'
    ]
  },
  {
    id: 'eval_003',
    schoolId: 'school_003',
    schoolName: 'مدرسة المستقبل الثانوية',
    date: '2024-10-25',
    evaluator: 'سارة محمد عبدالله',
    status: 'scheduled',
    overallRating: 0,
    criteria: {},
    comments: '',
    recommendations: []
  }
];

// Mock reports data
const mockReports = [
  {
    id: 'rep_001',
    title: 'تقرير تقييم مدرسة الأمل الابتدائية',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    date: '2024-10-15',
    status: 'submitted',
    type: 'evaluation',
    summary: 'تقييم إيجابي مع توصيات للتحسين'
  },
  {
    id: 'rep_002',
    title: 'تقرير تقييم مدرسة النجاح المتوسطة',
    schoolId: 'school_002',
    schoolName: 'مدرسة النجاح المتوسطة',
    date: '2024-10-20',
    status: 'submitted',
    type: 'evaluation',
    summary: 'تقييم جيد مع اقتراحات للتطوير'
  },
  {
    id: 'rep_003',
    title: 'تقرير الأنشطة المدرسية - الربع الأول',
    schoolId: 'school_001',
    schoolName: 'مدرسة الأمل الابتدائية',
    date: '2024-10-30',
    status: 'draft',
    type: 'activities',
    summary: 'تقرير عن الأنشطة المدرسية للربع الأول'
  }
];

// Mock invitations data
const mockInvitations = [
  {
    id: 'inv_001',
    school: 'مدرسة المستقبل الثانوية',
    status: 'active',
    usages: '1/1',
    expiration: '2024-12-31'
  },
  {
    id: 'inv_002',
    school: 'مدرسة التميز الابتدائية',
    status: 'expired',
    usages: '0/1',
    expiration: '2024-10-01'
  }
];

// Mock requests data
const mockRequests = [
  {
    id: 'req_001',
    name: 'محمد عبدالله الحارثي',
    email: 'mohammed.harthy@school.edu.sa',
    usages: '1/1',
    date: '2024-10-15'
  },
  {
    id: 'req_002',
    name: 'فاطمة أحمد السلمان',
    email: 'fatima.salman@school.edu.sa',
    usages: '1/1',
    date: '2024-10-18'
  },
  {
    id: 'req_003',
    name: 'عبدالله خالد العمري',
    email: 'abdullah.omari@school.edu.sa',
    usages: '1/1',
    date: '2024-10-20'
  }
];

/**
 * Fetch supervisor profile data
 * @returns {Promise<Object>} Supervisor profile data
 */
export const fetchSupervisorProfile = async () => {
  await simulateDelay(800);
  return { ...mockSupervisorProfile };
};

/**
 * Fetch schools that supervisor oversees
 * @returns {Promise<Array>} Array of schools
 */
export const fetchSupervisorSchools = async () => {
  await simulateDelay(1200);
  return [...mockSupervisorSchools];
};

/**
 * Fetch evaluations for supervisor
 * @returns {Promise<Array>} Array of evaluations
 */
export const fetchSupervisorEvaluations = async () => {
  await simulateDelay(1000);
  return [...mockEvaluations];
};

/**
 * Fetch reports for supervisor
 * @returns {Promise<Array>} Array of reports
 */
export const fetchSupervisorReports = async () => {
  await simulateDelay(900);
  return [...mockReports];
};

/**
 * Fetch invitations for supervisor
 * @returns {Promise<Array>} Array of invitations
 */
export const fetchSupervisorInvitations = async () => {
  await simulateDelay(600);
  return [...mockInvitations];
};

/**
 * Fetch requests for supervisor
 * @returns {Promise<Array>} Array of requests
 */
export const fetchSupervisorRequests = async () => {
  await simulateDelay(600);
  return [...mockRequests];
};

/**
 * Submit a new invitation
 * @param {Object} invitationData - The invitation data
 * @returns {Promise<Object>} Success response with new invitation
 */
export const submitInvitation = async (invitationData) => {
  await simulateDelay(1500);
  
  // Create new invitation
  const newInvitation = {
    id: `inv_${Date.now()}`,
    school: invitationData.institution,
    status: 'active',
    usages: invitationData.usages ? `0/${invitationData.usages}` : '0/1',
    expiration: invitationData.expiration || 'غير محدد'
  };
  
  // Add to mock data
  mockInvitations.unshift(newInvitation);
  
  return {
    success: true,
    message: 'تم إنشاء رابط الدعوة بنجاح',
    data: newInvitation
  };
};

/**
 * Get dashboard statistics
 * @returns {Promise<Object>} Dashboard statistics
 */
export const getDashboardStats = async () => {
  await simulateDelay(800);
  
  return {
    totalSchools: mockSupervisorSchools.length,
    activeEvaluations: mockEvaluations.filter(e => e.status === 'scheduled').length,
    completedEvaluations: mockEvaluations.filter(e => e.status === 'completed').length,
    pendingReports: mockReports.filter(r => r.status === 'draft').length,
    submittedReports: mockReports.filter(r => r.status === 'submitted').length,
    pendingNotifications: 3,
    pendingRequests: mockRequests.length
  };
};

export default {
  fetchSupervisorProfile,
  fetchSupervisorSchools,
  fetchSupervisorEvaluations,
  fetchSupervisorReports,
  fetchSupervisorInvitations,
  fetchSupervisorRequests,
  submitInvitation,
  getDashboardStats
};