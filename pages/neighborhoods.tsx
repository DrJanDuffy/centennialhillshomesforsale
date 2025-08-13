import Head from 'next/head';
import Layout from '../components/Layout';
import ModernNeighborhoods from '../components/ModernNeighborhoods';

export default function Neighborhoods() {
  return (
    <>
      <Head>
        <title>Centennial Hills Neighborhoods | Las Vegas Real Estate | Dr. Jan Duffy</title>
        <meta name="description" content="Explore the unique neighborhoods of Centennial Hills, Las Vegas. Discover Providence, Skye Canyon, and other master-planned communities with luxury amenities." />
        <meta name="keywords" content="Centennial Hills neighborhoods, Providence Las Vegas, Skye Canyon, northwest Las Vegas communities, master-planned communities" />
        
        {/* Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Centennial Hills Neighborhoods",
              "description": "Comprehensive guide to neighborhoods in Centennial Hills, Las Vegas including Providence, Skye Canyon, and other master-planned communities.",
              "url": "https://centennialhillshomesforsale.com/neighborhoods",
              "publisher": {
                "@type": "RealEstateAgent",
                "@id": "https://centennialhillshomesforsale.com/#realestateagent",
                "name": "Dr. Jan Duffy",
                "description": "Top 1% REALTOR® specializing in luxury homes and master-planned communities in Centennial Hills, Las Vegas"
              },
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#providence-neighborhood",
                    "name": "Providence Neighborhood",
                    "description": "Luxury master-planned community in Centennial Hills featuring custom homes, mountain views, and resort-style amenities.",
                    "url": "https://centennialhillshomesforsale.com/providence-las-vegas",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.268",
                      "longitude": "-115.328"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Providence",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Mountain Views",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Golf Course Access",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Community Pool",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Walking Trails",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Security Gate",
                        "value": true
                      }
                    ],
                    "priceRange": "$500,000 - $2,000,000",
                    "category": "Luxury Residential Community"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#skye-canyon-neighborhood",
                    "name": "Skye Canyon",
                    "description": "Modern master-planned community featuring new construction homes, outdoor recreation, and family-friendly amenities.",
                    "url": "https://centennialhillshomesforsale.com/skye-canyon",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.275",
                      "longitude": "-115.335"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Skye Canyon",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89166",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "New Construction",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Outdoor Recreation",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Community Center",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Parks and Playgrounds",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Shopping Center",
                        "value": true
                      }
                    ],
                    "priceRange": "$400,000 - $1,500,000",
                    "category": "New Construction Community"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#northwest-las-vegas",
                    "name": "Northwest Las Vegas",
                    "description": "Growing area of Las Vegas featuring diverse housing options, excellent schools, and convenient access to amenities.",
                    "url": "https://centennialhillshomesforsale.com/northwest-las-vegas",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.260",
                      "longitude": "-115.320"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Northwest Las Vegas",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Top-Rated Schools",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Shopping Centers",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Medical Facilities",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Parks and Recreation",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Easy Freeway Access",
                        "value": true
                      }
                    ],
                    "priceRange": "$300,000 - $1,200,000",
                    "category": "Residential Area"
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Centennial Hills Neighborhoods
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the unique character and amenities of each area
            </p>
          </div>
        </section>

        {/* Neighborhoods Component */}
        <ModernNeighborhoods />

        {/* Why Choose Centennial Hills? */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose Centennial Hills?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Prime Location</h3>
                <p className="text-gray-600">
                  Convenient access to shopping, dining, entertainment, and major highways while maintaining a peaceful residential atmosphere.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Quality of Life</h3>
                <p className="text-gray-600">
                  Master-planned communities with excellent schools, parks, and recreational facilities for families of all sizes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Investment Value</h3>
                <p className="text-gray-600">
                  Strong appreciation potential with growing demand for homes in this desirable northwest Las Vegas area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Explore These Neighborhoods?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let Dr. Jan Duffy show you around and help you find the perfect area for your lifestyle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule a Tour
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-900 transition-colors">
                Get Neighborhood Guide
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
