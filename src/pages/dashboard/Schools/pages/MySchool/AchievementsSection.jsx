import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrophy, FaEdit, FaTrash, FaCalendarAlt, FaImage } from 'react-icons/fa';

const AchievementsSection = ({ 
  schoolData, 
  isEditing, 
  editedData, 
  setEditedData,
  newAchievement,
  setNewAchievement,
  addAchievement,
  updateAchievement,
  deleteAchievement
}) => {
  const [editingAchievementId, setEditingAchievementId] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState({ title: '', description: '', image: '', date: '' });
  const [errors, setErrors] = useState({});

  // Validate achievement form
  const validateAchievement = (achievement) => {
    const newErrors = {};
    
    if (!achievement.title.trim()) {
      newErrors.title = 'عنوان الإنجاز مطلوب';
    }
    
    if (!achievement.description.trim()) {
      newErrors.description = 'وصف الإنجاز مطلوب';
    }
    
    if (achievement.date && !/^\d{4}-\d{2}-\d{2}$/.test(achievement.date)) {
      newErrors.date = 'تاريخ غير صحيح';
    }
    
    // Image URL validation
    if (achievement.image && !/^https?:\/\/.+$/.test(achievement.image)) {
      newErrors.image = 'رابط الصورة غير صحيح';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle achievement changes
  const handleAchievementChange = (field, value) => {
    setEditingAchievement(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle new achievement changes
  const handleNewAchievementChange = (field, value) => {
    setNewAchievement(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Start editing an achievement
  const startEditingAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setEditingAchievementId(achievement.id);
  };

  // Save edited achievement
  const saveEditedAchievement = async () => {
    if (validateAchievement(editingAchievement)) {
      const updatedAchievement = await updateAchievement(editingAchievementId, editingAchievement);
      if (updatedAchievement) {
        setEditingAchievementId(null);
        setEditingAchievement({ title: '', description: '', image: '', date: '' });
      }
    }
  };

  // Cancel editing
  const cancelEditingAchievement = () => {
    setEditingAchievementId(null);
    setEditingAchievement({ title: '', description: '', image: '', date: '' });
    setErrors({});
  };

  // Add new achievement
  const handleAddAchievement = async () => {
    if (validateAchievement(newAchievement)) {
      const addedAchievement = await addAchievement(newAchievement);
      if (addedAchievement) {
        setNewAchievement({ title: '', description: '', image: '', date: '' });
        setEditingAchievementId(null);
      }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaTrophy className="text-yellow-500 text-xl" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">الإنجازات</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingAchievementId('new')}
              className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              <FaPlus className="ml-1" />
              <span>إضافة إنجاز جديد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add new achievement form */}
      <AnimatePresence>
        {editingAchievementId === 'new' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                إضافة إنجاز جديد
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عنوان الإنجاز
                </label>
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => handleNewAchievementChange('title', e.target.value)}
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                  placeholder="عنوان الإنجاز"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الوصف
                </label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => handleNewAchievementChange('description', e.target.value)}
                  rows="3"
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                  placeholder="وصف الإنجاز"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  التاريخ
                </label>
                <input
                  type="date"
                  value={newAchievement.date || ''}
                  onChange={(e) => handleNewAchievementChange('date', e.target.value)}
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  رابط الصورة (اختياري)
                </label>
                <input
                  type="text"
                  value={newAchievement.image}
                  onChange={(e) => handleNewAchievementChange('image', e.target.value)}
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                  placeholder="رابط الصورة"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleAddAchievement}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  حفظ الإنجاز
                </button>
                <button
                  onClick={() => {
                    setNewAchievement({ title: '', description: '', image: '', date: '' });
                    setEditingAchievementId(null);
                    setErrors({});
                  }}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements List */}
      <div className="p-6">
        {editedData.achievements.length === 0 ? (
          <div className="text-center py-8">
            <FaTrophy className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {isEditing ? 'لا توجد إنجازات بعد. أضف إنجازًا جديدًا.' : 'لا توجد إنجازات لعرضها.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {editedData.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  {editingAchievementId === achievement.id ? (
                    // Edit mode
                    <div className="p-4 space-y-3">
                      <input
                        type="text"
                        value={editingAchievement.title}
                        onChange={(e) => handleAchievementChange('title', e.target.value)}
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white font-bold`}
                        placeholder="عنوان الإنجاز"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title}</p>
                      )}
                      
                      <textarea
                        value={editingAchievement.description}
                        onChange={(e) => handleAchievementChange('description', e.target.value)}
                        rows="3"
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm`}
                        placeholder="وصف الإنجاز"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs">{errors.description}</p>
                      )}
                      
                      <input
                        type="date"
                        value={editingAchievement.date || ''}
                        onChange={(e) => handleAchievementChange('date', e.target.value)}
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs">{errors.date}</p>
                      )}
                      
                      <input
                        type="text"
                        value={editingAchievement.image}
                        onChange={(e) => handleAchievementChange('image', e.target.value)}
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm`}
                        placeholder="رابط الصورة"
                      />
                      {errors.image && (
                        <p className="text-red-500 text-xs">{errors.image}</p>
                      )}
                      
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditedAchievement}
                          className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={cancelEditingAchievement}
                          className="flex-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display mode
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <FaTrophy className="text-yellow-500" />
                          <h3 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                        </div>
                        {isEditing && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => startEditingAchievement(achievement)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteAchievement(achievement.id)}
                              className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {achievement.description}
                      </p>
                      
                      {achievement.date && (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
                          <FaCalendarAlt />
                          <span>{achievement.date}</span>
                        </div>
                      )}
                      
                      {achievement.image && (
                        <div className="mt-3">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 inline-block">
                            <img 
                              src={achievement.image} 
                              alt={achievement.title} 
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;