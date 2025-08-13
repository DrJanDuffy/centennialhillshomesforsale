import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Centennial Hills Homes for Sale | Dr. Jan Duffy | Luxury Real Estate</title>
        <meta name="description" content="Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in luxury properties and master-planned communities." />
        <meta name="keywords" content="Centennial Hills homes for sale, luxury real estate Las Vegas, Dr. Jan Duffy, Providence neighborhood, Skye Canyon, northwest Las Vegas" />
        
        {/* Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Centennial Hills Homes for Sale",
              "description": "Luxury homes for sale in Centennial Hills, Las Vegas featuring master-planned communities with stunning mountain views and exceptional quality.",
              "url": "https://centennialhillshomesforsale.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://centennialhillshomesforsale.com/properties?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
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
                ]
              }
            })
          }}
        />
        
        {/* RealEstateAgent Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Centennial Hills",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "postalCode": "89149"
                  }
                },
                {
                  "@type": "Place",
                  "name": "Providence",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "postalCode": "89149"
                  }
                },
                {
                  "@type": "Place",
                  "name": "Skye Canyon",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "postalCode": "89166"
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-blue-700/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
            Discover Your Dream Home in
            <span className="block text-blue-200 mt-2">Centennial Hills</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Luxury homes in Las Vegas&apos; most prestigious master-planned community. 
            Expert guidance from Dr. Jan Duffy, Top 1% REALTOR®.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link href="/properties" className="bg-white text-blue-600 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Browse Properties
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore Centennial Hills
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about living, buying, and investing in this premier Las Vegas community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Properties Card */}
            <Link href="/properties" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl lg:text-3xl">🏠</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Available Properties</h3>
                <p className="text-gray-600 mb-6">
                  Browse our curated selection of premium homes with stunning mountain views
                </p>
                <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  View Properties →
                </div>
              </div>
            </Link>

            {/* Neighborhoods Card */}
            <Link href="/neighborhoods" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl lg:text-3xl">🌄</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Neighborhoods</h3>
                <p className="text-gray-600 mb-6">
                  Discover the unique character and amenities of each community
                </p>
                <div className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  Explore Areas →
                </div>
              </div>
            </Link>

            {/* Market Data Card */}
            <Link href="/market-data" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl lg:text-3xl">📊</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Market Trends</h3>
                <p className="text-gray-600 mb-6">
                  Stay informed with the latest real estate market data and trends
                </p>
                <div className="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  View Data →
                </div>
              </div>
            </Link>

            {/* Area Explorer Card */}
            <Link href="/area-explorer" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl lg:text-3xl">🗺️</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Area Explorer</h3>
                <p className="text-gray-600 mb-6">
                  Interactive map showing amenities, schools, and attractions
                </p>
                <div className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                  Explore Map →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest luxury homes available in Centennial Hills and surrounding communities
            </p>
          </div>
          
          <RealScoutListings
            priceMin={600000}
            priceMax={1200000}
            propertyTypes="SFR,MF"
            listingStatus="For Sale"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Dr. Jan Duffy
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed">
                As a Top 1% REALTOR® with over 15 years of experience, I&apos;ve helped hundreds of families find their perfect home in Centennial Hills and surrounding communities.
              </p>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                My expertise spans luxury homes, investment properties, and first-time buyer guidance. I understand the unique characteristics of each neighborhood and can help you make an informed decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  Learn More About Me
                </Link>
                <Link href="/contact" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center">
                  Schedule a Consultation
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-6xl">👩‍💼</span>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-gray-700">Top 1% REALTOR®</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-gray-700">500+ Homes Sold</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-blue-500">🏆</span>
                  <span className="text-gray-700">15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let me guide you through the process of finding the perfect property in Centennial Hills. 
            From initial consultation to closing, I&apos;ll be with you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="bg-white text-blue-600 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Browse Available Properties
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
