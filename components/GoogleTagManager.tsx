'use client';

import { useEffect, useCallback } from 'react';
import Script from 'next/script';

interface GoogleTagManagerProps {
  gaId: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gaId }) => {
  // Track property views
  const trackPropertyView = useCallback((propertyId: string, propertyData: any) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_item', {
        event_category: 'Property',
        event_label: propertyId,
        items: [
          {
            item_id: propertyId,
            item_name: propertyData.title || 'Property',
            item_category: propertyData.type || 'Real Estate',
            price: propertyData.price,
            currency: 'USD',
          },
        ],
      });
    }
  }, []);

  // Track search events
  const trackSearch = useCallback((searchTerm: string, filters: any) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        event_category: 'Property Search',
        event_label: 'Website Search',
        custom_parameters: filters,
      });
    }
  }, []);

  // Track lead generation
  const trackLeadGeneration = useCallback((leadType: string, source: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead Generation',
        event_label: leadType,
        value: 10,
        custom_parameters: {
          source: source,
          lead_type: leadType,
        },
      });
    }
  }, []);

  // Track phone calls
  const trackPhoneCall = useCallback((phoneNumber: string, context: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'phone_call', {
        event_category: 'Contact',
        event_label: phoneNumber,
        value: 5,
        custom_parameters: {
          context: context,
          phone_number: phoneNumber,
        },
      });
    }
  }, []);

  useEffect(() => {
    // Track phone clicks
    const trackPhoneClicks = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href?.startsWith('tel:')) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'phone_click', {
            event_category: 'Contact',
            event_label: target.href,
            value: 1,
          });
        }
      }
    };

    // Track form submissions
    const trackFormSubmissions = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: form.action || 'contact_form',
            value: 10,
          });
        }
      }
    };

    // Add event listeners
    document.addEventListener('click', trackPhoneClicks);
    document.addEventListener('submit', trackFormSubmissions);

    // Cleanup
    return () => {
      document.removeEventListener('click', trackPhoneClicks);
      document.removeEventListener('submit', trackFormSubmissions);
    };
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  // Expose tracking functions globally for external use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackPropertyView = trackPropertyView;
      (window as any).trackSearch = trackSearch;
      (window as any).trackLeadGeneration = trackLeadGeneration;
      (window as any).trackPhoneCall = trackPhoneCall;
    }
  }, [trackPropertyView, trackSearch, trackLeadGeneration, trackPhoneCall]);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      {/* Google Analytics Configuration */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
};

export default GoogleTagManager;
