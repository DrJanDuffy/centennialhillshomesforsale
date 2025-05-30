
import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'neighborhood',
          'custom_parameter_2': 'property_type'
        }
      });

      // Enhanced measurements for real estate
      gtag('config', 'GA_MEASUREMENT_ID', {
        enhanced_measurements: {
          scrolls: true,
          outbound_clicks: true,
          site_search: true,
          video_engagement: true,
          file_downloads: true
        }
      });
    `;
    document.head.appendChild(script2);

    // Track page views on route change
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href
        });

        // Track real estate specific events
        window.gtag('event', 'page_view', {
          event_category: 'Real Estate',
          event_label: url,
          custom_parameter_1: getNeighborhoodFromUrl(url),
          custom_parameter_2: getPageTypeFromUrl(url)
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track property searches
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Property search tracking
      const trackPropertySearch = (searchTerm: string, filters: any) => {
        window.gtag && window.gtag('event', 'search', {
          search_term: searchTerm,
          event_category: 'Property Search',
          event_label: `${searchTerm} - ${JSON.stringify(filters)}`,
          custom_parameter_1: filters.neighborhood || 'All Areas',
          custom_parameter_2: filters.propertyType || 'All Types'
        });
      };

      // Contact form tracking
      const trackContactForm = (formType: string) => {
        window.gtag && window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: formType,
          value: 1,
          currency: 'USD'
        });
      };

      // Property view tracking
      const trackPropertyView = (propertyId: string, price: number, neighborhood: string) => {
        window.gtag && window.gtag('event', 'view_item', {
          event_category: 'Property',
          event_label: `Property ${propertyId}`,
          value: price,
          currency: 'USD',
          custom_parameter_1: neighborhood,
          custom_parameter_2: 'Property View'
        });
      };

      // Make tracking functions globally available
      (window as any).trackPropertySearch = trackPropertySearch;
      (window as any).trackContactForm = trackContactForm;
      (window as any).trackPropertyView = trackPropertyView;
    }
  }, []);

  return null;
}

function getNeighborhoodFromUrl(url: string): string {
  if (url.includes('centennial-hills')) return 'Centennial Hills';
  if (url.includes('providence')) return 'Providence';
  if (url.includes('skye-canyon')) return 'Skye Canyon';
  if (url.includes('89149')) return 'Centennial Hills 89149';
  if (url.includes('89166')) return 'Providence 89166';
  return 'Las Vegas';
}

function getPageTypeFromUrl(url: string): string {
  if (url.includes('listings')) return 'Listings';
  if (url.includes('neighborhoods')) return 'Neighborhoods';
  if (url.includes('market-update')) return 'Market Update';
  if (url.includes('contact')) return 'Contact';
  if (url.includes('about')) return 'About';
  return 'Home';
}
