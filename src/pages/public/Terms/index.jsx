import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import headerimg from '../../../assets/images/headerimg1.png';
import focus1 from '../../../assets/images/focus1.jpeg';
import focus2 from '../../../assets/images/focus2.jpeg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#EFEFEF]" dir="rtl">
      {/* الهيدر */}
      <motion.div
        className="relative h-[210px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img 
          src={headerimg} 
          alt="خلفية الهيدر" 
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-600/50 to-cyan-950/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
        <Header title="            الشروط والأحكام
" variant="default" />
      </motion.div>

      <motion.main
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-[#FFF9F9] rounded-2xl shadow-lg p-6 md:p-8 text-black"
          variants={itemVariants}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <motion.div 
              className="flex gap-3"
              variants={itemVariants}
            >
              <motion.img 
                src={focus1} 
                alt=" focus1" 
                className="w-20 h-20 rounded-lg"
                variants={imageVariants}
                whileHover="hover"
              />
              <motion.p 
                className="mb-6 font-medium"
                variants={itemVariants}
              >
                هذه الشروط والأحكام تنظِّم استخدامك لموقع "رُؤى التعليم المستقبليَّة"، وجميع الخدمات<br/>
                المرتبطة به. <br/>
                باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex gap-3 pr-9 mt-2"
              variants={itemVariants}
            >
              <motion.img 
                src={focus2} 
                alt="focus2" 
                className="w-20 h-20 rounded-lg"
                variants={imageVariants}
                whileHover="hover"
              />
              <motion.p 
                className="mb-6 font-normal"
                variants={itemVariants}
              >
                نحن نوصي بقراءة هذه الشروط والأحكام بعناية قبل البدء في استخدام الموقع أو أي من
                <br/>
                خدماته. تهدف هذه الشروط إلى تنظيم العلاقة بينك كمستخدم وبين "رُؤى التعليم 
                <br/>
                المستقبليَّة"، وضمان الاستخدام الآمن والعادل للمنصة من قبل جميع الأطراف. إذا كنت لا 
                <br/>
                توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام الموقع أو الخدمات المرتبطة به.
              </motion.p>
            </motion.div>

            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              1. قبول الشروط
            </motion.h2>
            <motion.ul 
              className="list-disc font-normal pr-6 space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                باستخدامك لهذا الموقع، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام<br/> بهذه الشروط والأحكام.
                إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى <br/>عدم استخدام الموقع.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              2. استخدام الموقع
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 space-y-2 mb-6 font-normal"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>يُمنع استخدام الموقع لأغراض غير قانونية أو ضارة.</motion.li>
              <motion.li variants={listItemVariants}>يُمنع محاولة اختراق الموقع أو أدوات الحماية الأمنية.</motion.li>
              <motion.li variants={listItemVariants}>يُمنع استخدام الموقع لنشر محتوى غير لائق أو انتهاك الخصوصية.</motion.li>
              <motion.li variants={listItemVariants}> نحتفظ بحق حذف أو حظر أي محتوى مخالف أو مشبوه.</motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              3. حقوق الملكية
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 font-normal space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                جميع المحتويات والبيانات والمعلومات الموجودة في هذا الموقع هي ملك لـ "رُؤى التعليم المستقبليَّة"، ومحميّة<br/> بموجب قوانين حقوق الملكية الفكرية.   
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              4. التقييمات والمحتوى
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 space-y-2 font-normal mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>التقييمات المقدمة من المستخدمين تعبر عن آرائهم الشخصية.</motion.li>
              <motion.li variants={listItemVariants}>نحتفظ بحق مراجعة أو حذف التقييمات المخالفة. </motion.li>
              <motion.li variants={listItemVariants}>يتحمل المستخدم مسؤولية المحتوى الذي ينشره.</motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              5. الحد من المسؤولية
            </motion.h2>
            <motion.ul 
              className="list-disc font-normal pr-6 space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                نُسجّل أقصى معلومات دقيقة وموثوقة، لكن لا نضمن خلو الموقع أو انقطاع الخدمة. استخدامك للموقع يكون <br/>على مسؤوليتك الشخصية.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              6. التعديلات
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 font-normal space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. 
                سيتم نشر النسخة المحدثة على هذا الموقع مع تاريخ <br/>التحديث.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              7. القانون الواجب تطبيقه
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 font-normal space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                تخضع هذه الشروط والأحكام لقوانين دولة فلسطين. 
                أي نزاع ينشأ عن استخدامك للموقع يخضع لاختصاص محاكم غزة.
              </motion.li>
            </motion.ul>
            
            <motion.div 
              className="border-t-2 border-primary font-light p-4 mt-8"
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>
                <span className="text-primary font-normal">آخر تحديث:</span>  9 سبتمبر 2025م
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Terms;