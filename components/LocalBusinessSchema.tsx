import Head from 'next/head';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  serviceArea?: string[];
}

export default function LocalBusinessSchema({
  name = "Dr. Jan Duff - Centennial Hills Real Estate",
  description = "Expert real estate services in Centennial Hills, Providence, Skye Canyon, and Northwest Las Vegas. Trusted local agent with proven results.",
  address = {
    streetAddress: "Centennial Hills",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89149"
  },
  phone = "(702) 903-1952",
  email = "jan@centennialhillshomesforsale.com",
  website = "https://centennialhillshomesforsale.com",
  serviceArea = ["Centennial Hills", "Providence", "Skye Canyon", "Northwest Las Vegas", "89149", "89166"]
}: LocalBusinessSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": name,
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": "US"
    },
    "areaServed": serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 36.2098,
        "longitude": -115.2769
      },
      "geoRadius": "25000"
    },
    "knowsAbout": [
      "Real Estate Sales",
      "Property Valuation", 
      "Market Analysis",
      "Home Buying",
      "Home Selling",
      "Investment Properties",
      "Centennial Hills Neighborhoods",
      "Las Vegas Real Estate Market"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Buying Services",
            "description": "Expert guidance for purchasing homes in Centennial Hills and surrounding areas"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Home Selling Services",
            "description": "Professional home selling services with proven marketing strategies"
          }
        }
      ]
    },
    "sameAs": [
      website,
      "https://www.google.com/maps/place/Centennial+Hills,+Las+Vegas,+NV"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
}