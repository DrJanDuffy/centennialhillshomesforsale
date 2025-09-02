import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';

// Define interfaces for component props
interface RealScoutListingsProps {
  agentId?: string;
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  maxResults?: number;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  sqftMin?: number;
  yearBuiltMin?: number;
  className?: string;
}

// Define interfaces for listing data
interface PropertyListing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType: string;
  status: string;
  listingDate: string;
  images: string[];
  description: string;
  features: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
}

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
    />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const RealScoutListings: React.FC<RealScoutListingsProps> = ({
  agentId = 'QWdlbnQtMjI1MDUw',
  agentEncodedId,
  sortOrder = 'STATUS_AND_SIGNIFICANT_CHANGE',
  listingStatus = 'For Sale',
  propertyTypes = 'SFR,MF,TC',
  maxResults = 20,
  priceMin = 0,
  className = '',
}) => {
  const finalAgentId = agentEncodedId || agentId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showMockData, setShowMockData] = useState<boolean>(false);

  // Mock data for fallback
  const mockListings: PropertyListing[] = [
    {
      id: '1',
      address: '123 Desert Vista Drive',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89149',
      price: 750000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      lotSize: 8000,
      yearBuilt: 2020,
      propertyType: 'Single Family',
      status: 'For Sale',
      listingDate: '2024-05-15',
      images: [
        '/api/placeholder/400/300?text=Front+View',
        '/api/placeholder/400/300?text=Living+Room',
        '/api/placeholder/400/300?text=Kitchen',
      ],
      description:
        'Stunning modern home in prestigious Centennial Hills with mountain views and premium finishes throughout.',
      features: ['Gourmet Kitchen', 'Master Suite', '3-Car Garage', 'Pool', 'Mountain Views'],
      coordinates: { latitude: 36.2845, longitude: -115.1969 },
      agent: {
        name: 'Jan Duff',
        phone: '(702) 903-1952',
        email: 'jan@centennialhillshomes.com',
      },
    },
    {
      id: '2',
      address: '456 Canyon Ridge Lane',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89149',
      price: 925000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3500,
      lotSize: 10000,
      yearBuilt: 2019,
      propertyType: 'Single Family',
      status: 'For Sale',
      listingDate: '2024-05-10',
      images: [
        '/api/placeholder/400/300?text=Luxury+Home',
        '/api/placeholder/400/300?text=Backyard',
        '/api/placeholder/400/300?text=Master+Bedroom',
      ],
      description:
        'Luxury estate home with resort-style backyard featuring pool, spa, and outdoor kitchen.',
      features: ['Resort Backyard', 'Wine Cellar', 'Home Theater', 'Guest Suite', '4-Car Garage'],
      coordinates: { latitude: 36.2851, longitude: -115.1975 },
      agent: {
        name: 'Jan Duff',
        phone: '(702) 903-1952',
        email: 'jan@centennialhillshomes.com',
      },
    },
    {
      id: '3',
      address: '789 Fairway Circle',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89149',
      price: 680000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3100,
      lotSize: 7500,
      yearBuilt: 2018,
      propertyType: 'Single Family',
      status: 'For Sale',
      listingDate: '2024-05-20',
      images: [
        '/api/placeholder/400/300?text=Golf+Course+View',
        '/api/placeholder/400/300?text=Open+Floor+Plan',
        '/api/placeholder/400/300?text=Patio',
      ],
      description:
        'Beautiful family home overlooking the golf course with open floor plan and upgraded finishes.',
      features: [
        'Golf Course Views',
        'Open Floor Plan',
        'Upgraded Kitchen',
        'Covered Patio',
        '2-Car Garage',
      ],
      coordinates: { latitude: 36.2839, longitude: -115.1963 },
      agent: {
        name: 'Jan Duff',
        phone: '(702) 903-1952',
        email: 'jan@centennialhillshomes.com',
      },
    },
  ];

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const checkScript = () => {
      if (typeof window !== 'undefined') {
        const script = document.querySelector('script[src*="realscout-web-components"]');
        if (script) {
          if (script.getAttribute('data-loaded') === 'true') {
            setIsLoading(false);
          } else {
            script.addEventListener('load', () => {
              script.setAttribute('data-loaded', 'true');
              setIsLoading(false);
            });
            script.addEventListener('error', () => {
              if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(checkScript, 2000);
              } else {
                setHasError(true);
                setIsLoading(false);
                setShowMockData(true);
              }
            });
          }
        } else {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(checkScript, 1000);
          } else {
            setHasError(true);
            setIsLoading(false);
            setShowMockData(true);
          }
        }
      }
    };

    checkScript();

    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
        setShowMockData(true);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.customElements) {
      window.customElements
        .whenDefined('realscout-office-listings')
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoading(false);
          setShowMockData(true);
        });
    }
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleFavorite = (listingId: string): void => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId);
      } else {
        newFavorites.add(listingId);
      }
      return newFavorites;
    });
  };

  if (isLoading) {
    return (
      <div className="realscout-loading">
        <div className="loading-spinner"></div>
        <p>Loading property listings...</p>
      </div>
    );
  }

  if (hasError && !showMockData) {
    return (
      <div className="realscout-error">
        <h3>Unable to Load Property Listings</h3>
        <p>We&apos;re experiencing technical difficulties loading the property listings widget.</p>
        <div className="fallback-buttons">
          <a href="tel:+17029031952" className="btn btn-primary">
            📞 Call (702) 903-1952
          </a>
          <Link href="/listings" className="btn btn-secondary">
            View All Listings
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-outline"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (showMockData) {
    return (
      <div className={`w-full ${className}`}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Featured Properties in Centennial Hills
          </h2>
          <p className="text-gray-600">{mockListings.length} properties found</p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={listing.images[0]}
                  alt={`${listing.address} - ${listing.city}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                {/* Image Count Badge */}
                {listing.images.length > 1 && (
                  <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                    <CameraIcon className="h-4 w-4 mr-1" />
                    {listing.images.length}
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  aria-label={
                    favorites.has(listing.id) ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <HeartIcon
                    className={`h-5 w-5 ${
                      favorites.has(listing.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Price */}
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatPrice(listing.price)}
                </div>

                {/* Address */}
                <div className="flex items-start text-gray-600 mb-3">
                  <MapPinIcon className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    {listing.address}, {listing.city}, {listing.state} {listing.zipCode}
                  </span>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-3 gap-3 mb-3 text-center text-sm">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-semibold text-gray-900">{listing.bedrooms}</div>
                    <div className="text-gray-600">Beds</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-semibold text-gray-900">{listing.bathrooms}</div>
                    <div className="text-gray-600">Baths</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="font-semibold text-gray-900">
                      {listing.sqft.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Sq Ft</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {listing.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {listing.features.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{listing.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button
                    type="button"
                    className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    aria-label="Share property"
                  >
                    <ShareIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Agent Contact */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Contact: <strong>{listing.agent?.name}</strong>
                  </div>
                  <a
                    href={`tel:${listing.agent?.phone}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {listing.agent?.phone}
                  </a>
                </div>

                {/* Listing Date */}
                <div className="text-xs text-gray-500 mt-2">
                  Listed {formatDate(listing.listingDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`realscout-widget-container ${className}`}>
      <realscout-office-listings
        agent-encoded-id={finalAgentId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
        price-min={priceMin?.toString()}
        max-results={maxResults?.toString()}
        className="realscout-widget"
        onLoad={() => {
          setTimeout(() => {
            const widget = document.querySelector('realscout-office-listings');
            if (widget) {
              const interactiveElements = widget.querySelectorAll(
                'a, button, [role="button"], .listing-card, .property-card'
              );
              interactiveElements.forEach((el) => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.pointerEvents = 'auto';
                htmlEl.style.cursor = 'pointer';
                htmlEl.style.userSelect = 'auto';
                htmlEl.style.touchAction = 'manipulation';
              });
            }
          }, 1000);
        }}
      />
    </div>
  );
};

export default RealScoutListings;
