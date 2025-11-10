import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaEdit } from 'react-icons/fa';

const Header = ({ 
  schoolData, 
  isEditing, 
  setIsEditing,
  editedData,
  setEditedData,
  coverPreview,
  setCoverPreview,
  logoPreview,
  setLogoPreview
}) => {
  const coverFileInputRef = useRef(null);
  const logoFileInputRef = useRef(null);

  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target.result);
        setEditedData(prev => ({
          ...prev,
          coverImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
        setEditedData(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80">
        {isEditing ? (
          <div 
            className="w-full h-full bg-gray-200 dark:bg-gray-700 relative cursor-pointer group"
            onClick={() => coverFileInputRef.current?.click()}
          >
            <img 
              src={coverPreview} 
              alt="Cover preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center">
                <FaCamera className="mr-2 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">تغيير صورة الغلاف</span>
              </div>
            </div>
            <input
              type="file"
              ref={coverFileInputRef}
              onChange={handleCoverImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <img 
            src={coverPreview} 
            alt="School cover" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end -mt-16 md:-mt-20">
          {/* Logo */}
          <div className="relative mx-auto md:mx-0">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 w-32 h-32 md:w-40 md:h-40">
              {isEditing ? (
                <div 
                  className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 relative cursor-pointer group"
                  onClick={() => logoFileInputRef.current?.click()}
                >
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white" />
                  </div>
                  <input
                    type="file"
                    ref={logoFileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <img 
                  src={logoPreview} 
                  alt="School logo" 
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
          </div>

          {/* School Info */}
          <div className="flex-1 mt-4 md:mt-0 md:mr-6 text-center md:text-right">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl md:text-3xl font-bold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-gray-900 dark:text-white w-full md:w-auto"
                  />
                ) : (
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {schoolData.name}
                  </h1>
                )}
                
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {isEditing ? (
                      <select
                        name="type"
                        value={editedData.type}
                        onChange={(e) => setEditedData(prev => ({ ...prev, type: e.target.value }))}
                        className="bg-transparent"
                      >
                        <option value="ابتدائية">ابتدائية</option>
                        <option value="متوسطة">متوسطة</option>
                        <option value="ثانوية">ثانوية</option>
                      </select>
                    ) : (
                      schoolData.type
                    )}
                  </span>
                  
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editedData.gender}
                        onChange={(e) => setEditedData(prev => ({ ...prev, gender: e.target.value }))}
                        className="bg-transparent"
                      >
                        <option value="بنين">بنين</option>
                        <option value="بنات">بنات</option>
                        <option value="مختلطة">مختلطة</option>
                      </select>
                    ) : (
                      schoolData.gender
                    )}
                  </span>
                  
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {isEditing ? (
                      <select
                        name="ownership"
                        value={editedData.ownership}
                        onChange={(e) => setEditedData(prev => ({ ...prev, ownership: e.target.value }))}
                        className="bg-transparent"
                      >
                        <option value="خاصة">خاصة</option>
                        <option value="حكومية">حكومية</option>
                        <option value="وكالة الأونروا">وكالة الأونروا</option>
                      </select>
                    ) : (
                      schoolData.ownership
                    )}
                  </span>
                  
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {schoolData.region}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <FaEdit className="ml-2" />
                  {isEditing ? 'إلغاء التعديل' : 'تعديل الملف الشخصي'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;