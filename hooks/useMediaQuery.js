// =============================================================================
// Media Query Hook
// هوك استعلام الوسائط
// =============================================================================

import { useState, useEffect } from 'react';

/**
 * Hook to check if a media query matches
 * هوك للتحقق من تطابق استعلام الوسائط
 * @param {string} query - استعلام الوسائط
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Define listener
    const listener = (e) => setMatches(e.matches);

    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;

