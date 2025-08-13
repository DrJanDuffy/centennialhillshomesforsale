import React, { useEffect, useRef } from 'react';

// Google Maps types declaration
declare global {
  interface Window {
    google: any;
  }
}

interface Property {
  id: number;
  title: string;
  price: string;
  lat: number;
  lng: number;
  url: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface PropertyMapProps {
  properties?: Property[];
  height?: string;
  showSearch?: boolean;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties = [], 
  height = "h-96",
  showSearch = true 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);

  // Default properties if none provided
  const defaultProperties: Property[] = [
    {
      id: 1,
      title: "11773 Golden Moments Ave",
      price: "$850,000",
      lat: 36.274,
      lng: -115.320,
      url: "/featured-home",
      type: "Single Family",
      beds: 4,
      baths: 3,
      sqft: 2800
    },
    {
      id: 2,
      title: "5678 Centennial Hills Blvd",
      price: "$1,200,000",
      lat: 36.250,
      lng: -115.340,
      url: "/listing/5678-centennial-hills-blvd",
      type: "Luxury Home",
      beds: 5,
      baths: 4,
      sqft: 4200
    },
    {
      id: 3,
      title: "1234 Providence Way",
      price: "$750,000",
      lat: 36.285,
      lng: -115.271,
      url: "/listing/1234-providence-way",
      type: "Family Home",
      beds: 3,
      baths: 2.5,
      sqft: 2200
    },
    {
      id: 4,
      title: "7890 Skye Canyon Dr",
      price: "$950,000",
      lat: 36.287,
      lng: -115.275,
      url: "/listing/7890-skye-canyon-dr",
      type: "Modern Home",
      beds: 4,
      baths: 3.5,
      sqft: 3100
    }
  ];

  const propertiesToShow = properties.length > 0 ? properties : defaultProperties;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initMap = () => {
      try {
                         if (typeof window !== 'undefined' && window.google && window.google.maps) {
          const { Map: GoogleMap, Marker, InfoWindow, SearchBox } = window.google.maps;

          const center = { lat: 36.268, lng: -115.328 }; // Centennial Hills centre

                     const newMap = new GoogleMap(mapContainer.current!, {
            zoom: 11,
            center,
            mapTypeId: 'roadmap',
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Create markers for all properties
          const newMarkers: any[] = [];
          propertiesToShow.forEach(property => {
            const markerIcon = {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#2563eb',
              fillOpacity: 0.9,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            };

            const marker = new Marker({
              position: { lat: property.lat, lng: property.lng },
              map: newMap,
              title: `${property.title} – ${property.price}`,
              icon: markerIcon,
              animation: (window as any).google.maps.Animation.DROP,
            });

            // Create info window content
            const infoContent = `
              <div class="property-info-window p-4 max-w-xs">
                <h3 class="font-bold text-lg text-gray-900 mb-2">${property.title}</h3>
                <p class="text-2xl font-bold text-blue-600 mb-2">${property.price}</p>
                <div class="text-sm text-gray-600 mb-3">
                  <span class="mr-3">${property.beds} beds</span>
                  <span class="mr-3">${property.baths} baths</span>
                  <span>${property.sqft.toLocaleString()} sqft</span>
                </div>
                <p class="text-sm text-gray-500 mb-3">${property.type}</p>
                <button 
                  onclick="window.location.href='${property.url}'"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            `;

            const infoWindow = new InfoWindow({
              content: infoContent,
              maxWidth: 300
            });

            // Show info window on marker click
            marker.addListener('click', () => {
              // Close any open info windows
              (window as any).google.maps.event.clearInstanceListeners(newMap, 'click');
              newMap.addListener('click', () => {
                infoWindow.close();
              });
              
              infoWindow.open(newMap, marker);
              
              // Record interest for recommendations
              if ((window as any).propertyBehaviour) {
                (window as any).propertyBehaviour.add(`location:${property.id}`);
              }
            });

            // Add hover effect
            marker.addListener('mouseover', () => {
              marker.setIcon({
                ...markerIcon,
                scale: 12,
                fillOpacity: 1
              });
            });

            marker.addListener('mouseout', () => {
              marker.setIcon(markerIcon);
            });

            newMarkers.push(marker);
          });

          markers.current = newMarkers;
          map.current = newMap;

          // Add search box functionality if enabled
          if (showSearch) {
            const searchInput = document.getElementById('property-search');
            if (searchInput) {
              const searchBox = new SearchBox(searchInput);
              
              searchBox.addListener('places_changed', () => {
                const places = searchBox.getPlaces();
                if (places.length === 0) return;

                const bounds = new window.google.maps.LatLngBounds();
                places.forEach((place: any) => {
                  if (!place.geometry || !place.geometry.location) return;
                  
                  bounds.extend(place.geometry.location);
                });
                
                newMap.fitBounds(bounds);
                if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                  newMap.setZoom(15);
                }
              });
            }
          }

        } else {
          // If Google Maps isn't loaded yet, wait a bit and try again
          setTimeout(initMap, 100);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

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
  }, [propertiesToShow, showSearch]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {showSearch && (
        <div className="mb-4">
          <input
            id="property-search"
            type="text"
            placeholder="Search for properties, neighborhoods, or addresses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
      
      <div className={`relative ${height} rounded-xl overflow-hidden`}>
        <div 
          ref={mapContainer} 
          className="w-full h-full"
          style={{ minHeight: '384px' }}
        />
        
        {/* Loading overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property map...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
