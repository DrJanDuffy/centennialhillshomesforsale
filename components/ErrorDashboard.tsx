
import React, { useState, useEffect } from 'react';
import ErrorReportingSystem from '../utils/errorReporting';

const ErrorDashboard: React.FC = () => {
  const [errors, setErrors] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [summary, setSummary] = useState<{ [key: string]: number }>({});
  const errorReporter = ErrorReportingSystem.getInstance();

  useEffect(() => {
    const updateErrors = () => {
      setErrors(errorReporter.getErrors());
      setSummary(errorReporter.getErrorSummary());
    };

    updateErrors();
    const interval = setInterval(updateErrors, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearAllErrors = () => {
    errorReporter.clearErrors();
    setErrors([]);
    setSummary({});
  };

  const exportErrors = () => {
    const data = {
      errors,
      summary,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Only show in development or if there are errors
  if (process.env.NODE_ENV === 'production' && errors.length === 0) {
    return null;
  }

  return (
    <div className="error-dashboard">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="error-toggle"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: errors.length > 0 ? '#ff6b6b' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        🚨 Errors ({errors.length})
      </button>

      {isVisible && (
        <div 
          className="error-panel"
          style={{
            position: 'fixed',
            bottom: '70px',
            left: '20px',
            width: '400px',
            maxHeight: '500px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '15px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'auto'
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Error Monitor</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <button 
              onClick={clearAllErrors}
              style={{
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Clear All
            </button>
            <button 
              onClick={exportErrors}
              style={{
                padding: '5px 10px',
                backgroundColor: '#007cba',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Export
            </button>
          </div>

          {Object.keys(summary).length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>Error Summary:</h4>
              {Object.entries(summary).map(([error, count]) => (
                <div key={error} style={{ fontSize: '12px', marginBottom: '5px' }}>
                  <strong>{count}x:</strong> {error}
                </div>
              ))}
            </div>
          )}

          <div>
            <h4 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>Recent Errors:</h4>
            {errors.slice(-10).reverse().map((error, index) => (
              <div 
                key={index}
                style={{
                  fontSize: '11px',
                  marginBottom: '10px',
                  padding: '5px',
                  backgroundColor: '#f8f9fa',
                  borderLeft: `3px solid ${
                    error.severity === 'critical' ? '#dc3545' :
                    error.severity === 'high' ? '#fd7e14' :
                    error.severity === 'medium' ? '#ffc107' : '#28a745'
                  }`
                }}
              >
                <div><strong>{error.component}</strong> - {error.severity}</div>
                <div>{String(error.error).substring(0, 100)}</div>
                <div style={{ color: '#6c757d' }}>{new Date(error.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorDashboard;
