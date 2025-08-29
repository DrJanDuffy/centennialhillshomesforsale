import Head from 'next/head';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';
import { getPageSchema } from '../lib/business-schema';

export default function About() {
  return (
    <>
      <Head>
        <title>About Dr. Jan Duffy | Top 1% REALTOR® | Centennial Hills Real Estate</title>
        <meta
          name="description"
          content="Meet Dr. Jan Duffy, Top 1% REALTOR® specializing in luxury homes and master-planned communities in Centennial Hills, Las Vegas. Over 20 years of real estate expertise."
        />
        <meta
          name="keywords"
          content="Dr. Jan Duffy, Top 1% REALTOR, luxury real estate Las Vegas, Centennial Hills realtor, Providence neighborhood expert, Skye Canyon specialist"
        />

        {/* Enhanced Business Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPageSchema('about')),
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Dr. Jan Duffy</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Top 1% REALTOR® specializing in luxury homes and master-planned communities
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Your Trusted Real Estate Expert
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Dr. Jan Duffy is a Top 1% REALTOR® with over 20 years of experience in the Las
                    Vegas real estate market. She specializes in luxury homes and master-planned
                    communities, particularly in the Centennial Hills area.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    With a deep understanding of the local market and a commitment to exceptional
                    service, Dr. Duffy has helped hundreds of families find their dream homes in
                    this beautiful northwest Las Vegas community.
                  </p>
                  <p className="text-lg text-gray-600">
                    Her expertise extends beyond just buying and selling homes - she provides
                    comprehensive guidance on market trends, investment opportunities, and the
                    unique benefits of living in Centennial Hills.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">👩‍💼</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Jan Duffy</h3>
                  <p className="text-gray-600">Top 1% REALTOR®</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials & Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Credentials & Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Top 1% REALTOR®</h3>
                <p className="text-gray-600">
                  Consistently ranked in the top 1% of all REALTORS® in the Las Vegas Valley
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Million Dollar Club</h3>
                <p className="text-gray-600">
                  Member of the prestigious Million Dollar Club for exceptional sales performance
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">20+ Years Experience</h3>
                <p className="text-gray-600">
                  Over two decades of real estate expertise in the Las Vegas market
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">98% Satisfaction</h3>
                <p className="text-gray-600">
                  Exceptional client satisfaction rate based on hundreds of successful transactions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Areas of Specialization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Luxury Homes</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>High-End Properties:</strong> Specialized in luxury estates and
                      premium homes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Mountain Views:</strong> Expertise in properties with stunning
                      mountain vistas
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Custom Features:</strong> Knowledge of luxury amenities and custom
                      finishes
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Investment Properties:</strong> Guidance on high-value real estate
                      investments
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Master-Planned Communities
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Providence:</strong> Deep knowledge of this luxury master-planned
                      community
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Skye Canyon:</strong> Expertise in new construction and development
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Community Amenities:</strong> Understanding of lifestyle benefits and
                      facilities
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                    <div>
                      <strong>Future Development:</strong> Insights into upcoming community
                      expansions
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RealScout Listings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Dr. Jan Duffy&apos;s Current Listings
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse the latest properties I&apos;m representing in Centennial Hills and
                surrounding areas
              </p>
            </div>

            <RealScoutListings
              priceMin={500000}
              priceMax={2500000}
              propertyTypes="SFR,MF"
              listingStatus="For Sale"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Work with Dr. Jan Duffy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the difference that 20+ years of expertise and top-tier service can make in
              your real estate journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                View Testimonials
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
