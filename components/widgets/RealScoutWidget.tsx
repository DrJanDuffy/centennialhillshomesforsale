import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, MapPin, DollarSign, Calendar, Star, TrendingUp, Users } from 'lucide-react';
import styles from './RealScoutWidget.module.css';

interface RealScoutWidgetProps {
  type?: 'search' | 'property-details' | 'market-analysis' | 'featured-listings';
  propertyId?: string;
  agentId?: string;
  brokerId?: string;
  neighborhood?: string;
  priceRange?: { min: number; max: number };
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  className?: string;
  title?: string;
  description?: string;
}

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  status: 'active' | 'pending' | 'sold';
  daysOnMarket: number;
  propertyType: string;
  neighborhood: string;
  description: string;
  features: string[];
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  type = 'search',
  propertyId,
  agentId,
  brokerId,
  neighborhood,
  priceRange,
  bedrooms,
  bathrooms,
  propertyType,
  className = '',
  title,
  description
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchParams, setSearchParams] = useState({
    location: neighborhood || 'Centennial Hills, Las Vegas, NV',
    minPrice: priceRange?.min || 400000,
    maxPrice: priceRange?.max || 1200000,
    bedrooms: bedrooms || 0,
    bathrooms: bathrooms || 0,
    propertyType: propertyType || 'all'
  });
  const widgetRef = useRef<HTMLDivElement>(null);

  // Mock property data for demonstration
  const mockProperties: Property[] = [
    {
      id: '1',
      address: '1234 Providence Drive, Las Vegas, NV 89149',
      price: 850000,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
      ],
      status: 'active',
      daysOnMarket: 12,
      propertyType: 'Single Family',
      neighborhood: 'Providence',
      description: 'Luxury home with mountain views and modern amenities',
      features: ['Pool', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home']
    },
    {
      id: '2',
      address: '5678 Centennial Hills Blvd, Las Vegas, NV 89149',
      price: 1200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4100,
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
      ],
      status: 'active',
      daysOnMarket: 8,
      propertyType: 'Single Family',
      neighborhood: 'Centennial Hills',
      description: 'Modern estate with custom features and luxury finishes',
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita']
    },
    {
      id: '3',
      address: '9012 Skye Canyon Road, Las Vegas, NV 89149',
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      images: [
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
      ],
      status: 'active',
      daysOnMarket: 15,
      propertyType: 'Single Family',
      neighborhood: 'Skye Canyon',
      description: 'Family-friendly home with open floor plan and mountain views',
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard']
    }
  ];

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter properties based on search parameters
        let filteredProperties = mockProperties;
        
        if (searchParams.minPrice > 0) {
          filteredProperties = filteredProperties.filter(p => p.price >= searchParams.minPrice);
        }
        if (searchParams.maxPrice < 2000000) {
          filteredProperties = filteredProperties.filter(p => p.price <= searchParams.maxPrice);
        }
        if (searchParams.bedrooms > 0) {
          filteredProperties = filteredProperties.filter(p => p.bedrooms >= searchParams.bedrooms);
        }
        if (searchParams.bathrooms > 0) {
          filteredProperties = filteredProperties.filter(p => p.bathrooms >= searchParams.bathrooms);
        }
        if (searchParams.propertyType !== 'all') {
          filteredProperties = filteredProperties.filter(p => 
            p.propertyType.toLowerCase().includes(searchParams.propertyType.toLowerCase())
          );
        }
        
        setProperties(filteredProperties);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load property data');
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSearch = (newParams: typeof searchParams) => {
    setSearchParams(newParams);
  };

  const renderSearchWidget = () => (
    <div className={styles.searchWidget}>
      <div className={styles.searchHeader}>
        <h3 className={styles.widgetTitle}>{title || 'Find Your Perfect Home'}</h3>
        <p className={styles.widgetDescription}>
          {description || 'Search properties in Centennial Hills and surrounding areas'}
        </p>
      </div>
      
      <div className={styles.searchForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter city, neighborhood, or zip code"
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="minPrice">Min Price</label>
            <input
              id="minPrice"
              type="number"
              value={searchParams.minPrice}
              onChange={(e) => setSearchParams(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
              placeholder="Min Price"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="maxPrice">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              value={searchParams.maxPrice}
              onChange={(e) => setSearchParams(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              placeholder="Max Price"
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="bedrooms">Bedrooms</label>
            <select
              id="bedrooms"
              value={searchParams.bedrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5+</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bathrooms">Bathrooms</label>
            <select
              id="bathrooms"
              value={searchParams.bathrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              value={searchParams.propertyType}
              onChange={(e) => setSearchParams(prev => ({ ...prev, propertyType: e.target.value }))}
            >
              <option value="all">All Types</option>
              <option value="single family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>
        
        <motion.button
          className={styles.searchButton}
          onClick={() => handleSearch(searchParams)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Properties
        </motion.button>
      </div>
    </div>
  );

  const renderPropertyListings = () => (
    <div className={styles.listingsWidget}>
      <div className={styles.listingsHeader}>
        <h3 className={styles.widgetTitle}>{title || 'Featured Properties'}</h3>
        <p className={styles.widgetDescription}>
          {description || `Showing ${properties.length} properties in ${searchParams.location}`}
        </p>
      </div>
      
      {isLoading ? (
        <div className={styles.loading}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>Loading properties...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      ) : (
        <div className={styles.propertiesGrid}>
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className={styles.propertyCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.propertyImage}>
                <img src={property.images[0]} alt={property.address} />
                <div className={styles.propertyStatus}>
                  <span className={`${styles.status} ${styles[property.status]}`}>
                    {property.status.toUpperCase()}
                  </span>
                </div>
                <div className={styles.propertyPrice}>
                  {formatPrice(property.price)}
                </div>
              </div>
              
              <div className={styles.propertyDetails}>
                <h4 className={styles.propertyAddress}>{property.address}</h4>
                <div className={styles.propertyStats}>
                  <span><Home className="w-4 h-4" /> {property.bedrooms} beds</span>
                  <span><MapPin className="w-4 h-4" /> {property.bathrooms} baths</span>
                  <span><DollarSign className="w-4 h-4" /> {property.sqft.toLocaleString()} sqft</span>
                </div>
                <p className={styles.propertyDescription}>{property.description}</p>
                <div className={styles.propertyFeatures}>
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className={styles.propertyActions}>
                  <motion.button
                    className={styles.viewButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    className={styles.favoriteButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWidget = () => {
    switch (type) {
      case 'search':
        return renderSearchWidget();
      case 'property-details':
      case 'market-analysis':
      case 'featured-listings':
      default:
        return renderPropertyListings();
    }
  };

  return (
    <div ref={widgetRef} className={`${styles.container} ${className}`}>
      {renderWidget()}
    </div>
  );
};

export default RealScoutWidget;