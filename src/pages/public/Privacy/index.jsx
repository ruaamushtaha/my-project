import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import headerimg from '../../../assets/images/headerimg1.png';
import focus1 from '../../../assets/images/focus1.png';
import focus2 from '../../../assets/images/focus2.png';

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

const Privacy = () => {
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
        <Header title="            سياسة الخصوصيّة
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
                نحن في "رؤى التعليم المستقبليَّة"، نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. <br/>
                هذه السياسة توضح كيف نجمع ونستخدم ونحمي المعلومات التي تقدمها لنا أثناء  <br/>استخدامك لموقعنا.
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
                نحن ندرك أن خصوصية البيانات أمر بالغ الأهمية، وخاصة في السياقات التعليمية التي   <br/>
                تتطلب مستوى عاليًا من الثقة والشفافية. لذلك، فإننا نحرص على التعامل مع بياناتك <br/>
                الشخصية بأقصى درجات الحرف، وفقًا لأفضل الممارسات والمعايير القانونية والتنظيمية <br/>
                المعتمدة
              </motion.p>
            </motion.div>

            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              1. المعلومات التي نجمعها
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 space-y-2 mb-6 font-normal"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                المعلومات الشخصية مثل الاسم، عنوان البريد الإلكتروني، ورقم الهاتف
              </motion.li>
              <motion.li variants={listItemVariants}>معلومات الأطفال المستخدمين في النظام</motion.li>
              <motion.li variants={listItemVariants}>المعلومات الدراسية والأكاديمية</motion.li>
              <motion.li variants={listItemVariants}>بيانات استخدام الموقع والأدوات</motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              2. كيفية استخدام المعلومات
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 space-y-2 mb-6 font-normal"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>تحسين تجربة المستخدم.</motion.li>
              <motion.li variants={listItemVariants}>تقديم الخدمات التعليمية المخصصة</motion.li>
              <motion.li variants={listItemVariants}>التواصل مع المستخدمين</motion.li>
              <motion.li variants={listItemVariants}>تحسين الخدمات المقدمة.</motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              3. حماية المعلومات
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 font-normal space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                نقوم بتطبيق إجراءات مناسبة لحماية المعلومات من الوصول غير المصرح به أو الكشف أو الاستخدام غير المصرح <br/>به.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              4. مشاركة المعلومات
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 space-y-2 font-normal mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                قد نشارك المعلومات مع الجهات التعليمية أو المؤسسات ذات العلاقة عند الضرورة، بشرط الحفاظ على خصوصيتها <br/>وعدم استخدامها خارج نطاق الغرض المحدد.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              5. حقوقك
            </motion.h2>
            <motion.ul 
              className="list-disc font-normal pr-6 space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك الاتصال بنا في أي وقت للاستفسار عن<br/> معلوماتك أو طلب تعديلها.
              </motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-2xl font-semibold mt-8 mb-4"
              variants={headingVariants}
            >
              6. التغييرات على السياسة
            </motion.h2>
            <motion.ul 
              className="list-disc pr-6 font-normal space-y-2 mb-6"
              variants={listVariants}
            >
              <motion.li variants={listItemVariants}>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ التحديث.
              </motion.li>
            </motion.ul>
            
            <motion.div 
              className="border-t-2 border-primary font-light p-4 mt-8"
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>
                <span className="text-primary font-normal">للاستفسار:</span> إذا كانت لديك أي أسئلة حول سياسة الخصوصية التي نطبقها، يرجى التواصل معنا عبر البريد الإلكتروني:
                privacy@education-insights.ps
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Privacy;