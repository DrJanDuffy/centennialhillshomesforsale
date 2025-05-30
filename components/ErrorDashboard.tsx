
import React, { useState, useEffect } from 'react';
import ErrorTracker from '../utils/errorTracking';

const ErrorDashboard: React.FC = () => {
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const errorTracker = ErrorTracker.getInstance();
      setErrors(errorTracker.getErrors());
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h4>Error Dashboard ({errors.length})</h4>
      {errors.length === 0 ? (
        <div style={{ color: 'green' }}>✅ No errors tracked</div>
      ) : (
        errors.map((error, index) => (
          <div key={index} style={{
            marginBottom: '5px',
            padding: '3px',
            background: '#ffebee',
            borderLeft: '3px solid #f44336'
          }}>
            <div style={{ fontWeight: 'bold' }}>ERROR</div>
            <div>{error.message}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>
              {error.component} - {error.timestamp}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ErrorDashboard;
