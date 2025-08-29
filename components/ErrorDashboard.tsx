import type React from 'react';
import { useEffect, useState } from 'react';
import ErrorTracker from '../utils/errorTracking';

interface ErrorItem {
  message: string;
  component: string;
  timestamp: string;
}

const ErrorDashboard: React.FC = () => {
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const errorTracker = ErrorTracker.getInstance();
      setErrors(errorTracker.getErrors() as ErrorItem[]);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="error-dashboard">
      <h4>Error Dashboard ({errors.length})</h4>
      {errors.length === 0 ? (
        <div className="error-success">✅ No errors tracked</div>
      ) : (
        errors.map((error, index) => (
          <div key={`error-${error.message.substring(0, 20)}-${index}`} className="error-item">
            <div className="error-title">ERROR</div>
            <div>{error.message}</div>
            <div className="error-timestamp">{new Date(error.timestamp).toLocaleString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ErrorDashboard;
