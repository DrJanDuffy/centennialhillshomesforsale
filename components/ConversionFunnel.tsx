import React, { useEffect, useState, useCallback } from 'react';

interface FunnelStage {
  id: string;
  name: string;
  description: string;
  cta: string;
  conversionRate: number;
  nextStage?: string;
}

interface UserJourney {
  stage: string;
  timestamp: number;
  actions: string[];
  engagementScore: number;
}

export const ConversionFunnel: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<string>('awareness');
  const [userJourney, setUserJourney] = useState<UserJourney[]>([]);
  const [engagementScore, setEngagementScore] = useState(0);
  const [showPersonalizedCTA, setShowPersonalizedCTA] = useState(false);

  const funnelStages: FunnelStage[] = [
    {
      id: 'awareness',
      name: 'Awareness',
      description: 'First-time visitor exploring the area',
      cta: 'Explore Properties',
      conversionRate: 15,
      nextStage: 'interest'
    },
    {
      id: 'interest',
      name: 'Interest',
      description: 'Showing interest in specific properties',
      cta: 'Schedule Viewing',
      conversionRate: 35,
      nextStage: 'consideration'
    },
    {
      id: 'consideration',
      name: 'Consideration',
      description: 'Comparing properties and neighborhoods',
      cta: 'Get Market Analysis',
      conversionRate: 60,
      nextStage: 'intent'
    },
    {
      id: 'intent',
      name: 'Purchase Intent',
      description: 'Ready to make an offer',
      cta: 'Make an Offer',
      conversionRate: 80,
      nextStage: 'purchase'
    },
    {
      id: 'purchase',
      name: 'Purchase',
      description: 'Completed transaction',
      cta: 'Refer a Friend',
      conversionRate: 95
    }
  ];

  // Track user actions and calculate engagement score
  const trackAction = useCallback((action: string) => {
    const timestamp = Date.now();
    const newAction: UserJourney = {
      stage: currentStage,
      timestamp,
      actions: [action],
      engagementScore: calculateEngagementScore(action)
    };

    setUserJourney(prev => [...prev, newAction]);
    setEngagementScore(prev => prev + newAction.engagementScore);

    // Check if user should advance to next stage
    const currentStageData = funnelStages.find(s => s.id === currentStage);
    if (currentStageData && engagementScore > currentStageData.conversionRate) {
      advanceToNextStage();
    }
  }, [currentStage, engagementScore]);

  const calculateEngagementScore = (action: string): number => {
    const actionScores: { [key: string]: number } = {
      'page_view': 1,
      'scroll_50': 2,
      'scroll_100': 5,
      'click_property': 3,
      'click_contact': 8,
      'form_start': 5,
      'form_complete': 15,
      'phone_click': 10,
      'email_click': 7,
      'share_property': 12,
      'save_property': 8,
      'view_gallery': 4,
      'check_market_data': 6
    };

    return actionScores[action] || 1;
  };

  const advanceToNextStage = () => {
    const currentStageData = funnelStages.find(s => s.id === currentStage);
    if (currentStageData?.nextStage) {
      setCurrentStage(currentStageData.nextStage);
      setShowPersonalizedCTA(true);
      
      // Hide personalized CTA after 5 seconds
      setTimeout(() => setShowPersonalizedCTA(false), 5000);
    }
  };

  // Get current stage data
  const currentStageData = funnelStages.find(s => s.id === currentStage);

  return (
    <div className="conversion-funnel">
      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">
                Your Journey: <span className="text-blue-600">{currentStageData?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {funnelStages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        funnelStages.findIndex(s => s.id === currentStage) >= index
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    />
                    {index < funnelStages.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-300 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Engagement: {engagementScore} points
            </div>
          </div>
        </div>
      </div>

      {/* Personalized CTA Banner */}
      {showPersonalizedCTA && (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Great progress! You're ready for the next step</div>
                  <div className="text-sm opacity-90">{currentStageData?.description}</div>
                </div>
              </div>
              <button
                onClick={() => setShowPersonalizedCTA(false)}
                className="text-white/80 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage-Specific Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStage === 'awareness' && (
          <AwarenessStage onAction={trackAction} />
        )}
        {currentStage === 'interest' && (
          <InterestStage onAction={trackAction} />
        )}
        {currentStage === 'consideration' && (
          <ConsiderationStage onAction={trackAction} />
        )}
        {currentStage === 'intent' && (
          <IntentStage onAction={trackAction} />
        )}
        {currentStage === 'purchase' && (
          <PurchaseStage onAction={trackAction} />
        )}
      </div>
    </div>
  );
};

// Stage Components
const AwarenessStage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Centennial Hills</h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      Discover luxury living in Las Vegas' most prestigious master-planned community. 
      Let us help you find your perfect home.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div 
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onAction('click_property')}
      >
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Browse Properties</h3>
        <p className="text-gray-600">Explore our curated selection of luxury homes</p>
      </div>
      <div 
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onAction('check_market_data')}
      >
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Market Trends</h3>
        <p className="text-gray-600">Stay informed with the latest market data</p>
      </div>
      <div 
        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onAction('click_contact')}
      >
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
        <p className="text-gray-600">Schedule a consultation with Dr. Jan Duffy</p>
      </div>
    </div>
  </div>
);

const InterestStage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Found Something You Like?</h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      You're showing interest in our properties. Let's take the next step and schedule a viewing.
    </p>
    <div className="bg-blue-50 rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-4">Ready to See Properties in Person?</h3>
      <p className="text-gray-600 mb-6">
        Schedule a personalized tour with Dr. Jan Duffy and see these beautiful homes up close.
      </p>
      <button
        onClick={() => onAction('click_contact')}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Schedule Viewing
      </button>
    </div>
  </div>
);

const ConsiderationStage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Comparing Your Options?</h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      You're seriously considering properties. Get a comprehensive market analysis to make an informed decision.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Market Analysis</h3>
        <ul className="text-left text-gray-600 space-y-2">
          <li>• Comparable property sales</li>
          <li>• Neighborhood trends</li>
          <li>• Price predictions</li>
          <li>• Investment potential</li>
        </ul>
        <button
          onClick={() => onAction('form_start')}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Get Free Analysis
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Neighborhood Guide</h3>
        <ul className="text-left text-gray-600 space-y-2">
          <li>• School districts</li>
          <li>• Amenities & services</li>
          <li>• Commute times</li>
          <li>• Future development</li>
        </ul>
        <button
          onClick={() => onAction('click_property')}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Neighborhoods
        </button>
      </div>
    </div>
  </div>
);

const IntentStage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make an Offer?</h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      You're ready to take action! Let's discuss your offer strategy and get you into your dream home.
    </p>
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-4">Let's Make It Happen</h3>
      <p className="text-gray-600 mb-6">
        Dr. Jan Duffy will guide you through the offer process and negotiate the best terms for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => onAction('phone_click')}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Call Now: (702) 222-1964
        </button>
        <button
          onClick={() => onAction('email_click')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Send Email
        </button>
      </div>
    </div>
  </div>
);

const PurchaseStage: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
  <div className="text-center py-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      Thank you for choosing Dr. Jan Duffy as your real estate partner. 
      We're here to help with all your future real estate needs.
    </p>
    <div className="bg-yellow-50 rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-4">Refer a Friend</h3>
      <p className="text-gray-600 mb-6">
        Know someone looking to buy or sell? Refer them and earn rewards!
      </p>
      <button
        onClick={() => onAction('share_property')}
        className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
      >
        Refer a Friend
      </button>
    </div>
  </div>
);

export default ConversionFunnel;
