import mapboxgl from 'mapbox-gl';
import { Property } from '../store/propertyStore';

// Initialize Mapbox with access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapConfig {
  containerId: string;
  center?: [number, number];
  zoom?: number;
  style?: string;
}

interface PropertyMarker {
  property: Property;
  coordinates: [number, number];
}

export const initPropertyMap = ({
  containerId,
  center = [-115.2551, 36.2473], // Centennial Hills coordinates
  zoom = 13,
  style = 'mapbox://styles/mapbox/streets-v12',
}: MapConfig): mapboxgl.Map => {
  const map = new mapboxgl.Map({
    container: containerId,
    style,
    center,
    zoom,
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  return map;
};

export const addPropertyMarkers = (
  map: mapboxgl.Map,
  properties: PropertyMarker[],
  onMarkerClick?: (property: Property) => void
): void => {
  properties.forEach(({ property, coordinates }) => {
    // Create marker element
    const el = document.createElement('div');
    el.className = 'property-marker';
    el.style.cssText = `
      width: 30px;
      height: 30px;
      background-color: #3A8DDE;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    `;

    // Add hover effect
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.1)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });

    // Create popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      className: 'property-popup',
    }).setHTML(`
      <div style="padding: 12px;">
        <img src="${property.imageUrl}" alt="${property.title}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${property.title}</h3>
        <p style="font-size: 14px; color: #3A8DDE; font-weight: 600; margin-bottom: 4px;">
          ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(property.price)}
        </p>
        <p style="font-size: 14px; color: #6B7280;">
          ${property.bedrooms} beds • ${property.bathrooms} baths • ${property.squareFeet.toLocaleString()} sq ft
        </p>
      </div>
    `);

    // Create and add marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);

    // Add click handler
    el.addEventListener('click', () => {
      onMarkerClick?.(property);
    });
  });
};

export const addNeighborhoodLayer = async (
  map: mapboxgl.Map,
  neighborhoodId: string
): Promise<void> => {
  try {
    // Wait for map style to load
    await map.once('style.load');

    // Add neighborhood boundary source
    map.addSource('neighborhood', {
      type: 'geojson',
      data: `${process.env.NEXT_PUBLIC_MAPBOX_API_URL}/neighborhoods/${neighborhoodId}`,
    });

    // Add fill layer
    map.addLayer({
      id: 'neighborhood-fill',
      type: 'fill',
      source: 'neighborhood',
      paint: {
        'fill-color': '#3A8DDE',
        'fill-opacity': 0.1,
      },
    });

    // Add outline layer
    map.addLayer({
      id: 'neighborhood-outline',
      type: 'line',
      source: 'neighborhood',
      paint: {
        'line-color': '#3A8DDE',
        'line-width': 2,
      },
    });
  } catch (error) {
    console.error('Error adding neighborhood layer:', error);
  }
};

export const fitMapToMarkers = (
  map: mapboxgl.Map,
  coordinates: [number, number][],
  padding = 50
): void => {
  const bounds = coordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
  );

  map.fitBounds(bounds, {
    padding: {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
    },
    duration: 1000,
  });
};

export const geocodeAddress = async (
  address: string
): Promise<{
  coordinates: [number, number];
  neighborhood: string;
  city: string;
  state: string;
}> => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapboxgl.accessToken}&types=address`
    );

    if (!response.ok) {
      throw new Error('Failed to geocode address');
    }

    const data = await response.json();
    const [lng, lat] = data.features[0].center;

    return {
      coordinates: [lng, lat],
      neighborhood: data.features[0].context.find((c: any) => c.id.startsWith('neighborhood'))?.text || '',
      city: data.features[0].context.find((c: any) => c.id.startsWith('place'))?.text || '',
      state: data.features[0].context.find((c: any) => c.id.startsWith('region'))?.text || '',
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}; 