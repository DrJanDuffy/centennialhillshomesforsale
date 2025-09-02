import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  image: string;
  features: string[];
}

interface PropertyComparisonProps {
  properties: Property[];
  className?: string;
}

export default function PropertyComparison({ properties, className = '' }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleProperty = (propertyId: string) => {
    setSelectedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else if (prev.length < 3) {
        return [...prev, propertyId];
      }
      return prev;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const selectedProps = properties.filter(p => selectedProperties.includes(p.id));

  return (
    <div className={`property-comparison ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Properties</h2>
        
        {/* Property Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => toggleProperty(property.id)}
              className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                selectedProperties.includes(property.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${
                selectedProperties.length >= 3 && !selectedProperties.includes(property.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <img
                src={property.image}
                alt={property.address}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-900 mb-1">{property.address}</h3>
              <p className="text-lg font-bold text-blue-600 mb-2">{formatPrice(property.price)}</p>
              <div className="text-sm text-gray-600">
                <p>{property.bedrooms} bed • {property.bathrooms} bath • {formatSquareFeet(property.squareFeet)} sqft</p>
              </div>
              {selectedProperties.includes(property.id) && (
                <div className="mt-2 text-blue-600 text-sm font-medium">✓ Selected</div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Button */}
        {selectedProperties.length >= 2 && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {showComparison ? 'Hide Comparison' : 'Compare Properties'}
            </button>
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && selectedProps.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                  {selectedProps.map((property) => (
                    <th key={property.id} className="border border-gray-300 px-4 py-2 text-left">
                      <div className="text-sm font-medium">{property.address}</div>
                      <div className="text-xs text-gray-600">{formatPrice(property.price)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Price</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {formatPrice(property.price)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Bedrooms</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {property.bedrooms}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Bathrooms</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {property.bathrooms}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Square Feet</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {formatSquareFeet(property.squareFeet)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Lot Size</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {property.lotSize} acres
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Year Built</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      {property.yearBuilt}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Features</td>
                  {selectedProps.map((property) => (
                    <td key={property.id} className="border border-gray-300 px-4 py-2">
                      <ul className="text-sm">
                        {property.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Selection Info */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Select 2-3 properties to compare. {selectedProperties.length}/3 selected.
        </div>
      </div>
    </div>
  );
}