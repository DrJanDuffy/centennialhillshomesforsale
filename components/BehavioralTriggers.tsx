import type React from 'react';
import { useEffect, useState } from 'react';

interface TriggerConfig {
  id: string;
  name: string;
  condition: () => boolean;
  component: React.ComponentType<any>;
  priority: number;
  cooldown: number; // minutes
}

interface UserBehavior {
  timeOnSite: number;
  scrollDepth: number;
  clickCount: number;
  formInteractions: number;
  exitIntent: boolean;
  returning: boolean;
  deviceType: 'mobile' | 'desktop';
  referrer: string;
}

export const BehavioralTriggers: React.FC = () => {
  const [behavior, setBehavior] = useState<UserBehavior>({
    timeOnSite: 0,
    scrollDepth: 0,
    clickCount: 0,
    formInteractions: 0,
    exitIntent: false,
    returning: false,
    deviceType: 'desktop',
    referrer: '',
  });

  const [activeTriggers, setActiveTriggers] = useState<string[]>([]);
  const [triggerHistory, setTriggerHistory] = useState<{ [key: string]: number }>({});

  // Track user behavior
  useEffect(() => {
    const startTime = Date.now();
    let scrollTimeout: NodeJS.Timeout;

    // Detect device type
    const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';

    // Check if returning user
    const returning = localStorage.getItem('centennial_hills_visitor') !== null;
    if (!returning) {
      localStorage.setItem('centennial_hills_visitor', 'true');
    }

    // Get referrer
    const referrer = document.referrer || 'direct';

    setBehavior((prev) => ({
      ...prev,
      deviceType,
      returning,
      referrer,
    }));

    const updateTimeOnSite = () => {
      setBehavior((prev) => ({
        ...prev,
        timeOnSite: Math.floor((Date.now() - startTime) / 1000),
      }));
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setBehavior((prev) => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent),
      }));

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // User stopped scrolling
        if (scrollPercent > 30) {
          setBehavior((prev) => ({ ...prev, exitIntent: true }));
        }
      }, 3000);
    };

    const handleClick = () => {
      setBehavior((prev) => ({
        ...prev,
        clickCount: prev.clickCount + 1,
      }));
    };

    const handleFormInteraction = () => {
      setBehavior((prev) => ({
        ...prev,
        formInteractions: prev.formInteractions + 1,
      }));
    };

    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    document.addEventListener('focus', handleFormInteraction, true);

    // Update time every second
    const timeInterval = setInterval(updateTimeOnSite, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focus', handleFormInteraction, true);
      clearInterval(timeInterval);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Define behavioral triggers
  const triggers: TriggerConfig[] = [
    {
      id: 'first_time_visitor',
      name: 'First Time Visitor',
      condition: () => !behavior.returning && behavior.timeOnSite > 10,
      component: FirstTimeVisitorOffer,
      priority: 1,
      cooldown: 60,
    },
    {
      id: 'high_engagement',
      name: 'High Engagement',
      condition: () => behavior.scrollDepth > 70 && behavior.clickCount > 5,
      component: HighEngagementOffer,
      priority: 2,
      cooldown: 30,
    },
    {
      id: 'mobile_user',
      name: 'Mobile User',
      condition: () => behavior.deviceType === 'mobile' && behavior.timeOnSite > 20,
      component: MobileOptimizedOffer,
      priority: 3,
      cooldown: 45,
    },
    {
      id: 'form_abandonment',
      name: 'Form Abandonment',
      condition: () => behavior.formInteractions > 0 && behavior.timeOnSite > 30,
      component: FormAbandonmentRecovery,
      priority: 4,
      cooldown: 15,
    },
    {
      id: 'exit_intent',
      name: 'Exit Intent',
      condition: () => behavior.exitIntent && behavior.timeOnSite > 15,
      component: ExitIntentOffer,
      priority: 5,
      cooldown: 20,
    },
    {
      id: 'returning_visitor',
      name: 'Returning Visitor',
      condition: () => behavior.returning && behavior.timeOnSite > 5,
      component: ReturningVisitorOffer,
      priority: 6,
      cooldown: 90,
    },
  ];

  // Check and activate triggers
  useEffect(() => {
    const now = Date.now();
    const newTriggers: string[] = [];

    triggers.forEach((trigger) => {
      const lastShown = triggerHistory[trigger.id] || 0;
      const cooldownExpired = now - lastShown > trigger.cooldown * 60 * 1000;

      if (trigger.condition() && cooldownExpired && !activeTriggers.includes(trigger.id)) {
        newTriggers.push(trigger.id);
        setTriggerHistory((prev) => ({
          ...prev,
          [trigger.id]: now,
        }));
      }
    });

    if (newTriggers.length > 0) {
      setActiveTriggers((prev) => [...prev, ...newTriggers].slice(-2)); // Max 2 active triggers
    }
  }, [triggers, activeTriggers, triggerHistory]);

  const dismissTrigger = (triggerId: string) => {
    setActiveTriggers((prev) => prev.filter((id) => id !== triggerId));
  };

  return (
    <div className="behavioral-triggers">
      {activeTriggers.map((triggerId) => {
        const trigger = triggers.find((t) => t.id === triggerId);
        if (!trigger) return null;

        const TriggerComponent = trigger.component;
        return (
          <TriggerComponent
            key={triggerId}
            behavior={behavior}
            onDismiss={() => dismissTrigger(triggerId)}
          />
        );
      })}
    </div>
  );
};

// Trigger Components
const FirstTimeVisitorOffer: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="font-semibold">Welcome!</span>
        </div>
        <p className="text-sm mb-3">
          Get a <strong>free home valuation</strong> and market analysis for your current property.
        </p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
          Get Free Valuation
        </button>
      </div>
      <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">
        ×
      </button>
    </div>
  </div>
);

const HighEngagementOffer: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-semibold">You're Engaged!</span>
        </div>
        <p className="text-sm mb-3">
          Schedule a <strong>priority consultation</strong> with Dr. Jan Duffy today.
        </p>
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
          Schedule Now
        </button>
      </div>
      <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">
        ×
      </button>
    </div>
  </div>
);

const MobileOptimizedOffer: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold">Call Now for Mobile Users</div>
          <div className="text-sm opacity-90">Tap to call Dr. Jan Duffy</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <a
          href="tel:702-222-1964"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Call Now
        </a>
        <button onClick={onDismiss} className="text-white/80 hover:text-white ml-2">
          ×
        </button>
      </div>
    </div>
  </div>
);

const FormAbandonmentRecovery: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-w-md w-full mx-4">
    <div className="p-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Don't Leave Empty Handed!</h3>
        <p className="text-gray-600 mb-4">
          You started filling out a form. Let us help you complete it and get your free
          consultation.
        </p>
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Complete Form
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ExitIntentOffer: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Wait! Don't Miss Out</h3>
        <p className="text-gray-600 mb-4">
          Get exclusive access to new listings before they hit the market. Join our VIP list for
          early notifications.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Join VIP List
          </button>
        </form>
        <button onClick={onDismiss} className="mt-2 text-sm text-gray-500 hover:text-gray-700">
          No thanks, I'll browse
        </button>
      </div>
    </div>
  </div>
);

const ReturningVisitorOffer: React.FC<{
  behavior: UserBehavior;
  onDismiss: () => void;
}> = ({ onDismiss }) => (
  <div className="fixed top-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <span className="font-semibold">Welcome Back!</span>
        </div>
        <p className="text-sm mb-3">
          New properties just listed! Get <strong>first access</strong> to viewings.
        </p>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
          View New Listings
        </button>
      </div>
      <button onClick={onDismiss} className="ml-2 text-white/80 hover:text-white">
        ×
      </button>
    </div>
  </div>
);

export default BehavioralTriggers;
