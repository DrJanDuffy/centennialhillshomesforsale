
import React, { useState, useEffect } from 'react';

interface PropertyRecommendation {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  features: string[];
  matchScore: number;
  whyRecommended: string[];
  neighborhood: string;
  imageUrl?: string;
}

interface UserPreferences {
  budget: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
  preferredFeatures: string[];
  neighborhoods: string[];
}

const SmartPropertyRecommendations: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: { min: 400000, max: 800000 },
    bedrooms: 3,
    bathrooms: 2,
    preferredFeatures: [],
    neighborhoods: []
  });
  
  const [recommendations, setRecommendations] = useState<PropertyRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const availableFeatures = [
    'Pool', 'Golf Course View', 'Gated Community', 'Mountain View',
    'Two-Story', 'Single Story', 'Casita', 'RV Parking', 'Three Car Garage',
    'Upgraded Kitchen', 'Hardwood Floors', 'Fireplace', 'Outdoor Kitchen'
  ];

  const neighborhoods = [
    'Centennial Hills', 'Providence', 'Skye Canyon', 'The Ridges',
    'Red Rock Country Club', 'Canyon Gate', 'Sun City Summerlin'
  ];

  useEffect(() => {
    generateRecommendations();
  }, [preferences]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate API call for property recommendations
    const mockProperties: PropertyRecommendation[] = [
      {
        id: '1',
        address: '123 TPC Drive, Las Vegas, NV 89149',
        price: 679000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2850,
        features: ['Golf Course View', 'Pool', 'Gated Community', 'Three Car Garage'],
        matchScore: 92,
        whyRecommended: [
          'Within your budget range',
          'Has your preferred golf course view',
          'Located in Centennial Hills as requested',
          'Extra bedroom for flexibility'
        ],
        neighborhood: 'Centennial Hills'
      },
      {
        id: '2',
        address: '456 Providence Way, Las Vegas, NV 89166',
        price: 745000,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2650,
        features: ['Mountain View', 'Pool', 'Upgraded Kitchen', 'Casita'],
        matchScore: 88,
        whyRecommended: [
          'Perfect bedroom/bathroom match',
          'Mountain views you\'ll love',
          'Includes casita for office/guests',
          'Recently upgraded kitchen'
        ],
        neighborhood: 'Providence'
      },
      {
        id: '3',
        address: '789 Skye Vista Ave, Las Vegas, NV 89166',
        price: 595000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2400,
        features: ['Single Story', 'RV Parking', 'Fireplace', 'Large Lot'],
        matchScore: 85,
        whyRecommended: [
          'Well under budget - room for upgrades',
          'Single story living',
          'RV parking for your toys',
          'Great value in growing area'
        ],
        neighborhood: 'Skye Canyon'
      }
    ];

    // Filter based on preferences
    const filtered = mockProperties.filter(property => {
      const withinBudget = property.price >= preferences.budget.min && 
                          property.price <= preferences.budget.max;
      const meetsRooms = property.bedrooms >= preferences.bedrooms &&
                        property.bathrooms >= preferences.bathrooms;
      const inPreferredArea = preferences.neighborhoods.length === 0 ||
                             preferences.neighborhoods.includes(property.neighborhood);
      
      return withinBudget && meetsRooms && inPreferredArea;
    });

    setTimeout(() => {
      setRecommendations(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFeatureToggle = (feature: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredFeatures: prev.preferredFeatures.includes(feature)
        ? prev.preferredFeatures.filter(f => f !== feature)
        : [...prev.preferredFeatures, feature]
    }));
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    setPreferences(prev => ({
      ...prev,
      neighborhoods: prev.neighborhoods.includes(neighborhood)
        ? prev.neighborhoods.filter(n => n !== neighborhood)
        : [...prev.neighborhoods, neighborhood]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🎯 Smart Property Recommendations</h2>
          <p className="text-gray-600">AI-powered suggestions based on your preferences</p>
        </div>
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ⚙️ Preferences
        </button>
      </div>

      {showPreferences && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Customize Your Preferences</h3>
          
          {/* Budget Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <div className="flex gap-4">
              <input
                type="number"
                value={preferences.budget.min}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  budget: { ...prev.budget, min: Number(e.target.value) }
                }))}
                className="border rounded px-3 py-2 w-32"
                placeholder="Min"
              />
              <input
                type="number"
                value={preferences.budget.max}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  budget: { ...prev.budget, max: Number(e.target.value) }
                }))}
                className="border rounded px-3 py-2 w-32"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Bedrooms/Bathrooms */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
              <select
                value={preferences.bedrooms}
                onChange={(e) => setPreferences(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                className="border rounded px-3 py-2 w-full"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Bathrooms</label>
              <select
                value={preferences.bathrooms}
                onChange={(e) => setPreferences(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
                className="border rounded px-3 py-2 w-full"
              >
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Features */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Features</label>
            <div className="flex flex-wrap gap-2">
              {availableFeatures.map(feature => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    preferences.preferredFeatures.includes(feature)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Areas</label>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map(neighborhood => (
                <button
                  key={neighborhood}
                  onClick={() => handleNeighborhoodToggle(neighborhood)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    preferences.neighborhoods.includes(neighborhood)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {neighborhood}
                </button>
              ))}
            </div>
            {preferences.neighborhoods.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No selection = all areas</p>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding perfect properties for you...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((property) => (
            <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.address}</h3>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {property.matchScore}% Match
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{property.neighborhood}</div>
                    <div className="text-sm text-gray-600">Neighborhood</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Why We Recommend This Property:</h4>
                  <ul className="space-y-1">
                    {property.whyRecommended.map((reason, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    📸 View Photos
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    📅 Schedule Tour
                  </button>
                  <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    💾 Save
                  </button>
                </div>
              </div>
            </div>
          ))}

          {recommendations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No properties match your current preferences.</p>
              <button
                onClick={() => setShowPreferences(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adjust Preferences
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartPropertyRecommendations;
