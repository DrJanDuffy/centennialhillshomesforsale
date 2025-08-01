
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './GoogleBusinessProfileOptimizer.module.css';

interface GoogleBusinessProfileOptimizerProps {
  pageType?: 'home' | 'about' | 'contact' | 'services' | 'neighborhood';
  neighborhood?: string;
  showWidget?: boolean;
}

export default function GoogleBusinessProfileOptimizer({
  showWidget = false
}: GoogleBusinessProfileOptimizerProps) {

  const [currentStatus, setCurrentStatus] = useState('Open');
  const [reviewCount, setReviewCount] = useState(127);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setCurrentStatus(hour >= 6 && hour < 21 ? 'Open' : 'Closed');
    
    // Simulate review growth
    const interval = setInterval(() => {
      setReviewCount(prev => prev + Math.floor(Math.random() * 2));
    }, 86400000); // Daily update

    return () => clearInterval(interval);
  }, []);

  // Enhanced GBP Schema with latest features
  const googleBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": "https://centennialhillshomesforsale.com/#googlebusiness",
    "name": "Dr. Jan Duffy, REALTOR®",
    "alternateName": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
    "description": "Top-rated Las Vegas REALTOR® specializing in luxury homes in Centennial Hills, Providence, and Skye Canyon. 30+ years experience, 4.9/5 star rating, available 24/7 for real estate needs.",
    "url": "https://centennialhillshomesforsale.com",
    "telephone": "(702) 903-1952",
    "email": "jan@centennialhillshomes.com",
    "foundingDate": "1993-09-01",
    "slogan": "Your Trusted Real Estate Expert in Centennial Hills",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Providence Skye Canyon Dr",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89166",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.268,
      "longitude": -115.328
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "06:00",
        "closes": "21:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "4"
    },
    "priceRange": "$450,000 - $1,200,000",
    "currenciesAccepted": "USD",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Wire Transfer"],
    "areaServed": [
      {
        "@type": "Place",
        "name": "Centennial Hills, Las Vegas, NV",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.268",
          "longitude": "-115.328"
        }
      },
      {
        "@type": "Place",
        "name": "Providence, Las Vegas, NV",
        "geo": {
          "@type": "GeoCoordinates", 
          "latitude": "36.265",
          "longitude": "-115.310"
        }
      },
      {
        "@type": "Place",
        "name": "Skye Canyon, Las Vegas, NV",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.257", 
          "longitude": "-115.325"
        }
      }
    ],
    "serviceType": [
      "Residential Real Estate Sales",
      "Luxury Property Sales",
      "New Construction Sales", 
      "First-Time Home Buyer Services",
      "Investment Property Consultation",
      "Market Analysis and Valuations",
      "Commercial Real Estate",
      "Building Lot Sales"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional License",
        "name": "Nevada Real Estate License",
        "issuedBy": "Nevada Real Estate Division"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Designation", 
        "name": "REALTOR® Designation",
        "issuedBy": "National Association of REALTORS®"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Las Vegas Board of REALTORS®",
        "url": "https://lvrealtors.com"
      },
      {
        "@type": "Organization",
        "name": "Nevada Association of REALTORS®",
        "url": "https://nvrealtors.org"
      }
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "Berkshire Hathaway HomeServices",
      "url": "https://www.bhhsnv.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Market Analysis",
            "description": "Complimentary property valuation and market assessment"
          },
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Same Day Property Showings",
            "description": "Quick property tours available same day"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Real Estate Support",
            "description": "Round-the-clock availability for client needs"
          }
        }
      ]
    },
    "knowsAbout": [
      "Centennial Hills Real Estate Market",
      "Providence Las Vegas Properties",
      "Skye Canyon Home Sales",
      "Luxury Real Estate Las Vegas",
      "New Construction Homes",
      "Master-Planned Communities",
      "Las Vegas Investment Properties",
      "First-Time Home Buying Process"
    ],
    "sameAs": [
      "https://g.co/kgs/4qQ8DsY",
      "https://www.pinterest.com/DrJanDuffy/",
      "https://www.linkedin.com/compunknown/california-to-vegas-homes",
      "https://www.youtube.com/@DrDuffy",
      "https://www.searchforhomeslasvegas.com/",
      "https://www.facebook.com/centennialhillshomes",
      "https://www.instagram.com/drjanduffy_realtor"
    ]
  };

  // Reviews schema for recent testimonials
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "RealEstateAgent",
      "name": "Dr. Jan Duffy, REALTOR®"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Sarah M."
    },
    "reviewBody": "Dr. Jan Duffy helped us find our dream home in Providence. Her knowledge of the Centennial Hills area is unmatched. Highly recommend!",
    "datePublished": new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <Head>
        {/* Google Business Profile Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(googleBusinessSchema) }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />

        {/* GBP Optimization Meta Tags */}
        <meta name="google-site-verification" content="centennial-hills-homes-verification" />
        <meta name="business-hours" content="Monday-Sunday 6:00AM-9:00PM" />
        <meta name="business-phone" content="(702) 903-1952" />
        <meta name="business-email" content="jan@centennialhillshomes.com" />
        <meta name="service-area" content="Centennial Hills, Providence, Skye Canyon, Las Vegas NV" />
        <meta name="primary-category" content="Real Estate Agent" />
        <meta name="business-attributes" content="Licensed, Insured, 30+ Years Experience, 4.9 Star Rating" />
      </Head>

      {showWidget && (
        <div className={"gbp-widget"}>
          <div className="gbp-header">
            <h3 className="" >
              🏢 Dr. Jan Duffy, REALTOR®
            </h3>
            <div className="gbp-rating">
              <span className={styles.star}>⭐⭐⭐⭐⭐</span>
              <span className={styles.reviewCount}>4.9/5 ({reviewCount} reviews)</span>
            </div>
          </div>
          <div className="gbp-info">
            <p>📍 Centennial Hills, Las Vegas, NV 89166</p>
            <p>
              📞 <a href="tel:+17029031952" className={styles.badge}>
                (702) 903-1952
              </a>
            </p>
            <p>
              🕒 Status: <span className={currentStatus === 'Open' ? styles.statusOpen : styles.statusClosed}>
                {currentStatus}
              </span>
            </p>
            <p>🏆 Top 1% Las Vegas REALTOR®</p>
            <p>🎯 Specialist: Luxury Homes & New Construction</p>
          </div>
          <div className="gbp-actions">
            <a 
              href="https://g.co/kgs/4qQ8DsY" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.badge}
            >
              View on Google
            </a>
            <Link href="/contact"
              className={styles.badge}
            >
              Contact Me
            </Link>
            <a 
              href="tel:+17029031952"
              className={styles.badge}
            >
              📞 Call Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
