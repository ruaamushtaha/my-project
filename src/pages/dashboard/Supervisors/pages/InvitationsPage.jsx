import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaTrash, FaEdit, FaCopy, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

const InvitationsPage = () => {
  const [activeTab, setActiveTab] = useState("links");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    institution: "",
    manager: "",
    expiration: "",
    usages: "",
  });
  const [errors, setErrors] = useState({});

  const invitationsData = [
    { school: "الأمل", status: "نشط", usages: "1/1", expiration: "July 1, 2024" },
  ];

  const requestsData = [
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
  ];

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.institution.trim()) {
      newErrors.institution = "اسم المؤسسة/المديرية مطلوب";
    } else if (formData.institution.trim().length < 3) {
      newErrors.institution = "اسم المؤسسة/المديرية يجب أن يكون 3 أحرف على الأقل";
    }
    
    if (!formData.manager.trim()) {
      newErrors.manager = "اسم المدير مطلوب";
    } else if (formData.manager.trim().length < 3) {
      newErrors.manager = "اسم المدير يجب أن يكون 3 أحرف على الأقل";
    }
    
    // Validate usages if provided
    if (formData.usages && (isNaN(formData.usages) || formData.usages < 1)) {
      newErrors.usages = "عدد الاستخدامات يجب أن يكون رقمًا أكبر من 0";
    }
    
    // Validate expiration date if provided
    if (formData.expiration) {
      const today = new Date().toISOString().split('T')[0];
      if (formData.expiration < today) {
        newErrors.expiration = "تاريخ الانتهاء يجب أن يكون في المستقبل";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCreateLink = () => {
    if (!validateForm()) {
      return;
    }
    
    console.log("إنشاء الرابط:", formData);
    setShowModal(false);
    setFormData({ institution: "", manager: "", expiration: "", usages: "" });
    setErrors({});
  };

  return (
    <motion.div
      className="p-6 text-right min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* العنوان */}
      <motion.div 
        className="flex flex-col mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-xl font-extrabold">دعوات مدراء المدارس</h1>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          قم بإنشاء وإدارة روابط الدعوة ومراجعة طلبات المدراء المعلقة
        </span>
      </motion.div>

      {/* التبويبات */}
      <motion.div 
        className="mb-6 border-b-2 border-gray-300 dark:border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex gap-4 justify-start">
          <motion.button
            onClick={() => setActiveTab("links")}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "links"
                ? "text-green-600 dark:text-green-500 border-b-2 border-green-600 dark:border-green-500 -mb-[2px]"
                : "text-gray-800 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            روابط الدعوة
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "requests"
                ? "text-green-600 dark:text-green-500 border-b-2 border-green-600 dark:border-green-500 -mb-[2px]"
                : "text-gray-800 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            طلبات تسجيل مدراء جديدة ({requestsData.length})
          </motion.button>
        </div>
      </motion.div>

      {/* محتوى روابط الدعوة */}
      {activeTab === "links" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="flex justify-between items-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              whileHover={{ 
                scale: 1.05,
                x: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> رابط دعوة مدير مدرسة جديد
            </motion.button>
            <motion.button 
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              whileHover={{ 
                scale: 1.05,
                x: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash /> حذف الكل
            </motion.button>
          </motion.div>

          <motion.div 
            className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <table className="w-full text-right border-collapse rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-2 font-bold">المدرسة</th>
                  <th className="px-4 py-2 font-bold">الحالة</th>
                  <th className="px-4 py-2 font-bold">الاستخدامات</th>
                  <th className="px-4 py-2 font-bold">تاريخ الانتهاء</th>
                  <th className="px-4 py-2 font-bold">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {invitationsData.map((inv, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: 0.6 + index * 0.1 
                    }}
                    whileHover={{ 
                      x: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <td className="px-4 py-3 rounded-s-lg">{inv.school}</td>
                    <td className="px-4 py-3">
                      {inv.status === "نشط" ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 inline-block"></span>
                          {inv.status}
                        </span>
                      ) : (
                        inv.status
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{inv.usages}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{inv.expiration}</td>
                    <td className="px-4 py-3 rounded-e-lg">
                      <div className="flex gap-3 justify-start">
                        <motion.button 
                          className="text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                        <motion.button 
                          className="text-blue-500 hover:text-blue-700"
                          whileHover={{ scale: 1.2, rotate: -10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button 
                          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaCopy />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* النافذة المنبثقة */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md text-right text-gray-900 dark:text-gray-200"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">إنشاء رابط دعوة مدير جديد</h2>
                  <motion.button 
                    onClick={() => setShowModal(false)} 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </motion.button>
                </div>
                <div className="flex flex-col gap-3">
                  {["institution","manager","expiration","usages"].map((field, index)=>(
                    <motion.div 
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <label className="flex flex-col">
                        {field === "institution" ? "المؤسسة/المديريّة" : field === "manager" ? "المدير الجديد" : field === "expiration" ? "تاريخ الانتهاء (اختياري)" : "عدد الاستخدامات المسموحة (اختياري)"}
                        <input
                          type={field==="expiration"?"date":field==="usages"?"number":"text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className={`mt-1 px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 ${
                            errors[field] 
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                              : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          } text-gray-900 dark:text-gray-200`}
                          placeholder={field==="institution"?"اسم المؤسسة/المديرية":field==="manager"?"اسم المدير":"غير محدود"}
                        />
                      </label>
                      {errors[field] && (
                        <motion.p 
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors[field]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div 
                    className="flex justify-between items-center mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.button
                      onClick={handleCreateLink}
                      className="bg-green-600 text-white px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#166534"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      إنشاء الرابط
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowModal(false);
                        setErrors({});
                      }}
                      className="bg-gray-200 dark:bg-gray-800 text-green-600 dark:text-green-500 border border-green-600 dark:border-green-500 px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700 hover:text-white"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#166534",
                        color: "#fff"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      إلغاء
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* محتوى طلبات التسجيل */}
      {activeTab === "requests" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="flex gap-4 mb-4 justify-between items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <motion.button 
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              whileHover={{ 
                scale: 1.05,
                x: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCheck /> قبول الكل ({requestsData.length})
            </motion.button>
            <motion.button 
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              whileHover={{ 
                scale: 1.05,
                x: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash /> حذف الكل
            </motion.button>
          </motion.div>

          <motion.div 
            className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <table className="w-full text-right border-collapse rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-2 font-bold">الاسم</th>
                  <th className="px-4 py-2 font-bold">البريد الإلكتروني</th>
                  <th className="px-4 py-2 font-bold">الاستخدامات</th>
                  <th className="px-4 py-2 font-bold">التاريخ</th>
                  <th className="px-4 py-2 font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {requestsData.map((request, index) => (
                  <motion.tr 
                    key={index} 
                    className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: 0.6 + index * 0.1 
                    }}
                    whileHover={{ 
                      x: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <td className="px-4 py-3">{request.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{request.email}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{request.usages}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{request.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3 justify-start">
                        <motion.button 
                          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaCheck />
                        </motion.button>
                        <motion.button 
                          className="text-red-500 hover:text-red-700"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvitationsPage;