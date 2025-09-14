// =============================================================================
// Enhanced Schools Management Page for Parents
// صفحة إدارة المدارس المتطورة لأولياء الأمور
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSchool,
  FaStar,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaSort,
  FaTh,
  FaList,
  FaChevronDown,
  FaTrophy,
  FaPhone,
  FaEnvelope,
  FaGlobe
} from 'react-icons/fa';

import Layout from '../components/layout/Layout';
import { Card, Button, Badge, Input, Dropdown, Loading, Modal } from '../components/ui';
import { useSchools, useSearch } from '../hooks/useData';

/**
 * مكون بطاقة المدرسة المتطورة
 * Enhanced School Card Component
 */
const SchoolCard = ({ school, index, viewMode, onViewDetails, onToggleFavorite, isFavorite }) => {
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
                {school.isMyChild && (
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
                  <Badge variant={school.isMyChild ? 'success' : 'gray'} size="sm">
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
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(school.id)}
                  className={isFavorite ? 'text-red-500' : 'text-gray-400'}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onViewDetails(school)}
                >
                  <FaEye className="ml-2" />
                  التفاصيل
                </Button>
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
        {school.isMyChild && (
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

            {/* Action Button */}
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300"
              onClick={() => onViewDetails(school)}
            >
              <FaEye className="ml-2" />
              عرض التفاصيل
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * مكون فلاتر البحث المتقدم
 * Advanced Search Filters Component
 */
const SearchFilters = ({ filters, onFiltersChange, onReset }) => {
  const [showFilters, setShowFilters] = useState(false);

  const schoolTypes = [
    { value: 'all', label: 'جميع المراحل' },
    { value: 'ابتدائية', label: 'ابتدائية' },
    { value: 'متوسطة', label: 'متوسطة' },
    { value: 'ثانوية', label: 'ثانوية' }
  ];

  const sortOptions = [
    { value: 'name', label: 'الاسم' },
    { value: 'overallRating', label: 'التقييم' },
    { value: 'studentsCount', label: 'عدد الطلاب' },
    { value: 'location', label: 'الموقع' }
  ];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في المدارس..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            icon={<FaSearch />}
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <FaFilter />
          فلاتر
          <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-gray-50 dark:bg-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Dropdown
                  label="نوع المدرسة"
                  options={schoolTypes}
                  value={filters.type || 'all'}
                  onChange={(value) => onFiltersChange({ type: value })}
                />

                <Dropdown
                  label="ترتيب حسب"
                  options={sortOptions}
                  value={filters.sortBy || 'name'}
                  onChange={(value) => onFiltersChange({ sortBy: value })}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">التقييم الأدنى</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={filters.minRating || ''}
                    onChange={(e) => onFiltersChange({ minRating: e.target.value })}
                  >
                    <option value="">أي تقييم</option>
                    <option value="4.5">4.5+ ممتاز</option>
                    <option value="3.5">3.5+ جيد</option>
                    <option value="3.0">3.0+ متوسط</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.myChildren || false}
                      onChange={(e) => onFiltersChange({ myChildren: e.target.checked })}
                      className="rounded"
                    />
                    مدارس أطفالي فقط
                  </label>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={onReset}>
                  إعادة تعيين
                </Button>
                <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>
                  تطبيق الفلاتر
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * مكون تفاصيل المدرسة السريعة
 * Quick School Details Modal Component
 */
const SchoolDetailsModal = ({ school, isOpen, onClose }) => {
  if (!school) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={school.name}
      size="lg"
    >
      <div className="space-y-6">
        {/* School Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            <Badge variant={school.isMyChild ? 'success' : 'gray'}>
              {school.isMyChild ? 'مدرسة طفلي' : school.type}
            </Badge>
          </div>
        </div>

        {/* School Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">معلومات أساسية</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-500" />
                <span>{school.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-primary-500" />
                <span>{school.studentsCount} طالب</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-primary-500" />
                <span>{school.teachersCount} معلم</span>
              </div>
              {school.contact && (
                <>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-primary-500" />
                    <span>{school.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-primary-500" />
                    <span>{school.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGlobe className="text-primary-500" />
                    <span>{school.contact.website}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">التقييم والإنجازات</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>التقييم العام</span>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold">{school.overallRating}/5</span>
                </div>
              </div>
              
              {school.achievements && (
                <div>
                  <h4 className="font-semibold mb-2">الإنجازات</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {school.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FaTrophy className="text-yellow-500 text-xs" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">نبذة عن المدرسة</h3>
          <p className="text-gray-600 dark:text-gray-400">{school.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button variant="primary" className="flex-1">
            <FaStar className="ml-2" />
            تقييم المدرسة
          </Button>
          <Button variant="outline" className="flex-1">
            <FaEye className="ml-2" />
            عرض الملف الكامل
          </Button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * الصفحة الرئيسية لإدارة المدارس
 * Main Schools Management Page
 */
const SchoolsPage = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const { schools, loading, total, updateFilters, clearFilters } = useSchools(filters);
  const { sortedItems: filteredSchools } = useSearch(
    schools, 
    ['name', 'location', 'description']
  );

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateFilters(updatedFilters);
  };

  // Handle filters reset
  const handleFiltersReset = () => {
    setFilters({});
    clearFilters();
  };

  // Handle view details
  const handleViewDetails = (school) => {
    setSelectedSchool(school);
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
    <Layout
      title="إدارة المدارس"
      subtitle={`${total} مدرسة متاحة`}
      breadcrumbs={['الرئيسية', 'المدارس']}
    >
      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleFiltersReset}
        />
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

          {/* Sort */}
          <Button variant="outline" size="sm">
            <FaSort className="ml-2" />
            ترتيب
          </Button>
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
            لم يتم العثور على مدارس تطابق معايير البحث الخاصة بك
          </p>
          <Button variant="primary" onClick={handleFiltersReset}>
            إعادة تعيين الفلاتر
          </Button>
        </motion.div>
      )}

      {/* School Details Modal */}
      <SchoolDetailsModal
        school={selectedSchool}
        isOpen={!!selectedSchool}
        onClose={() => setSelectedSchool(null)}
      />
    </Layout>
  );
};

export default SchoolsPage;
