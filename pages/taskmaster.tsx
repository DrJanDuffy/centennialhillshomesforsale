
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TaskMasterDashboard from '../components/TaskMasterDashboard';
import TaskMasterStatus from '../components/TaskMasterStatus';
import { Activity, Settings, TrendingUp, Zap, Clock, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const TaskMasterPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleWorkflowClick = (workflowId: string) => {
    setActiveWorkflow(activeWorkflow === workflowId ? null : workflowId);
  };



  return (
    <Layout 
      title="TaskMaster AI Dashboard - Centennial Hills Homes"
      description="Real-time AI optimization dashboard for Centennial Hills real estate website"
    >
      <div className="taskmaster-page">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className={`taskmaster-header ${isVisible ? 'animate-slide-in-up' : ''}`}>
            <div className="header-content">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🤖 TaskMaster AI Control Center
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Welcome to the TaskMaster Dashboard - your comprehensive real estate management system. Track leads, monitor market trends, and optimize your business performance with our advanced analytics and automation tools.
              </p>
            </div>
            
            <div className="quick-actions">
              <button className="action-btn primary">
                <Zap size={20} />
                Run Optimization
              </button>
              <button className="action-btn secondary">
                <Settings size={20} />
                Configure Workflows
              </button>
              <button className="action-btn secondary">
                <TrendingUp size={20} />
                View Reports
              </button>
            </div>
          </div>

          <TaskMasterStatus />
          
          <TaskMasterDashboard />

          <div className={`workflow-status ${isVisible ? 'animate-fade-in-scale' : ''}`}>
            <h2 className="text-2xl font-bold mb-6">Active Workflows</h2>
            <div className="workflow-grid">
              <div 
                className={`workflow-card running ${isVisible ? 'animate-delay-1' : ''}`}
                onClick={() => handleWorkflowClick('seo-optimization')}
                role="button"
                tabIndex={0}
                aria-label="Daily SEO Optimization workflow - 75% complete"
              >
                <div className="workflow-header">
                  <Activity className="text-green-500" />
                  <span className="status">Running</span>
                </div>
                <h3>Daily SEO Optimization</h3>
                <p>Monitoring search rankings and updating meta tags</p>
                <div className="workflow-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill progress-fill-taskmaster"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <span>75% Complete</span>
                </div>
                {activeWorkflow === 'seo-optimization' && (
                  <div className="workflow-details">
                    <p>• Updated 12 meta descriptions</p>
                    <p>• Fixed 3 broken internal links</p>
                    <p>• Optimized image alt tags</p>
                  </div>
                )}
              </div>

              <div 
                className={`workflow-card scheduled ${isVisible ? 'animate-delay-2' : ''}`}
                onClick={() => handleWorkflowClick('performance-monitor')}
                role="button"
                tabIndex={0}
                aria-label="Performance Monitor workflow - scheduled to run in 12 minutes"
              >
                <div className="workflow-header">
                  <Clock className="text-blue-500" />
                  <span className="status">Scheduled</span>
                </div>
                <h3>Performance Monitor</h3>
                <p>Real-time Core Web Vitals tracking</p>
                <div className="next-run">
                  Next run: In 12 minutes
                </div>
                {activeWorkflow === 'performance-monitor' && (
                  <div className="workflow-details">
                    <p>• Current LCP: 2.1s</p>
                    <p>• FID: 45ms</p>
                    <p>• CLS: 0.08</p>
                  </div>
                )}
              </div>

              <div 
                className={`workflow-card completed ${isVisible ? 'animate-delay-3' : ''}`}
                onClick={() => handleWorkflowClick('content-refresh')}
                role="button"
                tabIndex={0}
                aria-label="Content Refresh workflow - completed 2 hours ago"
              >
                <div className="workflow-header">
                  <CheckCircle className="text-gray-500" />
                  <span className="status">Completed</span>
                </div>
                <h3>Content Refresh</h3>
                <p>Updated property listings and market data</p>
                <div className="last-run">
                  Last run: 2 hours ago
                </div>
                {activeWorkflow === 'content-refresh' && (
                  <div className="workflow-details">
                    <p>• Updated 8 property listings</p>
                    <p>• Refreshed market statistics</p>
                    <p>• Added 3 new neighborhood photos</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`optimization-insights ${isVisible ? 'animate-fade-in-scale' : ''}`}>
            <h2 className="text-2xl font-bold mb-6">AI Insights & Recommendations</h2>
            <div className="insights-grid">
              <div className={`insight-card priority-high ${isVisible ? 'animate-delay-1' : ''}`}>
                <div className="insight-header">
                  <AlertTriangle className="text-red-500" />
                  <h3>🚨 High Priority</h3>
                </div>
                <p>Core Web Vitals score dropped to 82. Consider optimizing images and reducing JavaScript bundle size.</p>
                <button className="insight-action">Fix Now</button>
              </div>
              
              <div className={`insight-card priority-medium ${isVisible ? 'animate-delay-2' : ''}`}>
                <div className="insight-header">
                  <AlertTriangle className="text-yellow-500" />
                  <h3>⚠️ Medium Priority</h3>
                </div>
                <p>3 new competitor listings detected in Centennial Hills. Update market positioning content.</p>
                <button className="insight-action">Review</button>
              </div>
              
              <div className={`insight-card priority-low ${isVisible ? 'animate-delay-3' : ''}`}>
                <div className="insight-header">
                  <Lightbulb className="text-green-500" />
                  <h3>💡 Opportunity</h3>
                </div>
                                  <p>Search volume for &ldquo;Providence Nevada homes&rdquo; increased 15%. Consider creating targeted content.</p>
                <button className="insight-action">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .insight-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .workflow-details {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 6px;
          font-size: 0.875rem;
          color: #6b7280;
          animation: slideDown 0.3s ease-out;
        }

        .workflow-details p {
          margin: 0.25rem 0;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .workflow-card {
          cursor: pointer;
        }

        .workflow-card:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .workflow-details {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default TaskMasterPage;
