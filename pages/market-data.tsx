import Head from 'next/head';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';
import KCMFeed from '../components/rss/KCMFeed';
import MarketInsightsWidget from '../components/rss/MarketInsightsWidget';

export default function MarketData() {
  return (
    <>
      <Head>
        <title>Las Vegas Real Estate Market Data | Centennial Hills | Dr. Jan Duffy</title>
        <meta name="description" content="Get the latest real estate market data for Centennial Hills and Las Vegas. View trends, statistics, and insights to make informed property decisions." />
        <meta name="keywords" content="Las Vegas real estate market data, Centennial Hills market trends, property statistics, real estate insights, market analysis" />
        
        {/* Schema.org markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DataFeed",
              "name": "Centennial Hills Real Estate Market Data",
              "description": "Comprehensive real estate market data and analysis for Centennial Hills, Las Vegas including property trends, pricing statistics, and market insights.",
              "url": "https://centennialhillshomesforsale.com/market-data",
              "publisher": {
                "@type": "RealEstateAgent",
                "@id": "https://centennialhillshomesforsale.com/#realestateagent",
                "name": "Dr. Jan Duffy",
                "description": "Top 1% REALTOR® specializing in luxury homes and master-planned communities in Centennial Hills, Las Vegas"
              },
              "dataFeedElement": [
                {
                  "@type": "DataFeedItem",
                  "name": "Centennial Hills Market Overview",
                  "description": "Current market conditions and trends in Centennial Hills, Las Vegas",
                  "dateModified": "2024-01-01",
                  "item": {
                    "@type": "RealEstateMarket",
                    "name": "Centennial Hills Real Estate Market",
                    "description": "Luxury real estate market in northwest Las Vegas featuring master-planned communities",
                    "location": {
                      "@type": "Place",
                      "name": "Centennial Hills, Las Vegas, NV",
                      "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "36.268",
                        "longitude": "-115.328"
                      }
                    },
                    "marketTrend": "Rising",
                    "averagePrice": "750000",
                    "priceCurrency": "USD",
                    "priceRange": "$300,000 - $5,000,000",
                    "inventoryLevel": "Low",
                    "daysOnMarket": "45",
                    "marketActivity": "High"
                  }
                },
                {
                  "@type": "DataFeedItem",
                  "name": "Property Type Analysis",
                  "description": "Market performance by property type in Centennial Hills",
                  "dateModified": "2024-01-01",
                  "item": {
                    "@type": "Dataset",
                    "name": "Property Type Market Data",
                    "description": "Market statistics for different property types in Centennial Hills",
                    "variableMeasured": [
                      "Single Family Homes",
                      "Luxury Estates",
                      "New Construction",
                      "Investment Properties"
                    ],
                    "distribution": {
                      "@type": "DataDownload",
                      "encodingFormat": "application/json",
                      "contentUrl": "https://centennialhillshomesforsale.com/api/market-data"
                    }
                  }
                },
                {
                  "@type": "DataFeedItem",
                  "name": "Neighborhood Comparison",
                  "description": "Market comparison between different neighborhoods in northwest Las Vegas",
                  "dateModified": "2024-01-01",
                  "item": {
                    "@type": "Dataset",
                    "name": "Neighborhood Market Comparison",
                    "description": "Comparative market data for Providence, Skye Canyon, and other northwest Las Vegas neighborhoods",
                    "variableMeasured": [
                      "Average Price",
                      "Price per Square Foot",
                      "Days on Market",
                      "Inventory Levels"
                    ]
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Real Estate Market Data
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Stay informed with the latest market trends and insights
            </p>
          </div>
        </section>

        {/* Market Stats Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Current Market Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">$750K</h3>
                <p className="text-gray-600">Average Price</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">+12%</h3>
                <p className="text-gray-600">Price Growth</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">45 Days</h3>
                <p className="text-gray-600">Avg. Days on Market</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Low</h3>
                <p className="text-gray-600">Inventory Level</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Tabs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Market Trends & Analysis
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
                    Price Trends
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                    Inventory
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                    Days on Market
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                    Sales Volume
                  </button>
                </nav>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Charts Coming Soon</h3>
                <p className="text-gray-600">
                  We&apos;re working on interactive charts to show you real-time market data and trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Market Analysis & Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Current Market Conditions</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Strong Buyer Demand:</strong> High interest in luxury properties with mountain views
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Limited Inventory:</strong> Low supply driving competitive pricing
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Rising Prices:</strong> 12% year-over-year growth in average home prices
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Fast Sales:</strong> Properties selling in 45 days on average
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Future Outlook</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Continued Growth:</strong> Expected 8-10% price appreciation in 2024
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>New Construction:</strong> More inventory expected from new developments
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Investment Potential:</strong> Strong rental market for investment properties
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Market Stability:</strong> Balanced supply and demand expected
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Comparison Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Neighborhood Market Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Neighborhood
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Sq Ft
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days on Market
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventory
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Providence
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$850,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$285</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Low</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Skye Canyon
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$650,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$265</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Northwest LV
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$550,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$245</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RealScout Listings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Current Market Listings
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse real-time property listings to see the market data in action
              </p>
            </div>
            
            <RealScoutListings 
              priceMin={300000}
              priceMax={3000000}
              propertyTypes="SFR,MF,TC"
              listingStatus="For Sale"
            />
          </div>
        </section>

        {/* Live Market Insights from RSS Feed */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Live Market Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real-time market analysis and trends from industry experts
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <KCMFeed 
                maxArticles={6}
                showFeatured={true}
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
                Track real-time market data and trends affecting Centennial Hills real estate
              </p>
            </div>
            
            <MarketInsightsWidget 
              maxArticles={5}
              enableAnalytics={true}
              enablePerformance={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Get Personalized Market Insights
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let Dr. Jan Duffy provide you with detailed market analysis for your specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Market Review
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors">
                Get Market Report
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
