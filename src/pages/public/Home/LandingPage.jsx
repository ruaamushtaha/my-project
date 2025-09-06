// src/pages/public/Home/LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSchool, FaStar, FaUsers, FaChartLine } from 'react-icons/fa';

const LandingPage = () => {
  const featuredSchools = [
    { id: 1, name: 'مدرسة النخبة', rating: 4.8, reviews: 124, location: 'الرياض' },
    { id: 2, name: 'مدرسة الأوائل', rating: 4.9, reviews: 98, location: 'جدة' },
    { id: 3, name: 'مدرسة الإبداع', rating: 4.7, reviews: 156, location: 'الدمام' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              منصة رؤى لتقييم المدارس
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 text-blue-100"
            >
              اكتشف أفضل المدارس في منطقتك وقم بتقييم تجربتك التعليمية
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="ابحث عن مدرسة..."
                className="w-full md:w-3/4 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute left-0 top-0 h-full px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <FaSearch className="ml-2" />
                بحث
              </button>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src="/images/hero-education.svg"
              alt="التعليم"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار منصتنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSchool className="text-4xl text-blue-600 mb-4" />,
                title: "مدارس معتمدة",
                description: "أفضل المدارس المعتمدة في المملكة العربية السعودية"
              },
              {
                icon: <FaStar className="text-4xl text-yellow-500 mb-4" />,
                title: "تقييمات حقيقية",
                description: "تقييمات حقيقية من أولياء الأمور والطلاب"
              },
              {
                icon: <FaChartLine className="text-4xl text-green-500 mb-4" />,
                title: "تتبع التقدم",
                description: "تتبع تقدم المدارس وتحسنها مع مرور الوقت"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold my-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">مدارس مميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSchools.map((school, index) => (
              <motion.div
                key={school.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 bg-blue-100"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{school.name}</h3>
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(school.rating) ? "text-yellow-500" : "text-gray-300"} />
                    ))}
                    <span className="text-gray-600 mr-2">({school.rating})</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="ml-1" />
                    <span>{school.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{school.reviews} تقييم</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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