
import React, { useState } from 'react';

interface NeighborhoodBarProps {
  currentNeighborhood: string;
  onNeighborhoodChange: (neighborhood: string) => void;
}

const neighborhoods = [
  'Centennial Hills',
  'Providence',
  'Skye Canyon',
  'Northwest Las Vegas',
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
            Change Area
          </button>
          {isOpen && (
            <div className="neighborhood-dropdown">
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
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
