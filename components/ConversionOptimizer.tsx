import React from 'react';
import EngagementOptimizer from './EngagementOptimizer';
import ConversionFunnel from './ConversionFunnel';
import BehavioralTriggers from './BehavioralTriggers';
import SocialProofEngine from './SocialProofEngine';
import PerformanceMonitor from './PerformanceMonitor';

/**
 * Master Conversion Optimization Component
 * Combines all engagement and conversion optimization features
 */
export const ConversionOptimizer: React.FC = () => {
  return (
    <>
      {/* Performance Monitoring */}
      <PerformanceMonitor />
      
      {/* Engagement Optimization */}
      <EngagementOptimizer />
      
      {/* Behavioral Triggers */}
      <BehavioralTriggers />
      
      {/* Social Proof Engine */}
      <SocialProofEngine />
    </>
  );
};

/**
 * Conversion Funnel Component (for dedicated funnel pages)
 */
export const ConversionFunnelPage: React.FC = () => {
  return (
    <>
      <PerformanceMonitor />
      <ConversionFunnel />
      <BehavioralTriggers />
      <SocialProofEngine />
    </>
  );
};

export default ConversionOptimizer;
