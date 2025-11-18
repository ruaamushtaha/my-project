import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiRefreshCw, FiCheckCircle } from "react-icons/fi";

// Page images
import Points from "../../assets/images/points.svg";
import LOGO from "../../assets/images/LOGO.svg";

export default function CheckingVerification() {
  const [userEmail, setUserEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [cardAnimation, setCardAnimation] = useState({ y: 30, opacity: 0 });

  // جلب البريد من localStorage عند تحميل الصفحة
  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email"); // افتراضياً خزنتي البريد هنا
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
    
    // Animate card entrance
    const timer = setTimeout(() => {
      setCardAnimation({ y: 0, opacity: 1 });
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleResend = () => {
    if (!userEmail) return;
    setResending(true);

    // محاكاة إعادة الإرسال (يمكن استبدالها بالـ API)
    setTimeout(() => {
      setResending(false);
      alert("تم إعادة إرسال رسالة التحقق بنجاح!");
    }, 2000);
  };

  return (
    // Changed container background to white
    <div className="min-h-screen w-full bg-white flex flex-col overflow-hidden font-cairo" dir="rtl">
      {/* Enhanced Header with adjusted positioning */}
      <header className="flex justify-between items-start px-6 md:px-12 pt-6 pb-2">
        <motion.img 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src={LOGO} alt="LOGO" className="w-20 h-20 md:w-24 md:h-24 -mt-2" // Moved logo up slightly
        />
        <motion.img 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src={Points} alt="Points" className="w-12 h-12 md:w-16 md:h-12 mr-2 md:mr-5 -mt-2" // Moved points up slightly
        />
      </header>

      {/* Enhanced Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Card with external JavaScript-based animations and external shadow */}
        <div className="max-w-md w-full relative">
          {/* External shadow element - static shadow behind the card */}
          <div className="absolute top-3 left-3 w-full h-full bg-gray-400/30 rounded-2xl -z-10 blur-lg"></div>
          
          {/* Animated card container */}
          <motion.div
            initial={{ y: cardAnimation.y, opacity: cardAnimation.opacity }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.7 
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
            className="relative"
          >
            {/* Main card */}
            <div className="p-8 bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl shadow-xl border border-[#64C8CC]/20">
              {/* Icon section */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 rounded-full bg-[#30A1DB]/10">
                  <FiMail className="w-12 h-12 text-[#252158]" />
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold mb-4 text-[#252158]"
              >
                تحقق من بريدك الإلكتروني
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              >
                لقد أرسلنا رسالة تأكيد إلى بريدك الإلكتروني، يرجى التحقق من صندوق الوارد الخاص بك والنقر على الرابط المرفق لإكمال عملية التسجيل.
              </motion.p>

              {/* Email display with enhanced styling */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 p-4 bg-[#64C8CC]/10 rounded-lg border border-[#64C8CC]/30"
              >
                <p className="text-[#252158] font-bold flex items-center justify-center">
                  <FiMail className="ml-2" />
                  {userEmail || "جاري التحميل..."}
                </p>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 dark:text-gray-300 mb-8"
              >
                إذا لم تستلم الرسالة خلال بضع دقائق، يرجى التحقق من مجلد البريد العشوائي أو إعادة إرسال الرسالة.
              </motion.p>

              {/* Enhanced resend button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResend}
                disabled={resending || !userEmail}
                className={`w-full py-4 font-cairo font-bold text-white text-lg rounded-xl flex items-center justify-center
                  ${resending || !userEmail 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#30A1DB] to-[#252158] hover:from-[#252158] hover:to-[#30A1DB] shadow-lg"} 
                  transition duration-300 ease-in-out`}
              >
                {resending ? (
                  <>
                    <FiRefreshCw className="ml-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="ml-2" />
                    إعادة إرسال رسالة التحقق
                  </>
                )}
              </motion.button>
              
              {/* Success indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center justify-center text-sm text-green-600"
              >
                <FiCheckCircle className="ml-1" />
                <span>تم إرسال الرسالة بنجاح</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}