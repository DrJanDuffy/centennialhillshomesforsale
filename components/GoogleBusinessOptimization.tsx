import Head from 'next/head';
import { canonicalForPath, getProductionSiteOrigin, siteEntityId, toAbsoluteUrl } from '@/lib/site-url';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface GoogleBusinessProps {
  showWidget?: boolean;
  pageType?: 'home' | 'about' | 'contact' | 'services';
}

export default function GoogleBusinessOptimization({
  showWidget = false,
  pageType = 'home',
}: GoogleBusinessProps) {
  const [businessHours, setBusinessHours] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 21) {
      setBusinessHours('Open');
    } else {
      setBusinessHours('Closed');
    }
  }, []);

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: 'Dr. Jan Duffy, REALTOR®',
    alternateName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
    description:
      'Top-rated Las Vegas REALTOR® specializing in Centennial Hills, Providence, and Skye Canyon. 30+ years experience in luxury and new construction homes.',
    url: canonicalForPath('/'),
    telephone: '(702) 903-1952',
    email: 'jan@centennialhillshomes.com',
    sameAs: ['https://g.co/kgs/4qQ8DsY'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Providence Skye Canyon Dr',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89166',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.268',
      longitude: '-115.328',
    },
    openingHours: ['Mo-Su 06:00-21:00'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '4',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        name: 'Nevada Real Estate License',
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Las Vegas Board of REALTORS®',
      },
      {
        '@type': 'Organization',
        name: 'Berkshire Hathaway HomeServices',
      },
    ],
    areaServed: [
      {
        '@type': 'Place',
        name: 'Centennial Hills, Las Vegas, NV',
      },
      {
        '@type': 'Place',
        name: 'Providence, Las Vegas, NV',
      },
      {
        '@type': 'Place',
        name: 'Skye Canyon, Las Vegas, NV',
      },
      {
        '@type': 'Place',
        name: 'Summerlin, Las Vegas, NV',
      },
    ],
    serviceType: [
      'Real Estate Sales',
      'Luxury Property Sales',
      'New Construction Sales',
      'First-Time Home Buyer Services',
      'Investment Property Sales',
      'Commercial Real Estate',
    ],
    priceRange: '$300,000 - $5,000,000',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Wire Transfer'],
    currenciesAccepted: 'USD',
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />

        {/* Google Business Profile verification */}
        <meta name="google-site-verification" content="centennial-hills-homes-verification" />
        <link
          rel="canonical"
          href={canonicalForPath(pageType === 'home' ? '/' : `/${pageType}`)}
        />
      </Head>

      {showWidget && (
        <div className="google-business-widget">
          <div className="business-info-card">
            <h3>🏢 Dr. Jan Duffy, REALTOR®</h3>
            <div className="business-details">
              <p>📍 Centennial Hills, Las Vegas, NV</p>
              <p>
                📞 <a href="tel:+17029031952">(702) 903-1952</a>
              </p>
              <p>
                🕒 Status:{' '}
                <span className={`status ${businessHours.toLowerCase()}`}>{businessHours}</span>
              </p>
              <p>⭐ 4.9/5 stars (127 reviews)</p>
              <p>🏆 Top 1% Las Vegas REALTOR®</p>
            </div>
            <div className="business-actions">
              <a
                href="https://g.co/kgs/4qQ8DsY"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on Google
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
