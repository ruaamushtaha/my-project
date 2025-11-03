import React from "react";
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
    <div className="bg-babyBlue rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex gap-9 mt-8">

        {/* صورة المدرسة */}
        <div className="relative h-48">
          <img
            src={schoolImage}
            alt="schoolImage"
            className="w-70 h-70 object-cover rounded-xl mb-4"
          />

          {/* تقييم داخل الصورة */}
          <div className="absolute left-2 top-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <img src={staryallow} alt="نجمة التقييم" className="w-4 h-4" />
            <span className="text-[#4CAF50] font-medium">{rating}</span>
            <span className="text-black font-light">{ratingText}</span>
          </div>
        </div>


        {/* Right Section - School Info */}
        <div className="flex flex-col space-y-4 min-w-[250px] mt-5" dir="rtl">
          <div className="flex flex-row gap-2">
            <img src={personcard} alt="personcard" className="w-4 h-4" />
            <span className="text-gray-700 text-sm font-medium">
              {principalName}
            </span>
          </div>

          <div className="flex flex-row gap-2">
            <img src={buildingsblack} alt="buildingsblack" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">
              {schoolLevel}
              <br />
              <span className="text-gray-600 text-xs">{additionalInfo}</span>
            </span>
          </div>

          <div className="flex flex-row gap-2">
            <img src={locate} alt="locate" className="w-4 h-4" />
            <span className="text-gray-700 text-sm font-medium">{location}</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-black h-40"></div>

        {/* Middle Section - School Stats */}
        <div className="flex flex-col space-y-4 min-w-[200px] mt-5">
          <div className="flex flex-row gap-2">
            <img src={studentss} alt="studentss" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{studentCount}</span>
          </div>

          <div className="flex flex-row gap-2">
            <img src={teachers} alt="teachers" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{teacherCount}</span>
          </div>

          <div className="flex flex-row gap-2">
            <img src={percent} alt="percent" className="w-4 h-4" />
            <span className="text-gray-700 text-sm">{successRate}</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-black h-40"></div>

        {/* Left Section - Contact Info */}
        <div className="flex flex-col space-y-4 min-w-[200px] mt-5">
          <div className="flex flex-row gap-2 justify-end">
            <span className="text-gray-700 text-sm">{email}</span>
            <img src={gmail} alt="gmail" className="w-4 h-4" />
          </div>

          <div className="flex flex-row gap-2 justify-end">
            <span className="text-gray-700 text-sm">{phone}</span>
            <img src={telephone} alt="telephone" className="w-4 h-4" />
          </div>

          <div className="flex flex-row gap-2 justify-end">
            <span className="text-gray-700 text-sm">{website}</span>
            <img src={web} alt="web" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolInfoCard;
