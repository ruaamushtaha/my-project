import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaUserTie, FaUserShield, FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";

const usersData = {
  all: [
    { name: "أحمد محمد", email: "ahmed@mail.com", role: "أدمن ", status: "نشط" },
    { name: "ليلى محمد", email: "leila@mail.com", role: "مشرف", status: "معلق" },
    { name: "سامي خالد", email: "sami@mail.com", role: "مدير مدرسة", status: "نشط" },
    { name: "منى حسن", email: "mona@mail.com", role: "ولي أمر", status: "معلق" },
  ],
  admin: [
    { name: "أحمد محمد", email: "ahmed@mail.com", role: "أدمن ", status: "نشط" },
  ],
  supervisor: [
    { name: "ليلى علي", email: "leila@mail.com", role: "مشرف", status: "معلق" },
  ],
  schoolManager: [
    { name: "سامي خالد", email: "sami@mail.com", role: "مدير مدرسة", status: "نشط" },
  ],
  parent: [
    { name: "منى حسن", email: "mona@mail.com", role: "ولي أمر", status: "معلق" },
  ],
};

const UsersPage = () => {
  const [currentTable, setCurrentTable] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", phone: "" });

  const getRoleIcon = (role) => {
    const iconClass = "w-4 h-4"; 
    const circleClass = "flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 mx-2 dark:bg-gray-700";

    switch (role) {
      case "أدمن ":
        return <div className={circleClass}><FaUserTie className={`${iconClass} text-black dark:text-white`} /></div>;
      case "مشرف":
        return <div className={circleClass}><FaUserShield className={`${iconClass} text-black dark:text-white`} /></div>;
      case "مدير مدرسة":
        return <div className={circleClass}><FaChalkboardTeacher className={`${iconClass} text-black dark:text-white`} /></div>;
      case "ولي أمر":
        return <div className={circleClass}><FaUserFriends className={`${iconClass} text-black dark:text-white`} /></div>;
      default:
        return null;
    }
  };

  const renderStatus = (status) => {
    const isActive = status === "نشط";
    const bgColor = isActive ? "#F0FEED" : "#FFF7BF";
    const textColor = isActive ? "#259800" : "#72511B";

    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-medium text-sm"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: textColor }}></span>
        {status}
      </div>
    );
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = () => {
    if(newUser.name && newUser.email && newUser.role){
      usersData.all.push({ ...newUser, status: "نشط" });
      setShowModal(false);
      setNewUser({ name: "", email: "", role: "", phone: "" });
    }
  };

  return (
    <div className="p-6 font-cairo bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <button
          className="bg-[#17A34A] hover:bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          إضافة مستخدم جديد
        </button>
      </div>

     <div className="mb-6 border-b-2 border-gray-300 dark:border-gray-700">
  <div className="flex gap-4">
    {[
      { key: "all", label: "جميع المستخدمين" },
      { key: "admin", label: "مديرو النظام " },
      { key: "supervisor", label: "المشرفون" },
      { key: "schoolManager", label: "مديرو المدارس" },
      { key: "parent", label: "أولياء الأمور" },
    ].map((tab) => {
      let selectedColorClass = "";
      if (tab.key === "all" || tab.key === "schoolManager" || tab.key === "parent") {
        selectedColorClass = "text-blue-600 border-blue-600";
      } else if (tab.key === "admin") {
        selectedColorClass = "text-red-600 border-red-600";
      } else if (tab.key === "supervisor") {
        selectedColorClass = "text-green-600 border-green-600";
      }

      return (
        <button
          key={tab.key}
          onClick={() => setCurrentTable(tab.key)}
          className={`px-4 py-2 font-medium transition-colors duration-200 border-b-2 ${
            currentTable === tab.key
              ? `${selectedColorClass} -mb-[2px]`
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
</div>



      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 font-bold">
              <th className="py-2 px-4 border">الاسم</th>
              <th className="py-2 px-4 border">البريد الإلكتروني</th>
              <th className="py-2 px-4 border">الدور</th>
              <th className="py-2 px-4 border">الحالة</th>
              <th className="py-2 px-4 border">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {usersData[currentTable].map((user, index) => (
              <tr key={index} className="text-center border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="py-2 px-4 flex items-center justify-center">
                  {getRoleIcon(user.role)}
                  <span className="mr-2">{user.name}</span>
                </td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{renderStatus(user.status)}</td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md text-gray-900 dark:text-gray-100">
            <h2 className="text-xl font-bold mb-4">إضافة مستخدم جديد</h2>
            
            <label className="block mt-2">الاسم</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              placeholder="اسم المستخدم"
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />

            <label className="block mt-2">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              placeholder="البريد الإلكتروني للمستخدم"
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />

            <label className="block mt-2">الدور</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              <option value="">اختر الدور</option>
              <option value="أدمن ">أدمن  </option>
              <option value="مشرف">مشرف</option>
              <option value="مدير مدرسة">مدير مدرسة</option>
              <option value="ولي أمر">ولي أمر</option>
            </select>

            <label className="block mt-2">رقم الهاتف</label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              placeholder="رقم هاتف المستخدم"
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />

           <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={handleCreateUser}
                      className="bg-green-600 text-white px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700"
                    >
                      إنشاء الرابط
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="border border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 px-8 py-2 text-xl min-w-[180px] rounded-lg hover:bg-green-700 hover:text-white"
                    >
                      إلغاء
                    </button>
                  </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
