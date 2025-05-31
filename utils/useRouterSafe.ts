
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useRouterSafe() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  // Return safe router object
  return {
    ...router,
    isReady,
    pathname: isReady ? router.pathname : '',
    query: isReady ? router.query : {},
    asPath: isReady ? router.asPath : '',
    // Safe methods that check readiness
    push: isReady ? router.push : () => Promise.resolve(true),
    replace: isReady ? router.replace : () => Promise.resolve(true),
  };
}
