import React, { useEffect, useState, useCallback } from 'react';

interface EngagementMetrics {
  timeOnPage: number;
  scrollDepth: number;
  clickCount: number;
  hoverCount: number;
  formInteractions: number;
}

interface ConversionTrigger {
  id: string;
  type: 'urgency' | 'social_proof' | 'scarcity' | 'authority' | 'reciprocity';
  condition: (metrics: EngagementMetrics) => boolean;
  component: React.ComponentType<any>;
  priority: number;
}

export const EngagementOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    timeOnPage: 0,
    scrollDepth: 0,
    clickCount: 0,
    hoverCount: 0,
    formInteractions: 0,
  });

  const [activeTriggers, setActiveTriggers] = useState<string[]>([]);
  const [userSegment, setUserSegment] = useState<'browser' | 'interested' | 'ready_to_buy'>('browser');

  // Track user engagement
  useEffect(() => {
    const startTime = Date.now();
    let scrollTimeout: NodeJS.Timeout;

    const updateTimeOnPage = () => {
      setMetrics(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - startTime) / 1000)
      }));
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setMetrics(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // User stopped scrolling - trigger engagement
        if (scrollPercent > 30 && !activeTriggers.includes('scroll_engagement')) {
          setActiveTriggers(prev => [...prev, 'scroll_engagement']);
        }
      }, 2000);
    };

    const handleClick = () => {
      setMetrics(prev => ({
        ...prev,
        clickCount: prev.clickCount + 1
      }));
    };

    const handleMouseOver = () => {
      setMetrics(prev => ({
        ...prev,
        hoverCount: prev.hoverCount + 1
      }));
    };

    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    // Update time every second
    const timeInterval = setInterval(updateTimeOnPage, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
      clearInterval(timeInterval);
      clearTimeout(scrollTimeout);
    };
  }, [activeTriggers]);

  // Determine user segment based on behavior
  useEffect(() => {
    if (metrics.timeOnPage > 120 && metrics.scrollDepth > 70) {
      setUserSegment('ready_to_buy');
    } else if (metrics.timeOnPage > 60 && metrics.scrollDepth > 40) {
      setUserSegment('interested');
    } else {
      setUserSegment('browser');
    }
  }, [metrics.timeOnPage, metrics.scrollDepth]);

  // Conversion triggers based on user behavior
  const conversionTriggers: ConversionTrigger[] = [
    {
      id: 'urgency_timer',
      type: 'urgency',
      condition: (m) => m.timeOnPage > 30 && m.scrollDepth > 20,
      component: UrgencyTimer,
      priority: 1
    },
    {
      id: 'social_proof',
      type: 'social_proof',
      condition: (m) => m.timeOnPage > 45 && m.clickCount > 3,
      component: SocialProofBanner,
      priority: 2
    },
    {
      id: 'scarcity_indicator',
      type: 'scarcity',
      condition: (m) => m.scrollDepth > 60 && userSegment === 'interested',
      component: ScarcityIndicator,
      priority: 3
    },
    {
      id: 'authority_badge',
      type: 'authority',
      condition: (m) => m.timeOnPage > 90,
      component: AuthorityBadge,
      priority: 4
    },
    {
      id: 'exit_intent',
      type: 'reciprocity',
      condition: (m) => m.scrollDepth > 30 && m.timeOnPage > 20,
      component: ExitIntentPopup,
      priority: 5
    }
  ];

  // Activate triggers based on conditions
  useEffect(() => {
    const newTriggers = conversionTriggers
      .filter(trigger => trigger.condition(metrics))
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 2) // Show max 2 triggers at once
      .map(trigger => trigger.id);

    setActiveTriggers(prev => {
      const combined = [...new Set([...prev, ...newTriggers])];
      return combined.slice(-3); // Keep only last 3 triggers
    });
  }, [metrics, userSegment]);

  return (
    <div className="engagement-optimizer">
      {activeTriggers.map(triggerId => {
        const trigger = conversionTriggers.find(t => t.id === triggerId);
        if (!trigger) return null;
        
        const TriggerComponent = trigger.component;
        return (
          <TriggerComponent
            key={triggerId}
            metrics={metrics}
            userSegment={userSegment}
            onDismiss={() => setActiveTriggers(prev => prev.filter(id => id !== triggerId))}
          />
        );
      })}
    </div>
  );
};

// Urgency Timer Component
const UrgencyTimer: React.FC<{
  metrics: EngagementMetrics;
  userSegment: string;
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <span className="font-bold">Limited Time Offer!</span>
        <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">×</button>
      </div>
      <div className="text-2xl font-mono font-bold mt-1">
        {formatTime(timeLeft)}
      </div>
      <div className="text-sm mt-1">Free consultation expires soon!</div>
    </div>
  );
};

// Social Proof Banner
const SocialProofBanner: React.FC<{
  metrics: EngagementMetrics;
  userSegment: string;
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    { name: "Sarah M.", location: "Centennial Hills", text: "Dr. Duffy helped us find our dream home in just 2 weeks!" },
    { name: "Mike R.", location: "Providence", text: "Professional, knowledgeable, and made the process stress-free." },
    { name: "Jennifer L.", location: "Skye Canyon", text: "Top 1% for a reason - exceeded all our expectations!" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">5.0 (150+ reviews)</span>
          </div>
          <p className="text-sm text-gray-800 mb-2">
            "{testimonials[currentTestimonial].text}"
          </p>
          <p className="text-xs text-gray-600">
            - {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].location}
          </p>
        </div>
        <button onClick={onDismiss} className="ml-2 text-gray-400 hover:text-gray-600">×</button>
      </div>
    </div>
  );
};

// Scarcity Indicator
const ScarcityIndicator: React.FC<{
  metrics: EngagementMetrics;
  userSegment: string;
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  const [propertiesLeft, setPropertiesLeft] = useState(3);

  return (
    <div className="fixed top-20 right-4 bg-orange-500 text-white p-3 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="font-semibold">Only {propertiesLeft} homes left!</span>
        <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">×</button>
      </div>
      <div className="text-xs mt-1">In your price range this month</div>
    </div>
  );
};

// Authority Badge
const AuthorityBadge: React.FC<{
  metrics: EngagementMetrics;
  userSegment: string;
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  return (
    <div className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <div>
          <div className="font-semibold text-sm">Top 1% REALTOR®</div>
          <div className="text-xs opacity-90">500+ Homes Sold</div>
        </div>
        <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">×</button>
      </div>
    </div>
  );
};

// Exit Intent Popup
const ExitIntentPopup: React.FC<{
  metrics: EngagementMetrics;
  userSegment: string;
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setShowPopup(false);
    onDismiss();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Wait! Don't Miss Out</h3>
          <p className="text-gray-600 mb-4">
            Get exclusive access to new listings before they hit the market
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Early Access
            </button>
          </form>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            No thanks, I'll browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngagementOptimizer;
