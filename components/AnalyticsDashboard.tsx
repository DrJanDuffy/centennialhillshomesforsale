import React, { useState, useEffect } from 'react';
import EnterpriseAnalytics from '../utils/enterpriseAnalytics';

interface AnalyticsDashboardProps {
  isAdmin?: boolean;
}

export default function AnalyticsDashboard({ isAdmin = false }: AnalyticsDashboardProps) {
  // Never show in production, regardless of isAdmin prop
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Only show in development if explicitly admin
  if (!isAdmin) {
    return null;
  }

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ isAdmin = false }) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const analytics = EnterpriseAnalytics.getInstance();
      setMetrics(analytics.getMetrics());

      // Update metrics every 30 seconds
      const interval = setInterval(() => {
        setMetrics(analytics.getMetrics());
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const exportData = () => {
    const analytics = EnterpriseAnalytics.getInstance();
    const data = analytics.exportData();
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Only show dashboard if user is admin AND in development
  if (!isAdmin || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="analytics-dashboard">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="analytics-toggle"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: '#007cba',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        📊 Analytics
      </button>

      {isVisible && (
        <div 
          className="analytics-panel"
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '300px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '15px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Real Estate Analytics</h3>

          {metrics && (
            <div style={{ fontSize: '14px' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Property Views:</strong> {metrics.propertyViews}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Search Queries:</strong> {metrics.searchQueries}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Contact Requests:</strong> {metrics.contactRequests}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Calculator Usage:</strong> {metrics.calculatorUsage}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Listing Clicks:</strong> {metrics.listingClicks}
              </div>

              <button 
                onClick={exportData}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Export Data
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;