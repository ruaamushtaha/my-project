// =============================================================================
// Click Outside Hook
// هوك النقر خارج العنصر
// =============================================================================

import { useEffect, useRef } from 'react';

/**
 * Hook to detect clicks outside of a component
 * هوك للكشف عن النقرات خارج المكون
 * @param {Function} handler - الدالة التي سيتم استدعاؤها عند النقر خارج العنصر
 */
export const useClickOutside = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;
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

