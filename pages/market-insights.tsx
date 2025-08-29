import Head from 'next/head';
import Link from 'next/link';
import KCMFeed from '../components/KCMFeed';
import Layout from '../components/Layout';

export default function MarketInsights() {
  return (
    <Layout>
      <Head>
        <meta
          name="keywords"
          content="real estate market insights, Centennial Hills market trends, Las Vegas real estate news, housing market analysis, Dr. Jan Duffy market commentary"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Market Insights & Real Estate News | Centennial Hills" />
        <meta
          property="og:description"
          content="Latest real estate market insights and trends for Centennial Hills, Las Vegas. Expert analysis from Dr. Jan Duffy."
        />
        <meta
          property="og:url"
          content="https://centennialhillshomesforsale.com/market-insights/"
        />
        <meta
          property="og:image"
          content="https://centennialhillshomesforsale.com/images/market-insights-og.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Market Insights & Real Estate News | Centennial Hills"
        />
        <meta
          name="twitter:description"
          content="Latest real estate market insights and trends for Centennial Hills, Las Vegas."
        />
        <meta
          name="twitter:image"
          content="https://centennialhillshomesforsale.com/images/market-insights-og.jpg"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Centennial Hills Market Insights',
              description:
                'Latest real estate market insights and trends for Centennial Hills, Las Vegas',
              url: 'https://centennialhillshomesforsale.com/market-insights/',
              publisher: {
                '@type': 'RealEstateAgent',
                name: 'Dr. Jan Duffy',
                url: 'https://centennialhillshomesforsale.com',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Las Vegas',
                  addressRegion: 'NV',
                  addressCountry: 'US',
                },
              },
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: [],
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Market Insights & Analysis
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Stay informed with expert real estate market commentary, trends, and insights for
              Centennial Hills and the greater Las Vegas area
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#latest-insights"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                View Latest Insights
              </a>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
              >
                Get Personalized Analysis
              </Link>
            </div>
          </div>
        </section>

        {/* Market Overview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Centennial Hills Market Overview
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding the local market is crucial for making informed real estate decisions.
                Our expert analysis helps you navigate the Centennial Hills market with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Trends</h3>
                <p className="text-gray-600">
                  Track price movements, inventory levels, and market dynamics in real-time
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Analysis</h3>
                <p className="text-gray-600">
                  Comprehensive market data and statistical analysis for informed decision-making
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Updates</h3>
                <p className="text-gray-600">
                  Stay current with market changes and opportunities as they happen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Market Insights */}
        <section id="latest-insights" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Latest Market Insights
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Expert analysis and commentary on the latest real estate market trends, brought to
                you by Keeping Current Matters and Dr. Jan Duffy
              </p>
            </div>

            <KCMFeed maxArticles={10} showFeatured={true} />
          </div>
        </section>

        {/* Why Market Insights Matter */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Market Insights Matter
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                In today&apos;s dynamic real estate market, staying informed is not just an
                advantage—it&apos;s essential
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Make Informed Decisions</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Understand current market conditions and trends
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">Identify the best times to buy or sell</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Navigate market fluctuations with confidence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">Stay ahead of market opportunities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-8 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Expert Market Commentary
                </h4>
                <p className="text-gray-700 mb-6">
                  Dr. Jan Duffy combines local market expertise with national real estate insights
                  to provide you with comprehensive market analysis tailored to Centennial Hills.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    &quot;Market insights help you understand not just what&apos;s happening, but
                    why it&apos;s happening and what it means for your real estate decisions.&quot;
                  </p>
                  <p className="text-sm text-gray-800 font-medium mt-2">— Dr. Jan Duffy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Navigate the Market?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get personalized market analysis and expert guidance for your real estate journey in
              Centennial Hills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/buyers"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
              >
                Buyer Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
