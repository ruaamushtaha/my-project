import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { ReactComponent as ChevronRight } from "../../../../assets/icons/whiteSlide.svg";

const stars = '★★★★★';

const RatingCard = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.02, 
      boxShadow: "0px 0px 15px rgba(100, 200, 204, 0.3)",
      y: -5
    }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-xl p-4 w-full sm:w-[30%]"
  >
    <p className="font-normal text-primary">{title}</p>
    <p className="text-sm mt-1 font-light text-[#757777]">{description}</p>
    <motion.div 
      className="text-yellow-500 text-lg text-center mt-4"
      whileHover={{ scale: 1.1 }}
    >
      {stars}
    </motion.div>
  </motion.div>
);

export default function EvaluateFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white font-sans" dir="rtl">
      {/* القسم الثاني */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white m-6 rounded-xl shadow-md border border-gray-100"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block bg-primary text-white px-4 rounded-l mb-6 mt-5 text-sm font-medium py-2"
        >
          نموذج التقييم (ساهم بتقييمكَ؛ لبناء بيئة تعليميَّة أفضل!) 
        </motion.h3>

        {/* الهوية والإيميل */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-6 mb-6 mx-5"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 10px rgba(100, 200, 204, 0.2)" }}
            className="flex-1 bg-[#F6F8F8] p-5 rounded-xl"
          >
            <label className="block font-normal text-primary mb-2">هِويِّة المُقيِّم:</label>
            <motion.select
              whileFocus={{ scale: 1.02 }}
              className="w-full border rounded p-2"
            >
              <option value="" className="text-[#A9A9A9]">اختر </option>
              <option value="طالب">مشرف تربوي </option>
              <option value="ولي أمر">ولي أمر</option>
              <option value="معلم">مدير مدرسة</option>
            </motion.select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 10px rgba(100, 200, 204, 0.2)" }}
            className="flex-1 bg-[#F6F8F8] p-5 rounded-xl"
          >
            <label className="block font-normal text-primary mb-2">البريد الإلكتروني:<span className="font-light">(اختياري)</span></label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                className="w-full border rounded pl-10 pr-3 py-2 text-left placeholder:text-left text-[#A9A9A9] outline-none"
                placeholder="name1587@example.com"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* المعايير */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 p-5 bg-[#F6F8F8] mx-5 rounded-xl"
        >
          <motion.label
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="block font-normal my-4 text-primary text-center"
          >
            المعايير الخاصّة بالتقييم<span className="font-light">(قيِّم باستخدام النجوم)</span>
          </motion.label>
          <div className="flex flex-wrap gap-4">
            <RatingCard 
              index={0}
              title="الأداء الأكاديمي" 
              description="(كفاءة المعلمين ووضوح الشرح وأساليب التدريس المستخدمة في رفع مستوى الطلاب وتحفيزهم على التعلم.)" 
            />
            <RatingCard 
              index={1}
              title="الإدارة والانضباط" 
              description="(مدى التزام المدرسة بتطبيق الأنظمة والقوانين وتنظيم أوقات الحصص والتعامل مع الطلاب بعدل واحترا..)" 
            />
            <RatingCard 
              index={2}
              title=" الأنشطة والفعاليات" 
              description="(تنوّع الأنشطة والبرامج اللامنهجيَّة و صقل مهارات الطلاب.)" 
            />
            <RatingCard 
              index={3}
              title="المرافق والخدمات" 
              description="(كفاءة المعلمين ووضوح الشرح وأساليب التدريس المستخدمة في رفع مستوى الطلاب وتحفيزهم على التعلم.)" 
            />
            <RatingCard 
              index={4}
              title="النظافة والبيئة المدرسيَّة" 
              description="(نظافة الصفوف والساحات ودورات المياه وتوفير بيئة آمنة وصحية للطلاب.)" 
            />
          </div>
        </motion.div>

        {/* الملاحظات */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6 bg-[#F6F8F8] mx-5 p-4 rounded-xl"
        >
          <label className="block font-normal text-primary mb-2">ملاحظاتك حول المدرسة:</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            rows="4" 
            className="w-full border rounded p-2"
            placeholder="شاركنا جميع ملاحظات؟ ما الذي أعجبك أو لم يعجبك في المدرسة؟ هل يوجد أي اقتراح تحسيني؟.."
          />
        </motion.div>

        {/* الخصوصية */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-6 rounded-xl items-center gap-2 bg-[#F6F8F8] mx-5 p-4"
        >
          <h3 className="font-normal text-primary mb-2">الخصوصيَّة والموافقة:</h3>
          <input type="checkbox" id="agree" />
          <label htmlFor="agree" className="text-sm text-[#757777]">أُقرّ بأنَّ تقييمي صادق وغير مسييء وأوافق على سياسة النشر.</label>
        </motion.div>

        {/* زر الإرسال */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 15px rgba(100, 200, 204, 0.5)" 
            }}
            whileTap={{ 
              scale: 0.95,
              y: 2
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2 hover:bg-cyan-600 rounded-xl w-72 h-12 border-b-2 ml-2 mb-12 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <span>إرسال التقييم</span>
                <ChevronRight className="w-6 h-6 text-white" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            تم إرسال التقييم بنجاح!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}