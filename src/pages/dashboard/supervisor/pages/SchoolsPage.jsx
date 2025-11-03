import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, MapPin, Users, Star, Calendar, GraduationCap, ChevronRight, Search, Filter } from 'lucide-react';

const SchoolsPage = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const schools = [
    { id: 1, name: 'مدرسة النجاح الابتدائية', location: 'الرياض - حي النزهة', students: 450, teachers: 35, rating: 4.5, lastVisit: '2024-01-10', status: 'ممتاز' },
    { id: 2, name: 'مدرسة الأمل المتوسطة', location: 'جدة - حي الربوة', students: 320, teachers: 28, rating: 4.2, lastVisit: '2024-01-08', status: 'جيد جداً' },
    { id: 3, name: 'مدرسة المستقبل الثانوية', location: 'الدمام - حي الشاطئ', students: 280, teachers: 32, rating: 4.8, lastVisit: '2024-01-05', status: 'ممتاز' }
  ];

  const filteredSchools = schools.filter(s => s.name.includes(searchTerm) || s.location.includes(searchTerm));

  return (
    <div className="container mx-auto" dir="rtl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">المدارس المُشرف عليها</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">إدارة ومتابعة المدارس تحت إشرافك</p>
      </motion.div>

      <div className="glass-card rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="البحث عن المدارس..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-2.5 glass-card rounded-xl border-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchools.map((school, index) => (
          <motion.div key={school.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
            className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer" onClick={() => setSelectedSchool(school)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{school.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />{school.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /><span className="text-sm">{school.students} طالب</span></div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="text-sm">{school.rating}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchoolsPage;
