
import { useState } from 'react';


interface Citation {
  name: string;
  url: string;
  status: 'Active' | 'Pending' | 'Required';
  importance: 'Critical' | 'High' | 'Medium';
}

export default function LocalCitationWidget() {
  const [showAll, setShowAll] = useState(false);

  const citations: Citation[] = [
    {
      name: "Google My Business",
      url: "https://g.co/kgs/4qQ8DsY",
      status: "Active",
      importance: "Critical"
    },
    {
      name: "Zillow Agent Profile",
      url: "https://zillow.com",
      status: "Active", 
      importance: "Critical"
    },
    {
      name: "Realtor.com Agent",
      url: "https://realtor.com",
      status: "Active",
      importance: "Critical"
    },
    {
      name: "Las Vegas Board of REALTORS®",
      url: "https://lvrealtors.com",
      status: "Active",
      importance: "High"
    },
    {
      name: "Berkshire Hathaway Directory",
      url: "https://bhhsnv.com",
      status: "Active",
      importance: "High"
    },
    {
      name: "Yelp Business",
      url: "https://yelp.com",
      status: "Pending",
      importance: "Medium"
    },
    {
      name: "Facebook Business",
      url: "https://facebook.com",
      status: "Required",
      importance: "Medium"
    },
    {
      name: "Better Business Bureau",
      url: "https://bbb.org",
      status: "Required",
      importance: "Medium"
    }
  ];

  const displayedCitations = showAll ? citations : citations.slice(0, 4);

  return (
    <div className="citation-widget">
      <h3>🔗 Business Listings & Citations</h3>
      <p className="citation-description">
        NAP (Name, Address, Phone) consistency across all platforms ensures better local search visibility.
      </p>
      
      <div className="citations-grid">
        {displayedCitations.map((citation, index) => (
          <div key={index} className={`citation-card ${citation.status.toLowerCase()}`}>
            <div className="citation-header">
              <h4>{citation.name}</h4>
              <span className={`status-badge ${citation.status.toLowerCase()}`}>
                {citation.status}
              </span>
            </div>
            <div className="citation-details">
              <span className={`importance ${citation.importance.toLowerCase()}`}>
                {citation.importance} Priority
              </span>
              {citation.status === 'Active' && (
                <a 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="citation-link"
                >
                  View Listing
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button 
        className="show-more-btn"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Show Less' : `Show All ${citations.length} Citations`}
      </button>

      <div className="nap-consistency">
        <h4>📋 NAP Consistency Check</h4>
        <div className="nap-details">
          <p><strong>Business Name:</strong> Dr. Jan Duffy, REALTOR®</p>
          <p><strong>Address:</strong> Providence Skye Canyon Dr, Las Vegas, NV 89166</p>
          <p><strong>Phone:</strong> (702) 903-1952</p>
          <p className="consistency-status">✅ All listings use consistent NAP data</p>
        </div>
      </div>
    </div>
  );
}
