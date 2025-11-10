import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaFolder, FaCalendar, FaCheck, FaClock, FaTimes, FaComment, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openComplaint, setOpenComplaint] = useState(null);
  const [responses, setResponses] = useState({});
  const [responseErrors, setResponseErrors] = useState({});

  // Mock data for complaints
  const mockComplaints = [
    {
      id: 1,
      sender: "محمد أحمد",
      role: "ولي أمر",
      type: "فنية",
      date: "2025-11-07",
      status: "جديدة",
      summary: "الموقع لا يسمح بتحميل تقارير الطلاب.",
      details: "عند محاولة تحميل تقرير ابني تظهر رسالة خطأ 404، الرجاء المسادة.",
    },
    {
      id: 2,
      sender: "آية يوسف",
      role: "معلمة",
      type: "إدارية",
      date: "2025-11-06",
      status: "قيد المعالجة",
      summary: "تأخر في الموافقات على الدروس الإضافية.",
      details: "تم رفع طلب دروس إضافية منذ أسبوعين ولم تتم الموافقة حتى الآن.",
    },
    {
      id: 3,
      sender: "سارة عبدالله",
      role: "مشرفة",
      type: "أكاديمية",
      date: "2025-11-05",
      status: "مغلقة",
      summary: "عدم وضوح معايير التقييم للفصل الأول.",
      details: "المعايير المقدمة للطلاب غير واضحة، مما يؤدي إلى استفسارات متكررة من أولياء الأمور.",
    },
    {
      id: 4,
      sender: "خالد علي",
      role: "ولي أمر",
      type: "فنية",
      date: "2025-11-04",
      status: "قيد المعالجة",
      summary: "مشكلة في نظام الحضور الإلكتروني.",
      details: "نظام الحضور لا يسجل حضور طفلي بشكل صحيح، مما يؤثر على تقييمه.",
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setComplaints(mockComplaints);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleDetails = (id) => {
    setOpenComplaint(openComplaint === id ? null : id);
    // Clear error when closing or switching complaints
    if (openComplaint === id) {
      setResponseErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value
    });
    
    // Clear error when user starts typing
    if (responseErrors[id]) {
      setResponseErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateResponse = (id, response) => {
    if (!response || response.trim().length < 10) {
      return "الرد يجب أن يحتوي على 10 أحرف على الأقل";
    }
    return null;
  };

  const handleSubmitResponse = (id) => {
    const response = responses[id] || "";
    const error = validateResponse(id, response);
    
    if (error) {
      setResponseErrors({
        ...responseErrors,
        [id]: error
      });
      return;
    }
    
    // In a real app, this would be an API call
    console.log(`Response for complaint ${id}:`, response);
    
    // Update the complaint status to "مغلقة"
    setComplaints(complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, status: "مغلقة" } 
        : complaint
    ));
    
    // Show success animation
    const originalStatus = complaints.find(c => c.id === id)?.status;
    
    // Close the details view after a delay to show success feedback
    setTimeout(() => {
      setOpenComplaint(null);
      // Clear the response
      setResponses(prev => {
        const newResponses = { ...prev };
        delete newResponses[id];
        return newResponses;
      });
    }, 1500);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "جديدة":
        return "bg-green-100 text-green-700";
      case "قيد المعالجة":
        return "bg-yellow-100 text-yellow-700";
      case "مغلقة":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "جديدة":
        return <FaCheck className="text-green-500" />;
      case "قيد المعالجة":
        return <FaClock className="text-yellow-500" />;
      case "مغلقة":
        return <FaTimes className="text-gray-500" />;
      default:
        return <FaComment className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
        />
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-6 bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        الشكاوى
      </motion.h1>

      {/* Stats Summary */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 mr-4">
              <FaExclamationTriangle className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">جديدة</p>
              <p className="text-2xl font-bold text-gray-800">
                {complaints.filter(c => c.status === "جديدة").length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 mr-4">
              <FaClock className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">قيد المعالجة</p>
              <p className="text-2xl font-bold text-gray-800">
                {complaints.filter(c => c.status === "قيد المعالجة").length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gray-200 mr-4">
              <FaCheck className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">مغلقة</p>
              <p className="text-2xl font-bold text-gray-800">
                {complaints.filter(c => c.status === "مغلقة").length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Complaints */}
      <div className="space-y-4">
        <AnimatePresence>
          {complaints.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white mr-3">
                    <FaUser />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {c.sender}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {c.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 flex items-center justify-end">
                    <FaCalendar className="ml-1" /> {c.date}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between mb-3">
                <p className="flex items-center text-gray-700">
                  <FaFolder className="ml-2 text-gray-400" /> {c.type}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusClass(c.status)}`}>
                  {getStatusIcon(c.status)}
                  <span className="mr-1">{c.status}</span>
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">💬 {c.summary}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDetails(c.id)}
                className="text-pink-600 hover:text-pink-700 font-semibold flex items-center"
              >
                عرض التفاصيل
                <motion.span
                  animate={{ rotate: openComplaint === c.id ? 180 : 0 }}
                  className="mr-2"
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Complaint details + response form */}
              <AnimatePresence>
                {openComplaint === c.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <h3 className="font-bold text-gray-800 mb-3">تفاصيل الشكوى:</h3>
                    <p className="text-gray-700 mb-5 leading-relaxed">{c.details}</p>
                    
                    <h3 className="font-bold text-gray-800 mb-3">الرد على الشكوى:</h3>
                    <textarea
                      value={responses[c.id] || ""}
                      onChange={(e) => handleResponseChange(c.id, e.target.value)}
                      className={`w-full border rounded-lg p-3 text-sm mb-2 transition-all ${
                        responseErrors[c.id] 
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                          : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                      }`}
                      placeholder="أدخل الرد على الشكوى..."
                      rows="4"
                    />
                    {responseErrors[c.id] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mb-3"
                      >
                        {responseErrors[c.id]}
                      </motion.p>
                    )}
                    
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSubmitResponse(c.id)}
                        className="flex items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                      >
                        <FaPaperPlane className="ml-2" />
                        إرسال الرد
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComplaintsPage;