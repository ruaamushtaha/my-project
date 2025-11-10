import React, { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import School1 from '../../../../assets/images/School 1.jpg';
import School2 from '../../../../assets/images/School 2.jpg';
import School3 from '../../../../assets/images/School 3.jpg';
import search2 from "../../../../assets/icons/search2.svg";
  
const SchoolSection = () => {
  const navigate = useNavigate();

  const goToSchoolProfile = () => {
    navigate("/schoolProfile"); 
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const schools = [
    {
      id: 1,
      name: "مدرسة النجاح الحديثة",
      image: School1,
      location: "غزة - الرمال",
      students: "500",
      levels: "ابتدائي - ثانوي",
      rating: "4.8",
      reviews: "430"
    },
    {
      id: 2,
      name: "مدرسة الأمل النموذجيَّة",
      image: School2,
      location: "طول كرم",
      students: "1100",
      levels: "ابتدائي",
      rating: "4.5",
      reviews: "85"
    },
    {
      id: 3,
      name: "مدرسة المستقبل التطويرية",
      image: School3,
      location: "خليل الرحمن",
      students: "720",
      levels: "ثانوي",
      rating: "4.9",
      reviews: "150"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setFilteredSchools(schools);
        setLoading(false);
      } catch (err) {
        setError("Failed to load schools data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = schools.filter(school =>
        school.name.includes(searchTerm) || school.location.includes(searchTerm)
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-cairo flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المدارس...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-cairo flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-cairo flex flex-col items-center" dir="rtl">

      {/* قسم البحث */}
      <section className="py-10 px-4 w-full">
        <div className="mx-auto max-w-8xl">
          <motion.form 
            onSubmit={handleSearch}
            className="flex items-center bg-[#F2F3F0] rounded-lg px-4 py-3 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={search2}
              alt="أيقونة البحث"
              className="h-5 w-5 object-contain ml-2"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن اسم المدرسة أو اسم المنطقة.."
              className="w-full bg-[#F2F3F0] text-right focus:outline-none placeholder-[#A9A9A9] font-light"
            />
          </motion.form>
        </div>
      </section>

      {/* قسم البطاقات */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {filteredSchools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لم يتم العثور على مدارس مطابقة لبحثك</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                عرض جميع المدارس
              </button>
            </div>
          ) : (
            filteredSchools.map((school, index) => (
              <motion.div
                key={school.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = "/placeholder-school.jpg"; }}
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-green-600 font-medium">{school.rating}</span>
                    <span className="text-black font-light text-xs">({school.reviews} تقييم)</span>
                  </div>
                </div>

                <div className="p-4 text-right">
                  <h3 className="text-lg font-semibold mb-3">{school.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span className="font-normal">{school.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUsers className="w-4 h-4" />
                      <span className="font-normal">{school.students} طالب</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaGraduationCap className="w-4 h-4" />
                      <span className="font-normal">{school.levels}</span>
                    </div>
                  </div>
                   <motion.button
        onClick={goToSchoolProfile} 
        className="w-full font-medium text-primary border border-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        عرض التفاصيل
      </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SchoolSection;
