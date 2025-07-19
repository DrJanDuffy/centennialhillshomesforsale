
import React, { useState, useEffect } from 'react';
import ErrorTracker from '../utils/errorTracking';
import GlobalErrorHandler from '../utils/globalErrorHandler';

interface HealthMetrics {
  totalErrors: number;
  recentErrors: unknown[];
  performanceScore: number;
  lastCheck: string;
}

const SystemHealthMonitor: React.FC = () => {
  const [health, setHealth] = useState<HealthMetrics>({
    totalErrors: 0,
    recentErrors: [],
    performanceScore: 100,
    lastCheck: new Date().toISOString()
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when errors are detected
    const checkHealth = () => {
      const globalErrorHandler = GlobalErrorHandler.getInstance();
      const errorSummary = globalErrorHandler.getErrorSummary();
      
      // Calculate performance score (simplified)
      const performanceScore = Math.max(0, 100 - (errorSummary.totalErrors * 10));

      const newHealth: HealthMetrics = {
        totalErrors: errorSummary.totalErrors,
        recentErrors: errorSummary.recentErrors,
        performanceScore,
        lastCheck: new Date().toISOString()
      };

      setHealth(newHealth);
      
      // Show if there are errors or in development
      setIsVisible(
        process.env.NODE_ENV === 'development' || 
        errorSummary.totalErrors > 0
      );
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const getHealthColor = () => {
    if (health.performanceScore >= 90) return 'text-green-600';
    if (health.performanceScore >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthStatus = () => {
    if (health.performanceScore >= 90) return '✅ Excellent';
    if (health.performanceScore >= 70) return '⚠️ Good';
    return '❌ Needs Attention';
  };

  return (
    <div className="fixed top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 max-w-xs z-50 shadow-lg text-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">System Health</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          ×
        </button>
      </div>
      
      <div className={`font-medium ${getHealthColor()} mb-1`}>
        {getHealthStatus()}
      </div>
      
      <div className="text-xs text-gray-600 space-y-1">
        <div>Score: {health.performanceScore}/100</div>
        <div>Errors: {health.totalErrors}</div>
        
        {health.recentErrors.length > 0 && (
          <div className="mt-2">
            <div className="font-medium text-gray-700">Recent Issues:</div>
            {health.recentErrors.slice(0, 2).map((error, index) => (
              <div key={index} className="text-xs text-red-600 truncate">
                {typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message : String(error)}
              </div>
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-400 mt-2">
          Last check: {new Date(health.lastCheck).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;
