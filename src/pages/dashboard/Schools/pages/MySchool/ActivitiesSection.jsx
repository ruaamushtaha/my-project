import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaImages, FaEdit, FaTrash, FaTimes, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ActivitiesSection = ({ 
  schoolData, 
  isEditing, 
  editedData, 
  setEditedData,
  newActivity,
  setNewActivity,
  addActivity,
  updateActivity,
  deleteActivity
}) => {
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editingActivity, setEditingActivity] = useState({ title: '', description: '', images: [], location: '', date: '' });
  const [errors, setErrors] = useState({});

  // Validate activity form
  const validateActivity = (activity) => {
    const newErrors = {};
    
    if (!activity.title.trim()) {
      newErrors.title = 'عنوان النشاط مطلوب';
    }
    
    if (!activity.description.trim()) {
      newErrors.description = 'وصف النشاط مطلوب';
    }
    
    if (activity.date && !/^\d{4}-\d{2}-\d{2}$/.test(activity.date)) {
      newErrors.date = 'تاريخ غير صحيح';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle activity changes
  const handleActivityChange = (field, value) => {
    setEditingActivity(prev => ({
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

  // Handle new activity changes
  const handleNewActivityChange = (field, value) => {
    setNewActivity(prev => ({
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

  // Add image to new activity
  const addImageToNewActivity = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewActivity(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image from new activity
  const removeImageFromNewActivity = (index) => {
    setNewActivity(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Add image to editing activity
  const addImageToEditingActivity = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingActivity(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image from editing activity
  const removeImageFromEditingActivity = (index) => {
    setEditingActivity(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Start editing an activity
  const startEditingActivity = (activity) => {
    setEditingActivity(activity);
    setEditingActivityId(activity.id);
  };

  // Save edited activity
  const saveEditedActivity = async () => {
    if (validateActivity(editingActivity)) {
      const updatedActivity = await updateActivity(editingActivityId, editingActivity);
      if (updatedActivity) {
        setEditingActivityId(null);
        setEditingActivity({ title: '', description: '', images: [], location: '', date: '' });
      }
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingActivityId(null);
    setEditingActivity({ title: '', description: '', images: [], location: '', date: '' });
    setErrors({});
  };

  // Add new activity
  const handleAddActivity = async () => {
    if (validateActivity(newActivity)) {
      const addedActivity = await addActivity(newActivity);
      if (addedActivity) {
        setNewActivity({ title: '', description: '', images: [], location: '', date: '' });
        setEditingActivityId(null);
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
            <FaImages className="text-blue-500 text-xl" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">الأنشطة والزيارات</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingActivityId('new-form')}
              className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              <FaPlus className="ml-1" />
              <span>إضافة نشاط جديد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add new activity form */}
      <AnimatePresence>
        {editingActivityId === 'new-form' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <FaImages className="text-blue-500" />
                إضافة نشاط جديد
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عنوان النشاط
                </label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => handleNewActivityChange('title', e.target.value)}
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                  placeholder="عنوان النشاط"
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
                  value={newActivity.description}
                  onChange={(e) => handleNewActivityChange('description', e.target.value)}
                  rows="3"
                  className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg px-3 py-2 text-gray-900 dark:text-white`}
                  placeholder="وصف النشاط"
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
                  value={newActivity.date || ''}
                  onChange={(e) => handleNewActivityChange('date', e.target.value)}
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
                  الموقع (اختياري)
                </label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => handleNewActivityChange('location', e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  placeholder="موقع النشاط"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الصور
                </label>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {newActivity.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image} 
                          alt={`Preview ${index}`} 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageFromNewActivity(index)}
                          className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <label className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <FaImages className="ml-2" />
                    <span>إضافة صورة</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={addImageToNewActivity}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleAddActivity}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  حفظ النشاط
                </button>
                <button
                  onClick={() => {
                    setNewActivity({ title: '', description: '', images: [], location: '', date: '' });
                    setEditingActivityId(null);
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

      {/* Activities List */}
      <div className="p-6">
        {editedData.activities.length === 0 ? (
          <div className="text-center py-8">
            <FaImages className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {isEditing ? 'لا توجد أنشطة بعد. أضف نشاطًا جديدًا.' : 'لا توجد أنشطة لعرضها.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {editedData.activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  {editingActivityId === activity.id ? (
                    // Edit mode
                    <div className="p-4 space-y-4">
                      <input
                        type="text"
                        value={editingActivity.title}
                        onChange={(e) => handleActivityChange('title', e.target.value)}
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white font-bold`}
                        placeholder="عنوان النشاط"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs">{errors.title}</p>
                      )}
                      
                      <textarea
                        value={editingActivity.description}
                        onChange={(e) => handleActivityChange('description', e.target.value)}
                        rows="3"
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm`}
                        placeholder="وصف النشاط"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs">{errors.description}</p>
                      )}
                      
                      <input
                        type="date"
                        value={editingActivity.date || ''}
                        onChange={(e) => handleActivityChange('date', e.target.value)}
                        className={`w-full bg-gray-100 dark:bg-gray-700 border ${
                          errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs">{errors.date}</p>
                      )}
                      
                      <input
                        type="text"
                        value={editingActivity.location}
                        onChange={(e) => handleActivityChange('location', e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm"
                        placeholder="موقع النشاط"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الصور
                        </label>
                        
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {editingActivity.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img 
                                  src={image} 
                                  alt={`Preview ${index}`} 
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImageFromEditingActivity(index)}
                                  className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <label className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                            <FaImages className="ml-2" />
                            <span>إضافة صورة</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={addImageToEditingActivity}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditedActivity}
                          className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={cancelEditing}
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
                        <h3 className="font-bold text-gray-900 dark:text-white">{activity.title}</h3>
                        {isEditing && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => startEditingActivity(activity)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteActivity(activity.id)}
                              className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {activity.description}
                      </p>
                      
                      {activity.location && (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-2">
                          <FaMapMarkerAlt />
                          <span>{activity.location}</span>
                        </div>
                      )}
                      
                      {activity.date && (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
                          <FaCalendarAlt />
                          <span>{activity.date}</span>
                        </div>
                      )}
                      
                      {activity.images && activity.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {activity.images.slice(0, 3).map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt={`Activity ${index}`} 
                              className="w-full h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                          ))}
                          {activity.images.length > 3 && (
                            <div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                +{activity.images.length - 3}
                              </span>
                            </div>
                          )}
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

export default ActivitiesSection;