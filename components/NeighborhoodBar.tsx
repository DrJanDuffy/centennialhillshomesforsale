
import { useState } from 'react';

interface NeighborhoodBarProps {
  currentNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

const neighborhoods = [
  'Centennial Hills',
  'Providence', 
  'Skye Canyon',
  'The Trails',
  'Tournament Hills',
  'Desert Foothills',
  'The Canyons'
];

export default function NeighborhoodBar({ currentNeighborhood, onNeighborhoodChange }: NeighborhoodBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="neighborhood-bar">
      <div className="container">
        <div className="neighborhood-content">
          <span className="neighborhood-label">
            📍 Currently browsing: <strong>{currentNeighborhood}</strong>
          </span>
          <button 
            className="change-neighborhood"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : 'Change Area'}
          </button>
        </div>
        {isOpen && (
          <div className="neighborhood-dropdown">
            <div className="dropdown-header">Select Neighborhood:</div>
            {neighborhoods.map((neighborhood) => (
              <button
                key={neighborhood}
                className={`neighborhood-option ${neighborhood === currentNeighborhood ? 'active' : ''}`}
                onClick={() => {
                  onNeighborhoodChange(neighborhood);
                  setIsOpen(false);
                }}
              >
                {neighborhood}
                {neighborhood === currentNeighborhood && <span className="check">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';

interface NeighborhoodBarProps {
  neighborhoods: string[];
  currentNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

const NeighborhoodBar: React.FC<NeighborhoodBarProps> = ({
  neighborhoods,
  currentNeighborhood,
  onNeighborhoodChange
}) => {
  return (
    <div className="neighborhood-bar">
      <div className="container">
        <h3>Explore Neighborhoods</h3>
        <div className="neighborhood-tabs">
          {neighborhoods.map((neighborhood) => (
            <button
              key={neighborhood}
              className={`neighborhood-tab ${currentNeighborhood === neighborhood ? 'active' : ''}`}
              onClick={() => onNeighborhoodChange(neighborhood)}
            >
              {neighborhood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodBar;
