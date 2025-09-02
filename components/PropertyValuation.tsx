import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ValuationResult {
  estimatedValue: number;
  priceRange: {
    low: number;
    high: number;
  };
  confidence: number;
  factors: {
    positive: string[];
    negative: string[];
  };
}

interface PropertyValuationProps {
  className?: string;
}

export default function PropertyValuation({ className = '' }: PropertyValuationProps) {
  const [formData, setFormData] = useState({
    address: '',
    squareFeet: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    lotSize: '',
    condition: 'good',
    upgrades: [] as string[]
  });
  
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpgradeChange = (upgrade: string) => {
    setFormData(prev => ({
      ...prev,
      upgrades: prev.upgrades.includes(upgrade)
        ? prev.upgrades.filter(u => u !== upgrade)
        : [...prev.upgrades, upgrade]
    }));
  };

  const calculateValuation = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation (in real app, this would call a valuation API)
    const baseValue = parseInt(formData.squareFeet) * 180; // $180/sqft base
    const bedroomBonus = parseInt(formData.bedrooms) * 5000;
    const bathroomBonus = parseInt(formData.bathrooms) * 3000;
    const upgradeBonus = formData.upgrades.length * 10000;
    const conditionMultiplier = formData.condition === 'excellent' ? 1.1 : 
                               formData.condition === 'good' ? 1.0 : 0.9;
    
    const estimatedValue = Math.round((baseValue + bedroomBonus + bathroomBonus + upgradeBonus) * conditionMultiplier);
    
    const mockResult: ValuationResult = {
      estimatedValue,
      priceRange: {
        low: Math.round(estimatedValue * 0.9),
        high: Math.round(estimatedValue * 1.1)
      },
      confidence: 85,
      factors: {
        positive: [
          'Recent market trends favor this area',
          'Good school district',
          'Recent comparable sales support this range'
        ],
        negative: [
          'Limited recent sales data',
          'Market conditions may vary'
        ]
      }
    };
    
    setResult(mockResult);
    setIsLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`property-valuation ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Valuation Tool</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, Las Vegas, NV"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    name="squareFeet"
                    value={formData.squareFeet}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lot Size (acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.25"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2010"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recent Upgrades
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Kitchen', 'Bathroom', 'Flooring', 'Roof', 'HVAC', 'Windows'].map(upgrade => (
                    <label key={upgrade} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.upgrades.includes(upgrade)}
                        onChange={() => handleUpgradeChange(upgrade)}
                        className="mr-2"
                      />
                      <span className="text-sm">{upgrade}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                onClick={calculateValuation}
                disabled={isLoading || !formData.squareFeet}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Calculating...' : 'Get Property Value'}
              </button>
            </div>
          </div>
          
          {/* Results */}
          <div>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">Estimated Value</h3>
                
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(result.estimatedValue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Range: {formatPrice(result.priceRange.low)} - {formatPrice(result.priceRange.high)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Confidence: {result.confidence}%
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Positive Factors</h4>
                  <ul className="space-y-1">
                    {result.factors.positive.map((factor, index) => (
                      <li key={index} className="flex items-center text-sm text-green-700">
                        <span className="mr-2">✓</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Considerations</h4>
                  <ul className="space-y-1">
                    {result.factors.negative.map((factor, index) => (
                      <li key={index} className="flex items-center text-sm text-yellow-700">
                        <span className="mr-2">⚠</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Disclaimer:</strong> This is an estimated value based on the information provided. 
                    For an accurate valuation, contact a licensed real estate professional for a comparative market analysis.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}