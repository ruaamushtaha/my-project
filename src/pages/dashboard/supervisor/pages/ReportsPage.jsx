import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Star, Calendar, School } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { id: 1, title: 'تقرير تقييم مدرسة النجاح', school: 'مدرسة النجاح الابتدائية', date: '2024-03-10', supervisor: 'د. سارة خالد', rating: 4.5, status: 'مكتمل' },
    { id: 2, title: 'تقرير زيارة - مدرسة الأمل', school: 'مدرسة الأمل المتوسطة', date: '2024-03-08', supervisor: 'د. محمد الشمري', rating: 4.2, status: 'مكتمل' }
  ];

  return (
    <div className="container mx-auto" dir="rtl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">التقارير الإشرافية</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">تقارير التقييم والزيارات الميدانية</p>
      </motion.div>

      <div className="grid gap-4">
        {reports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{r.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{r.supervisor} • {r.school}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold">{r.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
