// =============================================================================
// Charts API Service - Mock Implementation
// خدمة API للرسوم البيانية - تنفيذ وهمي
// =============================================================================

/**
 * محاكاة تأخير الشبكة لتجربة واقعية
 * Simulate network delay for realistic experience
 */
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * بيانات وهمية للرسوم البيانية
 * Mock data for charts
 */
const mockChartData = {
  // بيانات عدد التقييمات
  numEvaluations: {
    currentYear: [500, 800, 1200, 2000, 2400, 1800, 1600],
    previousYear: [300, 600, 900, 1200, 1800, 2200, 2000],
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو']
  },
  
  // بيانات الأداء
  performance: {
    schools: [
      'الأمل', 'الفاروق', 'التميّز', 'النور', 'الفارابي', 
      'ابن القيّم', 'المتميِّزون', 'الشافعي', 'الرمال', 
      'ابن سينا', 'المبدعون', 'يافا'
    ],
    performanceData: [60, 90, 75, 100, 30, 85, 60, 90, 75, 100, 30, 85]
  },
  
  // بيانات معايير التقييم
  evaluationCriteria: {
    criteria: [
      'أخرى', 'الخدمات', 'الأنشطة التفاعلية', 
      'الإدارة', 'الأنشطة التفاعلية', 'جودة التعليم'
    ],
    ratings: [60, 95, 75, 100, 40, 85]
  },
  
  // بيانات المراحل الدراسية
  educationStages: {
    stages: ['طلاب_ابتدائي', 'طلاب_إعدادي', 'مشتركة_ابتدائي', 'طالبات_ابتدائي'],
    percentages: [52.1, 22.8, 13.9, 11.2]
  }
};

/**
 * استدعاء بيانات عدد التقييمات
 * Fetch number of evaluations data
 * @returns {Promise<Object>} بيانات عدد التقييمات
 */
export const getNumEvaluationsData = async () => {
  await simulateDelay(800);
  return mockChartData.numEvaluations;
};

/**
 * استدعاء بيانات الأداء
 * Fetch performance data
 * @returns {Promise<Object>} بيانات الأداء
 */
export const getPerformanceData = async () => {
  await simulateDelay(800);
  return mockChartData.performance;
};

/**
 * استدعاء بيانات معايير التقييم
 * Fetch evaluation criteria data
 * @returns {Promise<Object>} بيانات معايير التقييم
 */
export const getEvaluationCriteriaData = async () => {
  await simulateDelay(800);
  return mockChartData.evaluationCriteria;
};

/**
 * استدعاء بيانات المراحل الدراسية
 * Fetch education stages data
 * @returns {Promise<Object>} بيانات المراحل الدراسية
 */
export const getEducationStagesData = async () => {
  await simulateDelay(800);
  return mockChartData.educationStages;
};

/**
 * استدعاء جميع بيانات الرسوم البيانية
 * Fetch all charts data
 * @returns {Promise<Object>} جميع بيانات الرسوم البيانية
 */
export const getAllChartsData = async () => {
  await simulateDelay(1200);
  return mockChartData;
};

export default {
  getNumEvaluationsData,
  getPerformanceData,
  getEvaluationCriteriaData,
  getEducationStagesData,
  getAllChartsData
};