/**
 * Mock Complaints Service
 * Handles complaints from parents and supervisors
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockComplaints = [
  {
    id: 1,
    type: 'parent',
    senderName: 'أحمد محمد العلي',
    senderEmail: 'ahmed@example.com',
    studentName: 'محمد أحمد العلي',
    subject: 'نظافة المرافق',
    description: 'المرافق الصحية في المدرسة تحتاج إلى تحسين وصيانة دورية',
    status: 'pending',
    priority: 'medium',
    date: new Date(2024, 2, 10).toISOString(),
    response: null,
    respondedAt: null
  },
  {
    id: 2,
    type: 'supervisor',
    senderName: 'د. سارة خالد',
    senderEmail: 'sara@supervisor.edu.sa',
    subject: 'أداء المعلمين',
    description: 'لوحظ تأخر بعض المعلمين عن بداية الحصص الدراسية',
    status: 'resolved',
    priority: 'high',
    date: new Date(2024, 2, 5).toISOString(),
    response: 'تم اتخاذ الإجراءات اللازمة وتنبيه المعلمين المعنيين',
    respondedAt: new Date(2024, 2, 6).toISOString()
  },
  {
    id: 3,
    type: 'parent',
    senderName: 'فاطمة عبدالله',
    senderEmail: 'fatima@example.com',
    studentName: 'نورة عبدالله',
    subject: 'الواجبات المنزلية',
    description: 'كمية الواجبات المنزلية كبيرة جداً ولا تتناسب مع العمر',
    status: 'in-progress',
    priority: 'low',
    date: new Date(2024, 2, 12).toISOString(),
    response: null,
    respondedAt: null
  },
  {
    id: 4,
    type: 'supervisor',
    senderName: 'د. محمد الشمري',
    senderEmail: 'mohammed@supervisor.edu.sa',
    subject: 'تنظيم الصفوف',
    description: 'بعض الصفوف الدراسية مكتظة بالطلاب وتحتاج إعادة توزيع',
    status: 'pending',
    priority: 'high',
    date: new Date(2024, 2, 14).toISOString(),
    response: null,
    respondedAt: null
  }
];

const mockComplaintsService = {
  async getComplaints({ type, status, priority, page = 1, limit = 10 }) {
    await delay(400);
    
    let filtered = [...mockComplaints];
    
    if (type && type !== 'all') {
      filtered = filtered.filter(c => c.type === type);
    }
    
    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }
    
    if (priority && priority !== 'all') {
      filtered = filtered.filter(c => c.priority === priority);
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

  async getComplaintById(id) {
    await delay(300);
    const complaint = mockComplaints.find(c => c.id === parseInt(id, 10));
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    return { success: true, data: complaint };
  },

  async respondToComplaint(id, response) {
    await delay(500);
    const complaintIndex = mockComplaints.findIndex(c => c.id === parseInt(id, 10));
    if (complaintIndex === -1) {
      throw new Error('Complaint not found');
    }
    
    mockComplaints[complaintIndex] = {
      ...mockComplaints[complaintIndex],
      response,
      respondedAt: new Date().toISOString(),
      status: 'resolved'
    };
    
    return {
      success: true,
      data: mockComplaints[complaintIndex],
      message: 'تم إرسال الرد بنجاح وإشعار المرسل'
    };
  },

  async updateComplaintStatus(id, status) {
    await delay(400);
    const complaintIndex = mockComplaints.findIndex(c => c.id === parseInt(id, 10));
    if (complaintIndex === -1) {
      throw new Error('Complaint not found');
    }
    
    mockComplaints[complaintIndex].status = status;
    
    return {
      success: true,
      data: mockComplaints[complaintIndex],
      message: 'تم تحديث حالة الشكوى'
    };
  },

  async getComplaintsStats() {
    await delay(300);
    return {
      success: true,
      data: {
        total: mockComplaints.length,
        pending: mockComplaints.filter(c => c.status === 'pending').length,
        inProgress: mockComplaints.filter(c => c.status === 'in-progress').length,
        resolved: mockComplaints.filter(c => c.status === 'resolved').length,
        fromParents: mockComplaints.filter(c => c.type === 'parent').length,
        fromSupervisors: mockComplaints.filter(c => c.type === 'supervisor').length
      }
    };
  }
};

export default mockComplaintsService;
