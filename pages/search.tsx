import { Bath, Bed, Home, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  neighborhood: string;
  image: string;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q);
      performSearch();
    }
  }, [q, performSearch]);

  const performSearch = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock search results
      const mockResults: Property[] = [
        {
          id: 1,
          address: '123 Centennial Hills Dr',
          price: 750000,
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          neighborhood: 'Centennial Hills',
          image:
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        },
        // Add more mock results as needed
      ];

      setSearchResults(mockResults);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Layout
      title={`Search Results for "${searchQuery}" | Centennial Hills Homes For Sale`}
      description={`Search results for "${searchQuery}" in Centennial Hills, Providence, and Skye Canyon. Find your dream home with Dr. Jan Duffy.`}
      canonical={`https://centennialhillshomesforsale.com/search/?q=${encodeURIComponent(searchQuery)}`}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by address, neighborhood, or keywords..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Search Results */}
        <section className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : searchQuery ? (
            <div>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {searchResults.length} results for &ldquo;{searchQuery}&rdquo;
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={property.image}
                        alt={property.address}
                        width={800}
                        height={600}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {property.address}
                        </h3>
                        <p className="text-gray-600 mb-4">{property.neighborhood}</p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-blue-600">
                            ${property.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.bedrooms} beds</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.bathrooms} baths</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            <span>{property.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>

                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse our featured properties.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse All Properties
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
              <p className="text-gray-600">
                Enter a search term above to find properties in Centennial Hills.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default SearchPage;
