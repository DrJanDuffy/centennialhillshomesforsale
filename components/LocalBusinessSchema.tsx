import Head from 'next/head';
import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  pageType?: 'home' | 'about' | 'contact' | 'services' | 'neighborhood';
  neighborhood?: string;
  additionalServices?: string[];
}

export default function LocalBusinessSchema({ 
  pageType = 'home', 
  neighborhood,
  additionalServices = []
}: LocalBusinessSchemaProps): JSX.Element {
  useEffect(() => {
    // Remove any existing business schema to prevent duplicates
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(schema => {
      const content = schema.textContent;
      if (content && content.includes('RealEstateAgent')) {
        schema.remove();
      }
    });
  }, []);

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dr. Jan Duffy, REALTOR®",
    "alternateName": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
    "url": "https://centennialhillshomesforsale.com",
    "telephone": "(702) 903-1952",
    "sameAs": [
      "https://g.co/kgs/4qQ8DsY"
    ],
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
      "latitude": "36.268",
      "longitude": "-115.328"
    },
    "openingHours": "Mo-Su 06:00-21:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "priceRange": "$$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Check, Credit Card, Wire Transfer"
  };

  // Add neighborhood-specific data
  if (neighborhood) {
    const neighborhoodData = {
      "areaServed": {
        "@type": "Place",
        "name": `${neighborhood}, Las Vegas, NV`
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "36.268",
          "longitude": "-115.328"
        },
        "geoRadius": "25000"
      }
    };
    Object.assign(baseSchema, neighborhoodData);
  }

  // Add page-specific services
  const services = {
    home: ["Real Estate Sales", "Property Search", "Market Analysis"],
    about: ["Real Estate Consultation", "Professional Services", "Client Representation"],
    contact: ["Free Consultation", "Property Valuation", "Market Analysis"],
    services: ["Buying Services", "Selling Services", "Investment Consultation", "First-Time Buyer Services"],
    neighborhood: ["Neighborhood Expertise", "Local Market Knowledge", "Area Property Search"]
  };

  const pageServices = services[pageType] || services.home;
  const allServices = [...pageServices, ...additionalServices];

  const serviceSchema = {
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": allServices.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Dr. Jan Duffy, REALTOR®"
          }
        }
      }))
    }
  };

  const finalSchema = { ...baseSchema, ...serviceSchema };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalSchema)
        }}
      />
    </Head>
  );
}