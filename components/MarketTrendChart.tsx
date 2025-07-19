import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrendData {
  month: string;
  averagePrice: number;
  salesVolume: number;
  daysOnMarket: number;
}

const MarketTrendChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'price' | 'volume' | 'dom'>('price');
  const [trendData] = useState<TrendData[]>([
    { month: 'Jan', averagePrice: 695000, salesVolume: 45, daysOnMarket: 32 },
    { month: 'Feb', averagePrice: 710000, salesVolume: 52, daysOnMarket: 29 },
    { month: 'Mar', averagePrice: 725000, salesVolume: 47, daysOnMarket: 28 },
    { month: 'Apr', averagePrice: 735000, salesVolume: 63, daysOnMarket: 25 },
    { month: 'May', averagePrice: 748000, salesVolume: 58, daysOnMarket: 27 },
    { month: 'Jun', averagePrice: 755000, salesVolume: 71, daysOnMarket: 24 },
  ]);

  const getMaxValue = (metric: keyof TrendData) => {
    if (metric === 'month') return 0;
    return Math.max(...trendData.map(data => data[metric] as number));
  };

  const getMetricValue = (data: TrendData) => {
    switch (activeMetric) {
      case 'price': return data.averagePrice;
      case 'volume': return data.salesVolume;
      case 'dom': return data.daysOnMarket;
      default: return data.averagePrice;
    }
  };

  const formatValue = (value: number) => {
    switch (activeMetric) {
      case 'price': return `$${(value / 1000).toFixed(0)}K`;
      case 'volume': return `${value}`;
      case 'dom': return `${value} days`;
      default: return value.toString();
    }
  };

  return (
    <motion.div 
      className="market-trend-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="chart-header">
        <h3>Market Trends</h3>
        <div className="metric-selector">
          <button 
            className={activeMetric === 'price' ? 'active' : ''}
            onClick={() => setActiveMetric('price')}
          >
            Avg Price
          </button>
          <button 
            className={activeMetric === 'volume' ? 'active' : ''}
            onClick={() => setActiveMetric('volume')}
          >
            Sales Volume
          </button>
          <button 
            className={activeMetric === 'dom' ? 'active' : ''}
            onClick={() => setActiveMetric('dom')}
          >
            Days on Market
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-grid">
          {trendData.map((data, index) => {
            const maxValue = getMaxValue(activeMetric === 'price' ? 'averagePrice' : 
                                       activeMetric === 'volume' ? 'salesVolume' : 'daysOnMarket');
            const height = (getMetricValue(data) / maxValue) * 100;

            return (
              <div key={data.month} className="chart-bar-container">
                <motion.div 
                  className="chart-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <span className="bar-value">{formatValue(getMetricValue(data))}</span>
                </motion.div>
                <span className="bar-label">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-insights">
        <div className="insight-item">
          <span className="insight-label">6-Month Trend</span>
          <span className="insight-value positive">↗ +8.6%</span>
        </div>
        <div className="insight-item">
          <span className="insight-label">Market Activity</span>
          <span className="insight-value high">High</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketTrendChart;