import Head from 'next/head';
import type React from 'react';
import { useEffect } from 'react';

interface GoogleTagManagerProps {
  gtmId?: string;
  gaId?: string;
  enableConversionTracking?: boolean;
  enablePhoneTracking?: boolean;
}

// Remove global declaration to avoid conflicts
// declare global {
//   interface Window {
//     gtag: (...args: unknown[]) => void;
//     dataLayer: unknown[];
//   }
// }

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({
  gtmId = 'GTM-XXXXXXX',
  gaId = 'G-XXXXXXXXXX',
  enableConversionTracking = true,
  enablePhoneTracking = true,
}) => {
  useEffect(() => {
    // Initialize Google Tag Manager
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];

      // Only define gtag if it doesn't already exist
      if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
          window.dataLayer.push(args);
        };
      }

      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          cd1: 'userType',
          cd2: 'pageType',
          cd3: 'neighborhood',
          cd4: 'propertyType',
          cd5: 'conversionValue',
        },
      });
    }
  }, [gaId]);

  useEffect(() => {
    // Track phone number clicks
    if (enablePhoneTracking && typeof window !== 'undefined') {
      const trackPhoneClicks = (event: Event) => {
        const target = event.target as HTMLAnchorElement;
        if (target.tagName === 'A' && target.href?.startsWith('tel:')) {
          window.gtag('event', 'phone_click', {
            event_category: 'Contact',
            event_label: target.href,
            value: 1,
          });
        }
      };

      document.addEventListener('click', trackPhoneClicks);
      return () => document.removeEventListener('click', trackPhoneClicks);
    }
  }, [enablePhoneTracking]);

  useEffect(() => {
    // Track form submissions
    if (enableConversionTracking && typeof window !== 'undefined') {
      const trackFormSubmissions = (event: Event) => {
        const form = event.target as HTMLFormElement;
        if (form.tagName === 'FORM') {
          window.gtag('event', 'form_submit', {
            event_category: 'Lead Generation',
            event_label: form.action || 'contact_form',
            value: 10,
          });
        }
      };

      document.addEventListener('submit', trackFormSubmissions);
      return () => document.removeEventListener('submit', trackFormSubmissions);
    }
  }, [enableConversionTracking]);

  return (
    <Head>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />

      {/* Enhanced Ecommerce Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced Ecommerce for Real Estate
            window.gtag('config', '${gaId}', {
              'custom_map': {
                'cd1': 'userType',
                'cd2': 'pageType',
                'cd3': 'neighborhood', 
                'cd4': 'propertyType',
                'cd5': 'conversionValue'
              }
            });
            
            // Track property views
            function trackPropertyView(propertyData) {
              window.gtag('event', 'view_item', {
                event_category: 'Real Estate',
                event_label: propertyData.address,
                items: [{
                  item_id: propertyData.id,
                  item_name: propertyData.address,
                  item_category: propertyData.neighborhood,
                  price: propertyData.price,
                  quantity: 1
                }]
              });
            }
            
            // Track neighborhood searches
            function trackNeighborhoodSearch(neighborhood) {
              window.gtag('event', 'search', {
                event_category: 'Real Estate',
                event_label: neighborhood,
                search_term: neighborhood
              });
            }
            
            // Track contact form submissions
            function trackContactForm(formType) {
              window.gtag('event', 'generate_lead', {
                event_category: 'Lead Generation',
                event_label: formType,
                value: 10
              });
            }
            
            // Track phone calls
            function trackPhoneCall(phoneNumber) {
              window.gtag('event', 'phone_call', {
                event_category: 'Contact',
                event_label: phoneNumber,
                value: 5
              });
            }
          `,
        }}
      />
    </Head>
  );
};

export default GoogleTagManager;
