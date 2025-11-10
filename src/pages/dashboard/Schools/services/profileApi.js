/**
 * Profile API Service
 * This service provides mock implementations for school administrator profile data
 */

// Mock delay to simulate network requests
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch school administrator profile data
 * @returns {Promise<Object>} School administrator profile data
 */
export const fetchParentProfile = async () => {
  await simulateDelay(800);
  
  // In a real application, this would fetch from an actual API
  // For now, we're returning mock data that matches the school administrator profile structure
  return {
    id: 'admin_001',
    fullName: 'محمد أحمد العلي',
    email: 'mohammed.ali@school.edu',
    phone: '+966501245678',
    address: 'الرياض، حي المروج، شارع الأمير سلطان',
    region: 'منطقة الرياض',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateJoined: '2020-09-15',
    role: 'مدير مدرسة',
    preferences: {
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'ar',
      theme: 'light'
    },
    schools: [
      {
        id: 'school_001',
        name: 'مدرسة الأمل النموذجية',
        type: 'ابتدائية ومتوسطة',
        location: 'غزة - حي الشجاعية',
        studentsCount: 1200,
        teachersCount: 45,
        establishedYear: 1995,
        rating: 4.7,
        profileImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&h=150&fit=crop'
      }
    ]
  };
};

/**
 * Update school administrator profile data
 * @param {Object} profileData - The updated profile data
 * @returns {Promise<Object>} Updated profile data
 */
export const updateParentProfile = async (profileData) => {
  await simulateDelay(1000);
  
  // In a real application, this would update the profile on the server
  // For now, we're just returning the same data with a success message
  return {
    success: true,
    message: 'تم تحديث الملف الشخصي بنجاح',
    data: {
      ...profileData,
      lastUpdated: new Date().toISOString()
    }
  };
};

/**
 * Update school administrator avatar
 * @param {FormData} formData - The form data containing the avatar file
 * @returns {Promise<Object>} Updated profile data with new avatar
 */
export const updateAvatar = async (formData) => {
  await simulateDelay(1500);
  
  // In a real application, this would upload the file and return the new URL
  // For now, we're just returning a mock success response
  return {
    success: true,
    message: 'تم تحديث الصورة الشخصية بنجاح',
    data: {
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  };
};

export default {
  fetchParentProfile,
  updateParentProfile,
  updateAvatar
};