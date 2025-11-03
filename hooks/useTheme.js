// =============================================================================
// Centralized Theme Hook
// هوك السمات المركزي
// =============================================================================

import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

/**
 * Hook to access theme context
 * هوك للوصول إلى سياق السمات
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default useTheme;

