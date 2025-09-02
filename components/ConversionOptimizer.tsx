import type React from 'react';
import BehavioralTriggers from './BehavioralTriggers';
import ConversionFunnel from './ConversionFunnel';
import EngagementOptimizer from './EngagementOptimizer';
import { PerformanceMonitor } from './PerformanceMonitor';
import SocialProofEngine from './SocialProofEngine';

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
