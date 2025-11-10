import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaPaperclip, FaCheck, FaTimes, FaSchool } from 'react-icons/fa';
import { useParentProfile } from '../hooks/useData';
import { useComplaints } from '../hooks/useComplaints';
import { Card, Button, TextArea, Select, Loading } from '../components/ui';

const ComplaintsPage = () => {
  const { profile: parentProfile, loading: profileLoading } = useParentProfile();
  const { submitComplaint } = useComplaints();

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

  // Get selected school details
  const parentSchools = getParentSchools();
  const selectedSchoolDetails = parentSchools.find(school => school.id === selectedSchool);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form

    const newErrors = {};
    if (!selectedSchool) newErrors.school = 'الرجاء اختيار المدرسة';
    if (!subject.trim()) newErrors.subject = 'الرجاء اختيار نوع الشكوى';
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
        schoolName: selectedSchoolDetails?.name || '',
        subject,
        message,
        attachment: attachment ? attachment.name : null
      };
      await submitComplaint(complaintData);
      setSubmitSuccess(true);

      // Reset form
      setSelectedSchool('');
      setSubject('');
      setMessage('');
      setAttachment(null);
      // Hide success message after 3 seconds

      setTimeout(() => setSubmitSuccess(false), 3000);
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

  // Get attachment icon based on file extension
  const getAttachmentIcon = (filename) => {
    if (!filename) return null;
    const ext = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return <FaPaperclip className="text-red-500" />;
    if (['doc','docx'].includes(ext)) return <FaPaperclip className="text-blue-500" />;
    if (['jpg','jpeg','png','gif'].includes(ext)) return <FaPaperclip className="text-green-500" />;
    return <FaPaperclip className="text-gray-500" />;
  };

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
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">رفع شكوى!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          يمكنكَ رفع شكوى رسميَّة إلى إدارة مدرسة أبناءك.
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

      {/* Form Section */}
      <div className="flex justify-center items-start py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900  text-center mb-6">شكوى رسميَّة</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: School & Complaint Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className={`w-full ${!selectedSchool ? 'text-gray-400' : 'text-gray-900'}`}
                    error={errors.school}
                  >
                    <option value="">اختر اسم المدرسة</option>
                    {parentSchools.map((school) => (
                      <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                  </Select>

                {/* School Info */}
                  {selectedSchool && selectedSchoolDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mt-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaSchool className="text-blue-500" />
                        <h3 className="font-medium text-gray-900 dark:text-white">المدرسة المختارة</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{selectedSchoolDetails.name}</p>
                      {selectedSchoolDetails.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedSchoolDetails.location}</p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Subject */}

                <div>
                  <Select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full ${!subject ? 'text-gray-400' : 'text-gray-900'}`}
                    error={errors.subject}
                  >
                    <option value="" hidden>اختر نوع الشكوى</option>
                    <option value="إدارية">إدارية</option>
                    <option value="تعليمية">تعليمية</option>
                    <option value="سلوك الطلاب">سلوك الطلاب</option>
                  </Select>
                </div>
              </div>

                {/* Message */}
              <div>
                <TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب تفاصيل الشكوى هنا..."
                  rows={6}
                  error={errors.message}
                />
              </div>

              {/* Attachment */}
              <div>
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
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setAttachment(null); }}
                              className="text-red-500 hover:text-red-700 mr-2"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : 'إرفاق ملف'}
                      </span>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
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
                  className="w-full flex items-center justify-center gap-2 bg-primary"
                  disabled={isSubmitting || !selectedSchool}
                >
                  {isSubmitting ? (
                    <>
                      <Loading size="sm" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <span>تقديم الشكوى</span>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintsPage;
