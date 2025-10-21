import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaPaperclip, FaPaperPlane, FaSchool, FaCalendarAlt, FaClock, FaCheck, FaReply, FaHourglassHalf, FaFilePdf, FaFileWord, FaFileImage, FaFile, FaTimes } from 'react-icons/fa';
import { useParentProfile } from '../hooks/useData';
import { useComplaints } from '../hooks/useComplaints';
import { Card, Button, Input, TextArea, Select, Loading } from '../components/ui';

const ComplaintsPage = () => {
  const { profile: parentProfile, loading: profileLoading } = useParentProfile();
  const { complaints, loading: complaintsLoading, submitComplaint } = useComplaints();
  
  const [selectedSchool, setSelectedSchool] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Get schools where parent's أبناء are enrolled
  const getParentSchools = () => {
    if (!parentProfile || !parentProfile.children) return [];
    return parentProfile.children.map(child => child.school);
  };

  // Set default school selection
  useEffect(() => {
    const schools = getParentSchools();
    if (schools.length > 0 && !selectedSchool) {
      setSelectedSchool(schools[0].id);
    }
  }, [parentProfile, selectedSchool]);

  // Get selected school details
  const selectedSchoolDetails = getParentSchools().find(school => school.id === selectedSchool);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!selectedSchool) newErrors.school = 'الرجاء اختيار المدرسة';
    if (!subject.trim()) newErrors.subject = 'الرجاء إدخال موضوع الشكوى';
    if (subject.trim().length < 5) newErrors.subject = 'موضوع الشكوى يجب أن يكون على الأقل 5 أحرف';
    if (subject.trim().length > 100) newErrors.subject = 'موضوع الشكوى يجب ألا يتجاوز 100 حرف';
    if (!message.trim()) newErrors.message = 'الرجاء إدخال تفاصيل الشكوى';
    if (message.trim().length < 10) newErrors.message = 'تفاصيل الشكوى يجب أن تكون على الأقل 10 أحرف';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const complaintData = {
        schoolId: selectedSchool,
        schoolName: selectedSchoolDetails.name,
        subject,
        message,
        attachment: attachment ? attachment.name : null
      };
      
      await submitComplaint(complaintData);
      setSubmitSuccess(true);
      
      // Reset form
      setSubject('');
      setMessage('');
      setAttachment(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { icon: <FaHourglassHalf />, color: 'text-yellow-500', bg: 'bg-yellow-100' };
      case 'reviewed':
        return { icon: <FaCheck />, color: 'text-blue-500', bg: 'bg-blue-100' };
      case 'responded':
        return { icon: <FaReply />, color: 'text-green-500', bg: 'bg-green-100' };
      default:
        return { icon: <FaHourglassHalf />, color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  // Get attachment icon based on file extension
  const getAttachmentIcon = (filename) => {
    if (!filename) return <FaFile className="text-gray-500" />;
    
    const extension = filename.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-green-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  // Get parent's schools
  const parentSchools = getParentSchools();

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <Loading size="lg" text="جاري تحميل البيانات..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaExclamationTriangle className="text-2xl text-orange-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            رفع شكاوي
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          رفع شكوى رسمية إلى إدارة مدرسة أبناء您的孩子
        </p>
      </motion.div>

      {/* Success Notification */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2"
          >
            <FaCheck className="text-green-600" />
            <span>تم إرسال الشكوى بنجاح</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                نموذج الشكوى
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* School Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اختيار المدرسة
                  </label>
                  <Select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full"
                    error={errors.school}
                  >
                    <option value="">اختر مدرسة</option>
                    {parentSchools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </Select>
                  {errors.school && (
                    <motion.p 
                      className="text-sm text-danger flex items-center gap-1 mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaExclamationTriangle className="text-xs" />
                      {errors.school}
                    </motion.p>
                  )}
                </div>

                {/* School Info */}
                {selectedSchoolDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaSchool className="text-blue-500" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        مدرسة المُختار
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedSchoolDetails.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {selectedSchoolDetails.location}
                    </p>
                  </motion.div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الموضوع
                  </label>
                  <Input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="أدخل موضوع الشكوى"
                    icon={<FaPaperclip />}
                    error={errors.subject}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تفاصيل الشكوى
                  </label>
                  <TextArea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب تفاصيل الشكوى هنا..."
                    rows={5}
                    icon={<FaPaperclip />}
                    error={errors.message}
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    إرفاق ملف (اختياري)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <FaPaperclip className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          {attachment ? (
                            <>
                              {getAttachmentIcon(attachment.name)}
                              <span>{attachment.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setAttachment(null);
                                }}
                                className="text-red-500 hover:text-red-700 mr-2"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : 'اختر ملف للإرفاق'}
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                  {attachment && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      حجم الملف: {(attachment.size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting || !selectedSchool}
                  >
                    {isSubmitting ? (
                      <>
                        <Loading size="sm" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>إرسال الشكوى</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* Complaints List */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                الشكاوى السابقة
              </h2>
              
              {complaintsLoading ? (
                <div className="flex justify-center py-8">
                  <Loading size="md" text="جاري تحميل الشكاوى..." />
                </div>
              ) : complaints.length === 0 ? (
                <div className="text-center py-8">
                  <FaExclamationTriangle className="mx-auto text-3xl text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    لا توجد شكاوى سابقة
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {complaints.map((complaint, index) => {
                    // Check if this complaint is for one of the parent's schools
                    const isParentSchool = parentSchools.some(school => school.id === complaint.schoolId);
                    if (!isParentSchool) return null;
                    
                    const statusInfo = getStatusInfo(complaint.status);
                    return (
                      <motion.div
                        key={complaint.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {complaint.subject}
                          </h3>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusInfo.bg} ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>
                              {complaint.status === 'pending' && 'قيد الانتظار'}
                              {complaint.status === 'reviewed' && 'تمت المراجعة'}
                              {complaint.status === 'responded' && 'تم الرد'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>{new Date(complaint.date).toLocaleDateString('ar-SA')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock />
                            <span>{new Date(complaint.date).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {complaint.message}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <FaSchool className="inline mr-1" />
                          {complaint.schoolName}
                        </div>
                        {complaint.attachment && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <FaPaperclip />
                            <span>{complaint.attachment}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;