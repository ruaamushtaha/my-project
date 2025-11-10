import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages, FaVideo, FaHeart, FaComment, FaShare, FaTrash, FaEdit } from 'react-icons/fa';

const PostsSection = ({ 
  schoolData, 
  isEditing, 
  posts, 
  logoPreview,
  addActivity,
  newPost,
  setNewPost,
  addPost,
  updatePost,
  deletePost,
  toggleLike
}) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPost, setEditingPost] = useState({});
  const postImageInputRef = useRef(null);
  const editPostImageInputRef = useRef(null);

  // Handle post image change
  const handlePostImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(imagePromises).then(images => {
      setNewPost(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  // Remove image from new post
  const removeImageFromNewPost = (index) => {
    setNewPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Start editing a post
  const startEditingPost = (post) => {
    setEditingPostId(post.id);
    setEditingPost({ ...post });
  };

  // Save edited post
  const saveEditedPost = async () => {
    const updatedPost = await updatePost(editingPostId, editingPost);
    if (updatedPost) {
      setEditingPostId(null);
      setEditingPost({});
    }
  };

  // Cancel editing post
  const cancelEditingPost = () => {
    setEditingPostId(null);
    setEditingPost({});
  };

  // Handle editing post text change
  const handleEditTextChange = (e) => {
    setEditingPost(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  // Handle editing post image change
  const handleEditPostImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(imagePromises).then(images => {
      setEditingPost(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  // Remove image from editing post
  const removeImageFromEditingPost = (index) => {
    setEditingPost(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-start">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
            {logoPreview ? (
              <img src={logoPreview} alt="School" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="text-gray-500 dark:text-gray-400">م</span>
            )}
          </div>
          
          <div className="flex-1 mr-3">
            <textarea
              value={newPost.text}
              onChange={(e) => setNewPost(prev => ({ ...prev, text: e.target.value }))}
              placeholder="ماذا تريد أن تشارك؟"
              rows="3"
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white resize-none"
            />
            
            {newPost.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newPost.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Preview ${index}`} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImageFromNewPost(index)}
                      className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button
                  onClick={() => postImageInputRef.current?.click()}
                  className="flex items-center px-3 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FaImages className="ml-1" />
                  <span>صورة</span>
                </button>
                
                <button className="flex items-center px-3 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <FaVideo className="ml-1" />
                  <span>فيديو</span>
                </button>
              </div>
              
              <button
                onClick={() => addPost(newPost)}
                disabled={!newPost.text.trim() && newPost.images.length === 0}
                className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                نشر
              </button>
            </div>
            
            <input
              type="file"
              ref={postImageInputRef}
              onChange={handlePostImageChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow"
            >
              {editingPostId === post.id ? (
                // Edit mode
                <div className="p-6">
                  <textarea
                    value={editingPost.text}
                    onChange={handleEditTextChange}
                    rows="4"
                    className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white resize-none mb-4"
                  />
                  
                  {editingPost.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {editingPost.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={image} 
                            alt={`Preview ${index}`} 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImageFromEditingPost(index)}
                            className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={saveEditedPost}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={cancelEditingPost}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => editPostImageInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                    >
                      <FaImages className="ml-1" />
                      إضافة صورة
                    </button>
                  </div>
                  
                  <input
                    type="file"
                    ref={editPostImageInputRef}
                    onChange={handleEditPostImageChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>
              ) : (
                // Display mode
                <>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                          {logoPreview ? (
                            <img src={logoPreview} alt="School" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">م</span>
                          )}
                        </div>
                        <div className="mr-3">
                          <h3 className="font-bold text-gray-900 dark:text-white">{schoolData.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.timestamp)}</p>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <button
                          onClick={() => startEditingPost(post)}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="تعديل المنشور"
                        >
                          <FaEdit />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                      {post.text}
                    </p>
                    
                    {post.images && post.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`Post ${index}`} 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                          post.liked 
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
                        }`}
                      >
                        <FaHeart className={post.liked ? 'fill-current' : ''} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <FaComment />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                          <FaShare />
                          <span>مشاركة</span>
                        </button>
                        
                        {isEditing && (
                          <button
                            onClick={() => deletePost(post.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash />
                            <span>حذف</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostsSection;