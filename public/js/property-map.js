// Google Maps Property Listings

// Wait for the Google script to load
function initMap() {
  const center = { lat: 36.268, lng: -115.328 }; // Centennial Hills centre

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  });

  // ---- SAMPLE PROPERTY DATA -------------------------------------------------
  const properties = [
    {
      id: 1,
      title: '11773 Golden Moments Ave',
      price: '$850,000',
      lat: 36.274,
      lng: -115.32,
      url: '/featured-home',
      type: 'Single Family',
      beds: 4,
      baths: 3,
      sqft: 2800,
    },
    {
      id: 2,
      title: '5678 Centennial Hills Blvd',
      price: '$1,200,000',
      lat: 36.25,
      lng: -115.34,
      url: '/listing/5678-centennial-hills-blvd',
      type: 'Luxury Home',
      beds: 5,
      baths: 4,
      sqft: 4200,
    },
    {
      id: 3,
      title: '1234 Providence Way',
      price: '$750,000',
      lat: 36.285,
      lng: -115.271,
      url: '/listing/1234-providence-way',
      type: 'Family Home',
      beds: 3,
      baths: 2.5,
      sqft: 2200,
    },
    {
      id: 4,
      title: '7890 Skye Canyon Dr',
      price: '$950,000',
      lat: 36.287,
      lng: -115.275,
      url: '/listing/7890-skye-canyon-dr',
      type: 'Modern Home',
      beds: 4,
      baths: 3.5,
      sqft: 3100,
    },
  ];

  // ---- MARKERS -------------------------------------------------------------
  properties.forEach((p) => {
    // Create custom marker icon
    const markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#2563eb',
      fillOpacity: 0.9,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
    };

    const marker = new google.maps.Marker({
      position: { lat: p.lat, lng: p.lng },
      map,
      title: `${p.title} – ${p.price}`,
      icon: markerIcon,
      animation: google.maps.Animation.DROP,
    });

    // Create info window content
    const infoContent = `
      <div class="property-info-window p-4 max-w-xs">
        <h3 class="font-bold text-lg text-gray-900 mb-2">${p.title}</h3>
        <p class="text-2xl font-bold text-blue-600 mb-2">${p.price}</p>
        <div class="text-sm text-gray-600 mb-3">
          <span class="mr-3">${p.beds} beds</span>
          <span class="mr-3">${p.baths} baths</span>
          <span>${p.sqft.toLocaleString()} sqft</span>
        </div>
        <p class="text-sm text-gray-500 mb-3">${p.type}</p>
        <button 
          onclick="window.location.href='${p.url}'"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoContent,
      maxWidth: 300,
    });

    // Show info window on marker click
    marker.addListener('click', () => {
      // Close any open info windows
      google.maps.event.clearInstanceListeners(map, 'click');
      map.addListener('click', () => {
        infoWindow.close();
      });

      infoWindow.open(map, marker);

      // Record interest for recommendations
      if (window.propertyBehaviour) {
        window.propertyBehaviour.add(`location:${p.id}`);
      }
    });

    // Add hover effect
    marker.addListener('mouseover', () => {
      marker.setIcon({
        ...markerIcon,
        scale: 12,
        fillOpacity: 1,
      });
    });

    marker.addListener('mouseout', () => {
      marker.setIcon(markerIcon);
    });
  });

  // Add search box functionality
  const input = document.getElementById('property-search');
  if (input) {
    const searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        bounds.extend(place.geometry.location);
      });

      map.fitBounds(bounds);
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        map.setZoom(15);
      }
    });
  }
}

// Google loads the script async, so we expose initMap globally
window.initMap = initMap;

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if Google Maps is loaded
  if (typeof google !== 'undefined' && google.maps) {
    initMap();
  } else {
    // Wait for Google Maps to load
    const checkGoogleMaps = setInterval(() => {
      if (typeof google !== 'undefined' && google.maps) {
        clearInterval(checkGoogleMaps);
        initMap();
      }
    }, 100);
  }
});
