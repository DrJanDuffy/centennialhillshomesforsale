import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

interface LocalBusiness {
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  website?: string;
  rating: number;
  reviewCount: number;
  image: string;
}

const localBusinesses: LocalBusiness[] = [
  {
    name: "Centennial Hills Golf Club",
    category: "Golf Course",
    description: "Championship golf course featuring TPC Las Vegas layout with pro shop, dining, and golf instruction.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-1000",
    website: "https://www.centennialhillsgolf.com",
    rating: 4.5,
    reviewCount: 234,
    image: "/assets/icons/golf-course.svg"
  },
  {
    name: "Centennial Hills Shopping Center",
    category: "Shopping",
    description: "Full-service shopping center with grocery stores, restaurants, pharmacies, and retail shops.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-2000",
    rating: 4.2,
    reviewCount: 456,
    image: "/assets/icons/shopping.svg"
  },
  {
    name: "Centennial Hills Medical Center",
    category: "Healthcare",
    description: "Comprehensive medical facility offering primary care, urgent care, and specialty services.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-3000",
    rating: 4.3,
    reviewCount: 189,
    image: "/assets/icons/medical.svg"
  },
  {
    name: "Centennial Hills Elementary School",
    category: "Education",
    description: "Award-winning public elementary school serving grades K-5 with excellent academic programs.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-4000",
    rating: 4.6,
    reviewCount: 78,
    image: "/assets/icons/school.svg"
  },
  {
    name: "Centennial Hills Fitness Center",
    category: "Fitness",
    description: "State-of-the-art fitness facility with gym equipment, classes, and personal training services.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-5000",
    rating: 4.4,
    reviewCount: 312,
    image: "/assets/icons/fitness.svg"
  },
  {
    name: "Centennial Hills Real Estate",
    category: "Real Estate",
    description: "Professional real estate services specializing in Centennial Hills property sales and rentals.",
    address: "6608 Centennial Hills Dr, Las Vegas, NV 89149",
    phone: "(702) 341-6000",
    rating: 4.8,
    reviewCount: 67,
    image: "/assets/icons/real-estate.svg"
  }
];

const categories = [
  "All Categories",
  "Golf Course",
  "Shopping",
  "Healthcare",
  "Education",
  "Fitness",
  "Real Estate",
  "Dining",
  "Services"
];

export default function LocalBusinessDirectory() {
  const [selectedCategory, setSelectedCategory] = React.useState("All Categories");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBusinesses = localBusinesses.filter(business => {
    const matchesCategory = selectedCategory === "All Categories" || business.category === selectedCategory;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Local Business Directory | Las Vegas Services & Amenities</title>
        <meta name="description" content="Complete directory of local businesses in Centennial Hills, Las Vegas. Find restaurants, healthcare, shopping, schools, and services near your home." />
        <meta name="keywords" content="Centennial Hills businesses, Las Vegas local directory, restaurants, healthcare, shopping, schools, services" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Centennial Hills Local Business Directory",
              "description": "Comprehensive directory of businesses and services in Centennial Hills, Las Vegas",
              "url": "https://centennialhillshomesforsale.com/local-business-directory",
              "itemListElement": localBusinesses.map((business, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "LocalBusiness",
                  "name": business.name,
                  "description": business.description,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": business.address.split(',')[0],
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "postalCode": "89149",
                    "addressCountry": "US"
                  },
                  "telephone": business.phone,
                  "url": business.website,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": business.rating,
                    "reviewCount": business.reviewCount
                  }
                }
              }))
            })
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Centennial Hills Business Directory
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover local businesses, services, and amenities in your Centennial Hills community
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:w-64">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Listings */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Local Businesses & Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Supporting local businesses that make Centennial Hills a great place to live
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.map((business, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{business.name}</h3>
                        <span className="text-sm text-blue-600 font-medium">{business.category}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {business.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {business.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        {business.phone}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {business.rating} ({business.reviewCount} reviews)
                        </span>
                      </div>
                      {business.website && (
                        <Link
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Visit Website →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No businesses found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Own a Business in Centennial Hills?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get listed in our local business directory and connect with the growing Centennial Hills community
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Business
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}