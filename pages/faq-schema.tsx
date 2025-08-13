import Head from 'next/head';
import React from 'react';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';

const FAQSchemaPage: React.FC = () => {
  // FAQ Schema for better SERP visibility
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average home price in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average home price in Centennial Hills ranges from $500,000 to $1.5 million, depending on size, location, and amenities. Luxury homes can reach $2-5 million for premium properties with mountain views and custom features."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Centennial Hills a desirable place to live?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills offers stunning mountain views, master-planned communities, excellent schools, shopping centers, parks, and easy access to major highways. The area is known for its family-friendly atmosphere, low crime rates, and proximity to outdoor recreation."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Centennial Hills from the Las Vegas Strip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills is approximately 20-25 minutes from the Las Vegas Strip via I-215 and US-95. The area provides a peaceful residential setting while maintaining convenient access to entertainment and amenities."
        }
      },
      {
        "@type": "Question",
        "name": "What types of homes are available in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills offers diverse housing options including single-family homes, luxury estates, new construction, custom builds, and investment properties. Home sizes range from 1,500 to 8,000+ square feet with various architectural styles."
        }
      },
      {
        "@type": "Question",
        "name": "Are there good schools in the Centennial Hills area?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Centennial Hills has excellent schools including Centennial Hills Elementary, Centennial High School, and private school options. The area is served by the Clark County School District with high ratings and strong academic programs."
        }
      },
      {
        "@type": "Question",
        "name": "What amenities are available in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills features shopping centers, restaurants, medical facilities, parks, walking trails, golf courses, and community centers. The area has everything needed for daily living while maintaining a suburban feel."
        }
      },
      {
        "@type": "Question",
        "name": "Is Centennial Hills a good investment area?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Centennial Hills is considered an excellent investment area due to its steady appreciation, strong rental demand, and continued development. The area has shown consistent growth and attracts both families and investors."
        }
      },
      {
        "@type": "Question",
        "name": "What is the property tax rate in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property taxes in Centennial Hills are approximately 0.6-0.8% of assessed value, which is competitive for the Las Vegas area. Nevada has no state income tax, making it attractive for homeowners and investors."
        }
      },
      {
        "@type": "Question",
        "name": "How do I find the right home in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Working with a local expert like Dr. Jan Duffy is the best approach. She can provide market insights, show you available properties, negotiate on your behalf, and help you understand the different neighborhoods and their unique characteristics."
        }
      },
      {
        "@type": "Question",
        "name": "What is the climate like in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills enjoys a desert climate with over 300 sunny days per year. Summers are hot and dry, winters are mild, and the area receives minimal rainfall. The elevation provides slightly cooler temperatures than the valley floor."
        }
      },
      {
        "@type": "Question",
        "name": "Are there HOA fees in Centennial Hills communities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HOA fees vary by community, typically ranging from $50 to $300 per month. These fees often cover landscaping, community amenities, and maintenance. Some communities have no HOA fees, offering more flexibility for homeowners."
        }
      },
      {
        "@type": "Question",
        "name": "How is the commute from Centennial Hills to major employment centers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills offers excellent commute options with easy access to I-215, US-95, and US-93. Downtown Las Vegas is 25 minutes away, Summerlin is 15 minutes, and the airport is 20 minutes. The area is well-connected for professionals."
        }
      }
    ]
  };

  return (
    <Layout 
      title="Centennial Hills Real Estate FAQ | Dr. Jan Duffy" 
      description="Get answers to frequently asked questions about Centennial Hills real estate, home prices, schools, amenities, and living in this beautiful Las Vegas community."
    >
      <Head>
        {/* FAQ Schema for better SERP visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      
      <GoogleTagManager />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Centennial Hills
            <span className="block text-secondary-color mt-2">Real Estate FAQ</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Get answers to the most common questions about living, buying, and investing in Centennial Hills, Las Vegas
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about Centennial Hills real estate, from home prices to community amenities
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* FAQ Item 1 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What is the average home price in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The average home price in Centennial Hills ranges from $500,000 to $1.5 million, depending on size, location, and amenities. Luxury homes can reach $2-5 million for premium properties with mountain views and custom features.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What makes Centennial Hills a desirable place to live?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills offers stunning mountain views, master-planned communities, excellent schools, shopping centers, parks, and easy access to major highways. The area is known for its family-friendly atmosphere, low crime rates, and proximity to outdoor recreation.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                How far is Centennial Hills from the Las Vegas Strip?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills is approximately 20-25 minutes from the Las Vegas Strip via I-215 and US-95. The area provides a peaceful residential setting while maintaining convenient access to entertainment and amenities.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What types of homes are available in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills offers diverse housing options including single-family homes, luxury estates, new construction, custom builds, and investment properties. Home sizes range from 1,500 to 8,000+ square feet with various architectural styles.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                Are there good schools in the Centennial Hills area?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, Centennial Hills has excellent schools including Centennial Hills Elementary, Centennial High School, and private school options. The area is served by the Clark County School District with high ratings and strong academic programs.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What amenities are available in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills features shopping centers, restaurants, medical facilities, parks, walking trails, golf courses, and community centers. The area has everything needed for daily living while maintaining a suburban feel.
              </p>
            </div>

            {/* FAQ Item 7 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                Is Centennial Hills a good investment area?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, Centennial Hills is considered an excellent investment area due to its steady appreciation, strong rental demand, and continued development. The area has shown consistent growth and attracts both families and investors.
              </p>
            </div>

            {/* FAQ Item 8 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What is the property tax rate in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Property taxes in Centennial Hills are approximately 0.6-0.8% of assessed value, which is competitive for the Las Vegas area. Nevada has no state income tax, making it attractive for homeowners and investors.
              </p>
            </div>

            {/* FAQ Item 9 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                How do I find the right home in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Working with a local expert like Dr. Jan Duffy is the best approach. She can provide market insights, show you available properties, negotiate on your behalf, and help you understand the different neighborhoods and their unique characteristics.
              </p>
            </div>

            {/* FAQ Item 10 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                What is the climate like in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills enjoys a desert climate with over 300 sunny days per year. Summers are hot and dry, winters are mild, and the area receives minimal rainfall. The elevation provides slightly cooler temperatures than the valley floor.
              </p>
            </div>

            {/* FAQ Item 11 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                Are there HOA fees in Centennial Hills communities?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                HOA fees vary by community, typically ranging from $50 to $300 per month. These fees often cover landscaping, community amenities, and maintenance. Some communities have no HOA fees, offering more flexibility for homeowners.
              </p>
            </div>

            {/* FAQ Item 12 */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">
                How is the commute from Centennial Hills to major employment centers?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills offers excellent commute options with easy access to I-215, US-95, and US-93. Downtown Las Vegas is 25 minutes away, Summerlin is 15 minutes, and the airport is 20 minutes. The area is well-connected for professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="section bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Need More Information?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our other resources to learn more about Centennial Hills real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Market Data */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">📊</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Market Trends</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay informed with the latest real estate market data and trends in Centennial Hills
              </p>
              <a href="/market-data" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Market Data
              </a>
            </div>

            {/* Properties */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏠</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Available Properties</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse our curated selection of premium homes with stunning mountain views
              </p>
              <a href="/properties" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Properties
              </a>
            </div>

            {/* Contact */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">📞</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Get Personal Help</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Have specific questions? Contact Dr. Jan Duffy for personalized assistance
              </p>
              <a href="/contact" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Dr. Jan
              </a>
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
            Dr. Jan Duffy has helped hundreds of families find their perfect home in Centennial Hills. Let her expertise guide you to your ideal property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <a href="/properties" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Browse Properties
            </a>
            <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQSchemaPage;
