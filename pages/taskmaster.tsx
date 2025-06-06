
import React from 'react';
import Layout from '../components/Layout';
import TaskMasterDashboard from '../components/TaskMasterDashboard';
import { Activity, Settings, TrendingUp, Zap } from 'lucide-react';

const TaskMasterPage: React.FC = () => {
  return (
    <Layout 
      title="TaskMaster AI Dashboard - Centennial Hills Homes"
      description="Real-time AI optimization dashboard for Centennial Hills real estate website"
    >
      <div className="taskmaster-page">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="taskmaster-header">
            <div className="header-content">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🤖 TaskMaster AI Control Center
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Real-time optimization and monitoring for your Centennial Hills real estate website
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

          <TaskMasterDashboard />

          <div className="workflow-status">
            <h2 className="text-2xl font-bold mb-6">Active Workflows</h2>
            <div className="workflow-grid">
              <div className="workflow-card running">
                <div className="workflow-header">
                  <Activity className="text-green-500" />
                  <span className="status">Running</span>
                </div>
                <h3>Daily SEO Optimization</h3>
                <p>Monitoring search rankings and updating meta tags</p>
                <div className="workflow-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span>75% Complete</span>
                </div>
              </div>

              <div className="workflow-card scheduled">
                <div className="workflow-header">
                  <Activity className="text-blue-500" />
                  <span className="status">Scheduled</span>
                </div>
                <h3>Performance Monitor</h3>
                <p>Real-time Core Web Vitals tracking</p>
                <div className="next-run">
                  Next run: In 12 minutes
                </div>
              </div>

              <div className="workflow-card completed">
                <div className="workflow-header">
                  <Activity className="text-gray-500" />
                  <span className="status">Completed</span>
                </div>
                <h3>Content Refresh</h3>
                <p>Updated property listings and market data</p>
                <div className="last-run">
                  Last run: 2 hours ago
                </div>
              </div>
            </div>
          </div>

          <div className="optimization-insights">
            <h2 className="text-2xl font-bold mb-6">AI Insights & Recommendations</h2>
            <div className="insights-grid">
              <div className="insight-card priority-high">
                <h3>🚨 High Priority</h3>
                <p>Core Web Vitals score dropped to 82. Consider optimizing images and reducing JavaScript bundle size.</p>
                <button className="insight-action">Fix Now</button>
              </div>
              
              <div className="insight-card priority-medium">
                <h3>⚠️ Medium Priority</h3>
                <p>3 new competitor listings detected in Centennial Hills. Update market positioning content.</p>
                <button className="insight-action">Review</button>
              </div>
              
              <div className="insight-card priority-low">
                <h3>💡 Opportunity</h3>
                <p>Search volume for "Providence Nevada homes" increased 15%. Consider creating targeted content.</p>
                <button className="insight-action">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .taskmaster-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .taskmaster-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .quick-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .action-btn.secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .workflow-status, .optimization-insights {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .workflow-grid, .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .workflow-card, .insight-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 1.5rem;
          border-left: 4px solid;
        }

        .workflow-card.running {
          border-left-color: #10b981;
        }

        .workflow-card.scheduled {
          border-left-color: #3b82f6;
        }

        .workflow-card.completed {
          border-left-color: #6b7280;
        }

        .workflow-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.1);
        }

        .workflow-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .workflow-progress {
          margin-top: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
          transition: width 0.3s ease;
        }

        .insight-card.priority-high {
          border-left-color: #dc2626;
        }

        .insight-card.priority-medium {
          border-left-color: #f59e0b;
        }

        .insight-card.priority-low {
          border-left-color: #10b981;
        }

        .insight-action {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.2s;
        }

        .insight-action:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .taskmaster-header {
            flex-direction: column;
            gap: 1.5rem;
          }

          .quick-actions {
            flex-wrap: wrap;
            width: 100%;
          }

          .action-btn {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default TaskMasterPage;
