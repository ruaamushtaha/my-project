import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiCheckCircle, FiLoader } from "react-icons/fi";

// Page images
import Points from "../../assets/images/points.svg";
import LOGO from "../../assets/images/LOGO.svg";

export default function EmailVerification() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // محاكاة التحقق من رابط التفعيل
    const timer = setTimeout(() => {
      setVerified(true);
      // إعادة التوجيه بعد ثانيتين
      setTimeout(() => {
        navigate("/"); // تحويل للصفحة الرئيسية
      }, 5000);
    }, 5000); // 3 ثواني للتحقق
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // Updated container with padding adjustments
    <div
      className="min-h-screen w-full bg-white flex flex-col overflow-hidden font-cairo"
      dir="rtl"
    >
      {/* Enhanced Header with adjusted positioning */}
      <header className="flex justify-between items-start px-6 md:px-12 pt-6 pb-2">
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={LOGO} 
          alt="LOGO" 
          className="w-20 h-20 md:w-24 md:h-24 -mt-2" // Moved logo up slightly
        />
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src={Points} 
          alt="Points" 
          className="w-12 h-12 md:w-16 md:h-12 mr-2 md:mr-5 -mt-2" // Moved points up slightly
        />
      </header>

      {/* Enhanced Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Enhanced Verification Status with external animations and shadows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ 
            y: -10,
          }}
          className="max-w-md w-full"
        >
          {/* External shadow element */}
          <div className="absolute w-full h-full bg-gray-400/20 rounded-2xl -z-10 blur-xl"></div>
          
          {/* Main card with enhanced styling */}
          <div className="relative p-8 bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#64C8CC]/20">
            {!verified ? (
              <div className="flex flex-col items-center gap-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                  }}
                  className="p-4 rounded-full bg-[#30A1DB]/10"
                >
                  <FiLoader className="w-12 h-12 text-[#252158] animate-spin" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-[#252158]"
                >
                  التحقق من البريد الإلكتروني
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                >
                  جاري التحقق من رابط التفعيل الخاص بك، يرجى الانتظار...
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="w-16 h-16 border-4 border-[#30A1DB] border-t-[#64C8CC] rounded-full animate-spin"
                ></motion.div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="p-4 rounded-full bg-green-100"
                >
                  <FiCheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl md:text-3xl font-bold text-green-600"
                >
                  تم تفعيل حسابك بنجاح!
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  سيتم تحويلك تلقائياً إلى الصفحة الرئيسية خلال ثوانٍ...
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 flex items-center justify-center text-sm text-gray-500"
                >
                  <FiMail className="ml-1" />
                  <span>شكرًا لتسجيلك معنا</span>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}