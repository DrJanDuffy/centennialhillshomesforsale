
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, Zap, TrendingUp, Users, Search } from 'lucide-react';

interface OptimizationStatus {
  seoScore: number;
  performanceScore: number;
  leadGeneration: number;
  searchVisibility: number;
  lastOptimized: string;
  activeOptimizations: string[];
  recommendations: Array<{
    type: 'critical' | 'important' | 'suggestion';
    message: string;
    action: string;
  }>;
}

const TaskMasterStatus: React.FC = () => {
  const [status, setStatus] = useState<OptimizationStatus | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Simulate TaskMaster real-time data
    const updateStatus = () => {
      setStatus({
        seoScore: 96,
        performanceScore: 94,
        leadGeneration: 127, // percentage increase
        searchVisibility: 89,
        lastOptimized: 'Just now',
        activeOptimizations: [
          'Local SEO Enhancement',
          'Core Web Vitals Optimization',
          'AI Content Generation',
          'Schema Markup Updates'
        ],
        recommendations: [
          {
            type: 'critical',
            message: 'New competitor detected in Centennial Hills market',
            action: 'Enhance competitive positioning'
          },
          {
            type: 'important', 
            message: 'Search volume spike for "Providence Nevada homes"',
            action: 'Create targeted landing page'
          },
          {
            type: 'suggestion',
            message: 'Consider adding virtual tour capability',
            action: 'Implement 360° property views'
          }
        ]
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const runOptimization = async () => {
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
      if (status) {
        setStatus({
          ...status,
          seoScore: Math.min(100, status.seoScore + 2),
          performanceScore: Math.min(100, status.performanceScore + 1),
          lastOptimized: 'Just now'
        });
      }
    }, 3000);
  };

  if (!status) {
    return (
      <div className="taskmaster-loading">
        <div className="loading-spinner"></div>
        <p>Initializing TaskMaster AI...</p>
      </div>
    );
  }

  return (
    <div className="taskmaster-status">
      <div className="status-header">
        <div className="status-title">
          <Zap className="text-blue-500" size={24} />
          <h3>TaskMaster AI Status</h3>
          <span className={`status-indicator ${isOptimizing ? 'optimizing' : 'active'}`}>
            {isOptimizing ? 'Optimizing...' : 'Active'}
          </span>
        </div>
        <button 
          onClick={runOptimization}
          disabled={isOptimizing}
          className="optimize-btn"
        >
          {isOptimizing ? (
            <>
              <Clock size={16} className="animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap size={16} />
              Run Optimization
            </>
          )}
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card seo">
          <div className="metric-header">
            <Search size={20} />
            <span>SEO Score</span>
          </div>
          <div className="metric-value">{status.seoScore}/100</div>
          <div className="metric-bar">
            <div 
              className="metric-fill seo"
              style={{ width: `${status.seoScore}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card performance">
          <div className="metric-header">
            <TrendingUp size={20} />
            <span>Performance</span>
          </div>
          <div className="metric-value">{status.performanceScore}/100</div>
          <div className="metric-bar">
            <div 
              className="metric-fill performance"
              style={{ width: `${status.performanceScore}%` }}
            ></div>
          </div>
        </div>

        <div className="metric-card leads">
          <div className="metric-header">
            <Users size={20} />
            <span>Lead Generation</span>
          </div>
          <div className="metric-value">+{status.leadGeneration}%</div>
          <div className="metric-trend positive">↗ Trending up</div>
        </div>

        <div className="metric-card visibility">
          <div className="metric-header">
            <CheckCircle size={20} />
            <span>Search Visibility</span>
          </div>
          <div className="metric-value">{status.searchVisibility}%</div>
          <div className="metric-trend positive">↗ Improving</div>
        </div>
      </div>

      <div className="active-optimizations">
        <h4>Active Optimizations</h4>
        <div className="optimization-list">
          {status.activeOptimizations.map((opt, index) => (
            <div key={index} className="optimization-item">
              <div className="pulse-dot"></div>
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <h4>AI Recommendations</h4>
        {status.recommendations.map((rec, index) => (
          <div key={index} className={`recommendation ${rec.type}`}>
            <div className="rec-icon">
              {rec.type === 'critical' && <AlertTriangle size={16} />}
              {rec.type === 'important' && <Clock size={16} />}
              {rec.type === 'suggestion' && <CheckCircle size={16} />}
            </div>
            <div className="rec-content">
              <p>{rec.message}</p>
              <button className="rec-action">{rec.action}</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .taskmaster-status {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 1rem 0;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .status-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-title h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
        }

        .status-indicator {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .status-indicator.active {
          background: #10b981;
          color: white;
        }

        .status-indicator.optimizing {
          background: #f59e0b;
          color: white;
          animation: pulse 2s infinite;
        }

        .optimize-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .optimize-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .optimize-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: #6b7280;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .metric-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .metric-bar {
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .metric-fill {
          height: 100%;
          transition: width 0.5s ease;
        }

        .metric-fill.seo {
          background: linear-gradient(90deg, #10b981, #059669);
        }

        .metric-fill.performance {
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
        }

        .metric-trend {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .metric-trend.positive {
          color: #059669;
        }

        .active-optimizations {
          margin-bottom: 1.5rem;
        }

        .active-optimizations h4 {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
        }

        .optimization-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .optimization-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #f3f4f6;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .recommendations h4 {
          margin: 0 0 0.75rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
        }

        .recommendation {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          border-left: 3px solid;
        }

        .recommendation.critical {
          background: #fef2f2;
          border-left-color: #dc2626;
        }

        .recommendation.important {
          background: #fffbeb;
          border-left-color: #f59e0b;
        }

        .recommendation.suggestion {
          background: #f0f9ff;
          border-left-color: #3b82f6;
        }

        .rec-icon {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .rec-content p {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #374151;
        }

        .rec-action {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .rec-action:hover {
          background: #2563eb;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .status-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .optimization-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskMasterStatus;
