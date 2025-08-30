import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../../assets/images/hero-section.png';
import School1 from '../../../assets/images/school 1.png';
import School2 from '../../../assets/images/school 2.png';
import School3 from '../../../assets/images/school 3.png'; // تأكد من مسار الصورة
import { FaStar, FaMapMarkerAlt, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
const schools = [
  {
    id: 1,
    name: "مدرسة النجاح الحديثة",
    image: "/images/school1.jpg",
    location: "غزة - الرمال",
    students: "450",
    levels: "ابتدائي - ثانوي",
    rating: "4.8",
    reviews: "120"
  },
  {
    id: 2,
    name: "مدرسة الأمل الدولية",
    image: "/images/school2.jpg",
    location: "غزة - تل الهوا",
    students: "680",
    levels: "روضة - ثانوي",
    rating: "4.5",
    reviews: "85"
  },
  {
    id: 3,
    name: "مدرسة المستقبل التطويرية",
    image: "/images/school3.jpg",
    location: "غزة - النصر",
    students: "320",
    levels: "إعدادي - ثانوي",
    rating: "4.9",
    reviews: "150"
  }
];

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};
  const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Header */}
        <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">

        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - Right Side */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="w-8 h-8" /> {/* Add your logo image */}
            <h1 className="text-2xl font-bold">رؤى التعليم المستقبلية </h1>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="#" className="hover:text-indigo-200 transition duration-300">الرئيسية</a>
            <a href="#" className="hover:text-indigo-200 transition duration-300">الدورات</a>
            <a href="#" className="hover:text-indigo-200 transition duration-300">من نحن</a>
            <a href="#" className="hover:text-indigo-200 transition duration-300">تواصل معنا</a>
          </div>

          {/* Auth Buttons - Left Side */}
          <div className="flex items-center gap-4">
            <Link 
              to="/register" 
              className="hidden md:block px-4 py-2 border border-white rounded-lg hover:bg-indigo-800 transition duration-300"
            >
              إنشاء حساب
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 text-indigo-900 bg-white rounded-lg hover:bg-indigo-100 transition duration-300"
            >
              تسجيل دخول
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 text-center hidden">
            <a href="#" className="block hover:text-indigo-200 transition duration-300 py-2">الرئيسية</a>
            <a href="#" className="block hover:text-indigo-200 transition duration-300 py-2">الدورات</a>
            <a href="#" className="block hover:text-indigo-200 transition duration-300 py-2">من نحن</a>
            <a href="#" className="block hover:text-indigo-200 transition duration-300 py-2">تواصل معنا</a>
            <Link 
              to="/register" 
              className="block hover:text-indigo-200 transition duration-300 py-2"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[800px] md:min-h-screen flex items-center">
        {/* Background Image */}
        <img 
          src={HeroSection} 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-indigo-900/60"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10 py-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
           "اختيار المدرسة الأفضل لأطفالك صار أسهل من أي وقت"
          </h2>
          <p className="text-xl md:text-3xl mb-12 text-indigo-100 max-w-3xl mx-auto">
            اكتشف تقييمات حقيقية وتجارب أولياء الأمور وساعد في بناء بيئة تعليمية أفضل.
          </p>
          <button className="bg-white text-indigo-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-indigo-100 transition duration-300 shadow-lg hover:shadow-xl">
            ابدأ الآن
          </button>
        </div>
      </section>   
      {/* Schools Section */}
         <section className="py-16 container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-indigo-900">المدارس</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative">
              <img 
                src={School1}
                alt="مدرسة النجاح الحديثة" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold">4.8</span>
                  <span className="text-sm text-gray-600">(120 تقييم)</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-3 text-indigo-900">مدرسة النجاح الحديثة</h4>
              
              {/* School Info */}
              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  <span>غزة - الرمال</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-indigo-600" />
                  <span>450 طالب</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaGraduationCap className="text-indigo-600" />
                  <span>ابتدائي - ثانوي</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
               
                <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-300">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>

          {/* School Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative">
              <img 
                src={School2} 
                alt="مدرسة الأمل الدولية" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold">4.5</span>
                  <span className="text-sm text-gray-600">(85 تقييم)</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-3 text-indigo-900">مدرسة الأمل الدولية</h4>
              
              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  <span>غزة - تل الهوا</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-indigo-600" />
                  <span>680 طالب</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaGraduationCap className="text-indigo-600" />
                  <span>روضة - ثانوي</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                
                <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-300">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>

          {/* School Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative">
              <img 
                src={School3}
                alt="مدرسة المستقبل التطويرية" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-sm text-gray-600">(150 تقييم)</span>
                </div>
              </div>
            </div>
            <div className="p-6">
            <h4 className="text-xl font-bold mb-3 text-indigo-900">مدرسة المستقبل التطويرية</h4>
              
              <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  <span>غزة - النصر</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-indigo-600" />
                  <span>320 طالب</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaGraduationCap className="text-indigo-600" />
                  <span>إعدادي - ثانوي</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
               
                <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-300">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Best School Section */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 text-indigo-900">
            المدرسة المميزة لهذا العام
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <img
                src={School1}
                alt="المدرسة المميزة"
                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="font-bold text-lg">4.9</span>
                  <span className="text-gray-600">(200+ تقييم)</span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <h4 className="text-3xl font-bold text-indigo-900 mb-4">
                مدرسة التميز النموذجية
              </h4>
              
              {/* Principal Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/principal.jpg"
                  alt="مدير المدرسة"
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
                />
                <div>
                  <h5 className="font-bold text-lg text-indigo-900">د. أحمد محمد</h5>
                  <p className="text-gray-600">مدير المدرسة</p>
                </div>
              </div>

              {/* School Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-indigo-600 text-xl" />
                  <div>
                    <p className="font-bold text-gray-900">850+</p>
                    <p className="text-gray-600">طالب وطالبة</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-indigo-600 text-xl" />
                  <div>
                    <p className="font-bold text-gray-900">جميع المراحل</p>
                    <p className="text-gray-600">من الروضة للثانوي</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 my-6">
                <h6 className="font-bold text-lg text-indigo-900 mb-4">ما يميزنا:</h6>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">مناهج تعليمية متطورة ومعتمدة دولياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">كادر تعليمي مؤهل وذو خبرة عالية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">أنشطة لامنهجية متنوعة</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  تواصل معنا
                </button>
                <button className="flex-1 border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition duration-300">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Large Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full -z-0 opacity-60 blur-3xl transform -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-tr-full -z-0 opacity-60 blur-3xl transform translate-y-1/4 -translate-x-1/4"></div>
        
        {/* Additional Floating Circles */}
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-100 rounded-full -z-0 opacity-40 blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-purple-100 rounded-full -z-0 opacity-40 blur-2xl animate-float-delayed"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">
              تعرف على منصتنا التعليمية
            </h2>
            
            <div className="relative rounded-tr-[80px] rounded-bl-[80px] shadow-2xl bg-black overflow-hidden">
              {/* Video Element */}
              <video 
                className="w-full aspect-video"
                poster="/images/video-thumbnail.jpg"
              >
                <source src="/videos/intro.mp4" type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو
              </video>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                <button className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors transform hover:scale-105 duration-300 shadow-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-indigo-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </button>

                  {/* Progress Bar */}
                  <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-1/3 rounded-full"></div>
                  </div>

                  {/* Volume & Fullscreen */}
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-indigo-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6l8.5-6L12 0v6z" />
                      </svg>
                    </button>
                    <button className="text-white hover:text-indigo-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>     
      {/*  Feedback Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">شاركنا رأيك عن المنصة</h2>
            <p className="text-gray-600">رأيك يهمنا في تطوير وتحسين خدماتنا</p>
          </div>

          <form className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Quick Rating */}
            <div className="space-y-4">
              <label className="block text-center text-gray-700 font-medium text-lg mb-6">
                ما هو تقييمك العام للمنصة؟
              </label>
              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
                >
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">😞</span>
                  <span className="text-gray-600 font-medium">يحتاج تحسين</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
                >
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">😐</span>
                  <span className="text-gray-600 font-medium">جيد</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
                >
                  <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">😃</span>
                  <span className="text-gray-600 font-medium">ممتاز</span>
                </button>
              </div>
            </div>

            {/* Feedback Text */}
            <div className="space-y-3">
              <label htmlFor="feedback" className="block text-gray-700 font-medium text-lg">
                ما الذي أعجبك في المنصة؟ وما الذي تقترح تحسينه؟
              </label>
              <textarea
                id="feedback"
                rows="5"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-600 
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                  outline-none transition-all resize-none
                  placeholder:text-gray-400"
                placeholder="نرحب بمشاركة تجربتك معنا..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-lg py-4 px-6 rounded-xl font-bold 
                hover:bg-indigo-700 active:bg-indigo-800 
                transform hover:-translate-y-1 active:translate-y-0 
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                shadow-lg hover:shadow-2xl
                flex items-center justify-center gap-2"
            >
              <span>إرسال التقييم</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Success Message - Initially Hidden */}
            <div className="hidden bg-green-50 text-green-800 rounded-xl p-4 text-center">
              <p className="font-medium">شكراً لك! تم استلام تقييمك بنجاح 🎉</p>
            </div>
          </form>
        </div>
      </section>
      {/* Footer */}
     <footer className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white pt-16 pb-8">
  <div className="container mx-auto px-4">
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-4 gap-12"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Column 1: About */}
      <div className="lg:col-span-1 space-y-6">
        <h5 className="text-2xl font-bold mb-6">رؤى التعليم</h5>
        <p className="text-indigo-200 leading-relaxed">
          منصتك الأولى للتقييم عن بعد، نساعدك في اختيار أفضل المدارس لأبنائك
        </p>
        <div className="flex items-center gap-4 pt-4">
          <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div className="lg:col-span-1">
        <h5 className="text-xl font-bold mb-6">روابط سريعة</h5>
        <ul className="space-y-4">
          {['الرئيسية', 'المدارس', 'من نحن', 'تواصل معنا'].map((link, index) => (
            <li key={index}>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="transform group-hover:translate-x-2 transition-transform">←</span>
                <span>{link}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: Contact Info */}
      <div className="lg:col-span-1">
        <h5 className="text-xl font-bold mb-6">تواصل معنا</h5>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors">
            <span className="p-2 bg-indigo-800/50 rounded-full">📧</span>
            <span>info@example.com</span>
          </li>
          <li className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors">
            <span className="p-2 bg-indigo-800/50 rounded-full">📞</span>
            <span>+970 59-123-4567</span>
          </li>
          <li className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors">
            <span className="p-2 bg-indigo-800/50 rounded-full">📍</span>
            <span>غزة، فلسطين</span>
          </li>
        </ul>
      </div>

      {/* Column 4: Feedback Form */}
<div className="lg:col-span-1 space-y-6">
  <h5 className="text-xl font-bold mb-6">شاركنا رأيك</h5>
  
  <form className="bg-white/5 rounded-xl p-6 space-y-6 backdrop-blur-sm">
    {/* Quick Rating */}
    <div className="space-y-4">
      <label className="block text-center text-indigo-200 font-medium text-sm">
        ما هو تقييمك العام للمنصة؟
      </label>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">😞</span>
          <span className="text-xs text-indigo-200">يحتاج تحسين</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">😐</span>
          <span className="text-xs text-indigo-200">جيد</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">😃</span>
          <span className="text-xs text-indigo-200">ممتاز</span>
        </button>
      </div>
    </div>

    {/* Feedback Text */}
    <div className="space-y-2">
      <label className="block text-indigo-200 text-sm font-medium">
        ما الذي تقترح تحسينه؟
      </label>
      <textarea
        rows="3"
        className="w-full bg-white/10 text-white rounded-lg border-0 p-3 
          focus:ring-2 focus:ring-indigo-500 resize-none 
          placeholder:text-indigo-200/60 text-sm"
        placeholder="نرحب بملاحظاتك واقتراحاتك لتطوير المنصة... ✨"
      ></textarea>
    </div>

    {/* Submit Button */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white 
        py-3 px-4 rounded-lg text-sm font-medium
        hover:from-indigo-500 hover:to-indigo-600
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        focus:ring-offset-indigo-900
        flex items-center justify-center gap-2
        group"
    >
      <span>إرسال التقييم</span>
      <span className="text-lg group-hover:rotate-12 transition-transform duration-300">
        🚀
      </span>
    </motion.button>
        </form>
      </div>
    </motion.div>

    {/* Footer Bottom */}
    <div className="mt-16 pt-8 border-t border-indigo-800/30">
      <p className="text-center text-indigo-200">
        جميع الحقوق محفوظة © رؤى التعليم {new Date().getFullYear()}
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;