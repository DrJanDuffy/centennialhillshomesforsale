import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

interface NeighborhoodData {
  name: string;
  zipCode: string;
  medianPrice: number;
  avgSqFt: number;
  yearBuilt: string;
  population: number;
  schoolRating: number;
  walkability: number;
  amenities: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  image: string;
}

const neighborhoods: NeighborhoodData[] = [
  {
    name: "Centennial Hills",
    zipCode: "89149",
    medianPrice: 650000,
    avgSqFt: 2800,
    yearBuilt: "2005-2020",
    population: 45000,
    schoolRating: 8.5,
    walkability: 7.2,
    amenities: ["TPC Las Vegas Golf", "Shopping Centers", "Parks", "Schools"],
    pros: ["Championship golf courses", "Top-rated schools", "Master-planned community", "Mountain views"],
    cons: ["Higher price point", "Traffic during peak hours", "Limited public transit"],
    bestFor: ["Families", "Golf enthusiasts", "Luxury home buyers", "Active lifestyles"],
    image: "/assets/icons/house.svg"
  },
  {
    name: "Tournament Hills",
    zipCode: "89149",
    medianPrice: 725000,
    avgSqFt: 2600,
    yearBuilt: "2008-2018",
    population: 8500,
    schoolRating: 9.0,
    walkability: 6.8,
    amenities: ["Bear's Best Golf", "Country Club", "Tennis Courts", "Swimming Pools"],
    pros: ["Golf course living", "Exclusive community", "High-end amenities", "Quiet atmosphere"],
    cons: ["Limited shopping nearby", "HOA fees", "Smaller community"],
    bestFor: ["Golf lovers", "Upscale buyers", "Retirees", "Peaceful living"],
    image: "/assets/icons/golf-course.svg"
  },
  {
    name: "The Trails",
    zipCode: "89149",
    medianPrice: 675000,
    avgSqFt: 2400,
    yearBuilt: "2010-2020",
    population: 12000,
    schoolRating: 8.8,
    walkability: 8.5,
    amenities: ["Walking Trails", "Community Parks", "Playgrounds", "Sports Fields"],
    pros: ["Excellent walkability", "Family-friendly", "Scenic trails", "Community events"],
    cons: ["Newer development", "Limited golf access", "Higher density"],
    bestFor: ["Young families", "Active outdoors people", "First-time buyers", "Pet owners"],
    image: "/assets/icons/trail.svg"
  },
  {
    name: "Providence",
    zipCode: "89149",
    medianPrice: 580000,
    avgSqFt: 2200,
    yearBuilt: "2012-2022",
    population: 15000,
    schoolRating: 8.2,
    walkability: 7.5,
    amenities: ["Community Pool", "Fitness Center", "Parks", "Shopping Nearby"],
    pros: ["Affordable entry point", "Modern homes", "Good amenities", "Growing community"],
    cons: ["New construction feel", "Limited mature landscaping", "Higher HOA fees"],
    bestFor: ["First-time buyers", "Growing families", "Modern home seekers", "Value buyers"],
    image: "/assets/icons/modern-house.svg"
  },
  {
    name: "Skye Canyon",
    zipCode: "89166",
    medianPrice: 550000,
    avgSqFt: 2100,
    yearBuilt: "2015-2023",
    population: 18000,
    schoolRating: 8.0,
    walkability: 7.0,
    amenities: ["Community Center", "Outdoor Recreation", "Parks", "Sports Facilities"],
    pros: ["New construction", "Energy efficient", "Community focus", "Modern designs"],
    cons: ["Very new development", "Limited history", "Higher insurance costs"],
    bestFor: ["New construction buyers", "Energy-conscious buyers", "Young professionals", "Modern lifestyles"],
    image: "/assets/icons/new-home.svg"
  }
];

export default function NeighborhoodComparison() {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<string>("medianPrice");

  const toggleNeighborhood = (name: string) => {
    setSelectedNeighborhoods(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const sortedNeighborhoods = [...neighborhoods].sort((a, b) => {
    switch (sortBy) {
      case "medianPrice":
        return a.medianPrice - b.medianPrice;
      case "schoolRating":
        return b.schoolRating - a.schoolRating;
      case "walkability":
        return b.walkability - a.walkability;
      case "population":
        return b.population - a.population;
      default:
        return 0;
    }
  });

  const selectedData = neighborhoods.filter(n => selectedNeighborhoods.includes(n.name));

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Neighborhood Comparison | Las Vegas Real Estate Guide</title>
        <meta name="description" content="Compare Centennial Hills neighborhoods side-by-side. Median prices, schools, amenities, and lifestyle factors for Tournament Hills, The Trails, Providence, and Skye Canyon." />
        <meta name="keywords" content="Centennial Hills neighborhood comparison, Las Vegas real estate comparison, Tournament Hills vs The Trails, Providence vs Skye Canyon" />

        {/* Comparison Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Centennial Hills Neighborhood Comparison",
              "description": "Comprehensive comparison of neighborhoods in Centennial Hills, Las Vegas",
              "url": "https://centennialhillshomesforsale.com/neighborhood-comparison",
              "itemListElement": neighborhoods.map((neighborhood, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Place",
                  "name": neighborhood.name,
                  "description": `Neighborhood in Centennial Hills with median price $${neighborhood.medianPrice.toLocaleString()}`,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "postalCode": neighborhood.zipCode,
                    "addressCountry": "US"
                  }
                }
              }))
            })
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Neighborhood Comparison
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Compare Centennial Hills neighborhoods to find the perfect community for your lifestyle
            </p>
          </div>
        </section>

        {/* Selection and Sort Controls */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Select Neighborhoods to Compare</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {neighborhoods.map((neighborhood) => (
                      <button
                        key={neighborhood.name}
                        onClick={() => toggleNeighborhood(neighborhood.name)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedNeighborhoods.includes(neighborhood.name)
                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                            : 'border-gray-300 bg-white hover:border-purple-300'
                        }`}
                      >
                        <div className="text-sm font-medium">{neighborhood.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          ${neighborhood.medianPrice.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:w-64">
                  <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="medianPrice">Median Price</option>
                    <option value="schoolRating">School Rating</option>
                    <option value="walkability">Walkability</option>
                    <option value="population">Population</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        {selectedData.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Side-by-Side Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      {selectedData.map((neighborhood) => (
                        <th key={neighborhood.name} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          {neighborhood.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Median Price</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          ${neighborhood.medianPrice.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Average Sq Ft</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          {neighborhood.avgSqFt.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">School Rating</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          {neighborhood.schoolRating}/10
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Walkability</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          {neighborhood.walkability}/10
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Population</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          {neighborhood.population.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Year Built</td>
                      {selectedData.map((neighborhood) => (
                        <td key={neighborhood.name} className="px-6 py-4 text-sm text-gray-700">
                          {neighborhood.yearBuilt}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Comparison Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Detailed Neighborhood Profiles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedNeighborhoods.map((neighborhood) => (
                <div key={neighborhood.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{neighborhood.name}</h3>
                      <span className="text-sm text-gray-500">{neighborhood.zipCode}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median Price:</span>
                        <span className="font-semibold">${neighborhood.medianPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Sq Ft:</span>
                        <span className="font-semibold">{neighborhood.avgSqFt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">School Rating:</span>
                        <span className="font-semibold">{neighborhood.schoolRating}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Walkability:</span>
                        <span className="font-semibold">{neighborhood.walkability}/10</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Key Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {neighborhood.amenities.map((amenity, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-green-700">Best For</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {neighborhood.bestFor.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      View Properties
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Help Choosing the Right Neighborhood?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let Dr. Jan Duffy guide you through the Centennial Hills communities to find your perfect home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule a Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors">
                Download Comparison Guide
              </button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}