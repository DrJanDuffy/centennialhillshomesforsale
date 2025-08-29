import { motion } from 'framer-motion';

interface AIAnswerBoxProps {
  question: string;
  answer: string;
  statistics?: Array<{
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }>;
  sources?: Array<{
    text: string;
    link?: string;
  }>;
}

export default function AIAnswerBox({
  question,
  answer,
  statistics = [],
  sources = [],
}: AIAnswerBoxProps) {
  return (
    <motion.div
      className="ai-answer-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="answer-header">
        <h3 className="answer-question">{question}</h3>
      </div>

      <div className="answer-content">
        <p className="answer-text">{answer}</p>

        {statistics.length > 0 && (
          <div className="answer-statistics">
            <h4>Key Statistics</h4>
            <div className="stats-grid">
              {statistics.map((stat, index) => (
                <div key={`stat-${stat.label}-${index}`} className="stat-item">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-value ${stat.trend || ''}`}>
                    {stat.value}
                    {stat.trend === 'up' && ' ↗'}
                    {stat.trend === 'down' && ' ↘'}
                    {stat.trend === 'stable' && ' →'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {sources.length > 0 && (
          <div className="answer-sources">
            <h4>Sources</h4>
            <ul>
              {sources.map((source, index) => (
                <li key={`source-${source.link || source.text}-${index}`}>
                  {source.link ? (
                    <a href={source.link} target="_blank" rel="noopener noreferrer">
                      {source.text}
                    </a>
                  ) : (
                    source.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-answer-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem 0;
        }
        
        .answer-question {
          color: #1e40af;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .answer-text {
          line-height: 1.6;
          color: #374151;
          margin-bottom: 1rem;
        }
        
        .answer-statistics {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .stat-value {
          font-weight: 600;
          font-size: 1.125rem;
        }
        
        .stat-value.up {
          color: #10b981;
        }
        
        .stat-value.down {
          color: #ef4444;
        }
        
        .stat-value.stable {
          color: #6b7280;
        }
        
        .answer-sources {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
          margin-top: 1rem;
        }
        
        .answer-sources h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        .answer-sources ul {
          list-style: none;
          padding: 0;
        }
        
        .answer-sources li {
          font-size: 0.875rem;
          color: #4b5563;
          margin-bottom: 0.25rem;
        }
        
        .answer-sources a {
          color: #2563eb;
          text-decoration: none;
        }
        
        .answer-sources a:hover {
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  );
}
