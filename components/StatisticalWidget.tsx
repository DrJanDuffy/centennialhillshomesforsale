import { useCallback, useEffect, useState } from 'react';
import {
  FaArrowUp,
  FaChartLine,
  FaDollarSign,
  FaHome,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaSchool,
  FaUsers,
} from 'react-icons/fa';

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
  animateOnLoad?: boolean;
}

export default function StatisticalWidget({
  neighborhood,
  data,
  showComparison = false,
  animateOnLoad = true,
}: StatisticalWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (animateOnLoad) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animateOnLoad]);

  const statistics = [
    {
      icon: <FaDollarSign />,
      label: 'Median Home Price',
      value: data.medianHomePrice,
      trend: data.priceAppreciationYoY,
      colorClass: 'stat-card-green',
      tooltip: 'Average price of homes sold in this neighborhood',
    },
    {
      icon: <FaChartLine />,
      label: 'Days on Market',
      value: `${data.averageDaysOnMarket} days`,
      trend: 'vs 28 avg',
      colorClass: 'stat-card-blue',
      tooltip: 'Average time homes stay on the market before selling',
    },
    {
      icon: <FaHome />,
      label: 'Average Home Size',
      value: data.averageHomeSize,
      trend: '+12% vs county',
      colorClass: 'stat-card-purple',
      tooltip: 'Typical square footage of homes in this area',
    },
    {
      icon: <FaUsers />,
      label: 'Population Growth',
      value: data.populationGrowth5Year,
      trend: '5-year trend',
      colorClass: 'stat-card-orange',
      tooltip: 'Population growth rate over the past 5 years',
    },
    {
      icon: <FaSchool />,
      label: 'School Rating',
      value: `${data.schoolRatingAverage}/10`,
      trend: 'Average rating',
      colorClass: 'stat-card-red',
      tooltip: 'Average rating of schools in this neighborhood',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Walkability',
      value: `${data.walkabilityScore}/100`,
      trend: 'Walk Score',
      colorClass: 'stat-card-cyan',
      tooltip: 'Walkability score based on nearby amenities',
    },
  ];

  const getComparisonWidth = useCallback((percentage: string) => {
    const num = parseInt(percentage.replace('%', ''));
    return `${Math.min(Math.max(num, 0), 100)}%`;
  }, []);

  // Set CSS custom properties for comparison progress bars
  useEffect(() => {
    if (showComparison) {
      const lasVegasBar = document.querySelector(
        '.comparison-item:first-child .progress-fill-comparison'
      ) as HTMLElement;
      const nationalBar = document.querySelector(
        '.comparison-item:last-child .progress-fill-comparison'
      ) as HTMLElement;

      if (lasVegasBar) {
        lasVegasBar.style.setProperty('--comparison-width', getComparisonWidth('85%'));
      }
      if (nationalBar) {
        nationalBar.style.setProperty('--comparison-width', getComparisonWidth('92%'));
      }
    }
  }, [showComparison, getComparisonWidth]);

  return (
    <div className="statistical-widget">
      <div className="widget-header">
        <h3>{neighborhood} Market Statistics</h3>
        <div className="header-info">
          <span className="data-source">Data as of 2024</span>
          <button
            className="info-button"
            aria-label="Learn more about market statistics"
            onMouseEnter={() => setShowTooltip('market-stats')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <FaInfoCircle />
          </button>
        </div>
      </div>

      {showTooltip === 'market-stats' && (
        <div className="tooltip tooltip-market-stats">
          Market statistics are updated monthly and reflect current market conditions in{' '}
          {neighborhood}.
        </div>
      )}

      <div className="statistics-grid">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className={`stat-card stat-card-dynamic ${stat.colorClass} ${isVisible ? 'stat-card-animate' : ''}`}
            onMouseEnter={() => setShowTooltip(`stat-${index}`)}
            onMouseLeave={() => setShowTooltip(null)}
            role="region"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <div className={`stat-icon stat-icon-dynamic ${stat.colorClass}`}>{stat.icon}</div>
            <div className="stat-content">
              <h4 className="stat-value">{stat.value}</h4>
              <p className="stat-label">{stat.label}</p>
              <span className="stat-trend">
                <FaArrowUp />
                {stat.trend}
              </span>
            </div>

            {showTooltip === `stat-${index}` && (
              <div className="tooltip tooltip-stat">{stat.tooltip}</div>
            )}
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
                <div className="progress-fill progress-fill-comparison"></div>
              </div>
              <span>+15% higher</span>
            </div>
            <div className="comparison-item">
              <span>vs National Average</span>
              <div className="progress-bar">
                <div className="progress-fill progress-fill-comparison"></div>
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

        .header-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-button {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-button:hover {
          background: #f1f5f9;
          color: #1e293b;
          transform: scale(1.1);
        }

        .tooltip {
          position: absolute;
          background: #1e293b;
          color: white;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          max-width: 250px;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
          opacity: 0;
          animation: fadeIn 0.2s ease-out forwards;
        }

        .tooltip-market-stats {
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
        }

        .tooltip-stat {
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          border: 6px solid transparent;
        }

        .tooltip-market-stats::before {
          top: -6px;
          right: 1rem;
          border-bottom-color: #1e293b;
        }

        .tooltip-stat::before {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-right-color: #1e293b;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .tooltip-stat {
            top: auto;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            margin-bottom: 0.5rem;
          }

          .tooltip-stat::before {
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            border-right-color: transparent;
            border-top-color: #1e293b;
          }
        }
      `}</style>
    </div>
  );
}
