
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PLACEHOLDER' 
}) => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on pathname change
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [pathname, measurementId]);

  // Don't render in development or if no measurement ID
  if (process.env.NODE_ENV === 'development' || !measurementId || measurementId === 'G-PLACEHOLDER') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              enhanced_measurements: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
