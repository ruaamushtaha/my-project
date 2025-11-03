import React, { useState, useRef, useEffect, useContext } from "react";
import { SchoolsContext } from "../context/SchoolsContext";

import building from "../../../../assets/icons/buildingsblack.svg";
import students from "../../../../assets/icons/studentss.svg";
import locate from "../../../../assets/icons/locate.svg";
import search2 from "../../../../assets/icons/search2.svg";
import staryallow from "../../../../assets/icons/staryallow.svg";

import school from "../../../../assets/images/School 1.jpg";
import school2 from "../../../../assets/images/School 2.jpg";
import school3 from "../../../../assets/images/School 3.jpg";

// Custom hook for fade-in animation on scroll
const useFadeInAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

// Enhanced School Card Component
const SchoolCard = ({ school, index, isVisible, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageMap = {
    "School 1.jpg": school,
    "School 2.jpg": school2,
    "School 3.jpg": school3
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 cursor-pointer
        transform hover:scale-105 hover:shadow-xl
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* School Image */}
      <div className="relative h-48">
        <img
          src={imageMap[school.image] || school.image}
          alt="صورة مدرسة"
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Rating Badge */}
        <div className={`absolute left-2 top-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          <img src={staryallow} alt="نجمة التقييم" className="w-4 h-4" />
          <span className="text-[#4CAF50] font-medium">{school.rating}</span>
          <span className="text-black font-light">({school.reviewCount} تقييم)</span>
        </div>
      </div>

      {/* School Information */}
      <div className="p-4 text-right">
        <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
          isHovered ? 'text-primary' : 'text-gray-900'
        }`}>
          {school.title}
        </h3>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <img src={locate} alt="موقع المدرسة" className="w-4 h-4" />
            <span className="font-normal">{school.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <img src={students} alt="عدد الطلاب" className="w-4 h-4" />
            <span className="font-normal">{school.students} طالب</span>
          </div>

          <div className="flex items-center gap-1">
            <img src={building} alt="المستوى التعليمي" className="w-4 h-4" />
            <span className="font-normal">{school.level}</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onViewDetails && onViewDetails(school)}
          className={`w-full font-medium border py-2 rounded-lg transition-all duration-300 transform ${
            isHovered 
              ? 'bg-primary text-white border-primary scale-105' 
              : 'text-primary border-primary hover:bg-primary hover:text-white'
          }`}
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

// Enhanced Search Component
const SearchComponent = ({ onSearch, searchLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} className="mx-auto">
      <div className={`flex items-center bg-[#F2F3F0] rounded-lg px-4 py-3 shadow-sm  transition-all duration-300 ${
        isFocused ? 'border-primary shadow-md' : 'border-gray-300'
      }`}>
        <img
          src={search2}
          alt="أيقونة البحث"
          className="h-5 w-5 object-contain ml-2"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="ابحث عن اسم المدرسة أو اسم المنطقة"
          disabled={searchLoading}
          className="w-full bg-[#F2F3F0] text-right focus:outline-none placeholder-[#A9A9A9] font-light"
        />

        {searchQuery && (
          <button
            type="submit"
            disabled={searchLoading}
            className={`mr-2 px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
              searchLoading 
                ? 'bg-gray-400 text-gray-600' 
                : 'bg-primary text-white hover:bg-secondary'
            }`}
          >
            {searchLoading ? 'جاري...' : 'بحث'}
          </button>
        )}
      </div>
    </form>
  );
};

export default function SearchSection({ data }) {
  const { state, dispatch } = useContext(SchoolsContext) || { state: {}, dispatch: () => {} };
  const [searchRef, isSearchVisible] = useFadeInAnimation(0.2);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query) => {
    try {
      setSearchLoading(true);
      // Mock search functionality - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = {
        schools: data?.schools?.filter(school => 
          school.title.toLowerCase().includes(query.toLowerCase()) ||
          school.location.toLowerCase().includes(query.toLowerCase())
        ) || [],
        totalCount: 0
      };
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleViewDetails = (school) => {
    console.log('Viewing details for:', school);
  };

  const displaySchools = showResults ? searchResults?.schools : data?.schools;

  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      {/* Search Section */}
      <section className="py-10 px-4 bg-white w-full">
        <div 
          ref={searchRef}
          className={`transition-all duration-1000 ${
            isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <SearchComponent 
            onSearch={handleSearch}
            searchLoading={searchLoading}
          />
        </div>

        {showResults && searchResults && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              تم العثور على <span className="font-bold text-primary">{searchResults.schools.length}</span> مدرسة
            </p>
            <button 
              onClick={() => {setShowResults(false); setSearchResults(null);}}
              className="mt-2 text-primary hover:text-secondary transition-colors duration-300 text-sm"
            >
              عرض جميع المدارس
            </button>
          </div>
        )}
      </section>

      {/* Schools Cards Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {displaySchools?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displaySchools.map((school, index) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  index={index}
                  isVisible={true}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}