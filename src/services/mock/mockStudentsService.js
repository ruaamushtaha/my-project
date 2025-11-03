/**
 * Mock Students Service
 * Simulates API calls for student management
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockStudents = [
  {
    id: 1,
    name: 'محمد أحمد العلي',
    grade: 'الصف الأول الثانوي',
    parentName: 'أحمد محمد العلي',
    parentPhone: '+966501234567',
    parentEmail: 'ahmed@example.com',
    status: 'نشط',
    enrollmentDate: new Date(2023, 8, 1).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=150&h=150&fit=crop',
    performance: 92,
    attendance: 96
  },
  {
    id: 2,
    name: 'نورة عبدالله',
    grade: 'الصف الثاني الثانوي',
    parentName: 'فاطمة عبدالله',
    parentPhone: '+966501234568',
    parentEmail: 'fatima@example.com',
    status: 'نشط',
    enrollmentDate: new Date(2022, 8, 1).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop',
    performance: 88,
    attendance: 94
  },
  {
    id: 3,
    name: 'خالد سعيد',
    grade: 'الصف الثالث الثانوي',
    parentName: 'سعيد محمد',
    parentPhone: '+966501234569',
    parentEmail: 'saeed@example.com',
    status: 'نشط',
    enrollmentDate: new Date(2021, 8, 1).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop',
    performance: 85,
    attendance: 92
  }
];

const mockStudentsService = {
  async getStudents({ search, grade, status, page = 1, limit = 10 }) {
    await delay(400);
    
    let filtered = [...mockStudents];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchLower) ||
        s.parentName.toLowerCase().includes(searchLower) ||
        s.parentPhone.includes(search)
      );
    }
    
    if (grade && grade !== 'all') {
      filtered = filtered.filter(s => s.grade === grade);
    }
    
    if (status && status !== 'all') {
      filtered = filtered.filter(s => s.status === status);
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

  async getStudentById(id) {
    await delay(300);
    const student = mockStudents.find(s => s.id === parseInt(id, 10));
    if (!student) {
      throw new Error('Student not found');
    }
    return { success: true, data: student };
  },

  async createStudent(studentData) {
    await delay(600);
    
    const newStudent = {
      id: mockStudents.length + 1,
      ...studentData,
      status: 'نشط',
      enrollmentDate: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=150&h=150&fit=crop',
      performance: 0,
      attendance: 100
    };
    
    mockStudents.push(newStudent);
    
    return {
      success: true,
      data: newStudent,
      message: 'تمت إضافة الطالب بنجاح'
    };
  },

  async updateStudent(id, studentData) {
    await delay(500);
    const index = mockStudents.findIndex(s => s.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Student not found');
    }
    
    mockStudents[index] = {
      ...mockStudents[index],
      ...studentData
    };
    
    return {
      success: true,
      data: mockStudents[index],
      message: 'تم تحديث بيانات الطالب بنجاح'
    };
  },

  async deleteStudent(id) {
    await delay(400);
    const index = mockStudents.findIndex(s => s.id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Student not found');
    }
    
    mockStudents.splice(index, 1);
    
    return {
      success: true,
      message: 'تم حذف الطالب بنجاح'
    };
  }
};

export default mockStudentsService;
