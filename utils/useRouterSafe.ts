import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useRouterSafe = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null during SSR or before hydration
  if (!isClient) {
    return null;
  }

  // Return safe router object
  return {
    ...router,
    isReady: router.isReady && isClient,
    pathname: router.pathname || '/',
    asPath: router.asPath || '/',
    query: router.query || {},
  };
};
