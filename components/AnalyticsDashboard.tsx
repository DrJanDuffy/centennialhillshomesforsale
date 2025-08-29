import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Eye,
  MousePointer,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; percentage: number }>;
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAnalyticsData({
          pageViews: 1200,
          uniqueVisitors: 800,
          conversionRate: 5.2,
          averageSessionDuration: 300,
          bounceRate: 45,
          topPages: [
            { page: '/', views: 300 },
            { page: '/about', views: 200 },
            { page: '/contact', views: 150 },
          ],
          trafficSources: [
            { source: 'Direct', percentage: 40 },
            { source: 'Referral', percentage: 30 },
            { source: 'Organic Search', percentage: 20 },
            { source: 'Social Media', percentage: 10 },
          ],
        });
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && !analyticsData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <AlertTriangle className="mr-2" />
        {error}
      </div>
    );
  }

  if (!analyticsData) {
    return null; // Should not happen if loading and error are handled
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Page Views */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-500" />
          Page Views
        </h3>
        <p className="text-4xl font-bold text-gray-800">{analyticsData.pageViews}</p>
        <p className="text-sm text-gray-600">Total page views</p>
      </motion.div>

      {/* Unique Visitors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-blue-500" />
          Unique Visitors
        </h3>
        <p className="text-4xl font-bold text-gray-800">{analyticsData.uniqueVisitors}</p>
        <p className="text-sm text-gray-600">Total unique visitors</p>
      </motion.div>

      {/* Conversion Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 text-purple-500" />
          Conversion Rate
        </h3>
        <p className="text-4xl font-bold text-gray-800">{analyticsData.conversionRate}%</p>
        <p className="text-sm text-gray-600">Overall conversion rate</p>
      </motion.div>

      {/* Average Session Duration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-orange-500" />
          Average Session Duration
        </h3>
        <p className="text-4xl font-bold text-gray-800">{analyticsData.averageSessionDuration}s</p>
        <p className="text-sm text-gray-600">Average time spent on site</p>
      </motion.div>

      {/* Bounce Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Eye className="mr-2 text-red-500" />
          Bounce Rate
        </h3>
        <p className="text-4xl font-bold text-gray-800">{analyticsData.bounceRate}%</p>
        <p className="text-sm text-gray-600">Percentage of single-page visits</p>
      </motion.div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MousePointer className="mr-2 text-teal-500" />
          Top Pages
        </h3>
        <ul className="space-y-2">
          {analyticsData.topPages.map((page, index) => (
            <li
              key={`page-${page.page}-${index}`}
              className="flex items-center justify-between text-gray-800"
            >
              <span>{page.page}</span>
              <span>{page.views} views</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Traffic Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-indigo-500" />
          Traffic Sources
        </h3>
        <ul className="space-y-2">
          {analyticsData.trafficSources.map((source, index) => (
            <li
              key={`source-${source.source}-${index}`}
              className="flex items-center justify-between text-gray-800"
            >
              <span>{source.source}</span>
              <span>{source.percentage}%</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
