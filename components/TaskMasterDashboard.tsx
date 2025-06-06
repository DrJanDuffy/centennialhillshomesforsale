
import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, Search, AlertCircle, CheckCircle } from 'lucide-react';

interface TaskMasterMetrics {
  searchRankings: { keyword: string; position: number; change: number }[];
  leadGeneration: { today: number; week: number; month: number };
  sitePerformance: { speed: number; uptime: number; coreWebVitals: string };
  aiOptimization: { score: number; lastUpdate: string };
}

const TaskMasterDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<TaskMasterMetrics | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with actual TaskMaster API calls
    setMetrics({
      searchRankings: [
        { keyword: 'Centennial Hills homes for sale', position: 3, change: +2 },
        { keyword: 'Las Vegas real estate agent', position: 7, change: +1 },
        { keyword: 'Providence Nevada homes', position: 5, change: 0 }
      ],
      leadGeneration: { today: 4, week: 23, month: 89 },
      sitePerformance: { speed: 92, uptime: 99.8, coreWebVitals: 'Good' },
      aiOptimization: { score: 94, lastUpdate: '2 hours ago' }
    });
  }, []);

  if (!metrics) {
    return <div className="taskmaster-loading">Loading TaskMaster metrics...</div>;
  }

  return (
    <div className="taskmaster-dashboard">
      <div className="dashboard-header">
        <h2>🤖 TaskMaster AI Dashboard</h2>
        <div className="status-indicators">
          <span className="status-good">
            <CheckCircle size={16} /> All Systems Operational
          </span>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <Search className="text-blue-500" />
          </div>
          <div className="metric-content">
            <h3>Search Rankings</h3>
            <div className="rankings-list">
              {metrics.searchRankings.map((rank, index) => (
                <div key={index} className="ranking-item">
                  <span className="keyword">{rank.keyword}</span>
                  <span className="position">#{rank.position}</span>
                  <span className={`change ${rank.change >= 0 ? 'positive' : 'negative'}`}>
                    {rank.change > 0 ? '+' : ''}{rank.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Users className="text-green-500" />
          </div>
          <div className="metric-content">
            <h3>Lead Generation</h3>
            <div className="lead-stats">
              <div className="stat">
                <span className="number">{metrics.leadGeneration.today}</span>
                <span className="label">Today</span>
              </div>
              <div className="stat">
                <span className="number">{metrics.leadGeneration.week}</span>
                <span className="label">This Week</span>
              </div>
              <div className="stat">
                <span className="number">{metrics.leadGeneration.month}</span>
                <span className="label">This Month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Activity className="text-purple-500" />
          </div>
          <div className="metric-content">
            <h3>Site Performance</h3>
            <div className="performance-stats">
              <div className="stat">
                <span className="number">{metrics.sitePerformance.speed}</span>
                <span className="label">Speed Score</span>
              </div>
              <div className="stat">
                <span className="number">{metrics.sitePerformance.uptime}%</span>
                <span className="label">Uptime</span>
              </div>
              <div className="stat">
                <span className="status good">{metrics.sitePerformance.coreWebVitals}</span>
                <span className="label">Core Web Vitals</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp className="text-orange-500" />
          </div>
          <div className="metric-content">
            <h3>AI Optimization</h3>
            <div className="ai-stats">
              <div className="score-circle">
                <span className="score">{metrics.aiOptimization.score}</span>
                <span className="label">AI Score</span>
              </div>
              <div className="last-update">
                Last optimized: {metrics.aiOptimization.lastUpdate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .taskmaster-dashboard {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .status-indicators {
          display: flex;
          gap: 1rem;
        }

        .status-good {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-weight: 500;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .metric-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .metric-icon {
          flex-shrink: 0;
        }

        .metric-content h3 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
        }

        .rankings-list, .lead-stats, .performance-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ranking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .keyword {
          color: #6b7280;
          flex: 1;
        }

        .position {
          font-weight: 600;
          color: #374151;
        }

        .change.positive {
          color: #059669;
        }

        .change.negative {
          color: #dc2626;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat .number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #374151;
        }

        .stat .label {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .ai-stats {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .score-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        .score {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .score-circle .label {
          font-size: 0.8rem;
        }

        .last-update {
          color: #6b7280;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskMasterDashboard;
