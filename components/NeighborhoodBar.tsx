
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
        <p>
          Currently browsing: <strong>{currentNeighborhood}</strong>
          <button 
            className="change-neighborhood"
            onClick={() => setIsOpen(!isOpen)}
          >
            Change
          </button>
        </p>
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
  );
}
