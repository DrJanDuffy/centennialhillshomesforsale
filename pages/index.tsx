import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import ModernAboutSection from '../components/ModernAboutSection';
import ModernContactCTA from '../components/ModernContactCTA';
import ModernHero from '../components/ModernHero';
import ModernTestimonials from '../components/ModernTestimonials';

export default function Home() {
  return (
    <>
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
              }
            })
          }}
        />
      </Head>

      <Layout>
        <ModernHero />
        
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Quick Navigation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/properties" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 group-hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Properties</h3>
                <p className="text-gray-600">Browse our luxury home listings</p>
              </div>
            </Link>

            <Link href="/neighborhoods" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 group-hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Neighborhoods</h3>
                <p className="text-gray-600">Explore Centennial Hills areas</p>
              </div>
            </Link>

            <Link href="/market-data" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 group-hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Market Data</h3>
                <p className="text-gray-600">Latest real estate insights</p>
              </div>
            </Link>

            <Link href="/area-explorer" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 group-hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Area Explorer</h3>
                <p className="text-gray-600">Interactive area guide</p>
              </div>
            </Link>
          </div>
        </div>

        <ModernAboutSection />
        <ModernTestimonials />
        <ModernContactCTA />
      </Layout>
    </>
  );
}
