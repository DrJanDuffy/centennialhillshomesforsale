import Head from 'next/head';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';
import ModernFeaturedProperties from '../components/ModernFeaturedProperties';

export default function Properties() {
  return (
    <>
      <Head>
        <title>Luxury Properties for Sale | Centennial Hills Real Estate | Dr. Jan Duffy</title>
        <meta name="description" content="Discover luxury properties for sale in Centennial Hills, Las Vegas. Browse our curated selection of premium homes with stunning mountain views and exceptional quality." />
        <meta name="keywords" content="luxury properties for sale, Centennial Hills homes, premium real estate Las Vegas, Dr. Jan Duffy, luxury homes" />
        
        {/* Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": "Centennial Hills Luxury Properties",
              "description": "Luxury properties for sale in Centennial Hills, Las Vegas featuring master-planned communities with stunning mountain views and exceptional quality.",
              "url": "https://centennialhillshomesforsale.com/properties",
              "provider": {
                "@type": "RealEstateAgent",
                "@id": "https://centennialhillshomesforsale.com/#realestateagent",
                "name": "Dr. Jan Duffy",
                "description": "Top 1% REALTOR® specializing in luxury homes and master-planned communities in Centennial Hills, Las Vegas",
                "url": "https://centennialhillshomesforsale.com",
                "telephone": "(702) 903-1952",
                "email": "jan@centennialhillshomes.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Centennial Hills",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV",
                  "postalCode": "89149",
                  "addressCountry": "US"
                },
                "knowsAbout": [
                  "Luxury Homes",
                  "Investment Properties",
                  "First-Time Buyers",
                  "Master-Planned Communities",
                  "Centennial Hills Real Estate",
                  "Providence Neighborhood",
                  "Skye Canyon Development",
                  "Northwest Las Vegas Properties",
                  "New Construction Homes",
                  "Property Valuation",
                  "Market Analysis",
                  "Real Estate Investment"
                ],
                "hasCredential": [
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "Professional License",
                    "name": "Nevada Real Estate License"
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "Certified Luxury Home Marketing Specialist"
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "Certified Residential Specialist (CRS)"
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "Accredited Buyer's Representative (ABR)"
                  }
                ],
                "memberOf": [
                  {
                    "@type": "Organization",
                    "name": "Greater Las Vegas Association of REALTORS"
                  },
                  {
                    "@type": "Organization",
                    "name": "Nevada Association of REALTORS"
                  },
                  {
                    "@type": "Organization",
                    "name": "National Association of REALTORS®"
                  },
                  {
                    "@type": "Organization",
                    "name": "Berkshire Hathaway HomeServices Network"
                  }
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "127",
                  "bestRating": "5"
                },
                "award": [
                  "Top 1% REALTOR® in Las Vegas Valley",
                  "Million Dollar Club Member",
                  "Excellence in Customer Service Award",
                  "Outstanding Sales Performance Recognition"
                ],
                "specialization": [
                  "Luxury Home Sales",
                  "New Construction Properties",
                  "Master-Planned Communities",
                  "Investment Properties",
                  "First-Time Home Buyers",
                  "Relocation Services",
                  "Property Marketing",
                  "Market Analysis"
                ],
                "yearsOfExperience": "20+",
                "numberOfPropertiesSold": "500+",
                "clientSatisfactionRate": "98%"
              },
              "category": "Luxury Properties",
              "location": {
                "@type": "Place",
                "name": "Centennial Hills, Las Vegas, NV",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "36.268",
                  "longitude": "-115.328"
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Centennial Hills",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV",
                  "postalCode": "89149",
                  "addressCountry": "US"
                }
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Mountain Views",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Master-Planned Community",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Golf Course Access",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Shopping Centers",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Top-Rated Schools",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Parks and Recreation",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Security Systems",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Smart Home Features",
                  "value": true
                }
              ],
              "floorSize": {
                "@type": "QuantitativeValue",
                "minValue": "2000",
                "maxValue": "8000",
                "unitCode": "SQFT"
              },
              "numberOfRooms": {
                "@type": "QuantitativeValue",
                "minValue": "3",
                "maxValue": "6"
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "USD",
                "minPrice": "300000",
                "maxPrice": "5000000"
              },
              "datePosted": "2024-01-01",
              "availability": "https://schema.org/InStock"
            })
          }}
        />
      </Head>

      <Layout title="Centennial Hills Luxury Properties | Dr. Jan Duffy" description="Discover luxury homes for sale in Centennial Hills, Las Vegas. Browse our featured properties with stunning mountain views, modern amenities, and exceptional quality.">
        <GoogleTagManager />
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
          <div className="relative container text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
              Luxury Homes in
              <span className="block text-secondary-color mt-2">Centennial Hills</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Experience the finest in Las Vegas luxury living with our curated selection of premium properties
            </p>
          </div>
        </section>

        {/* Properties Component */}
        <ModernFeaturedProperties />

        {/* Property Search Section */}
        <section className="section bg-gradient-soft">
          <div className="container">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
                Find Your Dream Home
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use our advanced search to find properties that match your specific criteria
              </p>
            </div>

            {/* Search Form */}
            <div className="card max-w-4xl mx-auto p-6 lg:p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="single-family">Single Family</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="condo">Condominium</option>
                    <option value="luxury">Luxury Estate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    id="priceRange"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">Any Price</option>
                    <option value="500k-750k">$500K - $750K</option>
                    <option value="750k-1m">$750K - $1M</option>
                    <option value="1m-1.5m">$1M - $1.5M</option>
                    <option value="1.5m+">$1.5M+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="2">2+ Bathrooms</option>
                    <option value="3">3+ Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 mb-2">
                    Square Feet
                  </label>
                  <select
                    id="sqft"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">Any Size</option>
                    <option value="2000-3000">2,000 - 3,000 sq ft</option>
                    <option value="3000-4000">3,000 - 4,000 sq ft</option>
                    <option value="4000-5000">4,000 - 5,000 sq ft</option>
                    <option value="5000+">5,000+ sq ft</option>
                  </select>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <select
                    id="features"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent"
                  >
                    <option value="">Any Features</option>
                    <option value="pool">Pool & Spa</option>
                    <option value="mountain-views">Mountain Views</option>
                    <option value="gourmet-kitchen">Gourmet Kitchen</option>
                    <option value="golf-course">Golf Course Access</option>
                  </select>
                </div>
              </form>

              <div className="mt-6 lg:mt-8 text-center">
                <button type="button" className="bg-secondary-color hover:bg-secondary-dark text-white px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Property Features */}
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
                What Makes Our Properties Special
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Every home in our portfolio is carefully selected for quality, location, and lifestyle appeal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl lg:text-3xl">🏔️</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-primary-color mb-2">Mountain Views</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Stunning vistas of the Spring Mountains and Red Rock Canyon
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl lg:text-3xl">🏊</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-primary-color mb-2">Resort Amenities</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Pools, spas, and luxury features that rival high-end resorts
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl lg:text-3xl">🎯</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-primary-color mb-2">Prime Location</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Convenient access to shopping, dining, and entertainment
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl lg:text-3xl">⭐</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-primary-color mb-2">Quality Construction</h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Built to the highest standards with premium materials
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-r from-secondary-color to-secondary-dark">
          <div className="container text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              Let Dr. Jan Duffy help you discover the perfect luxury property in Centennial Hills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <button type="button" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
                Schedule a Viewing
              </button>
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
                Get Property Alerts
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
