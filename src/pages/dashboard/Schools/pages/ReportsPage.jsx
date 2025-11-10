import React, { useState } from "react";
import { FaSearch, FaFileAlt, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportsPage() {
  const [currentPageReceived, setCurrentPageReceived] = useState(1);
  const [currentPageSent, setCurrentPageSent] = useState(1);
  const [currentPageCreated, setCurrentPageCreated] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    school: "",
    description: "",
    file: null
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [reports, setReports] = useState([
    { id: 1, name: "تحسين خدمات المرافق", supervisor: "أحمد علي", date: "July 1, 2024", status: "Done", actions: "تم الاستلام" },
    { id: 2, name: "الحاجة لأجهزة حاسوب جديدة", supervisor: "أحمد علي", date: "July 25, 2024", status: "Progress", actions: "لم يتم الإرسال" },
  ]);

  const [urgentReports, setUrgentReports] = useState([
    { id: 1, title: "تحسين الأداء", teacher: "خالد يوسف", date: "July 1, 2024", status: "Done", actions: "تم التسليم" },
    { id: 2, title: "تعديل على ترتيب الحصص", teacher: "محمد علي", date: "July 25, 2024", status: "Progress", actions: "يتم التحميل" },
    { id: 3, title: "تحسين خدمات المرافق", teacher: "أمل علي", date: "August 1, 2024", status: "Progress", actions: "يتم التحميل" },
    { id: 4, title: "تعديل خدمات المرافق", teacher: "أحمد علي", date: "August 22, 2024", status: "Pending", actions: "_" },
  ]);

  const [createdReports, setCreatedReports] = useState([
    { id: 1, name: "تقرير الأداء الشهري", supervisor: "محمد أحمد", date: "Nov 10, 2024", status: "Sent", actions: "تم الإرسال" },
    { id: 2, name: "تقرير المرافق", supervisor: "علي حسين", date: "Nov 15, 2024", status: "Pending", actions: "قيد الإرسال" },
  ]);

  const statusClasses = {
    Done: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#F0FEED] text-[#259800]",
    Progress: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#EDF5FE] text-[#3083FF]",
    Pending: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#FEEDED] text-[#DC2626]",
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, file: 'يجب أن يكون الملف من نوع PDF, DOCX, أو XLSX' }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'حجم الملف يجب أن لا يتجاوز 5 ميجابايت' }));
        return;
      }
      
      setNewReport(prev => ({
        ...prev,
        file: file
      }));
      
      // Clear file error if exists
      if (errors.file) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.file;
          return newErrors;
        });
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!newReport.title.trim()) {
      newErrors.title = 'عنوان التقرير مطلوب';
    }
    
    if (!newReport.school) {
      newErrors.school = 'يرجى اختيار المدرسة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const report = {
        id: createdReports.length + 1,
        name: newReport.title,
        supervisor: "مشرف جديد",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: "Pending",
        actions: "تم الإنشاء"
      };
      
      setCreatedReports(prev => [report, ...prev]);
      setSuccessMessage('تم إنشاء التقرير بنجاح');
      
      // Reset form
      setNewReport({
        title: "",
        school: "",
        description: "",
        file: null
      });
      
      // Close modal after delay
      setTimeout(() => {
        setShowCreateReportModal(false);
        setSuccessMessage("");
      }, 2000);
    }, 1000);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowCreateReportModal(false);
    setNewReport({
      title: "",
      school: "",
      description: "",
      file: null
    });
    setErrors({});
    setSuccessMessage("");
  };

  const handleDownloadReport = (reportId, reportType) => {
    // Simulate report download
    console.log(`Downloading ${reportType} report with ID: ${reportId}`);
    // In a real implementation, this would trigger a file download
    // For now, we'll show a success message
    setSuccessMessage('جاري تحميل التقرير...');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  const renderTable = (data, columns, keys, tableType) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      {/* Header */}
      <motion.div 
        className={`grid grid-cols-${columns.length + 1} bg-gray-100 dark:bg-gray-800 p-2 text-right font-semibold text-gray-500 dark:text-gray-200 rounded-t-lg`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {columns.map((col, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
          >
            {col}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + columns.length * 0.05 }}
        >
          تحميل
        </motion.div>
      </motion.div>

      {/* Rows */}
      <div className="space-y-2 p-2">
        {data
          .slice(
            (tableType === 'received' 
              ? (currentPageReceived - 1) * rowsPerPage 
              : tableType === 'sent' 
              ? (currentPageSent - 1) * rowsPerPage
              : (currentPageCreated - 1) * rowsPerPage),
            (tableType === 'received' 
              ? currentPageReceived * rowsPerPage 
              : tableType === 'sent' 
              ? currentPageSent * rowsPerPage
              : currentPageCreated * rowsPerPage)
          )
          .map((item, index) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-6 bg-white dark:bg-gray-700 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 4px 12px rgba(100, 200, 204, 0.3)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {keys.map((key, idx) =>
                key === "status" ? (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={statusClasses[item.status]}>
                      {item.status}
                      <span className="w-2 h-2 rounded-full bg-current inline-block"></span>
                    </span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={idx} 
                    className="text-gray-500 dark:text-gray-300"
                    whileHover={{ x: -2 }}
                  >
                    {item[key]}
                  </motion.div>
                )
              )}
              <motion.div 
                className="flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.button
                  onClick={() => handleDownloadReport(item.id, tableType)}
                  className="text-blue-500 hover:text-blue-700"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );

  const totalPages = 10;
  const pages = [1, 2, 3, 4, 5, "dots", totalPages];

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 p-8" 
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header + Filter */}
      <motion.div 
        className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">التقارير</h1>
          <p className="text-gray-500 dark:text-gray-400">عرض وإدارة تقاريرك</p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Create Report Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateReportModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaPlus className="text-white" />
            <span>إنشاء تقرير</span>
          </motion.button>
          
          <span className="text-gray-400 dark:text-gray-400 text-sm">
            Filter by <span className="text-[#64C8CC]">dates</span> | <span className="text-[#64C8CC]">Status</span>
          </span>

          <motion.div 
            className="relative w-10 h-8"
            whileHover={{ scale: 1.05 }}
          >
            <input
              type="text"
              placeholder=""
              className="w-full h-full border border-gray-300 dark:border-gray-600 rounded text-sm pl-2 pr-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-black dark:text-gray-200" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Create Report Modal */}
      <AnimatePresence>
        {showCreateReportModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-right">إنشاء تقرير جديد</h2>
                
                {successMessage && (
                  <motion.div 
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-right"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {successMessage}
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">عنوان التقرير *</label>
                    <motion.input
                      type="text"
                      name="title"
                      value={newReport.title}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-100 dark:bg-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="أدخل عنوان التقرير"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1 text-right">{errors.title}</p>}
                  </motion.div>
                  
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">اسم المدرسة *</label>
                    <motion.select
                      name="school"
                      value={newReport.school}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-100 dark:bg-gray-700 border ${errors.school ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">اختر المدرسة</option>
                      <option value="مدرسة الأمل النموذجية">مدرسة الأمل النموذجية</option>
                      <option value="مدرسة النجاح الابتدائية">مدرسة النجاح الابتدائية</option>
                      <option value="مدرسة المستقبل المتوسطة">مدرسة المستقبل المتوسطة</option>
                    </motion.select>
                    {errors.school && <p className="text-red-500 text-sm mt-1 text-right">{errors.school}</p>}
                  </motion.div>
                  
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">الوصف / حالة المرافق / الملاحظات</label>
                    <motion.textarea
                      name="description"
                      value={newReport.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل الوصف أو الملاحظات"
                      whileFocus={{ scale: 1.01 }}
                    ></motion.textarea>
                  </motion.div>
                  
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-right">رفع ملف التقرير (اختياري)</label>
                    <motion.input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.xlsx"
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {newReport.file && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-right">
                        الملف المحدد: {newReport.file.name}
                      </p>
                    )}
                    {errors.file && <p className="text-red-500 text-sm mt-1 text-right">{errors.file}</p>}
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between gap-4 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button
                      type="button"
                      onClick={handleCloseModal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      إلغاء
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      رفع التقرير
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table 1: المستلمة */}
      <motion.h2 
        className="text-right text-xl font-bold text-gray-800 dark:text-gray-100 mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        التقارير المستلمة
      </motion.h2>
      {renderTable(
        reports,
        ["اسم التقرير", "المشرف", "التاريخ", "حالة التقرير", "الاستلام"],
        ["name", "supervisor", "date", "status", "actions"],
        "received"
      )}
      
      {/* Pagination for Received Reports */}
      <motion.div 
        className="relative flex items-center px-4 py-2 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="absolute left-0 flex items-center gap-2">
          <span className="text-sm text-slate-950 dark:text-gray-200">Row</span>
          <motion.select
            value={rowsPerPage}
            onChange={(e) => { 
              setRowsPerPage(Number(e.target.value)); 
              setCurrentPageReceived(1);
              setCurrentPageSent(1);
              setCurrentPageCreated(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            whileFocus={{ scale: 1.05 }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </motion.select>
          <span className="text-sm text-slate-950 dark:text-gray-200">Show</span>
        </div>

        <div className="flex justify-center items-center gap-1 w-full">
          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageReceived(Math.max(1, currentPageReceived - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &lt;
          </motion.button>

          {Array.from({length: Math.ceil(reports.length / rowsPerPage)}, (_, i) => i + 1).map((page, idx) => (
            <motion.button
              key={idx}
              className={`px-2 py-1 ${currentPageReceived === page ? "bg-[#64C8CC] text-white" : "dark:text-gray-200"}`}
              onClick={() => setCurrentPageReceived(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                backgroundColor: currentPageReceived === page ? "#64C8CC" : "transparent",
                color: currentPageReceived === page ? "white" : "inherit"
              }}
            >
              {page}
            </motion.button>
          ))}

          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageReceived(Math.min(Math.ceil(reports.length / rowsPerPage), currentPageReceived + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &gt;
          </motion.button>
        </div>
      </motion.div>

      {/* Table 2: المرسلة */}
      <motion.h2 
        className="text-right text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        التقارير المرسلة
      </motion.h2>
      {renderTable(
        urgentReports,
        ["اسم التقرير", "المعلم", "التاريخ", "حالة التقرير", "التسليم"],
        ["title", "teacher", "date", "status", "actions"],
        "sent"
      )}

      {/* Pagination for Sent Reports */}
      <motion.div 
        className="relative flex items-center px-4 py-2 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="absolute left-0 flex items-center gap-2">
          <span className="text-sm text-slate-950 dark:text-gray-200">Row</span>
          <motion.select
            value={rowsPerPage}
            onChange={(e) => { 
              setRowsPerPage(Number(e.target.value)); 
              setCurrentPageReceived(1);
              setCurrentPageSent(1);
              setCurrentPageCreated(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            whileFocus={{ scale: 1.05 }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </motion.select>
          <span className="text-sm text-slate-950 dark:text-gray-200">Show</span>
        </div>

        <div className="flex justify-center items-center gap-1 w-full">
          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageSent(Math.max(1, currentPageSent - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &lt;
          </motion.button>

          {Array.from({length: Math.ceil(urgentReports.length / rowsPerPage)}, (_, i) => i + 1).map((page, idx) => (
            <motion.button
              key={idx}
              className={`px-2 py-1 ${currentPageSent === page ? "bg-[#64C8CC] text-white" : "dark:text-gray-200"}`}
              onClick={() => setCurrentPageSent(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                backgroundColor: currentPageSent === page ? "#64C8CC" : "transparent",
                color: currentPageSent === page ? "white" : "inherit"
              }}
            >
              {page}
            </motion.button>
          ))}

          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageSent(Math.min(Math.ceil(urgentReports.length / rowsPerPage), currentPageSent + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &gt;
          </motion.button>
        </div>
      </motion.div>

      {/* Table 3: التقارير المنشأة */}
      <motion.h2 
        className="text-right text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        التقارير المنشأة
      </motion.h2>
      {renderTable(
        createdReports,
        ["اسم التقرير", "المشرف", "التاريخ", "حالة التقرير", "الإجراءات"],
        ["name", "supervisor", "date", "status", "actions"],
        "created"
      )}

      {/* Pagination for Created Reports */}
      <motion.div 
        className="relative flex items-center px-4 py-2 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="absolute left-0 flex items-center gap-2">
          <span className="text-sm text-slate-950 dark:text-gray-200">Row</span>
          <motion.select
            value={rowsPerPage}
            onChange={(e) => { 
              setRowsPerPage(Number(e.target.value)); 
              setCurrentPageReceived(1);
              setCurrentPageSent(1);
              setCurrentPageCreated(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            whileFocus={{ scale: 1.05 }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </motion.select>
          <span className="text-sm text-slate-950 dark:text-gray-200">Show</span>
        </div>

        <div className="flex justify-center items-center gap-1 w-full">
          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageCreated(Math.max(1, currentPageCreated - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &lt;
          </motion.button>

          {Array.from({length: Math.ceil(createdReports.length / rowsPerPage)}, (_, i) => i + 1).map((page, idx) => (
            <motion.button
              key={idx}
              className={`px-2 py-1 ${currentPageCreated === page ? "bg-[#64C8CC] text-white" : "dark:text-gray-200"}`}
              onClick={() => setCurrentPageCreated(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                backgroundColor: currentPageCreated === page ? "#64C8CC" : "transparent",
                color: currentPageCreated === page ? "white" : "inherit"
              }}
            >
              {page}
            </motion.button>
          ))}

          <motion.button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPageCreated(Math.min(Math.ceil(createdReports.length / rowsPerPage), currentPageCreated + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &gt;
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="flex gap-6 mb-8 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {/* Card 1 */}
        <motion.div 
          className="flex-[2] bg-[#F9F9F9] dark:bg-gray-800 rounded-lg p-4"
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 4px 12px rgba(100, 200, 204, 0.2)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.h3 
            className="text-right text-lg font-bold mb-2 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            التقارير المرسلة
          </motion.h3>
          <div className="border-b border-gray-300 dark:border-gray-600 mb-4"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div 
              className="relative w-24 h-24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="12" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#64C8CC"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset="125.6"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 125.6 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-xl font-bold text-gray-700 dark:text-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  50%
                </motion.span>
              </div>
            </motion.div>

            <div className="text-sm w-full md:w-auto text-center">
              <div className="grid grid-cols-2 gap-2 mb-2 bg-[#EFEFF8] dark:bg-gray-700 rounded-lg p-2">
                <span className="text-gray-500 dark:text-gray-300">الاستلام</span>
                <span className="text-gray-500 dark:text-gray-300">النسبة</span>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
                  <span className="text-gray-700 dark:text-gray-200">تم</span>
                </div> 
                <motion.span 
                  className="text-gray-700 dark:text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  50
                </motion.span>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#64C8CC]"></div>
                  <span className="text-gray-700 dark:text-gray-200">قيد التحميل</span>
                </div>
                <motion.span 
                  className="text-gray-700 dark:text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  50
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4"
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 4px 12px rgba(100, 200, 204, 0.2)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.h3 
            className="text-right text-lg font-bold mb-4 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            التقارير المنجزة
          </motion.h3>
          <motion.div 
            className="flex items-center justify-end p-5 border border-gray-300 dark:border-gray-600 rounded-lg"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex flex-col items-end gap-2">
              <FaFileAlt className="text-2xl text-gray-500 dark:text-gray-200" />
              <span className="text-sm text-gray-600 dark:text-gray-300">reports</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">report</span>
                <motion.span 
                  className="text-sm text-[#64C8CC]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  14/30
                </motion.span>
                <div className="w-32 h-2 bg-[#64C8CC] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gray-300 dark:bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: "46.6%" }}
                    transition={{ duration: 1, delay: 1.3 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4"
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 4px 12px rgba(100, 200, 204, 0.2)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.h3 
            className="text-right text-lg font-bold mb-4 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            التقارير العاجلة
          </motion.h3>
          <motion.div 
            className="flex items-center justify-end p-5 border border-gray-300 dark:border-gray-600 rounded-lg"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex flex-col items-end gap-2">
              <FaFileAlt className="text-2xl text-gray-500 dark:text-gray-200" />
              <span className="text-sm text-gray-600 dark:text-gray-300">reports</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">report</span>
                <motion.span 
                  className="text-sm text-[#64C8CC]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  10/30
                </motion.span>
                <div className="w-32 h-2 bg-[#64C8CC] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gray-300 dark:bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: "33.3%" }}
                    transition={{ duration: 1, delay: 1.4 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}