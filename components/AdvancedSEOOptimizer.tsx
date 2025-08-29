import Head from 'next/head';
import type React from 'react';
import { useEffect } from 'react';

interface AdvancedSEOOptimizerProps {
  pageType: 'home' | 'property' | 'neighborhood' | 'service';
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  structuredData?: Record<string, unknown>;
}

const AdvancedSEOOptimizer: React.FC<AdvancedSEOOptimizerProps> = ({
  pageType,
  pageTitle,
  pageDescription,
  pageUrl,
}) => {
  const siteUrl = 'https://centennialhillshomesforsale.com';
  const fullCanonicalUrl =
    pageUrl || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  // Enhanced Local Business Schema with E-A-T signals
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#realestateagent`,
    name: 'Dr. Jan Duffy',
    alternateName: 'Jan Duffy REALTOR',
    description:
      'Licensed Nevada REALTOR® with 30+ years experience specializing in Centennial Hills luxury real estate',
    url: siteUrl,
    telephone: '(702) 903-1952',
    email: 'jan@centennialhillshomes.com',
    priceRange: '$450,000 - $1,500,000',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Financing, Conventional Loan, FHA, VA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Centennial Hills Area',
      addressLocality: 'Las Vegas',
      addressRegion: 'Nevada',
      postalCode: '89149',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.268',
      longitude: '-115.328',
    },
    areaServed: [
      {
        '@type': 'Place',
        name: 'Centennial Hills',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '36.268',
          longitude: '-115.328',
        },
      },
      {
        '@type': 'Place',
        name: 'Providence',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '36.275',
          longitude: '-115.332',
        },
      },
      {
        '@type': 'Place',
        name: 'Skye Canyon',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '36.285',
          longitude: '-115.315',
        },
      },
    ],
    serviceType: [
      'Residential Real Estate Sales',
      'Luxury Property Sales',
      'New Construction Sales',
      'Property Valuation',
      'Market Analysis',
      'Relocation Services',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Nevada Real Estate License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Nevada Real Estate Division',
        },
      },
    ],
    award: ['Top 1% Las Vegas REALTOR®', '5-Star Customer Rating', '30+ Years Experience Award'],
    memberOf: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices Nevada Properties',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        reviewBody:
          'Dr. Jan Duffy helped us find our dream home in Providence. Her knowledge of the Centennial Hills area is unmatched!',
      },
    ],
    openingHours: ['Mo-Su 08:00-20:00'],
    sameAs: [
      'https://www.facebook.com/CentennialHillsHomes',
      'https://www.linkedin.com/in/drjanduffy',
      'https://www.zillow.com/profile/drjanduffy',
    ],
  };

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the average home price in Centennial Hills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The average home price in Centennial Hills ranges from $450,000 to $1,200,000, with luxury properties in Providence and Skye Canyon reaching higher price points.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why choose Dr. Jan Duffy as your REALTOR®?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Jan Duffy has 30+ years of experience in Las Vegas real estate, specializes in Centennial Hills luxury properties, and maintains a 4.9/5 star rating with same-day showing availability.',
        },
      },
      {
        '@type': 'Question',
        name: 'What neighborhoods does Dr. Jan Duffy serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Jan Duffy specializes in Centennial Hills, Providence, Skye Canyon, Northwest Las Vegas, and surrounding master-planned communities in zip codes 89149 and 89166.',
        },
      },
    ],
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Centennial Hills Real Estate Services',
    description:
      'Comprehensive real estate services for buying and selling luxury homes in Centennial Hills',
    provider: {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#realestateagent`,
    },
    serviceType: 'Real Estate Sales',
    areaServed: {
      '@type': 'Place',
      name: 'Centennial Hills, Las Vegas, Nevada',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Buying Assistance',
            description: 'Expert guidance for purchasing luxury homes in Centennial Hills',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Selling Services',
            description:
              'Professional marketing and sales services for Centennial Hills properties',
          },
        },
      ],
    },
  };

  // Breadcrumb Schema
  const getBreadcrumbSchema = () => {
    const pathSegments =
      typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean) : [];
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ];

    pathSegments.forEach((segment, index) => {
      const name = segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      const url = `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`;

      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2,
        name: name,
        item: url,
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };
  };

  useEffect(() => {
    if (scriptRef.current) {
      // Safely inject structured data scripts
      const injectScript = (schema: object, id: string) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.textContent = JSON.stringify(schema);
        scriptRef.current?.appendChild(script);
      };

      // Inject all schemas
      injectScript(localBusinessSchema, 'local-business-schema');
      injectScript(faqSchema, 'faq-schema');
      injectScript(serviceSchema, 'service-schema');
      injectScript(getBreadcrumbSchema(), 'breadcrumb-schema');
    }
  }, [localBusinessSchema, faqSchema, serviceSchema]);

  return (
    <Head>
      {/* Enhanced Title and Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content="Centennial Hills homes for sale, Providence Las Vegas, Skye Canyon real estate, Dr Jan Duffy REALTOR, luxury homes Las Vegas, 89149, 89166"
      />

      {/* Advanced Robot Instructions */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />

      {/* Enhanced SEO Meta Tags */}
      <meta name="author" content="Dr. Jan Duffy, REALTOR®" />
      <meta name="copyright" content="© 2024 Centennial Hills Homes For Sale" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="3 days" />
      <meta name="language" content="en-US" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Enhanced Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={`${siteUrl}/apple-touch-icon.png`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${siteUrl}/apple-touch-icon.png`} />
      <meta name="twitter:site" content="@CentennialHillsHomes" />
      <meta name="twitter:creator" content="@DrJanDuffy" />

      {/* Local SEO Enhancement */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas, Nevada" />
      <meta name="geo.position" content="36.268;-115.328" />
      <meta name="ICBM" content="36.268, -115.328" />
      <meta name="DC.title" content={pageTitle} />

      {/* Business Information */}
      <meta name="contact" content="(702) 903-1952" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema()) }}
      />

      {/* Performance and Security Headers */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//realscout-web-components.s3.amazonaws.com" />

      {/* Page-specific optimizations */}
      {pageType === 'neighborhood' && (
        <>
          <meta property="place:location:latitude" content="36.268" />
          <meta property="place:location:longitude" content="-115.328" />
          <link rel="alternate" hrefLang="en-us" href={fullCanonicalUrl} />
        </>
      )}

      {/* Mobile and PWA optimizations */}
      {/* 
        BROWSER COMPATIBILITY NOTICE:
        theme-color meta tag is a progressive enhancement feature:
        
        ✅ SUPPORTED BROWSERS (will use theme color):
        - Chrome 39+ (desktop & mobile)
        - Safari 15+ (desktop & mobile) 
        - Edge 79+ (desktop & mobile)
        - Android Chrome (all versions)
        
        ❌ UNSUPPORTED BROWSERS (will ignore gracefully):
        - Firefox (all versions)
        - Firefox for Android
        - Opera (all versions)
        
        IMPACT: No functionality is broken. Unsupported browsers simply
        use their default browser UI colors. This is expected behavior.
        
        WARNINGS: Microsoft Edge Tools shows compatibility warnings for
        unsupported browsers. These are informational only and do not
        indicate any problems with the implementation.
      */}

      {/* 
        Note: theme-color meta tags removed to eliminate browser compatibility warnings.
        While this reduces enhanced UX for supported browsers (Chrome, Safari, Edge),
        it provides a cleaner development experience and eliminates warnings.
        
        Alternative: Use CSS custom properties for page theming instead of browser UI theming.
      */}

      {/* Fallback for Windows tiles (universal support) */}
      <meta name="msapplication-TileColor" content="#1a365d" />

      {/* PWA and mobile app metadata */}
      <meta name="application-name" content="Centennial Hills Homes" />
      <meta name="apple-mobile-web-app-title" content="Centennial Hills Homes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  );
};

export default AdvancedSEOOptimizer;
