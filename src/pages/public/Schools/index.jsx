import React, { useState, useEffect } from "react";
import { SchoolsProvider } from "./context/SchoolsContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchSection from "./components/SearchSection";
import BestSchools from "./components/BestSchools";
import SchoolsOnArea from "./components/SchoolsOnArea";
import StatisticsSection from "./components/StatisticsSection";
import AddedSchools from "./components/AddedSchools";

// Mock API service for simulating backend data
const schoolsApiService = {
  getPageData: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      pageInfo: {
        title: "المدارس",
        description: "دليل شامل لجميع المدارس في فلسطين مع إمكانية البحث والتقييم"
      },
      searchResults: {
        schools: [
          {
            id: 1,
            title: "مدرسة النجاح الحديثة",
            image: "School 1.jpg",
            rating: 4.8,
            reviewCount: 430,
            students: 500,
            level: "إبتدائي-ثانوي",
            location: "غزة-الرمال",
            established: 2010,
            category: "حكومية"
          },
          {
            id: 2,
            title: "مدرسة الأمل النموذجيَّة",
            image: "School 2.jpg",
            rating: 4.8,
            reviewCount: 430,
            students: 1100,
            level: "ابتدائي",
            location: "طولكرم",
            established: 2008,
            category: "خاصة"
          },
          {
            id: 3,
            title: "مدرسة النجاح الحديثة",
            image: "School 3.jpg",
            rating: 4.8,
            reviewCount: 430,
            students: 720,
            level: "ثانوي",
            location: "خليل الرحمن",
            established: 2015,
            category: "حكومية"
          }
        ],
        totalCount: 3142,
        regions: ["غزة", "الضفة الغربية", "القدس", "طولكرم", "نابلس", "رام الله"]
      },
      bestSchools: {
        title: "أبرز المدارس لهذا الشهر",
        schools: [
          {
            id: 1,
            title: "مدرسة الأمل",
            image: "alamal.png",
            rating: 4.9,
            description: "نظافة عالية وإدارة فعّالة",
            location: "خان يونس",
            achievements: ["أفضل إدارة", "نظافة متميزة"]
          },
          {
            id: 2,
            title: "مدرسة النور",
            image: "alnoor.png",
            rating: 4.0,
            description: "أداء أكاديمي متميّز",
            location: "طولكرم",
            achievements: ["تفوق أكاديمي"]
          },
          {
            id: 3,
            title: "مدرسة الفاروق",
            image: "alfarooq.png",
            rating: 4.5,
            description: "أنشطة لا صفّية ممتازة",
            location: "رام الله",
            achievements: ["أنشطة متنوعة", "تفاعل طلابي"]
          }
        ]
      },
      mapData: {
        title: "المدارس حسب المنطقة / المديرية",
        regions: [
          { name: "غزة", schoolCount: 445, coordinates: [31.5017, 34.4668] },
          { name: "الضفة الغربية", schoolCount: 1890, coordinates: [31.9466, 35.3027] },
          { name: "القدس", schoolCount: 245, coordinates: [31.7683, 35.2137] },
          { name: "نابلس", schoolCount: 312, coordinates: [32.2211, 35.2544] },
          { name: "رام الله", schoolCount: 250, coordinates: [31.9038, 35.2034] }
        ],
        imageUrl: "mapimg.png"
      },
      statistics: {
        title: "إحصائيات عامّة",
        stats: [
          {
            id: 1,
            icon: "office",
            value: 23,
            label: "مديرية",
            description: "23 مديريّة موزّعة ما بين الضفّة الغربيّة و قطاع غزّة المحاصر.",
            animationConfig: {
              dashArray: "210",
              dashOffset: "45",
              rotation: "50"
            }
          },
          {
            id: 2,
            icon: "schoolicon",
            value: 3142,
            label: "مدرسة",
            description: "3,142 مدرسة موزّعة على 23 مديريّة في مناطق الضّفّة وقطاع غزّة.",
            animationConfig: {
              height: "h-[300px]",
              dashArray: "251",
              dashOffset: "37",
              rotation: "160"
            }
          },
          {
            id: 3,
            icon: "team",
            value: 480,
            label: "مشرف",
            description: "لدينا 480 مشرف مسؤوليين عن عملية التقييم، موزّعين على المديريات.",
            animationConfig: {
              dashArray: "200",
              dashOffset: "0",
              rotation: "30"
            }
          }
        ]
      },
      recentSchools: {
        title: "مدارس مُضافة مُؤخرًا",
        schools: [
          {
            id: 1,
            name: "مدرسة الفجر",
            location: "بيت لحم",
            image: "alfajr.png",
            addedDate: "2024-01-15",
            category: "حكومية"
          },
          {
            id: 2,
            name: "مدرسة القمّة",
            location: "النصيرات",
            image: "alqema.png",
            addedDate: "2024-01-10",
            category: "خاصة"
          },
          {
            id: 3,
            name: "مدرسة العودة",
            location: "نابلس",
            image: "alawda.png",
            addedDate: "2024-01-08",
            category: "حكومية"
          }
        ]
      }
    };
  },

  searchSchools: async (searchQuery, filters = {}) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock search logic
    const allSchools = [
      { id: 1, title: "مدرسة النجاح الحديثة", location: "غزة", level: "إبتدائي-ثانوي" },
      { id: 2, title: "مدرسة الأمل النموذجية", location: "طولكرم", level: "ابتدائي" },
      { id: 3, title: "مدرسة الفاروق", location: "رام الله", level: "ثانوي" }
    ];
    
    let filteredSchools = allSchools;
    
    if (searchQuery) {
      filteredSchools = filteredSchools.filter(school => 
        school.title.includes(searchQuery) || school.location.includes(searchQuery)
      );
    }
    
    if (filters.location) {
      filteredSchools = filteredSchools.filter(school => 
        school.location === filters.location
      );
    }
    
    return {
      schools: filteredSchools,
      totalCount: filteredSchools.length,
      searchQuery,
      filters
    };
  },

  submitRating: async (ratingData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success/error response
    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
      return {
        success: true,
        message: "تم إرسال تقييمك بنجاح! شكراً لمساهمتك في تطوير التعليم.",
        data: { id: Date.now(), ...ratingData }
      };
    } else {
      throw new Error("حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.");
    }
  }
};

// Loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg">جاري تحميل البيانات...</p>
    </div>
  </div>
);

// Error component
const ErrorComponent = ({ error, onRetry }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-700 mb-2">حدث خطأ في التحميل</h3>
      <p className="text-red-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
      >
        إعادة المحاولة
      </button>
    </div>
  </div>
);

// Success notification component
const SuccessNotification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl mr-3">✅</div>
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 font-bold text-xl ml-3"
      >
        ×
      </button>
    </div>
  </div>
);

// Main Schools Component
export default function Schools() {
  return (
    <SchoolsProvider>
      <SchoolsContent />
    </SchoolsProvider>
  );
}

// Content component that uses the context
const SchoolsContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch page data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const pageData = await schoolsApiService.getPageData();
      setData(pageData);
    } catch (err) {
      setError(err.message || "فشل في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="font-cairo bg-white text-black" dir="rtl">
        <Header title="المدارس" />
        <LoadingComponent />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-cairo bg-white text-black" dir="rtl">
        <Header title="المدارس" />
        <ErrorComponent error={error} onRetry={fetchData} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      {/* Header */}
      <Header title={data?.pageInfo?.title || "المدارس"} />

      {/* Search Section */}
      <SearchSection data={data?.searchResults} />

      {/* Best Schools */}
      <BestSchools data={data?.bestSchools} />

      {/* Schools on Area Map */}
      <SchoolsOnArea data={data?.mapData} />

      {/* Statistics Section */}
      <StatisticsSection data={data?.statistics} />

      {/* Recently Added Schools */}
      <AddedSchools data={data?.recentSchools} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
