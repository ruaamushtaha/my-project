// =============================================================================
// Pages Index File - Export all dashboard pages
// ملف الفهرس للصفحات - تصدير جميع صفحات الداشبورد
// =============================================================================

// Main Dashboard Pages
export { default as Dashboard } from './Dashboard';
export { default as SchoolsPage } from './SchoolsPage';
export { default as EvaluationsPage } from './EvaluationsPage';

// Re-export components that are still needed
export { default as SchoolEvaluations } from '../SchoolEvaluations';
export { default as SchoolProfile } from '../components/SchoolProfile';
