import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface SocialProofData {
  recentSales: Array<{
    id: string;
    address: string;
    price: string;
    soldDate: string;
    daysOnMarket: number;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
    verified: boolean;
  }>;
  liveActivity: Array<{
    id: string;
    type: 'viewing' | 'inquiry' | 'saved' | 'shared';
    property: string;
    timestamp: string;
    location: string;
  }>;
  marketStats: {
    totalSales: number;
    averageDaysOnMarket: number;
    priceIncrease: number;
    satisfactionRate: number;
  };
}

export const SocialProofEngine: React.FC = () => {
  const [socialProof, setSocialProof] = useState<SocialProofData>({
    recentSales: [],
    testimonials: [],
    liveActivity: [],
    marketStats: {
      totalSales: 0,
      averageDaysOnMarket: 0,
      priceIncrease: 0,
      satisfactionRate: 0,
    },
  });

  const [activeProof, setActiveProof] = useState<string>('testimonials');
  const [isVisible, setIsVisible] = useState(false);

  // Generate realistic social proof data
  useEffect(() => {
    const generateSocialProof = () => {
      const recentSales = [
        {
          id: '1',
          address: '123 Mountain View Dr',
          price: '$875,000',
          soldDate: '2 days ago',
          daysOnMarket: 12,
        },
        {
          id: '2',
          address: '456 Golf Course Way',
          price: '$1,250,000',
          soldDate: '1 week ago',
          daysOnMarket: 8,
        },
        {
          id: '3',
          address: '789 Centennial Blvd',
          price: '$650,000',
          soldDate: '2 weeks ago',
          daysOnMarket: 15,
        },
      ];

      const testimonials = [
        {
          id: '1',
          name: 'Sarah M.',
          location: 'Centennial Hills',
          rating: 5,
          text: 'Dr. Duffy helped us find our dream home in just 2 weeks! Her knowledge of the area is unmatched.',
          date: '1 week ago',
          verified: true,
        },
        {
          id: '2',
          name: 'Mike R.',
          location: 'Providence',
          rating: 5,
          text: 'Professional, knowledgeable, and made the entire process stress-free. Highly recommend!',
          date: '2 weeks ago',
          verified: true,
        },
        {
          id: '3',
          name: 'Jennifer L.',
          location: 'Skye Canyon',
          rating: 5,
          text: 'Top 1% for a reason - exceeded all our expectations. The market analysis was spot on.',
          date: '3 weeks ago',
          verified: true,
        },
        {
          id: '4',
          name: 'David K.',
          location: 'Centennial Hills',
          rating: 5,
          text: "Sold our home for 15% above asking price. Dr. Duffy's marketing strategy was brilliant.",
          date: '1 month ago',
          verified: true,
        },
      ];

      const liveActivity: Array<{
        id: string;
        type: 'viewing' | 'inquiry' | 'saved' | 'shared';
        property: string;
        timestamp: string;
        location: string;
      }> = [
        {
          id: '1',
          type: 'viewing' as const,
          property: 'Luxury Estate on Mountain View',
          timestamp: '2 minutes ago',
          location: 'Las Vegas, NV',
        },
        {
          id: '2',
          type: 'inquiry' as const,
          property: 'Golf Course Home',
          timestamp: '5 minutes ago',
          location: 'Henderson, NV',
        },
        {
          id: '3',
          type: 'saved' as const,
          property: 'Modern Family Home',
          timestamp: '8 minutes ago',
          location: 'Las Vegas, NV',
        },
        {
          id: '4',
          type: 'shared' as const,
          property: 'Executive Condo',
          timestamp: '12 minutes ago',
          location: 'Las Vegas, NV',
        },
      ];

      const marketStats = {
        totalSales: 247,
        averageDaysOnMarket: 18,
        priceIncrease: 12.5,
        satisfactionRate: 98,
      };

      setSocialProof({
        recentSales,
        testimonials,
        liveActivity,
        marketStats,
      });
    };

    generateSocialProof();
  }, []);

  // Show social proof after user engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Rotate through different types of social proof
  useEffect(() => {
    const types = ['testimonials', 'recentSales', 'liveActivity', 'marketStats'];
    let currentIndex = 0;

    const rotateProof = () => {
      setActiveProof(types[currentIndex]);
      currentIndex = (currentIndex + 1) % types.length;
    };

    const interval = setInterval(rotateProof, 8000); // Change every 8 seconds
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="social-proof-engine">
      {/* Floating Social Proof Widget */}
      <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-w-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">What Others Are Saying</h3>
            <div className="flex space-x-1">
              {['testimonials', 'recentSales', 'liveActivity', 'marketStats'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveProof(type)}
                  className={`w-2 h-2 rounded-full ${
                    activeProof === type ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {activeProof === 'testimonials' && (
            <TestimonialsProof testimonials={socialProof.testimonials} />
          )}

          {activeProof === 'recentSales' && <RecentSalesProof sales={socialProof.recentSales} />}

          {activeProof === 'liveActivity' && (
            <LiveActivityProof activity={socialProof.liveActivity} />
          )}

          {activeProof === 'marketStats' && <MarketStatsProof stats={socialProof.marketStats} />}
        </div>
      </div>

      {/* Inline Social Proof Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {socialProof.marketStats.totalSales}+
            </div>
            <div className="text-sm text-gray-600">Homes Sold</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {socialProof.marketStats.averageDaysOnMarket}
            </div>
            <div className="text-sm text-gray-600">Avg Days on Market</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {socialProof.marketStats.priceIncrease}%
            </div>
            <div className="text-sm text-gray-600">Price Increase</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {socialProof.marketStats.satisfactionRate}%
            </div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Proof Components
const TestimonialsProof: React.FC<{ testimonials: SocialProofData['testimonials'] }> = ({
  testimonials,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[currentTestimonial];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="flex text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        {testimonial.verified && (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-800 italic">"{testimonial.text}"</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-xs text-gray-600">{testimonial.location}</div>
        </div>
        <div className="text-xs text-gray-500">{testimonial.date}</div>
      </div>
    </div>
  );
};

const RecentSalesProof: React.FC<{ sales: SocialProofData['recentSales'] }> = ({ sales }) => {
  const [currentSale, setCurrentSale] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSale((prev) => (prev + 1) % sales.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sales.length]);

  const sale = sales[currentSale];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-green-600">Just Sold!</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{sale.address}</div>
        <div className="text-lg font-bold text-green-600">{sale.price}</div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Sold {sale.soldDate}</span>
        <span>{sale.daysOnMarket} days on market</span>
      </div>
    </div>
  );
};

const LiveActivityProof: React.FC<{ activity: SocialProofData['liveActivity'] }> = ({
  activity,
}) => {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activity.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [activity.length]);

  const activityItem = activity[currentActivity];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'viewing':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'inquiry':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case 'saved':
        return (
          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        );
      case 'shared':
        return (
          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case 'viewing':
        return 'viewed';
      case 'inquiry':
        return 'inquired about';
      case 'saved':
        return 'saved';
      case 'shared':
        return 'shared';
      default:
        return 'interacted with';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-blue-600">Live Activity</span>
      </div>
      <div className="flex items-center space-x-3">
        {getActivityIcon(activityItem.type)}
        <div className="flex-1">
          <div className="text-sm text-gray-800">
            Someone {getActivityText(activityItem.type)}{' '}
            <span className="font-semibold">{activityItem.property}</span>
          </div>
          <div className="text-xs text-gray-600">{activityItem.timestamp}</div>
        </div>
      </div>
    </div>
  );
};

const MarketStatsProof: React.FC<{ stats: SocialProofData['marketStats'] }> = ({ stats }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-purple-600">Market Leader</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{stats.totalSales}+</div>
          <div className="text-xs text-gray-600">Homes Sold</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{stats.satisfactionRate}%</div>
          <div className="text-xs text-gray-600">Satisfaction</div>
        </div>
      </div>
      <div className="text-xs text-gray-600 text-center">Top 1% REALTOR® in Las Vegas</div>
    </div>
  );
};

export default SocialProofEngine;
