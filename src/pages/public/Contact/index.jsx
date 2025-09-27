import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ContactForm from './components/ContactForm';
import MapSection from './components/MapSection';

// Context for Contact page data
const ContactContext = createContext();

// Custom hook to use Contact context
export const useContactData = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactData must be used within ContactProvider');
  }
  return context;
};

// Mock API service
const contactApiService = {
  getContactInfo: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      pageInfo: {
        title: 'تواصل معنا',
        subtitle: 'شاركنا ما تودّ إخبارنا به!',
        isRTL: true,
        language: 'ar'
      },
      mapInfo: {
        coordinates: {
          lat: 31.9038,
          lng: 35.2034
        },
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.331891891234!2d35.20340158481234!3d31.903800481234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca1c8c1234567%3A0x1234567890abcdef!2sRamallah%2C%20Palestine!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
        zoomLevel: 15
      }
    };
  },

  submitContactForm: async (formData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure for demo
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (isSuccess) {
      return {
        success: true,
        message: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!',
        id: `msg_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error('فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    }
  }
};

// Contact Provider Component
const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const data = await contactApiService.getContactInfo();
      setContactData(data);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل بيانات الاتصال');
      console.error('Error fetching contact data:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (formData) => {
    try {
      const result = await contactApiService.submitContactForm(formData);
      setSubmissionCount(prev => prev + 1);
      toast.success(result.message, {
        duration: 4000,
        position: 'top-center',
        style: {
          fontFamily: 'Cairo, sans-serif',
          direction: 'rtl',
          textAlign: 'right'
        }
      });
      return result;
    } catch (err) {
      toast.error(err.message, {
        duration: 4000,
        position: 'top-center',
        style: {
          fontFamily: 'Cairo, sans-serif',
          direction: 'rtl',
          textAlign: 'right'
        }
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const value = {
    contactData,
    loading,
    error,
    submissionCount,
    refreshData: fetchContactData,
    submitForm
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
      <Toaster />
    </ContactContext.Provider>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600 font-cairo">جاري التحميل...</p>
    </div>
  </div>
);

// Error Component
const ErrorMessage = ({ error, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center p-8">
      <div className="text-red-500 text-xl mb-4">⚠️</div>
      <p className="text-gray-800 font-cairo mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-cairo"
      >
        إعادة المحاولة
      </button>
    </div>
  </div>
);

// Main Contact Component
const ContactContent = () => {
  const { contactData, loading, error, refreshData } = useContactData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refreshData} />;
  if (!contactData) return <ErrorMessage error="لا توجد بيانات متاحة" onRetry={refreshData} />;

  return (
    <motion.div 
      className="flex flex-col min-h-screen font-cairo bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/40" 
      dir={contactData.pageInfo.isRTL ? "rtl" : "ltr"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* الهيدر */}
      <Header title={contactData.pageInfo.title} />

      {/* المحتوى الرئيسي */}
      <main className="flex-grow relative overflow-hidden">
        {/* Background decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-indigo-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-200/8 to-pink-300/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.2, 0.08]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
            repeatType: "loop"
          }}
        />
        {/* Contact Form Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="py-16 relative z-10"
        >
          <ContactForm data={contactData.pageInfo} />
        </motion.section>

        {/* Map Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="py-16 relative z-10"
        >
          <MapSection data={contactData.mapInfo} />
        </motion.section>
      </main>

      {/* الفوتر */}
      <Footer />
    </motion.div>
  );
};

// Export default Contact component with Provider
export default function Contact() {
  return (
    <ContactProvider>
      <ContactContent />
    </ContactProvider>
  );
}
