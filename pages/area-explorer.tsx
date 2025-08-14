import Head from 'next/head';
import Layout from '../components/Layout';
import ModernInteractiveMap from '../components/ModernInteractiveMap';
import RealScoutListings from '../components/RealScoutListings';
import FeaturedInsight from '../components/rss/FeaturedInsight';
import MarketInsightsWidget from '../components/rss/MarketInsightsWidget';

export default function AreaExplorer() {
  return (
    <>
      <Head>
        <title>Centennial Hills Area Explorer | Interactive Map | Dr. Jan Duffy</title>
        <meta name="description" content="Explore Centennial Hills, Las Vegas with our interactive area guide. Discover amenities, schools, shopping, and points of interest in this master-planned community." />
        <meta name="keywords" content="Centennial Hills area guide, interactive map Las Vegas, amenities northwest Las Vegas, schools shopping restaurants, Dr. Jan Duffy" />
        
        {/* Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Centennial Hills Area Explorer",
              "description": "Comprehensive guide to amenities, schools, shopping, and points of interest in Centennial Hills, Las Vegas.",
              "url": "https://centennialhillshomesforsale.com/area-explorer",
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
                    "@type": "TouristAttraction",
                    "@id": "https://centennialhillshomesforsale.com/#centennial-hills-center",
                    "name": "Centennial Hills Center",
                    "description": "Major shopping center featuring retail stores, restaurants, and services in Centennial Hills.",
                    "url": "https://centennialhillshomesforsale.com/area-explorer",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.268",
                      "longitude": "-115.328"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Centennial Hills Center",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Shopping",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Dining",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Services",
                        "value": true
                      }
                    ],
                    "category": "Shopping Center"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#centennial-hills-elementary",
                    "name": "Centennial Hills Elementary School",
                    "description": "Highly-rated elementary school serving the Centennial Hills community with excellent academic programs.",
                    "url": "https://centennialhillshomesforsale.com/area-explorer",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.270",
                      "longitude": "-115.325"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Centennial Hills Elementary",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Elementary Education",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "After-School Programs",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Parent Involvement",
                        "value": true
                      }
                    ],
                    "category": "Elementary School"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#providence-park",
                    "name": "Providence Park",
                    "description": "Beautiful community park featuring walking trails, playgrounds, and recreational facilities.",
                    "url": "https://centennialhillshomesforsale.com/area-explorer",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.265",
                      "longitude": "-115.330"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Providence Park",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Walking Trails",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Playgrounds",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Picnic Areas",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Sports Facilities",
                        "value": true
                      }
                    ],
                    "category": "Community Park"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "item": {
                    "@type": "Place",
                    "@id": "https://centennialhillshomesforsale.com/#medical-facilities",
                    "name": "Medical Facilities",
                    "description": "Convenient access to medical offices, urgent care, and healthcare services in the Centennial Hills area.",
                    "url": "https://centennialhillshomesforsale.com/area-explorer",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": "36.272",
                      "longitude": "-115.326"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Medical District",
                      "addressLocality": "Las Vegas",
                      "addressRegion": "NV",
                      "postalCode": "89149",
                      "addressCountry": "US"
                    },
                    "amenityFeature": [
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Primary Care",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Urgent Care",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Specialists",
                        "value": true
                      },
                      {
                        "@type": "LocationFeatureSpecification",
                        "name": "Pharmacy",
                        "value": true
                      }
                    ],
                    "category": "Medical Services"
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Area Explorer
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover everything Centennial Hills has to offer
            </p>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Interactive Area Map
            </h2>
            <ModernInteractiveMap />
          </div>
        </section>

        {/* Area Highlights & Amenities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Area Highlights & Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Shopping & Dining</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Centennial Hills Center</li>
                  <li>• Smith&apos;s Grocery Store</li>
                  <li>• Various Restaurants</li>
                  <li>• Retail Stores</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Education</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Centennial Hills Elementary</li>
                  <li>• Nearby Middle Schools</li>
                  <li>• High School Options</li>
                  <li>• Private Schools</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Recreation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Community Parks</li>
                  <li>• Walking Trails</li>
                  <li>• Sports Facilities</li>
                  <li>• Outdoor Activities</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Healthcare</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Medical Offices</li>
                  <li>• Urgent Care</li>
                  <li>• Dental Services</li>
                  <li>• Pharmacy</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Transportation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Easy Freeway Access</li>
                  <li>• Public Transit</li>
                  <li>• Bike Lanes</li>
                  <li>• Walking Paths</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Location</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Northwest Las Vegas</li>
                  <li>• Mountain Views</li>
                  <li>• Quiet Neighborhoods</li>
                  <li>• Family-Friendly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Distance Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Distance Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Downtown Las Vegas</h3>
                <p className="text-gray-600">25 minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Las Vegas Airport</h3>
                <p className="text-gray-600">35 minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎰</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">The Strip</h3>
                <p className="text-gray-600">30 minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏔️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Red Rock Canyon</h3>
                <p className="text-gray-600">20 minutes</p>
              </div>
            </div>
          </div>
        </section>

        {/* RealScout Listings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Properties in This Area
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse current listings while exploring the Centennial Hills area
              </p>
            </div>
            
            <RealScoutListings 
              priceMin={400000}
              priceMax={2000000}
              propertyTypes="SFR,MF,TC"
              listingStatus="For Sale"
            />
          </div>
        </section>

        {/* Market Insights for Area Explorer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Market Insights for This Area
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed with the latest market trends and analysis for Centennial Hills
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <FeaturedInsight 
                title="Latest Area Market Analysis"
                subtitle="Expert insights to guide your area selection"
                theme="orange"
                enableAnalytics={true}
                enablePerformance={true}
              />
            </div>
          </div>
        </section>

        {/* Market Trends Widget */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Current Market Trends
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track real-time market data and trends affecting this area
              </p>
            </div>
            
            <MarketInsightsWidget 
              maxArticles={4}
              enableAnalytics={true}
              enablePerformance={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Explore Centennial Hills?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let Dr. Jan Duffy show you around and help you discover the perfect location for your new home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule a Tour
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-900 transition-colors">
                Get Area Guide
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
