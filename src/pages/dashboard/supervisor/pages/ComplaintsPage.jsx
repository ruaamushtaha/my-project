import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, User, School, Calendar, Search } from 'lucide-react';

const ComplaintsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const complaints = [
    { id: 1, parent: 'أحمد محمد علي', school: 'مدرسة النجاح', complaint: 'تأخير في الحافلة المدرسية', priority: 'عالية', status: 'جديد', date: '2024-03-15' },
    { id: 2, parent: 'فاطمة حسن', school: 'مدرسة الأمل', complaint: 'عدم توفر كتب مدرسية', priority: 'متوسطة', status: 'قيد المراجعة', date: '2024-03-14' },
    { id: 3, parent: 'محمد عبدالله', school: 'مدرسة المستقبل', complaint: 'مشكلة في نظافة المرافق', priority: 'منخفضة', status: 'تم الحل', date: '2024-03-13' }
  ];

  return (
    <div className="container mx-auto" dir="rtl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">شكاوى أولياء الأمور</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">متابعة ومعالجة الشكاوى</p>
      </motion.div>

      <div className="grid gap-4">
        {complaints.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{c.complaint}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" />{c.parent}</div>
              <div className="flex items-center gap-2"><School className="w-4 h-4 text-gray-400" />{c.school}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" />{c.date}</div>
              <span className={`px-3 py-1 rounded-full text-xs ${c.priority === 'عالية' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{c.priority}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
