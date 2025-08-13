import { MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Google Maps types declaration
declare global {
  interface Window {
    google: any;
  }
}

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

  const getMarkerColor = useCallback((type: string): string => {
    switch (type) {
      case 'neighborhood': return '#3B82F6';
      case 'school': return '#10B981';
      case 'shopping': return '#8B5CF6';
      case 'park': return '#059669';
      case 'golf': return '#F59E0B';
      default: return '#6B7280';
    }
  }, []);

  // Initialize Google Maps
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Wait for Google Maps to be available globally
    const loadGoogleMaps = () => {
      try {
        // Check if Google Maps is available globally
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
          const { Map: GoogleMap, Marker } = window.google.maps;

          // Create map
          const newMap = new GoogleMap(mapContainer.current!, {
            center: { lat: 36.2897, lng: -115.2739 }, // Centennial Hills coordinates
            zoom: 13,
            mapTypeId: 'roadmap',
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Create markers for all locations
          const newMarkers: any[] = [];
          locations.forEach(location => {
            const marker = new Marker({
              position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
              map: newMap,
              title: location.name,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: getMarkerColor(location.type),
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }
            });

            // Add click listener
            marker.addListener('click', () => {
              setSelectedLocation(location);
            });

            newMarkers.push(marker);
          });

          markers.current = newMarkers;
          map.current = newMap;
          setMapLoaded(true);

        } else {
          // If Google Maps isn't loaded yet, wait a bit and try again
          setTimeout(loadGoogleMaps, 100);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMaps();

    // Cleanup
    return () => {
      if (map.current) {
        // Clean up markers
        markers.current.forEach(marker => {
          window.google.maps.event.clearInstanceListeners(marker);
        });
        markers.current = [];
      }
    };
  }, [locations, getMarkerColor]);

  // Update markers when filter changes
  useEffect(() => {
    if (map.current && mapLoaded) {
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore the
            <span className="block text-blue-600">Centennial Hills Area</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover neighborhoods, schools, shopping, and amenities in the Centennial Hills community
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Real Google Maps */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <div 
                ref={mapContainer} 
                className="w-full h-full"
                style={{ minHeight: '384px' }}
              />
              
              {/* Loading overlay */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading interactive map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocation ? (
              /* Selected Location Details */
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(selectedLocation.type)}`}>
                      {getTypeIcon(selectedLocation.type)} {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  {selectedLocation.rating && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-gray-900">⭐ {selectedLocation.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedLocation.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedLocation.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                                              onClick={() => {
                          if (map.current) {
                            const latLng = new (window as any).google.maps.LatLng(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng);
                            map.current.panTo(latLng);
                            map.current.setZoom(16);
                          }
                        }}
                    >
                      Focus on Map
                    </button>
                    <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
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
                    className="w-full text-left bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                        {getTypeIcon(location.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.description}</p>
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
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Explore Centennial Hills?
            </h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Let Dr. Jan Duffy show you around the area and help you find your perfect home in this amazing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Schedule a Tour
              </button>
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
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
