// =============================================================================
// Debounce Hook
// هوك التأخير
// =============================================================================

import { useState, useEffect } from 'react';

/**
 * Hook to debounce a value
 * هوك لتأخير قيمة
 * @param {any} value - القيمة المراد تأخيرها
 * @param {number} delay - وقت التأخير بالميلي ثانية
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

