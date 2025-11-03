import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { School, MapPin, Users, GraduationCap, Eye, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import mockSchoolService from '../../../../services/mock/mockSchoolService';
import { toast } from '../../../../hooks/use-toast';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const response = await mockSchoolService.getAllSchools();
      setSchools(response.data);
    } catch (error) {
      toast({ title: 'حدث خطأ في تحميل البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center rtl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المدارس</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {schools.length === 1 ? 'مدرسة واحدة تحت إدارتك' : `${schools.length} مدارس تحت إدارتك`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schools.map((school) => (
          <motion.div
            key={school.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden h-full">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 dark:text-white">
                    {school.type}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 rtl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                    <img
                      src={school.logo}
                      alt={school.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{school.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{school.address}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">الطلاب</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{school.studentsCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">المعلمين</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{school.teachersCount}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    عرض التفاصيل
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {schools.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <School className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد مدارس</h3>
            <p className="text-gray-600 dark:text-gray-400">لم يتم تعيين أي مدرسة لك بعد</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default SchoolsPage;
