
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import SEOOptimized from '../components/SEOOptimized';
import { FaCheckCircle, FaExclamationTriangle, FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function SEOImprovements() {
  const improvementAreas = useMemo(() => [
    {
      category: "Local Citations",
      priority: "High",
      status: "needs-work",
      current: "75%",
      target: "95%",
      issues: [
        "Complete Yelp business profile setup",
        "Set up Facebook Business page",
        "Ensure NAP consistency across all platforms"
      ],
      impact: "Improve local search visibility by 15-20%"
    },
    {
      category: "Google Business Profile",
      priority: "High", 
      status: "good",
      current: "90%",
      target: "98%",
      issues: [
        "Add more recent customer photos",
        "Post weekly updates about market conditions",
        "Respond to all reviews within 24 hours"
      ],
      impact: "Increase local ranking and click-through rates"
    },
    {
      category: "Schema Markup",
      priority: "Medium",
      status: "excellent",
      current: "95%",
      target: "100%",
      issues: [
        "Add FAQ schema to all neighborhood pages",
        "Implement Service Area schema for surrounding cities",
        "Add Review schema for testimonials"
      ],
      impact: "Enhanced rich snippets in search results"
    },
    {
      category: "Content Optimization",
      priority: "Medium",
      status: "needs-work",
      current: "80%",
      target: "92%",
      issues: [
        "Create neighborhood-specific landing pages",
        "Add local market statistics to each page",
        "Optimize for voice search queries"
      ],
      impact: "Target long-tail local keywords effectively"
    },
    {
      category: "Technical SEO",
      priority: "Low",
      status: "good",
      current: "85%",
      target: "95%",
      issues: [
        "Optimize Core Web Vitals scores",
        "Add breadcrumb navigation",
        "Implement lazy loading for images"
      ],
      impact: "Better user experience and search rankings"
    },
    {
      category: "Mobile Optimization",
      priority: "Medium",
      status: "excellent",
      current: "90%",
      target: "98%",
      issues: [
        "Optimize touch targets for mobile",
        "Improve mobile page speed",
        "Enhance mobile user interface"
      ],
      impact: "Better mobile search rankings"
    }
  ], []);

  const keywordOpportunities = [
    {
      keyword: "best realtor Centennial Hills",
      currentRank: 12,
      targetRank: 3,
      searchVolume: 1500,
      difficulty: 70,
      opportunity: "High"
    },
    {
      keyword: "Providence Las Vegas homes for sale",
      currentRank: 5,
      targetRank: 2,
      searchVolume: 800,
      difficulty: 60,
      opportunity: "Medium"
    },
    {
      keyword: "Skye Canyon real estate agent",
      currentRank: 8,
      targetRank: 3,
      searchVolume: 600,
      difficulty: 55,
      opportunity: "High"
    },
    {
      keyword: "luxury homes Northwest Las Vegas",
      currentRank: 15,
      targetRank: 5,
      searchVolume: 1200,
      difficulty: 75,
      opportunity: "Medium"
    }
  ];

  const actionItems = [
    {
      action: "Complete Yelp Business Profile",
      timeline: "1 week",
      effort: "Low",
      impact: "High",
      description: "Set up complete Yelp profile with photos, hours, services"
    },
    {
      action: "Create Facebook Business Page",
      timeline: "1 week", 
      effort: "Medium",
      impact: "Medium",
      description: "Professional Facebook presence with local engagement"
    },
    {
      action: "Neighborhood Landing Pages",
      timeline: "2-3 weeks",
      effort: "High",
      impact: "High",
      description: "Dedicated pages for each neighborhood with local content"
    },
    {
      action: "Review Collection System",
      timeline: "1 week",
      effort: "Medium",
      impact: "High",
      description: "Automated system to request and manage client reviews"
    },
    {
      action: "Local Content Calendar",
      timeline: "Ongoing",
      effort: "Medium",
      impact: "Medium",
      description: "Weekly content about local market trends and news"
    }
  ];

  // Set CSS custom properties for progress bars
  useEffect(() => {
    improvementAreas.forEach((area, index) => {
      const progressBar = document.querySelector(`.area-card:nth-child(${index + 1}) .progress-fill-seo-improvements`) as HTMLElement;
      if (progressBar) {
        const width = area.current.replace('%', '');
        progressBar.style.setProperty('--seo-progress-width', `${width}%`);
      }
    });
  }, [improvementAreas]);

  return (
    <Layout>
      <SEOOptimized
        title="SEO Improvement Plan | Centennial Hills Homes"
        description="Comprehensive SEO improvement plan for better local search visibility and rankings in Las Vegas real estate market."
        keywords="SEO improvement, local SEO, Las Vegas real estate SEO, search optimization"
      />

      <div className="seo-improvements-page">
        <section className="hero-section">
          <div className="container">
            <motion.div
              className="hero-content text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>SEO Improvement Plan</h1>
              <p className="lead">
                Comprehensive strategy to dominate Las Vegas real estate search results
              </p>
              <div className="current-score">
                <div className="score-circle">
                  <span className="score">87</span>
                  <span className="label">Overall SEO Score</span>
                </div>
                <div className="target-score">
                  <FaSearch className="icon" />
                  <span>Target: 95+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="improvement-areas section">
          <div className="container">
            <h2>Priority Improvement Areas</h2>
            <div className="areas-grid">
              {improvementAreas.map((area, index) => (
                <motion.div
                  key={area.category}
                  className={`area-card ${area.status}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="area-header">
                    <h3>{area.category}</h3>
                    <span className={`priority ${area.priority.toLowerCase()}`}>
                      {area.priority} Priority
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div className="progress-fill progress-fill-seo-improvements"></div>
                    <span className="progress-text">
                      {area.current} → {area.target}
                    </span>
                  </div>

                  <div className="issues-list">
                    <h4>Issues to Address:</h4>
                    <ul>
                      {area.issues.map((issue, i) => (
                        <li key={i}>
                          <FaExclamationTriangle className="issue-icon" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="impact">
                    <strong>Expected Impact:</strong> {area.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="keyword-opportunities section">
          <div className="container">
            <h2>Keyword Ranking Opportunities</h2>
            <div className="keywords-table">
              <div className="table-header">
                <span>Keyword</span>
                <span>Current Rank</span>
                <span>Target Rank</span>
                <span>Search Volume</span>
                <span>Opportunity</span>
              </div>
              {keywordOpportunities.map((keyword, index) => (
                <motion.div
                  key={keyword.keyword}
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="keyword">{keyword.keyword}</span>
                  <span className="current-rank">#{keyword.currentRank}</span>
                  <span className="target-rank">#{keyword.targetRank}</span>
                  <span className="search-volume">{keyword.searchVolume}/mo</span>
                  <span className={`opportunity ${keyword.opportunity.toLowerCase()}`}>
                    {keyword.opportunity}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="action-plan section">
          <div className="container">
            <h2>30-Day Action Plan</h2>
            <div className="timeline">
              {actionItems.map((item, index) => (
                <motion.div
                  key={item.action}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="timeline-marker">
                    <FaCheckCircle />
                  </div>
                  <div className="timeline-content">
                    <h3>{item.action}</h3>
                    <p>{item.description}</p>
                    <div className="item-meta">
                      <span className="timeline">📅 {item.timeline}</span>
                      <span className="effort">⚡ {item.effort} Effort</span>
                      <span className="impact">🎯 {item.impact} Impact</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="competitive-analysis section">
          <div className="container">
            <h2>Competitive Position</h2>
            <div className="competitor-grid">
              <div className="competitor-card our-site">
                <h3>Our Site</h3>
                <div className="metrics">
                  <div className="metric">
                    <FaStar className="icon" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="metric">
                    <FaMapMarkerAlt className="icon" />
                    <span>127 Reviews</span>
                  </div>
                  <div className="metric">
                    <FaSearch className="icon" />
                    <span>Rank #3</span>
                  </div>
                </div>
                <div className="score excellent">87/100</div>
              </div>

              <div className="competitor-card">
                <h3>Top Competitor</h3>
                <div className="metrics">
                  <div className="metric">
                    <FaStar className="icon" />
                    <span>4.8/5 Rating</span>
                  </div>
                  <div className="metric">
                    <FaMapMarkerAlt className="icon" />
                    <span>156 Reviews</span>
                  </div>
                  <div className="metric">
                    <FaSearch className="icon" />
                    <span>Rank #1</span>
                  </div>
                </div>
                <div className="score good">92/100</div>
              </div>

              <div className="gap-analysis">
                <h3>Gap to Close</h3>
                <ul>
                  <li>Need 29+ more reviews</li>
                  <li>Improve local citation consistency</li>
                  <li>Create more neighborhood content</li>
                  <li>Enhance social media presence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
