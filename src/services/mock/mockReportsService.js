/**
 * Mock Reports Service
 * Handles reports from supervisors and internal reports
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockReports = [
  {
    id: 1,
    type: 'supervisor',
    title: 'تقرير زيارة إشرافية',
    author: 'د. سارة خالد',
    authorEmail: 'sara@supervisor.edu.sa',
    date: new Date(2024, 2, 10).toISOString(),
    category: 'أداء المعلمين',
    content: 'تم زيارة المدرسة وملاحظة مستوى أداء جيد للمعلمين مع بعض نقاط التحسين المطلوبة...',
    rating: 4.5,
    status: 'reviewed',
    attachments: ['تقرير_الزيارة.pdf'],
    recommendations: [
      'تحسين التواصل مع أولياء الأمور',
      'تطوير أساليب التدريس التفاعلية',
      'زيادة الأنشطة اللامنهجية'
    ]
  },
  {
    id: 2,
    type: 'internal',
    title: 'تقرير الأداء الشهري',
    author: 'مدير المدرسة',
    authorEmail: 'manager@school.edu.sa',
    date: new Date(2024, 2, 5).toISOString(),
    category: 'أداء عام',
    content: 'تقرير شامل عن أداء المدرسة خلال شهر فبراير 2024...',
    rating: null,
    status: 'sent',
    attachments: ['تقرير_فبراير_2024.pdf'],
    statistics: {
      attendance: 94,
      performance: 87,
      activitiesCount: 5
    }
  },
  {
    id: 3,
    type: 'supervisor',
    title: 'تقييم البيئة المدرسية',
    author: 'د. محمد الشمري',
    authorEmail: 'mohammed@supervisor.edu.sa',
    date: new Date(2024, 1, 28).toISOString(),
    category: 'البيئة المدرسية',
    content: 'تقييم شامل لبيئة المدرسة والمرافق والخدمات المقدمة...',
    rating: 4.0,
    status: 'pending',
    attachments: [],
    recommendations: [
      'تحسين نظافة المرافق',
      'صيانة أجهزة التكييف',
      'إضافة مظلات في الساحات'
    ]
  }
];

const mockReportsService = {
  async getReports({ type, status, category, page = 1, limit = 10 }) {
    await delay(400);
    
    let filtered = [...mockReports];
    
    if (type && type !== 'all') {
      filtered = filtered.filter(r => r.type === type);
    }
    
    if (status && status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(r => r.category === category);
    }
    
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: paginated,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  },

  async getReportById(id) {
    await delay(300);
    const report = mockReports.find(r => r.id === parseInt(id, 10));
    if (!report) {
      throw new Error('Report not found');
    }
    return { success: true, data: report };
  },

  async createInternalReport(reportData) {
    await delay(600);
    
    const newReport = {
      id: mockReports.length + 1,
      type: 'internal',
      author: 'مدير المدرسة',
      authorEmail: 'manager@school.edu.sa',
      date: new Date().toISOString(),
      status: 'sent',
      ...reportData
    };
    
    mockReports.push(newReport);
    
    return {
      success: true,
      data: newReport,
      message: 'تم إنشاء التقرير وإرساله بنجاح'
    };
  },

  async respondToReport(id, response) {
    await delay(500);
    const reportIndex = mockReports.findIndex(r => r.id === parseInt(id, 10));
    if (reportIndex === -1) {
      throw new Error('Report not found');
    }
    
    mockReports[reportIndex] = {
      ...mockReports[reportIndex],
      response,
      respondedAt: new Date().toISOString(),
      status: 'reviewed'
    };
    
    return {
      success: true,
      data: mockReports[reportIndex],
      message: 'تم إرسال الرد على التقرير'
    };
  },

  async getReportsStats() {
    await delay(300);
    return {
      success: true,
      data: {
        total: mockReports.length,
        fromSupervisors: mockReports.filter(r => r.type === 'supervisor').length,
        internal: mockReports.filter(r => r.type === 'internal').length,
        pending: mockReports.filter(r => r.status === 'pending').length,
        reviewed: mockReports.filter(r => r.status === 'reviewed').length,
        averageRating: mockReports
          .filter(r => r.rating)
          .reduce((acc, r) => acc + r.rating, 0) / mockReports.filter(r => r.rating).length
      }
    };
  }
};

export default mockReportsService;
