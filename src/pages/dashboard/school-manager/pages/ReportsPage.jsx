import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye,
  Send,
  Filter,
  Star,
  MessageSquare,
  Calendar,
  User,
  Shield,
  TrendingUp
} from 'lucide-react';
import mockReportsService from '../../../../services/mock/mockReportsService';
import { useToast } from '@/hooks/use-toast';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ type: 'all', status: 'all' });
  const [selectedReport, setSelectedReport] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      const [reportsRes, statsRes] = await Promise.all([
        mockReportsService.getReports(filters),
        mockReportsService.getReportsStats()
      ]);
      setReports(reportsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل التقارير',
        variant: 'destructive'
      });
    }
  };

  const typeColors = {
    supervisor: 'from-purple-500 to-fuchsia-600',
    internal: 'from-blue-500 to-indigo-600'
  };

  const statusColors = {
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    reviewed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    sent: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
  };

  return (
    <div className="container mx-auto" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          التقارير
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          تقارير المشرفين والتقارير الداخلية
        </p>
      </motion.div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'الإجمالي', value: stats.total, color: 'primary' },
            { label: 'من المشرفين', value: stats.fromSupervisors, color: 'danger' },
            { label: 'داخلية', value: stats.internal, color: 'primary' },
            { label: 'قيد المراجعة', value: stats.pending, color: 'warning' },
            { label: 'تمت المراجعة', value: stats.reviewed, color: 'success' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="glass-card px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الأنواع</option>
            <option value="supervisor">تقارير المشرفين</option>
            <option value="internal">تقارير داخلية</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="glass-card px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">قيد المراجعة</option>
            <option value="reviewed">تمت المراجعة</option>
            <option value="sent">تم الإرسال</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${typeColors[report.type]} text-white`}>
                  {report.type === 'supervisor' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    بواسطة: {report.author} • {report.category}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[report.status]}`}>
                {report.status === 'pending' && 'قيد المراجعة'}
                {report.status === 'reviewed' && 'تمت المراجعة'}
                {report.status === 'sent' && 'تم الإرسال'}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{report.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(report.date).toLocaleDateString('ar-SA')}
              </div>
              <div className="flex items-center gap-3">
                {report.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{report.rating}</span>
                  </div>
                )}
                {report.attachments?.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {report.attachments.length} مرفق
                  </span>
                )}
              </div>
            </div>

            {report.recommendations && report.recommendations.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">التوصيات:</h4>
                <ul className="space-y-1">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-primary dark:text-accent mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedReport.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedReport.author} • {new Date(selectedReport.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                {selectedReport.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-6 h-6 fill-current" />
                    <span className="text-xl font-bold">{selectedReport.rating}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المحتوى:</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedReport.content}</p>
                </div>

                {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">التوصيات:</h4>
                    <ul className="space-y-2">
                      {selectedReport.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <TrendingUp className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedReport.statistics && (
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">الإحصائيات:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary dark:text-accent">
                          {selectedReport.statistics.attendance}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">الحضور</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">
                          {selectedReport.statistics.performance}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">الأداء</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">
                          {selectedReport.statistics.activitiesCount}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">الأنشطة</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <motion.button
                  onClick={() => setSelectedReport(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 glass-card rounded-xl font-medium"
                >
                  إغلاق
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsPage;
