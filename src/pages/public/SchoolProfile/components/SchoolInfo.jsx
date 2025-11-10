import React from "react";
import { motion } from "framer-motion";
import schoolimg from "../../../../assets/images/alamal.png";
import personcard from "../../../../assets/icons/personcard.svg";
import buildingsblack from "../../../../assets/icons/buildingsblack.svg";
import locate from "../../../../assets/icons/locate.svg";
import studentss from "../../../../assets/icons/studentss.svg";
import teachers from "../../../../assets/icons/teachers.svg";
import percent from "../../../../assets/icons/percent.svg";
import telephone from "../../../../assets/icons/telephone.svg";
import web from "../../../../assets/icons/web.svg";
import gmail from "../../../../assets/icons/gmail.svg";
import staryallow from "../../../../assets/icons/staryallow.svg";

const SchoolInfoCard = ({
  principalName = "مدير المدرسة (د.أحمد محمد)",
  schoolLevel = "المرحلة الإعداديّة",
  additionalInfo = "(من الصف السابع وحتى التاسع)",
  location = "طولكرم",

  studentCount = "300 طالب وطالبة",
  teacherCount = "80 معلم ومعلمة",
  successRate = "نسبة النجاح",

  email = "school@domain.com",
  phone = "08-1234567",
  website = "www.school.ps",
  schoolImage = schoolimg,

  rating = "4.8",
  ratingText = "(430 تقييم)",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(100, 200, 204, 0.4)" }}
      className="bg-babyBlue rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex gap-9 mt-8">
        {/* صورة المدرسة */}
        <motion.div 
          className="relative h-48"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={schoolImage}
            alt="schoolImage"
            className="w-70 h-70 object-cover rounded-xl mb-4"
          />

          {/* تقييم داخل الصورة */}
          <motion.div 
            className="absolute left-2 top-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold"
            whileHover={{ scale: 1.1 }}
          >
            <img src={staryallow} alt="نجمة التقييم" className="w-4 h-4" />
            <span className="text-[#4CAF50] font-medium">{rating}</span>
            <span className="text-black font-light">{ratingText}</span>
          </motion.div>
        </motion.div>

        {/* Right Section - School Info */}
        <motion.div 
          className="flex flex-col space-y-4 min-w-[250px] mt-5" 
          dir="rtl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={personcard} alt="personcard" className="w-4 h-4" />
            <span className="text-gray-700 text-sm font-medium">
              {principalName}
            </span>
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={buildingsblack} alt="buildingsblack" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">
              {schoolLevel}
              <br />
              <span className="text-gray-600 text-xs">{additionalInfo}</span>
            </span>
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={locate} alt="locate" className="w-4 h-4" />
            <span className="text-gray-700 text-sm font-medium">{location}</span>
          </motion.div>
        </motion.div>

        {/* Vertical Divider */}
        <div className="w-px bg-black h-40"></div>

        {/* Middle Section - School Stats */}
        <motion.div 
          className="flex flex-col space-y-4 min-w-[200px] mt-5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={studentss} alt="studentss" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{studentCount}</span>
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={teachers} alt="teachers" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{teacherCount}</span>
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2"
            whileHover={{ x: 5 }}
          >
            <img src={percent} alt="percent" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{successRate}</span>
          </motion.div>
        </motion.div>

        {/* Vertical Divider */}
        <div className="w-px bg-black h-40"></div>

        {/* Left Section - Contact Info */}
        <motion.div 
          className="flex flex-col space-y-4 min-w-[200px] mt-5"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="flex flex-row gap-2 justify-end"
            whileHover={{ x: -5 }}
          >
            <span className="text-gray-700 text-sm">{email}</span>
            <img src={gmail} alt="gmail" className="w-4 h-4" />
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2 justify-end"
            whileHover={{ x: -5 }}
          >
            <span className="text-gray-700 text-sm">{phone}</span>
            <img src={telephone} alt="telephone" className="w-4 h-4" />
          </motion.div>

          <motion.div 
            className="flex flex-row gap-2 justify-end"
            whileHover={{ x: -5 }}
          >
            <span className="text-gray-700 text-sm">{website}</span>
            <img src={web} alt="web" className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SchoolInfoCard;