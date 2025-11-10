import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaTrash, FaEdit, FaCopy, FaPlus, FaCheck, FaTimes ,FaLink} from "react-icons/fa";
import { Card, Loading } from '../components/ui';


// ======= StatsCard Component =======
const StatsCard = ({ title, value, icon: Icon, color, loading = false, suffix }) => {
  const colorClasses = {
    blue: 'text-sky-700',
    success: 'text-green-500', 
    danger: 'text-green-200',
    info: 'text-yellow-500',
    purple:'text-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden h-full group bg-[#F9F9FA] dark:bg-gray-700 transition-colors">
        <div className="absolute inset-0 bg-slate-200 dark:bg-gray-600 opacity-30 group-hover:opacity-70 transition-opacity" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-end mb-2">
            <div className={`${colorClasses[color]}`}>
              <Icon className="text-2xl" />
            </div>
          </div>
          <div className="space-y-1 mt-auto text-center">
            <p
              className="text-lg text-gray-900 dark:text-white font-bold truncate overflow-hidden whitespace-nowrap"
              title={title}
            >
              {title}
            </p>
            <h3
              className="text-sm font-thin text-gray-500 dark:text-gray-300 truncate overflow-hidden whitespace-nowrap"
              title={value}
            >
              {loading ? <Loading type="spinner" size="sm" /> : `${value} ${suffix || ''}`}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
const InvitationsPage = () => {
  const [activeTab, setActiveTab] = useState("links");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    institution: "",
    expiration: "",
    usages: "",
  });

  const invitationsData = [
    { school: "مديريّة شرق غزة", status: "نشط", usages: "1/1", expiration: "July 1, 2024" },
  ];

  const requestsData = [
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
    { name: "قاسم عبد العال", email: "re@gmail.com", usages: "1/1", date: "July 1, 2024" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateLink = () => {
    console.log("إنشاء الرابط:", formData);
    setShowModal(false);
    setFormData({ institution: "", manager: "", expiration: "", usages: "" });
  };

  return (
    <motion.div
      className="p-6 text-right min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"
      dir="rtl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* العنوان */}
      <div className="flex flex-col mb-6">
        <h1 className="text-xl font-extrabold">دعوات  المشرفيين</h1>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
          قم بإنشاء وإدارة روابط الدعوة ومراجعة طلبات المشرفيين المعلقة
        </span>
      </div>
<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatsCard title="إجمالي الروابط" value={ 4}  icon={FaLink} color="purple"  />
  <StatsCard title=" الروابط النشطة" value={3} icon={FaLink} color="danger" />
  <StatsCard title=" الروابط المنتهية" value={1} icon={FaLink} color="info" />
  <StatsCard title="  الروابط المستخدمة" value={0}  icon={FaLink} color="success" />
</motion.div>
      {/* التبويبات */}
      <div className="mb-6 border-b-2 border-gray-300 dark:border-gray-700">
        <div className="flex gap-4 justify-start">
          <button
            onClick={() => setActiveTab("links")}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "links"
                ? "text-green-600 dark:text-green-500 border-b-2 border-green-600 dark:border-green-500 -mb-[2px]"
                : "text-gray-800 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            }`}
          >
            روابط الدعوة
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === "requests"
                ? "text-green-600 dark:text-green-500 border-b-2 border-green-600 dark:border-green-500 -mb-[2px]"
                : "text-gray-800 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            }`}
          >
            طلبات تسجيل مشرفيين  ({requestsData.length})
          </button>
        </div>
      </div>

      {/* محتوى روابط الدعوة */}
      {activeTab === "links" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <FaPlus /> رابط دعوة مشرف  جديد
            </button>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <FaTrash /> حذف الكل
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
            <table className="w-full text-right border-collapse rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-2 font-bold">المديريّة/المؤسسة</th>
                  <th className="px-4 py-2 font-bold">الحالة</th>
                  <th className="px-4 py-2 font-bold">الاستخدامات</th>
                  <th className="px-4 py-2 font-bold">تاريخ الانتهاء</th>
                  <th className="px-4 py-2 font-bold">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {invitationsData.map((inv, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
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
                        <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                        <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                        <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"><FaCopy /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* النافذة المنبثقة */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md text-right text-gray-900 dark:text-gray-200"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">إنشاء رابط دعوة مشرف جديد</h2>
                  <button onClick={() => setShowModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <FaTimes />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {["institution","expiration","usages"].map((field)=>(

                    <label key={field} className="flex flex-col">
                      {field === "institution" ? "المؤسسة/المديريّة" : field === "expiration" ? "تاريخ الانتهاء (اختياري)" : "عدد الاستخدامات المسموحة (اختياري)"}
                      <input
                        type={field==="expiration"?"date":field==="usages"?"number":"text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="mt-1 px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
                        placeholder={field==="institution"?"اسم المؤسسة/المديرية":"غير محدود"}
                      />
                    </label>
                  ))}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={handleCreateLink}
                      className="bg-green-600 text-white px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700"
                    >
                      إنشاء الرابط
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className=" dark:bg-gray-800 text-green-600 dark:text-green-500 border border-green-600 dark:border-green-500 px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700 hover:text-white"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* محتوى طلبات التسجيل */}
      {activeTab === "requests" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="flex gap-4 mb-4 justify-between items-center">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <FaCheck /> قبول الكل ({requestsData.length})
            </button>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <FaTrash /> حذف الكل
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
            <table className="w-full text-right border-collapse rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-200">
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-4 py-2 font-bold">الاسم</th>
                  <th className="px-4 py-2 font-bold">البريد</th>
                  <th className="px-4 py-2 font-bold">رقم الاستخدام</th>
                  <th className="px-4 py-2 font-bold">تاريخ الطلب</th>
                  <th className="px-4 py-2 font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {requestsData.map((req, index) => (
                  <tr key={index} className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-4 py-2">{req.name}</td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{req.email}</td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{req.usages}</td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{req.date}</td>
                    <td className="px-4 py-2 flex gap-2 justify-start">
                      <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                      <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"><FaCheck /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvitationsPage;
