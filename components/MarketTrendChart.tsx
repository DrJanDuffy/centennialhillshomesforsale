import { motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Clock,
  DollarSign,
  Home,
  Minus,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';

interface MarketData {
  month: string;
  avgPrice: number;
  daysOnMarket: number;
  homesSold: number;
  newListings: number;
  priceChange: number;
}

interface MarketTrendChartProps {
  data?: MarketData[];
  className?: string;
}

const MarketTrendChart: React.FC<MarketTrendChartProps> = ({
  data = defaultMarketData,
  className = '',
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'price' | 'days' | 'volume'>('price');
  const [timeframe, setTimeframe] = useState<'3m' | '6m' | '12m'>('6m');

  const metrics = [
    { key: 'price', label: 'Average Price', icon: DollarSign, color: 'text-accent-color' },
    { key: 'days', label: 'Days on Market', icon: Clock, color: 'text-warning-color' },
    { key: 'volume', label: 'Homes Sold', icon: Home, color: 'text-secondary-color' },
  ];

  const timeframes = [
    { key: '3m', label: '3 Months' },
    { key: '6m', label: '6 Months' },
    { key: '12m', label: '12 Months' },
  ];

  const getCurrentValue = () => {
    const latest = data[data.length - 1];
    switch (selectedMetric) {
      case 'price':
        return latest.avgPrice;
      case 'days':
        return latest.daysOnMarket;
      case 'volume':
        return latest.homesSold;
      default:
        return 0;
    }
  };

  const getPreviousValue = () => {
    const previous = data[data.length - 2];
    switch (selectedMetric) {
      case 'price':
        return previous.avgPrice;
      case 'days':
        return previous.daysOnMarket;
      case 'volume':
        return previous.homesSold;
      default:
        return 0;
    }
  };

  const getChangePercentage = () => {
    const current = getCurrentValue();
    const previous = getPreviousValue();
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getChangeIcon = () => {
    const change = getChangePercentage();
    if (change > 0) return <ArrowUp className="w-4 h-4 text-accent-color" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-warning-color" />;
    return <Minus className="w-4 h-4 text-secondary" />;
  };

  const getChangeColor = () => {
    const change = getChangePercentage();
    if (change > 0) return 'text-accent-color';
    if (change < 0) return 'text-warning-color';
    return 'text-secondary';
  };

  const formatValue = (value: number) => {
    switch (selectedMetric) {
      case 'price':
        return `$${(value / 1000).toFixed(0)}K`;
      case 'days':
        return `${value} days`;
      case 'volume':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getChartData = () => {
    const filteredData = data.slice(-6); // Last 6 months
    return filteredData.map((item, index) => ({
      x: index,
      y:
        selectedMetric === 'price'
          ? item.avgPrice / 1000
          : selectedMetric === 'days'
            ? item.daysOnMarket
            : item.homesSold,
      label: item.month,
    }));
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map((d) => d.y));
  const minValue = Math.min(...chartData.map((d) => d.y));

  return (
    <div className={`bg-white rounded-2xl p-8 shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">Market Trends</h3>
          <p className="text-secondary">Real-time market data for Centennial Hills</p>
        </div>

        {/* Metric Selector */}
        <div className="flex gap-2 mt-4 lg:mt-0">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key as 'price' | 'days' | 'volume')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedMetric === metric.key
                  ? 'bg-primary text-white'
                  : 'bg-tertiary text-secondary hover:bg-secondary-color/10'
              }`}
            >
              {React.createElement(metric.icon, { className: 'w-4 h-4' })}
              <span className="text-sm font-medium">{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-accent-color/10 to-secondary-color/10 rounded-xl p-6 border border-accent-color/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-primary">
              Current {metrics.find((m) => m.key === selectedMetric)?.label}
            </h4>
            {(() => {
              const metric = metrics.find((m) => m.key === selectedMetric);
              return metric?.icon
                ? React.createElement(metric.icon, { className: 'w-6 h-6 text-accent-color' })
                : null;
            })()}
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            {formatValue(getCurrentValue())}
          </div>
          <div className={`flex items-center gap-2 text-sm ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{Math.abs(getChangePercentage()).toFixed(1)}% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-warning-color/10 to-accent-color/10 rounded-xl p-6 border border-warning-color/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-primary">Market Activity</h4>
            <Activity className="w-6 h-6 text-warning-color" />
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            {data[data.length - 1].newListings}
          </div>
          <div className="text-sm text-secondary">New listings this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-secondary-color/10 to-primary-color/10 rounded-xl p-6 border border-secondary-color/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-primary">Market Status</h4>
            <BarChart3 className="w-6 h-6 text-secondary-color" />
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            {getChangePercentage() > 0 ? 'Hot' : getChangePercentage() < 0 ? 'Cooling' : 'Stable'}
          </div>
          <div className="text-sm text-secondary">Market condition</div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="bg-tertiary rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-primary">6-Month Trend</h4>
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf.key}
                onClick={() => setTimeframe(tf.key as '3m' | '6m' | '12m')}
                className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                  timeframe === tf.key
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary hover:bg-secondary-color/10'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2">
          {chartData.map((point, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${((point.y - minValue) / (maxValue - minValue)) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex-1 bg-gradient-to-t from-accent-color to-secondary-color rounded-t-lg relative group"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {formatValue(point.y)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-sm text-secondary">
          {chartData.map((point, index) => (
            <span key={index} className="text-center">
              {point.label}
            </span>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-color/5 to-secondary-color/5 rounded-xl p-6 border border-primary-color/10"
        >
          <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-color" />
            Key Insights
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent-color rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-secondary text-sm">
                Average home prices have {getChangePercentage() > 0 ? 'increased' : 'decreased'} by{' '}
                {Math.abs(getChangePercentage()).toFixed(1)}% this month
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-warning-color rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-secondary text-sm">
                Homes are selling in an average of {data[data.length - 1].daysOnMarket} days
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary-color rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-secondary text-sm">
                {data[data.length - 1].homesSold} homes sold this month
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-warning-color/5 to-accent-color/5 rounded-xl p-6 border border-warning-color/10"
        >
          <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-warning-color" />
            Market Forecast
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-secondary">Price Trend</span>
                <span className="text-sm font-medium text-primary">
                  {getChangePercentage() > 0
                    ? '↗ Upward'
                    : getChangePercentage() < 0
                      ? '↘ Downward'
                      : '→ Stable'}
                </span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(getChangePercentage()) * 10, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-2 rounded-full ${
                    getChangePercentage() > 0 ? 'bg-accent-color' : 'bg-warning-color'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-secondary">Inventory Level</span>
                <span className="text-sm font-medium text-primary">
                  {data[data.length - 1].newListings > 20
                    ? 'High'
                    : data[data.length - 1].newListings > 10
                      ? 'Medium'
                      : 'Low'}
                </span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((data[data.length - 1].newListings / 30) * 100, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-2 rounded-full bg-secondary-color"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Default market data with more realistic variation
const defaultMarketData: MarketData[] = [
  {
    month: 'Jan',
    avgPrice: 720000,
    daysOnMarket: 18,
    homesSold: 42,
    newListings: 25,
    priceChange: 1.2,
  },
  {
    month: 'Feb',
    avgPrice: 735000,
    daysOnMarket: 16,
    homesSold: 48,
    newListings: 28,
    priceChange: 2.1,
  },
  {
    month: 'Mar',
    avgPrice: 748000,
    daysOnMarket: 14,
    homesSold: 55,
    newListings: 32,
    priceChange: 1.8,
  },
  {
    month: 'Apr',
    avgPrice: 762000,
    daysOnMarket: 12,
    homesSold: 62,
    newListings: 38,
    priceChange: 1.9,
  },
  {
    month: 'May',
    avgPrice: 775000,
    daysOnMarket: 10,
    homesSold: 68,
    newListings: 45,
    priceChange: 1.7,
  },
  {
    month: 'Jun',
    avgPrice: 789000,
    daysOnMarket: 8,
    homesSold: 75,
    newListings: 52,
    priceChange: 1.8,
  },
];

export default MarketTrendChart;
