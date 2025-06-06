
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import MarketTrendChart from '../components/MarketTrendChart';
import RealScoutWidget from '../components/widgets/RealScoutWidget';

const marketData = {
  medianPrice: 635000,
  priceChange: 8.2,
  daysOnMarket: 18,
  inventoryMonths: 1.8,
  soldLastMonth: 127,
  activeListings: 89
};

const zipCodeData = [
  { zip: '89149', medianPrice: 645000, change: 9.1, soldCount: 67 },
  { zip: '89166', medianPrice: 615000, change: 7.8, soldCount: 45 },
  { zip: '89084', medianPrice: 475000, change: 6.2, soldCount: 15 }
];

export default function MarketUpdate() {
  return (
    <Layout>
      <Head>
        <title>Centennial Hills Market Update | Las Vegas Real Estate Trends 2024</title>
        <meta name="description" content="Current market conditions in Centennial Hills Las Vegas. Home prices, inventory levels, and sales data for 89149, 89166, and 89084 zip codes." />
        <meta name="keywords" content="Centennial Hills market report, Las Vegas home prices, 89149 real estate, 89166 market data, Las Vegas housing market" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/market-update" />
      </Head>

      <main className="container">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Centennial Hills Market Update</h1>
          <p>
            Stay informed with the latest real estate market trends and data for Centennial Hills 
            and surrounding Las Vegas communities. Updated monthly with current sales data.
          </p>
        </motion.section>

        <motion.section 
          className="market-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2>Market Overview - Centennial Hills Area</h2>
          <div className="market-stats-grid">
            <div className="market-stat">
              <h3>Median Home Price</h3>
              <p className="stat-value">${marketData.medianPrice.toLocaleString()}</p>
              <p className="stat-change positive">+{marketData.priceChange}% YoY</p>
            </div>
            <div className="market-stat">
              <h3>Average Days on Market</h3>
              <p className="stat-value">{marketData.daysOnMarket}</p>
              <p className="stat-note">Days</p>
            </div>
            <div className="market-stat">
              <h3>Inventory Level</h3>
              <p className="stat-value">{marketData.inventoryMonths}</p>
              <p className="stat-note">Months Supply</p>
            </div>
            <div className="market-stat">
              <h3>Homes Sold</h3>
              <p className="stat-value">{marketData.soldLastMonth}</p>
              <p className="stat-note">Last 30 Days</p>
            </div>
            <div className="market-stat">
              <h3>Active Listings</h3>
              <p className="stat-value">{marketData.activeListings}</p>
              <p className="stat-note">Currently Available</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="zip-code-breakdown"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Zip Code Market Breakdown</h2>
          <div className="zip-stats-grid">
            {zipCodeData.map((data, index) => (
              <div key={data.zip} className="zip-stat-card">
                <h3>Zip Code {data.zip}</h3>
                <div className="zip-details">
                  <p><strong>Median Price:</strong> ${data.medianPrice.toLocaleString()}</p>
                  <p><strong>YoY Change:</strong> <span className="positive">+{data.change}%</span></p>
                  <p><strong>Homes Sold:</strong> {data.soldCount} (last 30 days)</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="market-trends"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Price Trends & Analysis</h2>
          <MarketTrendChart />
        </motion.section>

        <motion.section 
          className="market-listings"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2>Current Market Listings</h2>
          <RealScoutWidget />
        </motion.section>

        <motion.section 
          className="market-insights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2>Market Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h3>Buyer's Market Conditions</h3>
              <p>
                With inventory at 1.8 months, the Centennial Hills market remains competitive 
                favoring sellers. Buyers should be prepared to act quickly on desirable properties.
              </p>
            </div>
            <div className="insight-card">
              <h3>Price Appreciation</h3>
              <p>
                Year-over-year price growth of 8.2% reflects strong demand and limited inventory. 
                New construction in Skye Canyon is helping to meet growing demand.
              </p>
            </div>
            <div className="insight-card">
              <h3>Best Time to Buy/Sell</h3>
              <p>
                Current market conditions favor sellers with quick sales and strong prices. 
                Buyers have more opportunities in the fall and winter months.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
