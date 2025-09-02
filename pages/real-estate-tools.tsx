import Head from 'next/head';
import Layout from '../components/Layout';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyComparison from '../components/PropertyComparison';
import PropertyValuation from '../components/PropertyValuation';
import RealScoutListingsSection from '../components/RealScoutListingsSection';
import SchoolRatings from '../components/SchoolRatings';
import VirtualTour from '../components/VirtualTour';

export default function RealEstateTools() {
  // Sample data for demonstration
  const sampleProperties = [
    {
      id: '1',
      address: '123 Mountain View Dr, Centennial Hills, NV',
      price: 750000,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      lotSize: 0.35,
      yearBuilt: 2018,
      image: '/assets/images/property-gallery/luxury-estate-exterior-main.svg',
      features: [
        'Granite Countertops',
        'Hardwood Floors',
        'Updated Kitchen',
        'Master Suite',
        '2-Car Garage',
      ],
    },
    {
      id: '2',
      address: '456 Desert Ridge Way, Centennial Hills, NV',
      price: 650000,
      bedrooms: 3,
      bathrooms: 2.5,
      squareFeet: 2200,
      lotSize: 0.25,
      yearBuilt: 2015,
      image: '/assets/images/property-gallery/modern-home-exterior-main.svg',
      features: [
        'Open Floor Plan',
        'Stainless Appliances',
        'Tile Floors',
        'Covered Patio',
        'Attached Garage',
      ],
    },
    {
      id: '3',
      address: '789 Canyon Vista Ln, Centennial Hills, NV',
      price: 850000,
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 3200,
      lotSize: 0.5,
      yearBuilt: 2020,
      image: '/assets/images/property-gallery/providence-villa-exterior-main.svg',
      features: ['Custom Kitchen', 'Luxury Master Bath', 'Pool', 'Mountain Views', '3-Car Garage'],
    },
  ];

  const sampleSchools = [
    {
      name: 'Centennial Hills Elementary',
      type: 'elementary' as const,
      rating: 8.5,
      distance: 0.8,
      address: '123 School St, Las Vegas, NV 89149',
      phone: '(702) 555-0123',
      website: 'https://example.com',
      programs: ['Gifted & Talented', 'STEM', 'Arts Integration'],
    },
    {
      name: 'Centennial Hills Middle School',
      type: 'middle' as const,
      rating: 7.8,
      distance: 1.2,
      address: '456 Education Ave, Las Vegas, NV 89149',
      phone: '(702) 555-0456',
      website: 'https://example.com',
      programs: ['Advanced Math', 'Robotics', 'Band'],
    },
    {
      name: 'Centennial Hills High School',
      type: 'high' as const,
      rating: 8.2,
      distance: 1.5,
      address: '789 Learning Blvd, Las Vegas, NV 89149',
      phone: '(702) 555-0789',
      website: 'https://example.com',
      programs: ['AP Courses', 'Sports', 'Drama', 'College Prep'],
    },
  ];

  const samplePhotos = [
    '/assets/images/property-gallery/luxury-estate-exterior-main.svg',
    '/assets/images/property-gallery/luxury-estate-kitchen.svg',
    '/assets/images/property-gallery/luxury-estate-living-room.svg',
    '/assets/images/property-gallery/luxury-estate-master-bedroom.svg',
    '/assets/images/property-gallery/luxury-estate-bathroom.svg',
  ];

  return (
    <Layout>
      <Head>
        <title>Real Estate Tools & Resources | Dr. Jan Duffy | Centennial Hills</title>
        <meta
          name="description"
          content="Professional real estate tools including property valuation, virtual tours, school ratings, and mortgage calculators for Centennial Hills, Las Vegas."
        />
        <meta
          name="keywords"
          content="real estate tools, property valuation, virtual tour, school ratings, mortgage calculator, Centennial Hills, Las Vegas"
        />
        <meta property="og:title" content="Real Estate Tools & Resources | Dr. Jan Duffy" />
        <meta
          property="og:description"
          content="Professional real estate tools and resources for Centennial Hills home buyers and sellers."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.centennialhillshomesforsale.com/real-estate-tools"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Real Estate Tools
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Everything you need to make informed real estate decisions in Centennial Hills
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Property Valuation
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">Virtual Tours</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">School Ratings</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Mortgage Calculator
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Property Valuation Tool */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PropertyValuation className="max-w-6xl mx-auto" />
          </div>
        </section>

        {/* Virtual Tour Demo */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Experience Properties with Virtual Tours
              </h2>
              <VirtualTour
                propertyId="demo-property"
                photos={samplePhotos}
                className="max-w-4xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Property Comparison Tool */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Compare Properties Side by Side
              </h2>
              <PropertyComparison properties={sampleProperties} className="max-w-6xl mx-auto" />
            </div>
          </div>
        </section>

        {/* School Ratings */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                School Information & Ratings
              </h2>
              <SchoolRatings
                neighborhood="Centennial Hills"
                schools={sampleSchools}
                className="max-w-4xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Mortgage Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Calculate Your Mortgage Payments
              </h2>
              <MortgageCalculator className="max-w-4xl mx-auto" />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Buy or Sell in Centennial Hills?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let Dr. Jan Duffy help you navigate the Centennial Hills real estate market with
              professional expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </a>
              <a
                href="/listings"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Current Listings
              </a>
            </div>
          </div>
        </section>
      </div>
      {/* RealScout Office Listings */}
      <RealScoutListingsSection
        title="Current Listings"
        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
      />
    </Layout>
  );
}
