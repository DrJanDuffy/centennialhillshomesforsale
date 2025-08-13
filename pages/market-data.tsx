import React from 'react';
import Layout from '../components/Layout';
import GoogleTagManager from '../components/GoogleTagManager';

const MarketDataPage: React.FC = () => {
  return (
    <Layout title="Centennial Hills Market Trends | Dr. Jan Duffy" description="Stay informed with the latest real estate market data for Centennial Hills, Las Vegas. View price trends, inventory levels, and days on market statistics.">
      <GoogleTagManager />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Centennial Hills
            <span className="block text-secondary-color mt-2">Market Trends</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Stay informed with the latest real estate market data and trends in the Centennial Hills area
          </p>
        </div>
      </section>

      {/* Market Dashboard Section */}
      <section className="section bg-gradient-soft" id="market-dashboard">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Current Market Overview
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Track key market indicators to make informed decisions about buying or selling in Centennial Hills
            </p>
          </div>

          {/* Market Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="card p-6 lg:p-8 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary-color mb-2">$675,000</div>
              <div className="text-sm lg:text-base text-gray-600 mb-2">Median Sale Price</div>
              <div className="text-xs lg:text-sm text-green-600 font-semibold">↑ 3.2% vs Last Month</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary-color mb-2">42</div>
              <div className="text-sm lg:text-base text-gray-600 mb-2">Active Listings</div>
              <div className="text-xs lg:text-sm text-red-600 font-semibold">↓ 8.7% vs Last Month</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary-color mb-2">18</div>
              <div className="text-sm lg:text-base text-gray-600 mb-2">Days on Market</div>
              <div className="text-xs lg:text-sm text-green-600 font-semibold">↓ 12.5% vs Last Month</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-secondary-color mb-2">$285</div>
              <div className="text-sm lg:text-base text-gray-600 mb-2">Price per Sq Ft</div>
              <div className="text-xs lg:text-sm text-green-600 font-semibold">↑ 2.1% vs Last Month</div>
            </div>
          </div>

          {/* Chart Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            <button type="button" className="tab-btn px-6 py-3 bg-secondary-color text-white rounded-lg font-semibold transition-all duration-300 hover:bg-secondary-dark hover:scale-105" data-tab="price">
              Price Trends
            </button>
            <button type="button" className="tab-btn px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-300 hover:scale-105" data-tab="inventory">
              Inventory Levels
            </button>
            <button type="button" className="tab-btn px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-300 hover:scale-105" data-tab="dom">
              Days on Market
            </button>
            <button type="button" className="tab-btn px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-300 hover:scale-105" data-tab="comparison">
              Market Comparison
            </button>
          </div>

          {/* Charts */}
          <div className="relative max-w-6xl mx-auto">
            <canvas id="chart-price" className="tab-canvas w-full h-96"></canvas>
            <canvas id="chart-inventory" className="tab-canvas hidden w-full h-96"></canvas>
            <canvas id="chart-dom" className="tab-canvas hidden w-full h-96"></canvas>
            <canvas id="chart-comparison" className="tab-canvas hidden w-full h-96"></canvas>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Market Analysis & Insights
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert analysis of current market conditions and what they mean for buyers and sellers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Buyer Insights */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-color mb-6">For Buyers</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Competitive Market</h4>
                    <p className="text-sm text-gray-600">Be prepared for multiple offers and quick decision-making</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Limited Inventory</h4>
                    <p className="text-sm text-gray-600">Fewer options available, so act quickly on desirable properties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Price Appreciation</h4>
                    <p className="text-sm text-gray-600">Properties continue to gain value in this strong market</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Insights */}
            <div className="card p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-color mb-6">For Sellers</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Strong Demand</h4>
                    <p className="text-sm text-gray-600">High buyer interest means faster sales and better offers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Favorable Pricing</h4>
                    <p className="text-sm text-gray-600">Current market supports strong pricing for well-maintained homes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quick Turnaround</h4>
                    <p className="text-sm text-gray-600">Properties selling in under 3 weeks on average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Comparison */}
      <section className="section bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Neighborhood Market Comparison
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how different areas within Centennial Hills compare in terms of pricing and market activity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-secondary-color text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Neighborhood</th>
                  <th className="px-6 py-4 text-center font-semibold">Median Price</th>
                  <th className="px-6 py-4 text-center font-semibold">Active Listings</th>
                  <th className="px-6 py-4 text-center font-semibold">Days on Market</th>
                  <th className="px-6 py-4 text-center font-semibold">Price per Sq Ft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary-color">Centennial Hills</td>
                  <td className="px-6 py-4 text-center">$675,000</td>
                  <td className="px-6 py-4 text-center">42</td>
                  <td className="px-6 py-4 text-center">18</td>
                  <td className="px-6 py-4 text-center">$285</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary-color">Providence</td>
                  <td className="px-6 py-4 text-center">$695,000</td>
                  <td className="px-6 py-4 text-center">28</td>
                  <td className="px-6 py-4 text-center">15</td>
                  <td className="px-6 py-4 text-center">$295</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary-color">Skye Canyon</td>
                  <td className="px-6 py-4 text-center">$590,000</td>
                  <td className="px-6 py-4 text-center">35</td>
                  <td className="px-6 py-4 text-center">22</td>
                  <td className="px-6 py-4 text-center">$275</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary-color">The Trails</td>
                  <td className="px-6 py-4 text-center">$580,000</td>
                  <td className="px-6 py-4 text-center">19</td>
                  <td className="px-6 py-4 text-center">25</td>
                  <td className="px-6 py-4 text-center">$270</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-secondary-color to-secondary-dark">
        <div className="container text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
            Ready to Navigate the Market?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Let Dr. Jan Duffy help you understand the market and make informed decisions about your real estate goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button type="button" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Get Market Report
            </button>
            <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MarketDataPage;
