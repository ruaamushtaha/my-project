

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import SchoolSection from './components/SchoolSection';
import BestSchools from './components/BestSchools';
import UpdateSection from './components/UpdateSection';
import FQAsection from './components/FQAsection';
import FeedbackSection from './components/FeedbackSection';
import Footer from '../components/Footer';
import HeroSection from '../Home/components/HeroSection';

import headerimg1 from '../../../assets/images/headerimg1.png';
import headerimg2 from '../../../assets/images/headerimg2.png';
import headerimg3 from '../../../assets/images/focus2.png';

const slides = [
  {
    image: headerimg1,
        text: "مؤسسة رؤى التعليم المستقبلية تطلق وسيلة لأولياء الأمور لتعزيز مشاركتهم في رحلة أبنائهم التعليمية.",
    title: "لأول مرة في تاريخ التعليم في فلسطين",

  },
  {
    image: headerimg2,
title: "اعرف أكثر عن مدارس أبناءك قبل أن تختار ",
    text: "منصَّتنا التقييميَّة تمنحك مراجعات دقيقة، بيانات شفافة، وتجارب حقيقية من الطلاب وأولياء الأمور لتساعدك في اختيار المدرسة الأفضل."
  },
  {
    image: headerimg3,
title: "مدرستك الأفضل تبدأ من منصّتنا",
    text: "منصة تُمكّنك من رؤية تقييمات حقيقية، آراء أولياء الأمور، وبيانات دقيقة حول كل مدرسة، لتتخذ قرارك بثقة تامة."  }
];
const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // تغيير الصورة كل 5 ثواني
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
      setImageError(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen font-cairo" dir="rtl">
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
      <div className="relative h-screen overflow-hidden"> 
        
       <motion.div
  key={currentImage}
  className="absolute inset-0 z-0"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1 }}
>
  {!imageError ? (
    <img 
      src={slides[currentImage].image} 
      alt="خلفية الصفحة" 
      className="w-full h-full object-cover object-center"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-b from-indigo-900 to-blue-800"></div>
  )}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/40 to-blue-950/80"></div>

  <div className="absolute bottom-32 w-full text-center px-4">
     <div className="absolute bottom-32 w-full text-center px-4 z-10">
  <motion.h2 
    className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-6 text-white leading-tight"
    key={slides[currentImage].title} 
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ 
      duration: 1, 
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <span className="inline-block">{slides[currentImage].title}</span>
  </motion.h2>

  <motion.p 
    className="text-lg md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
    key={slides[currentImage].text} 
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ 
      duration: 1, 
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {slides[currentImage].text}
  </motion.p>
</div>

  </div>
</motion.div>

        
        <Header variant="transparent" showTitle={false} />
        <HeroSection />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentImage === index ? 'bg-primary scale-x-150' : 'bg-white hover:bg-primary'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 relative z-10"> 
        <SchoolSection />
        <BestSchools />
        <UpdateSection />
<div id="faq">
  <FQAsection />
</div>        <FeedbackSection />
      </main>

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
