// =============================================================================
// Profile Page - Parents Dashboard
// صفحة الملف الشخصي - لوحة تحكم أولياء الأمور
// =============================================================================

import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera,
  FaSave,
  FaTimes,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaCheck,
  FaSchool,
  FaGraduationCap
} from 'react-icons/fa';

import toast from 'react-hot-toast';

// FIXME: The following are placeholder definitions to allow the component to render.
// These should be replaced with actual imports from the project's context and services.
const ParentProfileContext = React.createContext({
  profile: null,
  updateProfile: () => Promise.resolve(),
  updateAvatar: () => Promise.resolve(),
  loading: false,
});

const parentsAPI = {
  getParentProfile: () => Promise.resolve({
    fullName: 'اسم ولي الأمر',
    email: 'parent@example.com',
    phone: '0512345678',
    address: 'الرياض، المملكة العربية السعودية',
    profileImage: 'https://via.placeholder.com/150',
  }),
};

const getChildren = () => Promise.resolve({
  success: true,
  data: [
    { id: 1, name: 'فيصل', profileImage: 'https://via.placeholder.com/150', school: { name: 'مدرسة النهضة', type: 'ابتدائية' } },
    { id: 2, name: 'سارة', profileImage: 'https://via.placeholder.com/150', school: { name: 'مدرسة الأفق', type: 'متوسطة' } },
  ],
});


/**
 * نموذج تحرير الصورة الشخصية
 * Avatar Edit Modal Component
 */
const AvatarEditModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentAvatar);
  const [uploading, setUploading] = useState(false);

  // تحديث المعاينة عند تغيير الملف
  // Update preview when file changes
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(currentAvatar);
    }
  }, [selectedFile, currentAvatar]);

  // معالجة اختيار الملف
  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('يجب أن يكون الملف صورة');
        return;
      }
      // التحقق من حجم الملف (5MB max)
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }
      setSelectedFile(file);
    }
  };

  // معالجة الحفظ
  // Handle save
  const handleSave = async () => {
    if (!selectedFile) {
      toast.error('الرجاء اختيار صورة');
      return;
    }
    
    setUploading(true);
    try {
      // محاكاة رفع الصورة
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      await onSave(selectedFile);
      toast.success('تم تحديث الصورة الشخصية بنجاح');
      onClose();
    } catch (error) {
      toast.error('فشل في تحديث الصورة الشخصية');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* العنوان */}
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              تغيير الصورة الشخصية
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* معاينة الصورة */}
          {/* Image Preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar preview"
                  className="w-full h-full rounded-full object-cover border-4 border-primary-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-primary-500">
                  <FaUser className="text-4xl text-gray-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              اختر صورة بحجم أقل من 5 ميجابايت
            </p>
          </div>

          {/* الأزرار */}
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!selectedFile || uploading}
              className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>جاري الرفع...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>حفظ</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={uploading}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * صفحة الملف الشخصي الرئيسية
 * Main Profile Page Component
 */
const ProfilePage = () => {
  
  const { profile: contextProfile, updateProfile, updateAvatar, loading: contextLoading } = useContext(ParentProfileContext);
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to validate individual fields
  const validateField = (fieldName, value) => {
    let fieldError = '';
    
    switch (fieldName) {
      case 'fullName':
        if (!value || value.trim().length < 3) {
          fieldError = 'الاسم يجب أن يكون 3 أحرف على الأقل';
        } else if (value.trim().length > 50) {
          fieldError = 'الاسم يجب ألا يتجاوز 50 حرفًا';
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          fieldError = 'البريد الإلكتروني غير صالح';
        } else if (value.length > 100) {
          fieldError = 'البريد الإلكتروني طويل جدًا';
        }
        break;
        
      case 'phone':
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        if (!value || !phoneRegex.test(value)) {
          fieldError = 'رقم الهاتف غير صالح (يجب أن يكون بين 10-15 رقمًا)';
        }
        break;
        
      case 'address':
        if (!value) {
          fieldError = 'العنوان مطلوب';
        } else if (value.length < 5) {
          fieldError = 'العنوان يجب أن يكون 5 أحرف على الأقل';
        } else if (value.length > 200) {
          fieldError = 'العنوان طويل جدًا';
        }
        break;
        
      default:
        break;
    }
    
    // Update errors state
    if (fieldError) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    } else if (errors[fieldName]) {
      // Remove error if it was fixed
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Always fetch directly to ensure we have the latest data
        const profileData = await parentsAPI.getParentProfile();
        
        setProfile(profileData);
        setOriginalProfile({ ...profileData });
        setAvatarPreview(profileData.profileImage);
        console.log('ProfilePage loaded profile data. Profile image:', profileData.profileImage);
        
        // Fetch children data
        const childrenResponse = await getChildren();
        if (childrenResponse.success) {
          setChildren(childrenResponse.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!profile.fullName || profile.fullName.trim().length < 3) {
      newErrors.fullName = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    } else if (profile.fullName.trim().length > 50) {
      newErrors.fullName = 'الاسم يجب ألا يتجاوز 50 حرفًا';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profile.email || !emailRegex.test(profile.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    } else if (profile.email.length > 100) {
      newErrors.email = 'البريد الإلكتروني طويل جدًا';
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    if (!profile.phone || !phoneRegex.test(profile.phone)) {
      newErrors.phone = 'رقم الهاتف غير صالح (يجب أن يكون بين 10-15 رقمًا)';
    }
    
    // Validate address
    if (!profile.address) {
      newErrors.address = 'العنوان مطلوب';
    } else if (profile.address.length < 5) {
      newErrors.address = 'العنوان يجب أن يكون 5 أحرف على الأقل';
    } else if (profile.address.length > 200) {
      newErrors.address = 'العنوان طويل جدًا';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    // Validate all fields
    if (!validateForm()) {
      // Show error message if validation fails
      showErrorMessage('يرجى تصحيح الأخطاء في النموذج قبل الحفظ');
      return;
    }
    
    try {
      setUpdating(true);
      setSuccessMessage(''); // Clear any previous success message
      
      // Start with current profile data
      let finalProfileData = { ...profile };
      console.log('Starting profile update. Current profile image:', profile.profileImage);
      console.log('Avatar preview:', avatarPreview);
      console.log('Original profile image:', originalProfile.profileImage);
      
      // Check if avatar has changed and needs to be uploaded
      if (avatarPreview !== originalProfile.profileImage) {
        console.log('Avatar has changed, uploading new avatar');
        // Upload avatar using context function
        const fileInput = fileInputRef.current;
        if (fileInput && fileInput.files[0]) {
          const formData = new FormData();
          formData.append('avatar', fileInput.files[0]);
          const avatarResponse = await updateAvatar(formData);
          console.log('Avatar upload response:', avatarResponse);
          
          // Update the final profile data with the new avatar URL
          finalProfileData.profileImage = avatarResponse.data.profileImage;
          console.log('Updated finalProfileData with new avatar:', finalProfileData.profileImage);
        }
      } else {
        console.log('Avatar has not changed, skipping upload');
      }
      
      // Update profile data using context function with the final profile data
      console.log('Updating profile with final data:', finalProfileData);
      const updatedProfile = await updateProfile(finalProfileData);
      console.log('Profile update response:', updatedProfile);
      
      // Update local state with returned data
      setOriginalProfile({ ...updatedProfile });
      setProfile(updatedProfile);
      // Also update the avatar preview to match the saved avatar
      setAvatarPreview(updatedProfile.profileImage);
      console.log('Avatar preview updated to:', updatedProfile.profileImage);
      
      // Show success message
      setSuccessMessage('تم حفظ التغييرات بنجاح');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      // Show error message with animation
      showErrorMessage(err.message || 'حدث خطأ أثناء حفظ التغييرات');
    } finally {
      setUpdating(false);
    }
  };

  // Helper functions for showing messages
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showErrorMessage = (message) => {
    // In a real app, you might use a toast notification library
    alert(message);
  };

  const handleCancel = () => {
    // Reset to original profile data
    setProfile({ ...originalProfile });
    setAvatarPreview(originalProfile.profileImage);
    setErrors({});
    setSuccessMessage('');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasChanges = () => {
    if (!profile || !originalProfile) return false;
    return JSON.stringify(profile) !== JSON.stringify(originalProfile) || 
           avatarPreview !== originalProfile.profileImage;
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Avatar file selected:', file.name);
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'يجب أن يكون الملف صورة' }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت' }));
        return;
      }
      
      // Validate image dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        // Clean up object URL
        URL.revokeObjectURL(objectUrl);
        
        // Check minimum dimensions
        if (img.width < 100 || img.height < 100) {
          setErrors(prev => ({ ...prev, avatar: 'حجم الصورة صغير جدًا (يجب أن يكون على الأقل 100×100)' }));
          return;
        }
        
        // Check maximum dimensions (optional)
        if (img.width > 2000 || img.height > 2000) {
          setErrors(prev => ({ ...prev, avatar: 'حجم الصورة كبير جدًا (يجب ألا يتجاوز 2000×2000)' }));
          return;
        }
        
        // Preview the image
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarPreview(e.target.result);
          console.log('Avatar preview set to:', e.target.result);
          // Clear avatar error if it exists
          if (errors.avatar) {
            const newErrors = { ...errors };
            delete newErrors.avatar;
            setErrors(newErrors);
          }
        };
        reader.readAsDataURL(file);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setErrors(prev => ({ ...prev, avatar: 'الملف غير صالح كصورة' }));
      };
      
      img.src = objectUrl;
    }
  };

  if (loading || contextLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
      </motion.div>
    );
  }

  if (!profile) {
    return (
      <motion.div 
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <p className="text-red-500">حدث خطأ أثناء تحميل الملف الشخصي</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <motion.div 
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <motion.h1 
  className="text-2xl font-bold text-gray-900 dark:text-white mb-6 p-4 rounded-lg"
  style={{ 
    background: 'linear-gradient(90deg, #64C8CC, #4182F966)',
    boxShadow: '0 4px 6px #4182F966'
  }}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  أهلاً، {profile?.fullName || 'سيّد/سيّدة'} !
</motion.h1>

        
        {/* Success Message Banner */}
        {successMessage && (
          <motion.div 
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <FaCheck className="mr-2" />
              <p>{successMessage}</p>
            </div>
          </motion.div>
        )}
        
        {/* Validation Error Banner */}
        {Object.keys(errors).length > 0 && (
          <motion.div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold">يرجى تصحيح الأخطاء التالية:</p>
            <ul className="list-disc mr-5 mt-2">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {/* Profile Header */}
        <motion.div 
  className="flex flex-col md:flex-row items-center mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg justify-between"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 }}
>
  {/* صورة الملف الشخصي */}
  <div className="relative mb-4 md:mb-0 md:ml-6">
    <img 
      src={avatarPreview || profile.profileImage} 
      alt="Profile" 
      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow"
    />
    {/* <motion.button
      onClick={handleAvatarClick}
      className="absolute bottom-0 left-0 bg-blue-500 rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
      title="تغيير الصورة"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaCamera className="text-white text-sm" />
    </motion.button> */}
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleAvatarChange}
      accept="image/*"
      className="hidden"
    />
  </div>

  {/* الاسم وولي الأمر */}
  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full md:ml-6">
    <div className="text-center md:text-right">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h2>
      <p className="text-gray-600 dark:text-gray-400">ولي الأمر</p>
      {errors.avatar && (
        <motion.p 
          className="text-red-500 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {errors.avatar}
        </motion.p>
      )}
    </div>

    {/* زر حفظ التغييرات */}
  <motion.button
  onClick={handleSaveChanges}
  disabled={!hasChanges() || updating}
  className={`px-6 py-2 rounded-lg flex items-center justify-center mt-4 md:mt-0 space-x-2 ${
    !hasChanges() || updating
      ? 'bg-[#4182F9] cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700'
  } text-white`}
  whileHover={!hasChanges() || updating ? {} : { scale: 1.05 }}
  whileTap={!hasChanges() || updating ? {} : { scale: 0.95 }}
>
  {updating ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
      <span>جاري الحفظ...</span>
    </>
  ) : (
    <>
      <FaSave className="text-white" />
      <span>حفظ التغييرات</span>
    </>
  )}
</motion.button>

  </div>
</motion.div>


        {/* Profile Form */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Full Name */}
          <motion.div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الاسم الكامل
            </label>
            <div className="flex items-center">
              {/* <FaUser className="text-gray-400 ml-3" /> */}
              <input
                type="text"
                name="fullName"
                value={profile.fullName || ''}
                onChange={handleInputChange}
                onBlur={(e) => validateField('fullName', e.target.value)}
                className={`w-full bg-gray-100 dark:bg-gray-600 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                } rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="أدخل الاسم الكامل"
              />
            </div>
            {errors.fullName && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.fullName}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              البريد الإلكتروني
            </label>
            <div className="flex items-center">
              {/* <FaEnvelope className="text-gray-400 ml-3" /> */}
              <input
                type="email"
                name="email"
                value={profile.email || ''}
                onChange={handleInputChange}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`w-full bg-gray-100 dark:bg-gray-600 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                } rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ltr`}
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
            {errors.email && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

         

          {/* Address */}
          <motion.div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              العنوان
            </label>
            <div className="flex items-center">
              {/* <FaMapMarkerAlt className="text-gray-400 ml-3" /> */}
              <input
                type="text"
                name="address"
                value={profile.address || ''}
                onChange={handleInputChange}
                onBlur={(e) => validateField('address', e.target.value)}
                className={`w-full bg-gray-100 dark:bg-gray-600 border ${
                  errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                } rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="أدخل العنوان"
              />
            </div>
            {errors.address && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.address}
              </motion.p>
            )}
          </motion.div>
           {/* Phone */}
          <motion.div 
            className="bg-white dark:bg-gray-700 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              رقم الهاتف
            </label>
            <div className="flex items-center">
              {/* <FaPhone className="text-gray-400 ml-3" /> */}
              <input
                type="tel"
                name="phone"
                value={profile.phone || ''}
                onChange={handleInputChange}
                onBlur={(e) => validateField('phone', e.target.value)}
                className={`w-full bg-gray-100 dark:bg-gray-600 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                } rounded-md p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ltr`}
                placeholder="+966501234567"
                dir="ltr"
              />
            </div>
            {errors.phone && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.phone}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

       {/* Children Information Section */}
<motion.div 
  className="mt-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.9 }}
>
  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات الأبناء</h2>
  
  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 border border-gray-300 dark:border-gray-600">
    {children.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child, index) => (
          <motion.div 
            key={child.id} 
            className="flex items-center p-4  dark:bg-gray-600 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
            whileHover={{ y: -2 }}
          >
            <img 
              src={child.profileImage} 
              alt={child.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow"
            />
            <div className="mr-4">
              <h3 className="font-bold text-gray-900 dark:text-white">{child.name}</h3>
              <div className="flex items-center mt-1">
                <FaSchool className="text-gray-400 ml-2 text-sm" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">{child.school.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <FaGraduationCap className="text-gray-400 ml-2 text-sm" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {child.school.type === 'ابتدائية' ? 'المرحلة الابتدائية' : 
                   child.school.type === 'متوسطة' ? 'المرحلة المتوسطة' : 
                   child.school.type === 'ثانوية' ? 'المرحلة الثانوية' : 
                   child.school.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400 text-center">لا توجد معلومات عن الأبناء</p>
    )}
  </div>
</motion.div>


        {/* Action Buttons */}
        {/* <motion.div 
          className="mt-8 flex flex-col sm:flex-row justify-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button
            onClick={handleCancel}
            disabled={!hasChanges() || updating}
            className={`px-6 py-2 rounded-lg flex items-center justify-center ${
              !hasChanges() || updating
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
            whileHover={!hasChanges() || updating ? {} : { scale: 1.05 }}
            whileTap={!hasChanges() || updating ? {} : { scale: 0.95 }}
          >
            <FaTimes className="ml-2" />
            إلغاء
          </motion.button>
          
       
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default ProfilePage;