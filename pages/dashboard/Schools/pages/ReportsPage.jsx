import React, { useState } from "react";
import { FaSearch, FaFileAlt } from "react-icons/fa";

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const reports = [
    { id: 1, name: "تحسين خدمات المرافق", supervisor: "أحمد علي", date: "July 1, 2024", status: "Done", actions: "تم الاستلام" },
    { id: 2, name: "الحاجة لأجهزة حاسوب جديدة", supervisor: "أحمد علي", date: "July 25, 2024", status: "Progress", actions: "لم يتم الإرسال" },
  ];

  const urgentReports = [
    { id: 1, title: "تحسين الأداء", teacher: "خالد يوسف", date: "July 1, 2024", status: "Done", actions: "تم التسليم" },
    { id: 2, title: "تعديل على ترتيب الحصص", teacher: "محمد علي", date: "July 25, 2024", status: "Progress", actions: "يتم التحميل" },
    { id: 3, title: "تحسين خدمات المرافق", teacher: "أمل علي", date: "August 1, 2024", status: "Progress", actions: "يتم التحميل" },
    { id: 4, title: "تعديل خدمات المرافق", teacher: "أحمد علي", date: "August 22, 2024", status: "Pending", actions: "_" },
  ];

  const statusClasses = {
    Done: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#F0FEED] text-[#259800]",
    Progress: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#EDF5FE] text-[#3083FF]",
    Pending: "inline-flex items-center gap-1 px-2 py-[2px] rounded-full text-xs font-semibold bg-[#FEEDED] text-[#DC2626]",
  };

  const renderTable = (data, columns, keys) => (
    <div className="mt-4">
      {/* Header */}
      <div className={`grid grid-cols-${columns.length} bg-gray-100 dark:bg-gray-800 p-2 text-right font-semibold text-gray-500 dark:text-gray-200 rounded-t-lg`}>
        {columns.map((col, idx) => (
          <div key={idx}>{col}</div>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-2 p-2">
        {data
          .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
          .map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 bg-white dark:bg-gray-700 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
            >
              {keys.map((key, idx) =>
                key === "status" ? (
                  <div key={idx}>
                    <span className={statusClasses[item.status]}>
                      {item.status}
                      <span className="w-2 h-2 rounded-full bg-current inline-block"></span>
                    </span>
                  </div>
                ) : (
                  <div key={idx} className="text-gray-500 dark:text-gray-300">{item[key]}</div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );

  const totalPages = 10;
  const pages = [1, 2, 3, 4, 5, "dots", totalPages];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8" dir="rtl">
      {/* Header + Filter */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">التقارير</h1>
          <p className="text-gray-500 dark:text-gray-400">عرض وإدارة تقاريرك</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-400 text-sm">
            Filter by <span className="text-[#64C8CC]">dates</span> | <span className="text-[#64C8CC]">Status</span>
          </span>

          <div className="relative w-10 h-8">
            <input
              type="text"
              placeholder=""
              className="w-full h-full border border-gray-300 dark:border-gray-600 rounded text-sm pl-2 pr-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-black dark:text-gray-200" />
          </div>
        </div>
      </div>

      {/* Table 1: المستلمة */}
      <h2 className="text-right text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">التقارير المستلمة</h2>
      {renderTable(
        reports,
        ["اسم التقرير", "المشرف", "التاريخ", "حالة التقرير", "الاستلام"],
        ["name", "supervisor", "date", "status", "actions"]
      )}
       {/* Pagination */}
      <div className="relative flex items-center px-4 py-2 mt-4">
        <div className="absolute left-0 flex items-center gap-2">
          <span className="text-sm text-slate-950 dark:text-gray-200">Row</span>
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-slate-950 dark:text-gray-200">Show</span>
        </div>

        <div className="flex justify-center items-center gap-1 w-full">
          <button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            &lt;
          </button>

          {pages.map((page, idx) =>
            page === "dots" ? (
              <span key={idx} className="px-2 dark:text-gray-200">..</span>
            ) : (
              <button
                key={idx}
                className={`px-2 py-1 ${currentPage === page ? "bg-[#64C8CC] text-white" : "dark:text-gray-200"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Table 2: المرسلة */}
      <h2 className="text-right text-xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">التقارير المرسلة</h2>
      {renderTable(
        urgentReports,
        ["اسم التقرير", "المعلم", "التاريخ", "حالة التقرير", "التسليم"],
        ["title", "teacher", "date", "status", "actions"]
      )}

      {/* Pagination */}
      <div className="relative flex items-center px-4 py-2 mt-4">
        <div className="absolute left-0 flex items-center gap-2">
          <span className="text-sm text-slate-950 dark:text-gray-200">Row</span>
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-slate-950 dark:text-gray-200">Show</span>
        </div>

        <div className="flex justify-center items-center gap-1 w-full">
          <button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            &lt;
          </button>

          {pages.map((page, idx) =>
            page === "dots" ? (
              <span key={idx} className="px-2 dark:text-gray-200">..</span>
            ) : (
              <button
                key={idx}
                className={`px-2 py-1 ${currentPage === page ? "bg-[#64C8CC] text-white" : "dark:text-gray-200"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            className="px-2 py-1 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-200"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-6 mb-8 mt-10">
        {/* Card 1 */}
        <div className="flex-[2] bg-[#F9F9F9] dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-right text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">التقارير المرسلة</h3>
          <div className="border-b border-gray-300 dark:border-gray-600 mb-4"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#64C8CC"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset="125.6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-100">50%</span>
              </div>
            </div>

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
                <span className="text-gray-700 dark:text-gray-200">50</span>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#64C8CC]"></div>
                  <span className="text-gray-700 dark:text-gray-200">قيد التحميل</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200">50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <h3 className="text-right text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">التقارير المنجزة</h3>
          <div className="flex items-center justify-end p-5 border border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="flex flex-col items-end gap-2">
              <FaFileAlt className="text-2xl text-gray-500 dark:text-gray-200" />
              <span className="text-sm text-gray-600 dark:text-gray-300">reports</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">report</span>
                <span className="text-sm text-[#64C8CC]">14/30</span>
                <div className="w-32 h-2 bg-[#64C8CC] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 dark:bg-gray-500 w-[46.6%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <h3 className="text-right text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">التقارير العاجلة</h3>
          <div className="flex items-center justify-end p-5 border border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="flex flex-col items-end gap-2">
              <FaFileAlt className="text-2xl text-gray-500 dark:text-gray-200" />
              <span className="text-sm text-gray-600 dark:text-gray-300">reports</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">report</span>
                <span className="text-sm text-[#64C8CC]">10/30</span>
                <div className="w-32 h-2 bg-[#64C8CC] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 dark:bg-gray-500 w-[33.3%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
