
import React from 'react';
import { FaHome, FaChartLine, FaUsers, FaMapMarkerAlt, FaSchool, FaDollarSign } from 'react-icons/fa';

interface StatisticalData {
  medianHomePrice: string;
  averageDaysOnMarket: number;
  priceAppreciationYoY: string;
  inventoryLevel: string;
  averageHomeSize: string;
  populationGrowth5Year: string;
  schoolRatingAverage: number;
  walkabilityScore: number;
}

interface StatisticalWidgetProps {
  neighborhood: string;
  data: StatisticalData;
  showComparison?: boolean;
}

export default function StatisticalWidget({ 
  neighborhood, 
  data, 
  showComparison = false 
}: StatisticalWidgetProps) {
  const statistics = [
    {
      icon: <FaDollarSign />,
      label: "Median Home Price",
      value: data.medianHomePrice,
      trend: data.priceAppreciationYoY,
      color: "#22c55e"
    },
    {
      icon: <FaChartLine />,
      label: "Days on Market",
      value: `${data.averageDaysOnMarket} days`,
      trend: "vs 28 avg",
      color: "#3b82f6"
    },
    {
      icon: <FaHome />,
      label: "Average Home Size",
      value: data.averageHomeSize,
      trend: "+12% vs county",
      color: "#8b5cf6"
    },
    {
      icon: <FaUsers />,
      label: "Population Growth",
      value: data.populationGrowth5Year,
      trend: "5-year trend",
      color: "#f59e0b"
    },
    {
      icon: <FaSchool />,
      label: "School Rating",
      value: `${data.schoolRatingAverage}/10`,
      trend: "Average rating",
      color: "#ef4444"
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Walkability",
      value: `${data.walkabilityScore}/100`,
      trend: "Walk Score",
      color: "#06b6d4"
    }
  ];

  return (
    <div className="statistical-widget">
      <div className="widget-header">
        <h3>{neighborhood} Market Statistics</h3>
        <span className="data-source">Data as of 2024</span>
      </div>
      
      <div className="statistics-grid">
        {statistics.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h4 className="stat-value">{stat.value}</h4>
              <p className="stat-label">{stat.label}</p>
              <span className="stat-trend">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {showComparison && (
        <div className="comparison-section">
          <h4>Market Comparison</h4>
          <div className="comparison-bars">
            <div className="comparison-item">
              <span>vs Las Vegas Average</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
              <span>+15% higher</span>
            </div>
            <div className="comparison-item">
              <span>vs National Average</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '92%' }}></div>
              </div>
              <span>+22% higher</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .statistical-widget {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .widget-header h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin: 0;
        }

        .data-source {
          background: #f1f5f9;
          color: #64748b;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
        }

        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: #fafafa;
          border-radius: 10px;
          border-left: 4px solid;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0 0 0.25rem 0;
        }

        .stat-trend {
          font-size: 0.75rem;
          color: #22c55e;
          font-weight: 600;
        }

        .comparison-section h4 {
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .comparison-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .comparison-item span:first-child {
          min-width: 150px;
          font-size: 0.875rem;
          color: #64748b;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          transition: width 0.3s ease;
        }

        .comparison-item span:last-child {
          min-width: 80px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #22c55e;
        }

        @media (max-width: 768px) {
          .statistics-grid {
            grid-template-columns: 1fr;
          }
          
          .stat-card {
            flex-direction: column;
            text-align: center;
          }
          
          .stat-icon {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
