
import React, { useState } from 'react';

export type NeighborhoodName = 'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante';

interface NeighborhoodBarProps {
  currentNeighborhood: NeighborhoodName;
  onNeighborhoodChange: (neighborhood: NeighborhoodName) => void;
}

const neighborhoods: NeighborhoodName[] = [
  'Centennial Hills',
  'The Trails',
  'Tournament Hills', 
  'Skye Canyon',
  'Sun City Aliante'
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
