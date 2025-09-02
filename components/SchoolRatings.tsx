import { motion } from 'framer-motion';
import { useState } from 'react';

interface School {
  name: string;
  type: 'elementary' | 'middle' | 'high';
  rating: number;
  distance: number;
  address: string;
  phone: string;
  website: string;
  programs: string[];
}

interface SchoolRatingsProps {
  neighborhood: string;
  schools: School[];
  className?: string;
}

export default function SchoolRatings({
  neighborhood,
  schools,
  className = '',
}: SchoolRatingsProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'elementary' | 'middle' | 'high'>('all');

  const filteredSchools =
    selectedType === 'all' ? schools : schools.filter((school) => school.type === selectedType);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRatingStars = (rating: number) => {
    const floorRating = Math.floor(Math.max(0, Math.min(5, rating)));
    const emptyStars = Math.max(0, 5 - floorRating);
    return '★'.repeat(floorRating) + '☆'.repeat(emptyStars);
  };

  return (
    <div className={`school-ratings ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schools in {neighborhood}</h2>

        {/* School Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Schools ({schools.length})
          </button>
          <button
            onClick={() => setSelectedType('elementary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'elementary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Elementary ({schools.filter((s) => s.type === 'elementary').length})
          </button>
          <button
            onClick={() => setSelectedType('middle')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'middle'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Middle ({schools.filter((s) => s.type === 'middle').length})
          </button>
          <button
            onClick={() => setSelectedType('high')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'high'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High School ({schools.filter((s) => s.type === 'high').length})
          </button>
        </div>

        {/* Schools List */}
        <div className="space-y-4">
          {filteredSchools.map((school, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(school.rating)}`}
                    >
                      {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">
                        {getRatingStars(school.rating)}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">({school.rating}/10)</span>
                    </div>
                    <span className="text-sm text-gray-600">📍 {school.distance} miles away</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{school.address}</p>

                  {school.programs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {school.programs.map((program, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                  <a
                    href={`tel:${school.phone}`}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors text-center"
                  >
                    📞 Call
                  </a>
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors text-center"
                  >
                    🌐 Website
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> School ratings and information are provided for
            informational purposes only. Please verify current information directly with the school
            district. School boundaries and ratings may change.
          </p>
        </div>
      </div>
    </div>
  );
}
