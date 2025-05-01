import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @param query Media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Add listener for changes
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    
    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
