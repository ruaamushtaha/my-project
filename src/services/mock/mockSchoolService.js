/**
 * Mock School Service
 * Simulates API calls for school management
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockSchools = [
  {
    id: 1,
    name: 'مدرسة الأمل الثانوية',
    type: 'حكومية',
    address: 'حي النزهة، الرياض',
    phone: '+966112345678',
    email: 'alamal@school.edu.sa',
    studentsCount: 1245,
    teachersCount: 68,
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
    activities: [
      { id: 1, name: 'معرض العلوم', date: '2024-03-15', status: 'قادم', description: 'معرض سنوي للمشاريع العلمية', images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'] },
      { id: 2, name: 'رحلة ترفيهية', date: '2024-02-20', status: 'منتهي', description: 'رحلة إلى المتحف الوطني', images: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop'] },
      { id: 3, name: 'مسابقة القرآن', date: '2024-04-10', status: 'قادم', description: 'مسابقة حفظ القرآن الكريم', images: [] }
    ],
    projects: [
      { id: 1, name: 'تطوير المكتبة الرقمية', progress: 75, status: 'قيد التنفيذ', description: 'مشروع لرقمنة جميع الكتب والمراجع', startDate: '2024-01-01', endDate: '2024-06-30' },
      { id: 2, name: 'تحديث المعامل', progress: 100, status: 'مكتمل', description: 'تحديث معامل الحاسب والعلوم', startDate: '2023-09-01', endDate: '2024-01-15' },
      { id: 3, name: 'برنامج الموهوبين', progress: 45, status: 'قيد التنفيذ', description: 'برنامج خاص لرعاية الطلاب الموهوبين', startDate: '2024-02-01', endDate: '2024-12-31' }
    ]
  }
];

const mockSchoolService = {
  async getSchool(schoolId) {
    await delay(300);
    const school = mockSchools.find(s => s.id === parseInt(schoolId, 10));
    if (!school) {
      throw new Error('School not found');
    }
    return { success: true, data: school };
  },

  async getAllSchools() {
    await delay(400);
    return { success: true, data: mockSchools };
  },

  async updateSchoolInfo(schoolId, data) {
    await delay(500);
    const schoolIndex = mockSchools.findIndex(s => s.id === parseInt(schoolId, 10));
    if (schoolIndex === -1) {
      throw new Error('School not found');
    }
    mockSchools[schoolIndex] = { ...mockSchools[schoolIndex], ...data };
    return { success: true, data: mockSchools[schoolIndex], message: 'تم تحديث بيانات المدرسة بنجاح' };
  },

  async addActivity(schoolId, activity) {
    await delay(400);
    const school = mockSchools.find(s => s.id === parseInt(schoolId, 10));
    if (!school) {
      throw new Error('School not found');
    }
    const newActivity = {
      id: school.activities.length + 1,
      ...activity,
      status: 'قادم'
    };
    school.activities.push(newActivity);
    return { success: true, data: newActivity, message: 'تمت إضافة النشاط بنجاح' };
  },

  async updateActivity(schoolId, activityId, data) {
    await delay(400);
    const school = mockSchools.find(s => s.id === parseInt(schoolId, 10));
    if (!school) {
      throw new Error('School not found');
    }
    const activityIndex = school.activities.findIndex(a => a.id === parseInt(activityId, 10));
    if (activityIndex === -1) {
      throw new Error('Activity not found');
    }
    school.activities[activityIndex] = { ...school.activities[activityIndex], ...data };
    return { success: true, data: school.activities[activityIndex], message: 'تم تحديث النشاط بنجاح' };
  },

  async addProject(schoolId, project) {
    await delay(400);
    const school = mockSchools.find(s => s.id === parseInt(schoolId, 10));
    if (!school) {
      throw new Error('School not found');
    }
    const newProject = {
      id: school.projects.length + 1,
      ...project,
      progress: 0,
      status: 'قيد التنفيذ'
    };
    school.projects.push(newProject);
    return { success: true, data: newProject, message: 'تمت إضافة المشروع بنجاح' };
  },

  async updateProject(schoolId, projectId, data) {
    await delay(400);
    const school = mockSchools.find(s => s.id === parseInt(schoolId, 10));
    if (!school) {
      throw new Error('School not found');
    }
    const projectIndex = school.projects.findIndex(p => p.id === parseInt(projectId, 10));
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }
    school.projects[projectIndex] = { ...school.projects[projectIndex], ...data };
    return { success: true, data: school.projects[projectIndex], message: 'تم تحديث المشروع بنجاح' };
  }
};

export default mockSchoolService;
