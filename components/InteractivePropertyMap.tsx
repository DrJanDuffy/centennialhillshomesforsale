import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, HomeIcon, TrendingUpIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import styles from './InteractivePropertyMap.module.css';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lat: number;
  lng: number;
  image: string;
  status: 'for-sale' | 'sold' | 'pending';
}

const InteractivePropertyMap: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000000,
    minBedrooms: 0,
    status: 'all'
  });
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);

  const neighborhoods = useMemo(() => [
    {
      id: 'centennial-hills',
      name: 'Centennial Hills',
      lat: 36.2759,
      lng: -115.3285,
      propertyCount: 150,
      avgPrice: 550000
    },
    {
      id: 'skye-canyon',
      name: 'Skye Canyon',
      lat: 36.3423,
      lng: -115.3602,
      propertyCount: 120,
      avgPrice: 620000
    },
    {
      id: 'providence',
      name: 'Providence',
      lat: 36.2857,
      lng: -115.2442,
      propertyCount: 180,
      avgPrice: 490000
    },
  ], []);

  // Sample properties in Centennial Hills area
  const sampleProperties: Property[] = [
    {
      id: '1',
      address: '8324 Providence Ranch Ave, Las Vegas, NV 89166',
      price: 485000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2150,
      lat: 36.2741,
      lng: -115.3294,
      image: '/images/property1.jpg',
      status: 'for-sale'
    },
    {
      id: '2',
      address: '9876 Skye Canyon Dr, Las Vegas, NV 89166',
      price: 525000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      lat: 36.2756,
      lng: -115.3312,
      image: '/images/property2.jpg',
      status: 'for-sale'
    },
    {
      id: '3',
      address: '7543 Centennial Hills Blvd, Las Vegas, NV 89149',
      price: 675000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 2890,
      lat: 36.2789,
      lng: -115.3275,
      image: '/images/property3.jpg',
      status: 'sold'
    }
  ];

  useEffect(() => {
    setProperties(sampleProperties);
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchTerm === '' || 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.price.toString().includes(searchTerm);

    return matchesSearch &&
           property.price >= filters.minPrice &&
           property.price <= filters.maxPrice &&
           property.bedrooms >= filters.minBedrooms &&
           (filters.status === 'all' || property.status === filters.status);
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleNeighborhoodClick = useCallback((id: string) => {
    setSelectedNeighborhood(id);
  }, []);

  const handleNeighborhoodHover = useCallback((id: string | null) => {
    setHoveredNeighborhood(id);
  }, []);

  useEffect(() => {
    // Simulate loading neighborhoods
    const timer = setTimeout(() => {
      setSelectedNeighborhood('centennial-hills');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.header}>
        <h2>🏡 Interactive Property Map</h2>
        <p>Explore available homes in Centennial Hills & surrounding areas</p>
        <div className={styles.mapStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{filteredProperties.length}</span>
            <span className={styles.statLabel}>Properties</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {filteredProperties.length > 0 ? 
                formatPrice(filteredProperties.reduce((avg, p) => avg + p.price, 0) / filteredProperties.length) : 
                '$0'
              }
            </span>
            <span className={styles.statLabel}>Avg Price</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {filteredProperties.filter(p => p.status === 'for-sale').length}
            </span>
            <span className={styles.statLabel}>Available</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search by address, price, or neighborhood..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button 
            className={styles.clearSearch}
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="2000000"
            step="50000"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
          />
          <span>Up to {formatPrice(filters.maxPrice)}</span>
        </div>

        <div className={styles.filterGroup}>
          <label>Min Bedrooms:</label>
          <select
            value={filters.minBedrooms}
            onChange={(e) => setFilters({...filters, minBedrooms: Number(e.target.value)})}
          >
            <option value={0}>Any</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Status:</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All</option>
            <option value="for-sale">For Sale</option>
            <option value="sold">Recently Sold</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Map Placeholder (In real implementation, integrate with Google Maps or Mapbox) */}
      <div className={styles.mapArea}>
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapInfo}>
            <h3>🗺️ Interactive Map View</h3>
            <p>Showing {filteredProperties.length} properties</p>
            <small>Click on markers to view property details</small>
          </div>

          {/* Property Markers */}
          <div className={styles.markers}>
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={`${styles.marker} ${styles[property.status]}`}
                style={{
                  left: `${(property.lng + 115.35) * 1000}px`,
                  top: `${(36.28 - property.lat) * 2000}px`
                }}
                onClick={() => setSelectedProperty(property)}
              >
                <div className={styles.markerPin}>📍</div>
                <div className={styles.priceTag}>
                  {formatPrice(property.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Details Panel */}
      {selectedProperty && (
        <div className={styles.propertyPanel}>
          <div className={styles.propertyCard}>
            <button 
              className={styles.closeBtn}
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>

            <div className={styles.propertyImage}>
              <img src={selectedProperty.image} alt={selectedProperty.address} />
              <div className={`${styles.statusBadge} ${styles[selectedProperty.status]}`}>
                {selectedProperty.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            <div className={styles.propertyInfo}>
              <h3>{formatPrice(selectedProperty.price)}</h3>
              <p className={styles.address}>{selectedProperty.address}</p>

              <div className={styles.features}>
                <span>🛏️ {selectedProperty.bedrooms} bed</span>
                <span>🚿 {selectedProperty.bathrooms} bath</span>
                <span>📐 {selectedProperty.sqft.toLocaleString()} sqft</span>
              </div>

              <div className={styles.actions}>
                <button 
                  className={styles.viewBtn}
                  onClick={() => window.open(`/property/${selectedProperty.id}`, '_blank')}
                >
                  🏠 View Details
                </button>
                <button 
                  className={styles.tourBtn}
                  onClick={() => {
                    // Simulate virtual tour
                    alert(`🎥 Virtual tour starting for ${selectedProperty.address}!\n\nFeatures:\n• 360° room views\n• Interactive floor plans\n• Neighborhood walkthrough\n\nContact Dr. Jan Duffy for a live virtual tour!`);
                  }}
                >
                  🎥 Virtual Tour
                </button>
                <button 
                  className={styles.contactBtn}
                  onClick={() => {
                    const message = `Hi Dr. Jan Duffy! I'm interested in the property at ${selectedProperty.address} listed at ${formatPrice(selectedProperty.price)}. Can we schedule a showing?`;
                    window.open(`mailto:info@centennialhillshomesforsale.com?subject=Property Inquiry - ${selectedProperty.address}&body=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  📞 Contact Agent
                </button>
                <button 
                  className={styles.favoriteBtn}
                  onClick={() => {
                    // Add to favorites functionality
                    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
                    if (!favorites.includes(selectedProperty.id)) {
                      favorites.push(selectedProperty.id);
                      localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
                      alert('❤️ Property added to favorites!');
                    } else {
                      alert('❤️ Property is already in your favorites!');
                    }
                  }}
                >
                  ❤️ Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Grid View */}
      <div className={styles.gridView}>
        <h3>Property Listings ({filteredProperties.length})</h3>
        <div className={styles.propertyGrid}>
          {filteredProperties.map((property) => (
            <div 
              key={property.id} 
              className={styles.propertyCard}
              onClick={() => setSelectedProperty(property)}
            >
              <div className={styles.cardImage}>
                <img src={property.image} alt={property.address} />
                <div className={`${styles.statusBadge} ${styles[property.status]}`}>
                  {property.status.replace('-', ' ').toUpperCase()}
                </div>
                <div className={styles.cardOverlay}>
                  <button 
                    className={styles.quickViewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                    }}
                  >
                    👁️ Quick View
                  </button>
                  <button 
                    className={styles.tourBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`🎥 Virtual tour for ${property.address}!\n\nContact Dr. Jan Duffy for full virtual tour access.`);
                    }}
                  >
                    🎥 Tour
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h4>{formatPrice(property.price)}</h4>
                <p>{property.address}</p>
                <div className={styles.features}>
                  <span>🛏️ {property.bedrooms} bed</span>
                  <span>🚿 {property.bathrooms} bath</span>
                  <span>📐 {property.sqft.toLocaleString()} sqft</span>
                </div>
                <div className={styles.cardActions}>
                  <button 
                    className={styles.pricePerSqft}
                    title="Price per square foot"
                  >
                    💰 ${Math.round(property.price / property.sqft)}/sqft
                  </button>
                  <button 
                    className={styles.favoriteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
                      if (!favorites.includes(property.id)) {
                        favorites.push(property.id);
                        localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
                        e.currentTarget.innerHTML = '❤️ Saved';
                        e.currentTarget.style.background = '#10b981';
                      }
                    }}
                  >
                    🤍 Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractivePropertyMap;