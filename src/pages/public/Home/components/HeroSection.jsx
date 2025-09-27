import React, { useState, useEffect } from 'react';
import Hero from '../../../../assets/images/headerimg1.png';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-cairo" dir="rtl">
      {/* الخلفية */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {!imageError ? (
          <img
            src={Hero}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-indigo-900 to-blue-800"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-indigo-900/40 to-indigo-900/80"></div>
      </motion.div>

      {/* المحتوى */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
لأول مرة في تاريخ التعليم في فلسطين
        </motion.h2>

        <motion.p 
          className="text-lg md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
 مؤسسة رؤى التعليم المستقبليَّة تطلق وسيلة لأولياء الأمور<br/>
 لتعزيز مشاركتهم في رحلة أبنائهم التعليمية.        </motion.p>

       
      </div>
    </section>
  );
};

export default HeroSection;