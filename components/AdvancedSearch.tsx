
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchFilters {
  priceMin: number;
  priceMax: number;
  beds: string;
  baths: string;
  sqftMin: number;
  sqftMax: number;
  propertyType: string;
  features: string[];
  neighborhood: string;
}

const AdvancedSearch: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    priceMin: 0,
    priceMax: 2000000,
    beds: 'any',
    baths: 'any',
    sqftMin: 0,
    sqftMax: 10000,
    propertyType: 'any',
    features: [],
    neighborhood: 'any'
  });

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const features = [
    'Pool', 'Garage', 'Fireplace', 'Garden', 'Balcony', 'Walk-in Closet',
    'Hardwood Floors', 'Updated Kitchen', 'Master Suite', 'Mountain View'
  ];

  const neighborhoods = [
    'Centennial Hills', 'Skye Canyon', 'Providence', 'The Ridges',
    'Red Rock Country Club', 'Summerlin', 'Spanish Hills'
  ];

  return (
    <motion.div 
      className="advanced-search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="search-header">
        <h3>Find Your Perfect Home</h3>
        <button 
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Basic Search' : 'Advanced Search'}
        </button>
      </div>
      
      <div className="basic-search">
        <div className="search-row">
          <div className="search-field">
            <label>Price Range</label>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min Price"
                value={filters.priceMin || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: Number(e.target.value) }))}
              />
              <span>to</span>
              <input 
                type="number" 
                placeholder="Max Price"
                value={filters.priceMax || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: Number(e.target.value) }))}
              />
            </div>
          </div>
          
          <div className="search-field">
            <label>Bedrooms</label>
            <select 
              value={filters.beds}
              onChange={(e) => setFilters(prev => ({ ...prev, beds: e.target.value }))}
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          <div className="search-field">
            <label>Bathrooms</label>
            <select 
              value={filters.baths}
              onChange={(e) => setFilters(prev => ({ ...prev, baths: e.target.value }))}
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <button className="search-button">Search Properties</button>
        </div>
      </div>
      
      <motion.div 
        className="expanded-search"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="search-section">
          <h4>Property Details</h4>
          <div className="search-row">
            <div className="search-field">
              <label>Property Type</label>
              <select 
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
              >
                <option value="any">Any Type</option>
                <option value="single-family">Single Family</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condo</option>
                <option value="luxury">Luxury Home</option>
              </select>
            </div>
            
            <div className="search-field">
              <label>Square Footage</label>
              <div className="sqft-inputs">
                <input 
                  type="number" 
                  placeholder="Min Sq Ft"
                  value={filters.sqftMin || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, sqftMin: Number(e.target.value) }))}
                />
                <span>to</span>
                <input 
                  type="number" 
                  placeholder="Max Sq Ft"
                  value={filters.sqftMax || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, sqftMax: Number(e.target.value) }))}
                />
              </div>
            </div>
            
            <div className="search-field">
              <label>Neighborhood</label>
              <select 
                value={filters.neighborhood}
                onChange={(e) => setFilters(prev => ({ ...prev, neighborhood: e.target.value }))}
              >
                <option value="any">Any Neighborhood</option>
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood.toLowerCase().replace(/\s+/g, '-')}>
                    {neighborhood}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="search-section">
          <h4>Features & Amenities</h4>
          <div className="features-grid">
            {features.map(feature => (
              <label key={feature} className="feature-checkbox">
                <input 
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                />
                <span className="checkmark"></span>
                {feature}
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedSearch;
