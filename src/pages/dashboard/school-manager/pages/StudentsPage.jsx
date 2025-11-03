import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  User
} from 'lucide-react';
import { Card, CardContent } from '../../../../components/ui/card';
import mockStudentsService from '../../../../services/mock/mockStudentsService';
import { toast } from '../../../../hooks/use-toast';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  useEffect(() => {
    loadStudents();
  }, [searchTerm, gradeFilter]);

  const loadStudents = async () => {
    try {
      const response = await mockStudentsService.getStudents({
        search: searchTerm,
        grade: gradeFilter,
        page: 1,
        limit: 50
      });
      setStudents(response.data);
    } catch (error) {
      toast({ title: 'حدث خطأ في تحميل البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      try {
        await mockStudentsService.deleteStudent(id);
        toast({ title: 'تم حذف الطالب بنجاح' });
        loadStudents();
      } catch (error) {
        toast({ title: 'حدث خطأ', variant: 'destructive' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rtl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الطلاب</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">إجمالي الطلاب: {students.length}</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة طالب جديد
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 rtl">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن طالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            >
              <option value="all">جميع الصفوف</option>
              <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
              <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
              <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 rtl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{student.grade}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                      {student.status}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">الأداء الدراسي</span>
                      <span className="font-medium text-gray-900 dark:text-white">{student.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${student.performance}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">نسبة الحضور</span>
                      <span className="font-medium text-gray-900 dark:text-white">{student.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${student.attendance}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">معلومات ولي الأمر</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{student.parentName}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span dir="ltr">{student.parentPhone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    تواصل
                  </button>
                  <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="px-3 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {students.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا يوجد طلاب</h3>
            <p className="text-gray-600 dark:text-gray-400">لم يتم العثور على أي طلاب</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default StudentsPage;
