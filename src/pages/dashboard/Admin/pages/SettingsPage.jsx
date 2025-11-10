import React, { useState } from "react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    siteDescription: "",
    smtpServer: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    smtpEncryption: "",
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    minPasswordLength: "",
    sessionTimeout: "",
    securityPhone: "",
    securityDescription: "",
    theme: "",
    language: "",
    dateFormat: "",
    timeFormat: "",
    maintenanceEmailNotifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("تم حفظ الإعدادات:", formData);
      setIsSaving(false);
      alert("تم حفظ الإعدادات بنجاح!");
    }, 1000);
  };

  const ToggleSwitch = ({ name, checked, onChange }) => (
    <motion.label
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 
        dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 
        peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
      ></div>
    </motion.label>
  );

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700"
      >
        {/* الهيدر */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b-2">
          <div className="flex space-x-3 space-x-reverse mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-md disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin ml-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري الحفظ...
                </>
              ) : (
                <>حفظ التغييرات</>
              )}
            </motion.button>
          </div>

          <div>
            <h1 className="text-3xl text-right font-bold text-gray-900 dark:text-white mb-2">
              إعدادات النظام
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-right">
              قم بتخصيص إعدادات النظام حسب احتياجاتك
            </p>
          </div>
        </div>

        {/* الإعدادات العامة */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-right">
          الإعدادات العامّة
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">البريد الإلكتروني للتواصل</label>
            <input name="contactEmail" placeholder="support@ruaa.edu.sa" className="border p-3 rounded-lg w-full placeholder-black" value={formData.contactEmail} onChange={handleChange} />
          </div>
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">اسم الموقع</label>
            <input name="siteName" placeholder="منصة رؤى التعليم" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.siteName} onChange={handleChange} />
          </div>
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">وصف الموقع</label>
            <input name="siteDescription" placeholder="منصة شاملة لإدارة المدارس والطلاب والمعلمين" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.siteDescription} onChange={handleChange} />
          </div>
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">رقم هاتف للتواصل</label>
            <input name="contactPhone" placeholder="+972 59 222 222 222" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.contactPhone} onChange={handleChange} />
          </div>
        </div>

        {/* إعدادات البريد الإلكتروني */}
<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-right">
  إعدادات البريد الإلكتروني
</h2>

<div className="grid md:grid-cols-2 gap-4 mb-4">
  <div className="flex flex-col text-right">
    <label className="mb-1 text-gray-400 dark:text-gray-300">STMP منفذ</label>
    <input
      name="smtpPort"
      placeholder="587"
      className="border p-3 rounded-lg w-full placeholder-black  text-right"
      value={formData.smtpPort}
      onChange={handleChange}
    />
  </div>
  <div className="flex flex-col text-right">
    <label className="mb-1 text-gray-400 dark:text-gray-300">STMP خادم</label>
    <input
      name="smtpServer"
      placeholder="smtp.gmail.com"
      className="border p-3 rounded-lg w-full placeholder-black  text-right"
      value={formData.smtpServer}
      onChange={handleChange}
    />
  </div>
  
</div>

<div className="grid md:grid-cols-2 gap-4 mb-4">
  
  <div className="flex flex-col text-right">
    <label className="mb-1 text-gray-400 dark:text-gray-300">كلمة المرور</label>
    <input
      type="password"
      name="smtpPassword"
      placeholder="اتركه فارغًا للحفاظ على كلمة المرور"
      className="border p-3 rounded-lg w-full placeholder-black text-right"
      value={formData.smtpPassword}
      onChange={handleChange}
    />
  </div>
  <div className="flex flex-col text-right">
    <label className="mb-1 text-gray-400 dark:text-gray-300">اسم المستخدم</label>
    <input
      name="smtpUser"
      placeholder="noreply@ruaa.edu.sa"
      className="border p-3 rounded-lg w-full placeholder-black  text-right"
      value={formData.smtpUser}
      onChange={handleChange}
    />
  </div>
</div>

<div className="grid md:grid-cols-1 gap-4 mb-8">
  <div className="flex flex-col text-right md:justify-end md:items-end w-full md:w-1/2 ml-auto">
    <label className="mb-1 text-gray-400 dark:text-gray-300">نوع التشفير</label>
    <input
      name="smtpEncryption"
      placeholder="TLS"
      className="border p-3 rounded-lg w-full placeholder-black  text-right"
      value={formData.smtpEncryption}
      onChange={handleChange}
    />
  </div>
</div>


{/* إعدادات الإشعارات */}
<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-right">
  إعدادات الإشعارات
</h2>

<div className="grid md:grid-cols-2 gap-4 mb-4">
  {[
    { name: "smsNotifications", label: "إشعارات الرسائل القصيرة", text: "إرسال إشعارات عبر الرسائل القصيرة " },
        { name: "emailNotifications", label: "إشعارات البريد الإلكتروني", text: "إرسال إشعارات عبر البريد الإلكتروني" },

  ].map((item) => (
    <div key={item.name} className="flex flex-col text-right">
      <label className="mb-2 text-gray-400 dark:text-gray-200">{item.label}</label>
      <div className="flex items-center justify-between border p-3 rounded-lg w-full">
                <ToggleSwitch name={item.name} checked={formData[item.name]} onChange={handleChange} />

        <div className="flex items-center gap-3">
          <span className="text-black dark:text-gray-200 text-right">{item.text}</span>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="flex justify-end mb-8">
  <div className="flex flex-col text-right w-full md:w-1/2 ml-auto">
    <label className="mb-2 text-gray-400 dark:text-gray-200">إشعارات داخل التطبيق</label>
    <div className="flex items-center justify-between border p-3 rounded-lg w-full">
            <ToggleSwitch name="inAppNotifications" checked={formData.inAppNotifications} onChange={handleChange} />

      <div className="flex items-center gap-3">
        <span className="text-black dark:text-gray-200 text-right">
          عرض الإشعارات داخل التطبيق
        </span>
      </div>
    </div>
  </div>
</div>



        {/* إعدادات الأمان */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-right">
          إعدادات الأمان
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">مهلة الجلسة بالدقائق</label>
            <input name="sessionTimeout" placeholder="30" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.sessionTimeout} onChange={handleChange} />
          </div>
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">الحد الأدنى لطول كلمة المرور</label>
            <input name="minPasswordLength" placeholder="8" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.minPasswordLength} onChange={handleChange} />
          </div>
         
          <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">وصف الموقع</label>
            <input name="securityDescription" placeholder="منصة شاملة لإدارة المدارس والطلاب والمعلمين" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.securityDescription} onChange={handleChange} />
          </div>
           <div className="flex flex-col text-right">
            <label className="mb-1 text-gray-400 dark:text-gray-300">رقم هاتف للتواصل</label>
            <input name="securityPhone" placeholder="+972 59 222 222 222" className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData.securityPhone} onChange={handleChange} />
          </div>
        </div>

        {/* إعدادات المظهر */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-right">
          إعدادات المظهر
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { name: "language", label: "اللغة", placeholder: "اللغة العربية" },
                        { name: "theme", label: " السمة", placeholder: "فاتح" },
            { name: "timeFormat", label: "تنسيق الوقت", placeholder: " ساعة 24 " },

            { name: "dateFormat", label: "تنسيق التاريخ", placeholder: "DD/MM/YYYY" },
          ]
            .map((f) => (
            <div key={f.name} className="flex flex-col text-right">
              <label className="mb-1 text-gray-400 dark:text-gray-300">{f.label}</label>
              <input name={f.name} placeholder={f.placeholder} className="border p-3 rounded-lg w-full placeholder-black text-right" value={formData[f.name]} onChange={handleChange} />
            </div>
          ))}
        </div>

        {/* إعدادات الصيانة */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-right">
          إعدادات الصيانة
        </h2>
        <div className="flex flex-col text-right mb-8">
  <label className="mb-2 text-gray-400 dark:text-gray-200">إشعارات البريد الإلكتروني</label>
  <div className="flex justify-between items-center border p-3 rounded-lg">
    <ToggleSwitch
      name="maintenanceEmailNotifications"
      checked={formData.maintenanceEmailNotifications}
      onChange={handleChange}
    />
    <div className="flex items-center gap-3">
      <span className="text-black dark:text-gray-200 text-right">
        إرسال إشعارات  عبر البريد الإلكتروني
      </span>
    </div>
    
  </div>
</div>


        {/* زر الحفظ */}
        <div className="flex justify-start border-t pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-md"
          >
            حفظ التغييرات
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
