import { useState, useEffect } from 'react';
import { schoolService, postsService } from '../services/schoolService';

export const useSchoolData = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', image: '', date: '' });
  const [newActivity, setNewActivity] = useState({ title: '', description: '', images: [], location: '', date: '' });
  const [newPost, setNewPost] = useState({ text: '', images: [] });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [school, postsData] = await Promise.all([
          schoolService.getSchoolData('school_001'),
          postsService.getPosts('school_001')
        ]);
        
        setSchoolData(school);
        setEditedData(school);
        setPosts(postsData);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle input changes for school data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact info changes
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value
      }
    }));
  };

  // Save changes
  const saveChanges = async () => {
    if (!editedData) return;
    
    setSaving(true);
    try {
      const response = await schoolService.updateSchoolData(schoolData.id, editedData);
      if (response.success) {
        setSchoolData(editedData);
        setIsEditing(false);
        setSaveSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        setError('Failed to save changes');
      }
    } catch (err) {
      setError('Failed to save changes');
      console.error('Error saving data:', err);
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditedData(schoolData);
    setIsEditing(false);
    setNewAchievement({ title: '', description: '', image: '', date: '' });
    setNewActivity({ title: '', description: '', images: [], location: '', date: '' });
    setNewPost({ text: '', images: [] });
  };

  // Add new achievement
  const addAchievement = async (achievementData) => {
    try {
      const response = await schoolService.addAchievement(schoolData.id, achievementData);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          achievements: [response.achievement, ...prev.achievements]
        }));
        return response.achievement;
      } else {
        setError('Failed to add achievement');
        return null;
      }
    } catch (err) {
      setError('Failed to add achievement');
      console.error('Error adding achievement:', err);
      return null;
    }
  };

  // Update achievement
  const updateAchievement = async (achievementId, achievementData) => {
    try {
      const response = await schoolService.updateAchievement(schoolData.id, achievementId, achievementData);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          achievements: prev.achievements.map(ach => 
            ach.id === achievementId ? response.achievement : ach
          )
        }));
        return response.achievement;
      } else {
        setError('Failed to update achievement');
        return null;
      }
    } catch (err) {
      setError('Failed to update achievement');
      console.error('Error updating achievement:', err);
      return null;
    }
  };

  // Delete achievement
  const deleteAchievement = async (achievementId) => {
    try {
      const response = await schoolService.deleteAchievement(schoolData.id, achievementId);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          achievements: prev.achievements.filter(ach => ach.id !== achievementId)
        }));
      } else {
        setError('Failed to delete achievement');
      }
    } catch (err) {
      setError('Failed to delete achievement');
      console.error('Error deleting achievement:', err);
    }
  };

  // Add new activity
  const addActivity = async (activityData) => {
    try {
      const response = await schoolService.addActivity(schoolData.id, activityData);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          activities: [response.activity, ...prev.activities]
        }));
        return response.activity;
      } else {
        setError('Failed to add activity');
        return null;
      }
    } catch (err) {
      setError('Failed to add activity');
      console.error('Error adding activity:', err);
      return null;
    }
  };

  // Update activity
  const updateActivity = async (activityId, activityData) => {
    try {
      const response = await schoolService.updateActivity(schoolData.id, activityId, activityData);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          activities: prev.activities.map(act => 
            act.id === activityId ? response.activity : act
          )
        }));
        return response.activity;
      } else {
        setError('Failed to update activity');
        return null;
      }
    } catch (err) {
      setError('Failed to update activity');
      console.error('Error updating activity:', err);
      return null;
    }
  };

  // Delete activity
  const deleteActivity = async (activityId) => {
    try {
      const response = await schoolService.deleteActivity(schoolData.id, activityId);
      if (response.success) {
        setEditedData(prev => ({
          ...prev,
          activities: prev.activities.filter(act => act.id !== activityId)
        }));
      } else {
        setError('Failed to delete activity');
      }
    } catch (err) {
      setError('Failed to delete activity');
      console.error('Error deleting activity:', err);
    }
  };

  // Add new post
  const addPost = async (postData) => {
    try {
      const response = await postsService.addPost(schoolData.id, postData);
      if (response.success) {
        setPosts(prev => [response.post, ...prev]);
        
        // Also add to activities if it's a post with content
        if (postData.text || (postData.images && postData.images.length > 0)) {
          const activityData = {
            title: 'منشور جديد',
            description: postData.text || 'تم نشر منشور جديد',
            images: postData.images || [],
            date: new Date().toISOString().split('T')[0],
            location: ''
          };
          addActivity(activityData);
        }
        
        return response.post;
      } else {
        setError('Failed to add post');
        return null;
      }
    } catch (err) {
      setError('Failed to add post');
      console.error('Error adding post:', err);
      return null;
    }
  };

  // Update post
  const updatePost = async (postId, postData) => {
    try {
      const response = await postsService.updatePost(schoolData.id, postId, postData);
      if (response.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? response.post : post
        ));
        return response.post;
      } else {
        setError('Failed to update post');
        return null;
      }
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
      return null;
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await postsService.deletePost(schoolData.id, postId);
      if (response.success) {
        setPosts(prev => prev.filter(post => post.id !== postId));
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('Failed to delete post');
      console.error('Error deleting post:', err);
    }
  };

  // Like post
  const toggleLike = async (postId) => {
    try {
      const response = await postsService.likePost(schoolData.id, postId);
      if (response.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, liked: response.liked, likes: response.likes } 
            : post
        ));
      } else {
        setError('Failed to like post');
      }
    } catch (err) {
      setError('Failed to like post');
      console.error('Error liking post:', err);
    }
  };

  return {
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
  };
};

export default useSchoolData;