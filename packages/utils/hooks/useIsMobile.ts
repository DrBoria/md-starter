// useIsMobile.ts
import { useState, useEffect } from 'react';

// Custom hook to determine if the user is on a mobile device
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfMobile = (): boolean | null => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    };

    setIsMobile(checkIfMobile());
    
    // Optional: Add event listener for window resize or orientation changes
    // This part can be omitted depending on the use case
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return isMobile;
};

export { useIsMobile };
