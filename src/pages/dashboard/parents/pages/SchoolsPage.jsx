// =============================================================================
// Enhanced Schools Management Page for Parents
// صفحة إدارة المدارس المتطورة لأولياء الأمور
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSchool,
  FaStar,
  FaSearch,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaTh,
  FaList,
  FaChartLine
} from 'react-icons/fa';

import { Card, Button, Badge, Input, Loading } from '../components/ui';
import { useSchools, useParentProfile } from '../hooks/useData';

/**
 * مكون بطاقة المدرسة المتطورة
 * Enhanced School Card Component
 */
const SchoolCard = ({ school, index, viewMode, onViewDetails, onCompareSchools, onCompareDirectorateSchools, onToggleFavorite, isFavorite }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-purple-500 bg-purple-100';
    if (rating >= 3.5) return 'text-green-500 bg-green-100';
    if (rating >= 3.0) return 'text-yellow-500 bg-yellow-100';
    return 'text-red-500 bg-red-100';
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'ممتاز';
    if (rating >= 3.5) return 'جيد';
    if (rating >= 3.0) return 'متوسط';
    return 'ضعيف';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Card className="hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* School Avatar */}
              <div className="relative">
                <img 
                  src={school.image} 
                  alt={school.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                />
                {school.hasMyChild && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FaGraduationCap className="text-white text-xs" />
                  </div>
                )}
              </div>

              {/* School Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {school.name}
                  </h3>
                  <Badge variant={school.hasMyChild ? 'success' : 'gray'} size="sm">
                    {school.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <span>{school.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{school.studentsCount} طالب</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {school.description}
                </p>
              </div>
            </div>

            {/* Actions & Rating */}
            <div className="flex items-center gap-4">
              {/* Rating */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${getRatingColor(school.overallRating)}`}>
                  <FaStar />
                  <span className="font-bold">{school.overallRating}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{getRatingText(school.overallRating)}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(school.id)}
                  className={isFavorite ? 'text-red-500' : 'text-gray-400'}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </Button>

                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCompareSchools(school)}
                    >
                      <FaChartLine className="ml-1" />
                      مقارنة
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCompareDirectorateSchools(school)}
                      className="text-xs"
                    >
                      <FaChartLine className="ml-1" />
                      مقارنة المديرية
                    </Button>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onViewDetails(school)}
                  >
                    <FaEye className="ml-1" />
                    التفاصيل
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5" />
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(school.id)}
          className={`absolute top-4 left-4 z-10 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-100 text-red-500 hover:bg-red-200' 
              : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-500'
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* My Child Badge */}
        {school.hasMyChild && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="success" size="sm">
              مدرسة طفلي
            </Badge>
          </div>
        )}

        <div className="relative z-10">
          {/* School Image */}
          <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
            <img 
              src={school.image} 
              alt={school.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Rating Overlay */}
            <div className="absolute bottom-4 right-4">
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur bg-white/90 ${getRatingColor(school.overallRating).split(' ')[0]}`}>
                <FaStar />
                <span className="font-bold">{school.overallRating}</span>
              </div>
            </div>
          </div>

          {/* School Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {school.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">{school.type}</Badge>
                <span className="text-sm text-gray-500">{getRatingText(school.overallRating)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="flex-shrink-0" />
              <span className="truncate">{school.location}</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              {school.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100 dark:border-gray-600">
              <div className="text-center">
                <p className="text-lg font-bold text-primary-600">{school.studentsCount}</p>
                <p className="text-xs text-gray-500">طالب</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary-600">{school.teachersCount}</p>
                <p className="text-xs text-gray-500">معلم</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onCompareSchools(school)}
              >
                <FaChartLine className="ml-1" />
                مقارنة
              </Button>
              
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => onViewDetails(school)}
              >
                <FaEye className="ml-1" />
                التفاصيل
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => onCompareDirectorateSchools(school)}
            >
              <FaChartLine className="ml-1" />
              مقارنة مدارس {school.location}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => onViewDetails(school)}
            >
              تقييم المدرسة
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * الصفحة الرئيسية لإدارة المدارس
 * Main Schools Management Page
 */
const SchoolsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const { mySchools: schools, loading } = useSchools({ myChildren: true });
  const { profile: parentProfile } = useParentProfile();

  // Filter schools based on search term
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view details
  const handleViewDetails = (school) => {
    // Navigate to school profile page (to be implemented in School Manager Dashboard)
    console.log('View details for school:', school);
  };

  // Handle compare schools
  const handleCompareSchools = (school) => {
    navigate('/dashboard/parents/schools/comparison', { state: { school } });
  };

  // Handle compare all schools in directorate
  const handleCompareDirectorateSchools = (school) => {
    // Get all schools in the same directorate
    const directorateSchools = schools.filter(s => 
      s.location === school.location && s.id !== school.id
    );
    
    // Navigate to comparison page with all directorate schools
    navigate('/dashboard/parents/schools/comparison', { 
      state: { 
        school,
        directorateSchools
      } 
    });
  };

  // Handle toggle favorite
  const handleToggleFavorite = (schoolId) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(schoolId)) {
        newSet.delete(schoolId);
      } else {
        newSet.add(schoolId);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              مدارس أطفالي
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              إدارة وعرض مدارس الأطفال المسجلين فيها
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="البحث في مدارس أطفالي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<FaSearch />}
            />
          </div>
        </div>
      </motion.div>

      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            تم العثور على <span className="font-bold text-primary-600">{filteredSchools.length}</span> مدرسة
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <FaTh />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Schools Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <Loading size="lg" text="جاري تحميل المدارس..." />
        </div>
      ) : filteredSchools.length > 0 ? (
        <motion.div
          className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredSchools.map((school, index) => (
            <SchoolCard
              key={school.id}
              school={school}
              index={index}
              viewMode={viewMode}
              onViewDetails={handleViewDetails}
              onCompareSchools={handleCompareSchools}
              onCompareDirectorateSchools={handleCompareDirectorateSchools}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(school.id)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <FaSchool className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            لا توجد مدارس
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            لم يتم العثور على مدارس لطفلك
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SchoolsPage;