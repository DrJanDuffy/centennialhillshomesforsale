
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Report error to analytics (if available)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: unknown }).gtag) {
      ((window as unknown as { gtag: (command: string, action: string, params: Record<string, unknown>) => void }).gtag)('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🏠 Centennial Hills Homes</h2>
            <h3>Something went wrong</h3>
            <p>We&apos;re sorry, but something unexpected happened. Our team has been notified.</p>
            
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Refresh Page
              </button>
              <Link 
                href="/" 
                className="btn-secondary"
              >
                Go Home
              </Link>
              <Link href="/contact" 
                className="btn-secondary"
              >
                Contact Us
              </Link>
            </div>

            <div className="contact-emergency">
              <p><strong>Need immediate assistance?</strong></p>
              <p>Call Dr. Jan Duffy directly: <a href="tel:7029031952">(702) 903-1952</a></p>
              <p>Email: <a href="mailto:jan@centennialhillshomes.com">jan@centennialhillshomes.com</a></p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>

          <style jsx>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .error-container {
              max-width: 600px;
              padding: 2rem;
              text-align: center;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 12px;
              backdrop-filter: blur(10px);
            }
            
            .error-actions {
              margin: 2rem 0;
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }
            
            .btn-primary, .btn-secondary {
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            
            .btn-primary {
              background: #10b981;
              color: white;
            }
            
            .btn-primary:hover {
              background: #059669;
              transform: translateY(-1px);
            }
            
            .btn-secondary {
              background: rgba(255, 255, 255, 0.2);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .btn-secondary:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: translateY(-1px);
            }
            
            .contact-emergency {
              margin-top: 2rem;
              padding: 1rem;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 8px;
            }
            
            .contact-emergency a {
              color: #fbbf24;
              text-decoration: none;
              font-weight: 600;
            }
            
            .error-details {
              margin-top: 2rem;
              text-align: left;
              background: rgba(0, 0, 0, 0.3);
              padding: 1rem;
              border-radius: 6px;
            }
            
            .error-details pre {
              white-space: pre-wrap;
              font-size: 0.875rem;
              overflow-x: auto;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
