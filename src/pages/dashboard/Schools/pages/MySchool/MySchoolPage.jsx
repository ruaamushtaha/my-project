import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave } from 'react-icons/fa';

// Import components
import Header from './Header';
import AboutSection from './AboutSection';
import AchievementsSection from './AchievementsSection';
import ActivitiesSection from './ActivitiesSection';
import PostsSection from './PostsSection';
import HorizontalNavbar from './HorizontalNavbar';

// Import hooks and services
import { useSchoolData } from './hooks/useSchoolData';

const MySchoolPage = () => {
  const {
    // Data
    schoolData,
    posts,
    loading,
    error,
    isEditing,
    editedData,
    newAchievement,
    newActivity,
    newPost,
    saving,
    saveSuccess,
    
    // Setters
    setIsEditing,
    setEditedData,
    setNewAchievement,
    setNewActivity,
    setNewPost,
    
    // Handlers
    handleInputChange,
    handleContactInfoChange,
    saveChanges,
    cancelEditing,
    
    // School functions
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addActivity,
    updateActivity,
    deleteActivity,
    
    // Posts functions
    addPost,
    updatePost,
    deletePost,
    toggleLike
  } = useSchoolData();

  const [activeTab, setActiveTab] = useState('posts');
  const [coverPreview, setCoverPreview] = useState(schoolData?.coverImage || '');
  const [logoPreview, setLogoPreview] = useState(schoolData?.logo || '');

  // Update previews when schoolData changes
  React.useEffect(() => {
    if (schoolData) {
      setCoverPreview(schoolData.coverImage);
      setLogoPreview(schoolData.logo);
    }
  }, [schoolData]);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تحميل بيانات المدرسة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center" dir="rtl">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="text-red-500 text-2xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">حدث خطأ</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!schoolData || !editedData) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري تجهيز البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Success message */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center">
              <FaSave className="mr-2" />
              <span>تم حفظ التغييرات بنجاح!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow">
          <Header 
            schoolData={schoolData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedData={editedData}
            setEditedData={setEditedData}
            coverPreview={coverPreview}
            setCoverPreview={setCoverPreview}
            logoPreview={logoPreview}
            setLogoPreview={setLogoPreview}
          />
        </div>

        {/* Horizontal Navbar */}
        <HorizontalNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div>
                {activeTab === 'about' && (
                  <div id="about">
                    <AboutSection
                      schoolData={schoolData}
                      isEditing={isEditing}
                      editedData={editedData}
                      setEditedData={setEditedData}
                      handleInputChange={handleInputChange}
                      handleContactInfoChange={handleContactInfoChange}
                      saveChanges={saveChanges}
                      cancelEditing={cancelEditing}
                      saving={saving}
                    />
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div id="achievements">
                    <AchievementsSection
                      schoolData={schoolData}
                      isEditing={isEditing}
                      editedData={editedData}
                      setEditedData={setEditedData}
                      newAchievement={newAchievement}
                      setNewAchievement={setNewAchievement}
                      addAchievement={addAchievement}
                      updateAchievement={updateAchievement}
                      deleteAchievement={deleteAchievement}
                    />
                  </div>
                )}

                {activeTab === 'activities' && (
                  <div id="activities">
                    <ActivitiesSection
                      schoolData={schoolData}
                      isEditing={isEditing}
                      editedData={editedData}
                      setEditedData={setEditedData}
                      newActivity={newActivity}
                      setNewActivity={setNewActivity}
                      addActivity={addActivity}
                      updateActivity={updateActivity}
                      deleteActivity={deleteActivity}
                    />
                  </div>
                )}

                {activeTab === 'posts' && (
                  <div id="posts">
                    <PostsSection
                      schoolData={schoolData}
                      isEditing={isEditing}
                      posts={posts}
                      logoPreview={logoPreview}
                      addActivity={addActivity}
                      newPost={newPost}
                      setNewPost={setNewPost}
                      addPost={addPost}
                      updatePost={updatePost}
                      deletePost={deletePost}
                      toggleLike={toggleLike}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchoolPage;