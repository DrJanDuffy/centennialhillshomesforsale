import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
          "text": "The average home price in Centennial Hills ranges from $500,000 to $1.5 million, depending on size, location, and amenities."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Centennial Hills a desirable place to live?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills offers stunning mountain views, master-planned communities, excellent schools, shopping centers, parks, and easy access to major highways."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Centennial Hills Real Estate FAQ | Dr. Jan Duffy</title>
        <meta name="description" content="Get answers to frequently asked questions about Centennial Hills real estate, home prices, schools, amenities, and living in this beautiful Las Vegas community." />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/faq-schema" />
        
        {/* FAQ Schema for better SERP visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Simple Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Centennial Hills Real Estate FAQ
            </h1>
            <p className="mt-2 text-gray-600">
              Get answers to frequently asked questions about living, buying, and investing in Centennial Hills
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What is the average home price in Centennial Hills?
              </h3>
              <p className="text-gray-600">
                The average home price in Centennial Hills ranges from $500,000 to $1.5 million, depending on size, location, and amenities. Luxury homes can reach $2-5 million for premium properties with mountain views and custom features.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What makes Centennial Hills a desirable place to live?
              </h3>
              <p className="text-gray-600">
                Centennial Hills offers stunning mountain views, master-planned communities, excellent schools, shopping centers, parks, and easy access to major highways. The area is known for its family-friendly atmosphere, low crime rates, and proximity to outdoor recreation.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How far is Centennial Hills from the Las Vegas Strip?
              </h3>
              <p className="text-gray-600">
                Centennial Hills is approximately 20-25 minutes from the Las Vegas Strip via I-215 and US-95. The area provides a peaceful residential setting while maintaining convenient access to entertainment and amenities.
              </p>
            </div>
          </div>

          {/* Simple Navigation */}
          <div className="mt-12 text-center">
            <div className="space-x-4">
              <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Back to Home
              </Link>
              <Link href="/contact" className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700">
                Contact Dr. Jan
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FAQSchemaPage;
