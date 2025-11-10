import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaSchool, FaInfoCircle, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const AboutSection = ({ 
  schoolData, 
  isEditing, 
  editedData, 
  setEditedData,
  handleInputChange,
  handleContactInfoChange,
  saveChanges,
  cancelEditing,
  saving
}) => {
  const [errors, setErrors] = useState({});

  // Validate contact information
  const validateContactInfo = () => {
    const newErrors = {};
    
    // Email validation
    if (editedData.contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedData.contactInfo.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    // Phone validation (Saudi format)
    if (editedData.contactInfo.phone && !/^(\+966|0)?[0-9]{9,10}$/.test(editedData.contactInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }
    
    // Website validation
    if (editedData.contactInfo.website && !/^https?:\/\/.+$/.test(editedData.contactInfo.website)) {
      newErrors.website = 'رابط الموقع غير صحيح';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate on change
  useEffect(() => {
    if (isEditing) {
      validateContactInfo();
    }
  }, [editedData.contactInfo.email, editedData.contactInfo.phone, editedData.contactInfo.website]);

  const handleSave = () => {
    if (validateContactInfo()) {
      saveChanges();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FaSchool className="text-blue-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">عن المدرسة</h2>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {isEditing ? (
          // Edit mode
          <div className="space-y-8">
            {/* School Basic Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaInfoCircle className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">المعلومات الأساسية</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    اسم المدرسة
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    placeholder="اسم المدرسة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    المنطقة
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={editedData.region}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    placeholder="المنطقة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    النوع
                  </label>
                  <select
                    name="type"
                    value={editedData.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="ابتدائية">ابتدائية</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="ثانوية">ثانوية</option>
                    <option value="تعليم خاص">تعليم خاص</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الجنس
                  </label>
                  <select
                    name="gender"
                    value={editedData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="بنين">بنين</option>
                    <option value="بنات">بنات</option>
                    <option value="مختلط">مختلط</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الملكية
                  </label>
                  <select
                    name="ownership"
                    value={editedData.ownership}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="خاصة">خاصة</option>
                    <option value="حكومية">حكومية</option>
                    <option value="مختلطة">مختلطة</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    سنة التأسيس
                  </label>
                  <input
                    type="text"
                    name="establishedYear"
                    value={editedData.establishedYear}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    placeholder="سنة التأسيس"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* School Description */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaInfoCircle className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">وصف المدرسة</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  placeholder="وصف المدرسة"
                />
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaPhone className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">معلومات الاتصال</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الهاتف
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.contactInfo.phone}
                      onChange={handleContactInfoChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-900 dark:text-white"
                      placeholder="+966 11 123 4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={editedData.contactInfo.email}
                      onChange={handleContactInfoChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-900 dark:text-white"
                      placeholder="info@school.edu.sa"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الموقع الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaGlobe />
                    </div>
                    <input
                      type="url"
                      name="website"
                      value={editedData.contactInfo.website}
                      onChange={handleContactInfoChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-900 dark:text-white"
                      placeholder="https://www.school.edu.sa"
                    />
                  </div>
                  {errors.website && (
                    <p className="text-red-500 text-xs mt-1">{errors.website}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  العنوان
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={editedData.location}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-900 dark:text-white"
                    placeholder="العنوان الكامل"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleSave}
                disabled={saving || Object.keys(errors).length > 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  saving || Object.keys(errors).length > 0
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <FaSave className="ml-2" />
                {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
              <button
                onClick={cancelEditing}
                className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <FaTimes className="ml-2" />
                إلغاء
              </button>
            </motion.div>
          </div>
        ) : (
          // Display mode
          <div className="space-y-8">
            {/* School Basic Information */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaInfoCircle className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">المعلومات الأساسية</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">اسم المدرسة</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">المنطقة</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.region}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">سنة التأسيس</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.establishedYear}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">النوع</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.type}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">الجنس</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.gender}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">الملكية</h4>
                    <p className="text-gray-900 dark:text-white">{schoolData.ownership}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* School Description */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaInfoCircle className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">وصف المدرسة</h3>
              </div>
              
              <p className="text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
                {schoolData.description}
              </p>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                <FaPhone className="text-blue-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">معلومات الاتصال</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <FaPhone className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">الهاتف</h4>
                      <p className="text-gray-900 dark:text-white">{schoolData.contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <FaEnvelope className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">البريد الإلكتروني</h4>
                      <p className="text-gray-900 dark:text-white">{schoolData.contactInfo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <FaGlobe className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">الموقع الإلكتروني</h4>
                      <p className="text-gray-900 dark:text-white">{schoolData.contactInfo.website}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mt-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">العنوان</h4>
                      <p className="text-gray-900 dark:text-white">{schoolData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutSection;