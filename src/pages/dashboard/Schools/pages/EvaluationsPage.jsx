// =============================================================================
// Advanced School Evaluations Page for schools
// صفحة التقييمات المتطورة للمدارس  schools
// =============================================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar,
  FaChartPie,
  FaChartLine,
  FaSchool,
  FaSave,
  FaEye,
  FaHistory,
  FaAward,
  FaComments,
  FaDownload,
  FaShare,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

import { Card, Button, Badge, ProgressBar, Modal, Alert } from '../components/ui';
import { useSchools, useEvaluations } from '../hooks/useData';

/**
 * معايير التقييم
 * Evaluation Criteria Configuration
 */
const evaluationCriteria = [
  {
    key: 'educationQuality',
    label: 'جودة التعليم',
    description: 'كفاءة المعلمين، طرق التدريس، متابعة الطلاب أكاديمياً',
    icon: FaGraduationCap,
    color: 'from-blue-500 to-blue-600',
    subCriteria: [
      'مستوى المعلمين وخبرتهم',
      'طرق التدريس المستخدمة',
      'متابعة الأداء الأكاديمي',
      'جودة المناهج والمواد التعليمية'
    ]
  },
  {
    key: 'facilities',
    label: 'المرافق والخدمات',
    description: 'نظافة المدرسة، الصفوف والمختبرات، الملاعب والمكتبة',
    icon: FaSchool,
    color: 'from-green-500 to-green-600',
    subCriteria: [
      'نظافة وصيانة المباني',
      'جودة الصفوف الدراسية',
      'توفر المختبرات والمعامل',
      'المرافق الرياضية والترفيهية'
    ]
  },
  {
    key: 'environment',
    label: 'البيئة المدرسية',
    description: 'الانضباط والنظام، بيئة آمنة ومحفزة، تعامل الإدارة',
    icon: FaUsers,
    color: 'from-purple-500 to-purple-600',
    subCriteria: [
      'الأمان داخل المدرسة',
      'انضباط الطلاب والنظام',
      'التعامل مع المشاكل',
      'بيئة محفزة للتعلم'
    ]
  },
  {
    key: 'mentalHealth',
    label: 'الصحة النفسية والدعم',
    description: 'مرشد نفسي/اجتماعي، دعم للطلاب ذوي المشاكل',
    icon: FaComments,
    color: 'from-pink-500 to-pink-600',
    subCriteria: [
      'توفر المرشد النفسي',
      'برامج الدعم النفسي',
      'التعامل مع الطلاب المتعثرين',
      'برامج تطوير المهارات'
    ]
  },
  {
    key: 'communication',
    label: 'التواصل مع الأهالي',
    description: 'سرعة تجاوب الإدارة، قنوات تواصل واضحة',
    icon: FaComments,
    color: 'from-orange-500 to-orange-600',
    subCriteria: [
      'سرعة الرد على الاستفسارات',
      'وضوح قنوات التواصل',
      'التقارير الدورية',
      'الاجتماعات مع الأهالي'
    ]
  },
  {
    key: 'sustainability',
    label: 'الاستدامة والمسؤولية',
    description: 'المحافظة على البيئة، ترشيد استهلاك الموارد',
    icon: FaTrophy,
    color: 'from-yellow-500 to-yellow-600',
    subCriteria: [
      'برامج المحافظة على البيئة',
      'ترشيد استخدام الموارد',
      'برامج التوعية البيئية',
      'المشاريع المجتمعية'
    ]
  }
];

/**
 * مكون سلايدر التقييم التفاعلي
 * Interactive Rating Slider Component
 */
const RatingSlider = ({ criterion, value, onChange, showDetails = false, isValid = true }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const IconComponent = criterion.icon;

  const getRatingText = (rating) => {
    if (rating >= 4.5) return { text: 'ممتاز', color: 'text-purple-600' };
    if (rating >= 3.5) return { text: 'جيد', color: 'text-green-600' };
    if (rating >= 3.0) return { text: 'متوسط', color: 'text-yellow-600' };
    if (rating >= 2.0) return { text: 'ضعيف', color: 'text-orange-600' };
    return { text: 'ضعيف جداً', color: 'text-red-600' };
  };

  const currentRating = hoveredValue !== null ? hoveredValue : value;
  const ratingInfo = getRatingText(currentRating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Card className={`relative overflow-hidden transition-all duration-300 ${
        !isValid ? 'border-2 border-red-500' : 'border border-gray-200'
      }`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${criterion.color} opacity-5`} />
        
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className={`p-4 rounded-xl bg-gradient-to-r ${criterion.color} text-white shadow-lg`}
              whileHover={{ scale: 1.1 }}
            >
              <IconComponent className="text-2xl" />
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {criterion.label}
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {currentRating.toFixed(1)}
                  </div>
                  <div className={`text-sm font-medium ${ratingInfo.color}`}>
                    {ratingInfo.text}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {criterion.description}
              </p>
            </div>
          </div>

          {/* Rating Slider */}
          <div className="space-y-6">
            <div className="relative">
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                onMouseMove={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  const newValue = 1 + (4 * percent);
                  setHoveredValue(Math.min(5, Math.max(1, newValue)));
                }}
                onMouseLeave={() => setHoveredValue(null)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #f97316 25%, #f59e0b 50%, #10b981 75%, #8b5cf6 100%)`
                }}
              />
              
              {/* Rating Labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
                <span>5.0</span>
              </div>
            </div>

            {/* Sub-criteria */}
            {showDetails && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {criterion.subCriteria.map((sub, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{sub}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * مكون بطاقة التقييم العام
 * Overall Rating Card Component
 */
const OverallRatingCard = ({ ratings, onSave, isSaving }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate overall rating
  const overallRating = useMemo(() => {
    const values = Object.values(ratings);
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }, [ratings]);

  // Get rating text and color
  const getRatingInfo = () => {
    if (overallRating >= 4.5) return { text: 'ممتاز', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (overallRating >= 3.5) return { text: 'جيد', color: 'text-green-600', bg: 'bg-green-100' };
    if (overallRating >= 3.0) return { text: 'متوسط', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (overallRating >= 2.0) return { text: 'ضعيف', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { text: 'ضعيف جداً', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const ratingInfo = getRatingInfo();

  // Validate ratings before saving
  const validateRatings = () => {
    const newErrors = {};
    Object.keys(ratings).forEach(key => {
      if (ratings[key] < 1 || ratings[key] > 5) {
        newErrors[key] = 'يجب أن يكون التقييم بين 1 و 5';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateRatings()) {
      onSave();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">التقييم العام</h3>
          
          <div className="relative inline-block">
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {overallRating.toFixed(1)}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${ratingInfo.bg} ${ratingInfo.color}`}>
              {ratingInfo.text}
            </div>
          </div>
          
          <div className="mt-4">
            <ProgressBar 
              value={overallRating} 
              max={5} 
              color={ratingInfo.color.includes('purple') ? 'purple' : 
                    ratingInfo.color.includes('green') ? 'green' : 
                    ratingInfo.color.includes('yellow') ? 'yellow' : 
                    ratingInfo.color.includes('orange') ? 'orange' : 'red'}
              size="lg"
              showPercentage={false}
            />
          </div>
        </div>

        {/* Validation Errors */}
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center text-red-700">
                <FaExclamationTriangle className="mr-2" />
                <span>يرجى تصحيح الأخطاء في التقييمات</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center text-green-700">
                <FaCheckCircle className="mr-2" />
                <span>تم حفظ التقييم بنجاح!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white"
          >
            {isSaving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                جاري الحفظ...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                حفظ التقييم
              </>
            )}
          </Button>
          
          <Button variant="outline" className="w-full">
            <FaDownload className="mr-2" />
            تنزيل التقرير
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * مكون الرسوم البيانية
 * Analytics Charts Component
 */
const AnalyticsCharts = ({ ratings, schoolName }) => {
  // Get top rated criterion
  const topRated = useMemo(() => {
    const entries = Object.entries(ratings);
    if (entries.length === 0) return null;
    return entries.reduce((max, entry) => entry[1] > max[1] ? entry : max);
  }, [ratings]);

  // Get lowest rated criterion
  const lowestRated = useMemo(() => {
    const entries = Object.entries(ratings);
    if (entries.length === 0) return null;
    return entries.reduce((min, entry) => entry[1] < min[1] ? entry : min);
  }, [ratings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">تحليل التقييم</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-2">
              <FaAward className="text-blue-500 mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">أعلى تقييم</h4>
            </div>
            {topRated && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {evaluationCriteria.find(c => c.key === topRated[0])?.label}: {topRated[1].toFixed(1)}
              </p>
            )}
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center mb-2">
              <FaExclamationTriangle className="text-orange-500 mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">أدنى تقييم</h4>
            </div>
            {lowestRated && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {evaluationCriteria.find(c => c.key === lowestRated[0])?.label}: {lowestRated[1].toFixed(1)}
              </p>
            )}
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center mb-2">
              <FaSchool className="text-purple-500 mr-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">المدرسة</h4>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{schoolName}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ======= EvaluationsPage Component =======
const EvaluationsPage = () => {
  const { schools: mySchools, loading: schoolsLoading } = useSchools();
  const { submitEvaluation, loading: submitting } = useEvaluations();
  
  const [selectedSchool, setSelectedSchool] = useState({});
  const [ratings, setRatings] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showSchoolModal, setShowSchoolModal] = useState(false);

  // Initialize with first school
  useMemo(() => {
    if (mySchools.length > 0 && !selectedSchool.id) {
      setSelectedSchool(mySchools[0]);
      // Initialize ratings with default values
      const initialRatings = {};
      evaluationCriteria.forEach(criterion => {
        initialRatings[criterion.key] = 3.0;
      });
      setRatings(initialRatings);
    }
  }, [mySchools, selectedSchool.id]);

  const handleRatingChange = (criterionKey, value) => {
    setRatings(prev => ({
      ...prev,
      [criterionKey]: value
    }));
  };

  const handleSaveEvaluation = async () => {
    try {
      await submitEvaluation({
        schoolId: selectedSchool.id,
        ratings,
        date: new Date().toISOString()
      });
      // Reset form or show success message
    } catch (error) {
      console.error('Error saving evaluation:', error);
    }
  };

  if (schoolsLoading) {
    return (
      <div className="flex justify-center items-center h-64" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              تقييم المدارس
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              قيّم مدارس أبناءك باستخدام معايير شاملة
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant={showDetails ? "primary" : "outline"}
              onClick={() => setShowDetails(!showDetails)}
            >
              <FaEye className="mr-2" />
              {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* School Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    تقييم مدرسة {selectedSchool.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    يرجى تقييم المدرسة باستخدام المعايير التالية
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <select
                    value={selectedSchool.id}
                    onChange={(e) => setSelectedSchool(mySchools.find(s => s.id === e.target.value))}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {mySchools.map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowSchoolModal(true)}
                  >
                    <FaHistory className="ml-2" />
                    التاريخ
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Rating Sliders */}
          <div className="space-y-6">
            {evaluationCriteria.map((criterion, index) => (
              <motion.div
                key={criterion.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <RatingSlider
                  criterion={criterion}
                  value={ratings[criterion.key] || 3.0}
                  onChange={(value) => handleRatingChange(criterion.key, value)}
                  showDetails={showDetails}
                  isValid={ratings[criterion.key] >= 1 && ratings[criterion.key] <= 5}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overall Rating Card */}
          <OverallRatingCard
            ratings={ratings}
            onSave={handleSaveEvaluation}
            isSaving={submitting}
          />

          {/* Analytics Charts */}
          <AnalyticsCharts
            ratings={ratings}
            schoolName={selectedSchool.name}
          />
        </div>
      </div>
    </div>
  );
};

export default EvaluationsPage;