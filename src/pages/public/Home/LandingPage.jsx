import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../Home/components/Header';
import SchoolSection from './components/SchoolSection';
import BestSchools from './components/BestSchools';
// import VideoTestimonialSection from './components/VideoTestimonialSection';
import UpdateSection from './components/UpdateSection';
import FQAsection from './components/FQAsection';
import FeedbackSection from './components/FeedbackSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen font-cairo" dir="rtl">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الصفحة...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen font-cairo" dir="rtl">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-cairo" dir="rtl">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50">
        <SchoolSection />
        <BestSchools />
        <UpdateSection />
        <FQAsection />
        <FeedbackSection />
        {/* <VideoTestimonialSection /> */}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
};

export default LandingPage;