import type React from 'react';
import BehavioralTriggers from './BehavioralTriggers';
import SocialProofEngine from './SocialProofEngine';

/**
 * Simplified Conversion Optimization Component
 * Focuses on essential conversion features that work reliably
 */
export const ConversionOptimizer: React.FC = () => {
  return (
    <>
      {/* Behavioral Triggers - Simple and effective */}
      <BehavioralTriggers />

      {/* Social Proof Engine - Builds trust */}
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
      <BehavioralTriggers />
      <SocialProofEngine />
    </>
  );
};

export default ConversionOptimizer;
