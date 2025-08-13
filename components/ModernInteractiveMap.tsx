import { MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Google Maps types declaration
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// Google Maps types - using any for now to avoid import issues

interface Location {
  id: string;
  name: string;
  type: 'neighborhood' | 'school' | 'shopping' | 'park' | 'golf';
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  rating?: number;
  distance: string;
}

const ModernInteractiveMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);

  const locations = useMemo((): Location[] => [
    {
      id: 'centennial-hills',
      name: 'Centennial Hills',
      type: 'neighborhood',
      coordinates: { lat: 36.2897, lng: -115.2739 },
      description: 'Master-planned community with luxury homes and mountain views',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&q=75',
      rating: 4.9,
      distance: '0.5 miles'
    },
    {
      id: 'providence',
      name: 'Providence',
      type: 'neighborhood',
      coordinates: { lat: 36.2856, lng: -115.2712 },
      description: 'Family-friendly neighborhood with excellent schools',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&q=75',
      rating: 4.8,
      distance: '1.2 miles'
    },
    {
      id: 'skye-canyon',
      name: 'Skye Canyon',
      type: 'neighborhood',
      coordinates: { lat: 36.2878, lng: -115.2756 },
      description: 'Outdoor lifestyle community with hiking trails',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop&q=75',
      rating: 4.7,
      distance: '0.8 miles'
    },
    {
      id: 'centennial-hills-elementary',
      name: 'Centennial Hills Elementary',
      type: 'school',
      coordinates: { lat: 36.2901, lng: -115.2742 },
      description: 'Top-rated elementary school in the Centennial Hills area',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&q=75',
      rating: 4.6,
      distance: '0.3 miles'
    },
    {
      id: 'centennial-center',
      name: 'Centennial Center',
      type: 'shopping',
      coordinates: { lat: 36.2889, lng: -115.2728 },
      description: 'Shopping center with restaurants, retail, and services',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=75',
      distance: '0.7 miles'
    },
    {
      id: 'centennial-hills-park',
      name: 'Centennial Hills Park',
      type: 'park',
      coordinates: { lat: 36.2867, lng: -115.2745 },
      description: 'Beautiful park with walking trails and playgrounds',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&q=75',
      distance: '0.9 miles'
    }
  ], []);

  const filters = useMemo(() => [
    { id: 'all', label: 'All', count: locations.length },
    { id: 'neighborhood', label: 'Neighborhoods', count: locations.filter(l => l.type === 'neighborhood').length },
    { id: 'school', label: 'Schools', count: locations.filter(l => l.type === 'school').length },
    { id: 'shopping', label: 'Shopping', count: locations.filter(l => l.type === 'shopping').length },
    { id: 'park', label: 'Parks', count: locations.filter(l => l.type === 'park').length }
  ], [locations]);

  const filteredLocations = useMemo(() => {
    if (activeFilter === 'all') return locations;
    return locations.filter(location => location.type === activeFilter);
  }, [locations, activeFilter]);

  const getMarkerColor = useCallback((type: string) => {
    switch (type) {
      case 'neighborhood': return '#3B82F6'; // blue-500
      case 'school': return '#10B981'; // emerald-500
      case 'shopping': return '#8B5CF6'; // violet-500
      case 'park': return '#059669'; // emerald-600
      case 'golf': return '#F59E0B'; // amber-500
      default: return '#6B7280'; // gray-500
    }
  }, []);

  const loadGoogleMaps = useCallback(async () => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      try {
        const { Map: GoogleMap, Marker, LatLngBounds } = window.google.maps;
        
        if (mapContainer.current) {
          const newMap = new GoogleMap(mapContainer.current, {
            center: { lat: 36.2897, lng: -115.2739 },
            zoom: 13,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          map.current = newMap;
          
          // Create bounds for all locations
          const bounds = new LatLngBounds();
          
                  // Create markers for all locations
        const newMarkers: any[] = [];
          
          locations.forEach((location) => {
            const marker = new Marker({
              position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
              map: newMap,
              title: location.name,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: getMarkerColor(location.type),
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }
            });

            // Add click listener
            marker.addListener('click', () => {
              setSelectedLocation(location);
            });

            newMarkers.push(marker);
            bounds.extend({ lat: location.coordinates.lat, lng: location.coordinates.lng });
          });

          markers.current = newMarkers;
          
          // Fit map to show all markers
          newMap.fitBounds(bounds);
          
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    }
  }, [locations, getMarkerColor]);

  useEffect(() => {
    loadGoogleMaps();
  }, [loadGoogleMaps]);

  useEffect(() => {
    if (mapLoaded && map.current) {
      // Update marker visibility based on filter
      markers.current.forEach((marker, index) => {
        const location = locations[index];
        if (activeFilter === 'all' || location.type === activeFilter) {
          marker.setMap(map.current);
        } else {
          marker.setMap(null);
        }
      });
    }
  }, [activeFilter, mapLoaded, locations]);

  const handleLocationClick = useCallback((location: Location) => {
    setSelectedLocation(location);
    
    // Pan to location on map
    if (map.current) {
      const latLng = new window.google.maps.LatLng(location.coordinates.lat, location.coordinates.lng);
      map.current.panTo(latLng);
      map.current.setZoom(15);
    }
  }, []);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    setSelectedLocation(null);
  }, []);

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'neighborhood': return '🏠';
      case 'school': return '🎓';
      case 'shopping': return '🛍️';
      case 'park': return '🌳';
      case 'golf': return '⛳';
      default: return '📍';
    }
  }, []);

  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'neighborhood': return 'bg-blue-100 text-blue-800';
      case 'school': return 'bg-green-100 text-green-800';
      case 'shopping': return 'bg-purple-100 text-purple-800';
      case 'park': return 'bg-emerald-100 text-emerald-800';
      case 'golf': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  return (
    <section className="section bg-gradient-soft">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
            Explore the
            <span className="block text-secondary-color mt-2">Centennial Hills Area</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover neighborhoods, schools, shopping, and amenities in the Centennial Hills community
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 lg:mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-200 text-sm lg:text-base ${
                activeFilter === filter.id
                  ? 'bg-secondary-color text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Real Google Maps */}
          <div className="card bg-white p-6 lg:p-8">
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              <div 
                ref={mapContainer} 
                className="w-full h-full"
                style={{ minHeight: '320px' }}
              />
              
              {/* Loading overlay */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-b-2 border-secondary-color mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm lg:text-base">Loading interactive map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocation ? (
              /* Selected Location Details */
              <div className="card bg-white overflow-hidden">
                <div className="relative h-48 lg:h-56">
                  <Image
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs lg:text-sm font-semibold ${getTypeColor(selectedLocation.type)}`}>
                      {getTypeIcon(selectedLocation.type)} {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  {selectedLocation.rating && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs lg:text-sm font-semibold text-gray-900">⭐ {selectedLocation.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-3">{selectedLocation.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedLocation.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      {selectedLocation.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      className="flex-1 bg-secondary-color hover:bg-secondary-dark text-white py-2 lg:py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-sm lg:text-base"
                      onClick={() => {
                        if (map.current) {
                          const latLng = new window.google.maps.LatLng(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng);
                          map.current.panTo(latLng);
                          map.current.setZoom(16);
                        }
                      }}
                    >
                      Focus on Map
                    </button>
                    <button type="button" className="px-4 lg:px-6 py-2 lg:py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm lg:text-base">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Location List */
              <div className="space-y-4">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left card bg-white p-4 lg:p-6 cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gray-100 flex items-center justify-center text-lg lg:text-xl">
                        {getTypeIcon(location.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary-color text-sm lg:text-base">{location.name}</h4>
                        <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">{location.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{location.distance}</span>
                          {location.rating && <span>⭐ {location.rating}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(location.type)}`}>
                          {location.type}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-secondary-color to-secondary-dark rounded-2xl p-8 lg:p-10 text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Explore Centennial Hills?
            </h3>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let Dr. Jan Duffy show you around the area and help you find your perfect home in this amazing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <button type="button" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
                Schedule a Tour
              </button>
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
                Contact Dr. Jan Duffy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernInteractiveMap;
