
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSchool, FaStar, FaUsers, FaChartLine, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const slideInFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const FeaturedSchools = ({ schools, currentIndex, onNext, onPrev }) => {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
          }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-48 bg-blue-100"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{schools[currentIndex].name}</h3>
            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(schools[currentIndex].rating) ? "text-yellow-500" : "text-gray-300"} 
                />
              ))}
              <span className="text-gray-600 mr-2">({schools[currentIndex].rating})</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="ml-1" />
              <span>{schools[currentIndex].location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">{schools[currentIndex].reviews} تقييم</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                عرض التفاصيل
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <button 
        onClick={onPrev}
        className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <FaArrowLeft className="text-blue-600" />
      </button>
      <button 
        onClick={onNext}
        className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <FaArrowRight className="text-blue-600" />
      </button>
    </div>
  );
};

const StatCard = ({ icon: Icon, number, label }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-white p-6 rounded-xl shadow-md text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="text-blue-600 text-3xl mb-2 flex justify-center">
      <Icon />
    </div>
    <h3 className="text-2xl font-bold text-gray-800">{number}+</h3>
    <p className="text-gray-600">{label}</p>
  </motion.div>
);

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSchoolIndex, setCurrentSchoolIndex] = useState(0);
  
  const stats = [
    { id: 1, icon: FaSchool, number: '500', label: 'مدرسة' },
    { id: 2, icon: FaUsers, number: '50,000', label: 'طالب' },
    { id: 3, icon: FaChartLine, number: '95', label: 'نسبة رضا أولياء الأمور' },
  ];
  
  const featuredSchools = [
    { id: 1, name: 'مدرسة النخبة', rating: 4.8, reviews: 124, location: 'الرياض' },
    { id: 2, name: 'مدرسة الأوائل', rating: 4.9, reviews: 98, location: 'جدة' },
    { id: 3, name: 'مدرسة الإبداع', rating: 4.7, reviews: 156, location: 'الدمام' },
  ];

  const nextSchool = () => {
    setCurrentSchoolIndex((prevIndex) => 
      prevIndex === featuredSchools.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSchool = () => {
    setCurrentSchoolIndex((prevIndex) =>
      prevIndex === 0 ? featuredSchools.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate featured schools
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSchoolIndex(prevIndex => 
        prevIndex === featuredSchools.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredSchools.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              منصة تقييم المدارس
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl mb-8 text-blue-100"
            >
              اكتشف أفضل المدارس في منطقتك وقم بتقييم تجربتك التعليمية
            </motion.p>
            <motion.form
              variants={itemVariants}
              onSubmit={handleSearch}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مدرسة..."
                className="w-full md:w-3/4 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="absolute left-0 top-0 h-full px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch className="ml-2" />
                بحث
              </button>
            </motion.form>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl text-gray-800"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4">المدارس المميزة</h3>
              <FeaturedSchools 
                schools={featuredSchools} 
                currentIndex={currentSchoolIndex}
                onNext={nextSchool}
                onPrev={prevSchool}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat) => (
              <StatCard 
                key={stat.id}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">انضم إلينا اليوم</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            سجل في منصتنا واحصل على تجربة تعليمية استثنائية لأبنائك
          </p>
          <motion.a
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            سجل الآن مجاناً
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;