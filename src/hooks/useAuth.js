// =============================================================================
// Centralized Auth Hook
// هوك المصادقة المركزي
// =============================================================================

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook to access authentication context
 * هوك للوصول إلى سياق المصادقة
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

