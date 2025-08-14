import Layout from '@/components/Layout';
import RealScoutListings from '@/components/RealScoutListings';
import FeaturedInsight from '@/components/rss/FeaturedInsight';
import MarketInsightsWidget from '@/components/rss/MarketInsightsWidget';
import {
    ArrowRight,
    CheckCircle,
    DollarSign,
    FileText,
    Mail,
    MapPin,
    Phone,
    Search,
    Star,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

const BuyersPage: React.FC = () => {
  const buyerServices = [
    {
      icon: Search,
      title: 'Property Search',
      description: 'Access to exclusive listings in Centennial Hills, Providence, and Skye Canyon',
      features: ['MLS Access', 'Custom Alerts', 'Virtual Tours', 'Market Analysis'],
    },
    {
      icon: DollarSign,
      title: 'Financing Guidance',
      description: 'Expert advice on mortgages, loans, and financial planning',
      features: [
        'Pre-approval Help',
        'Rate Comparison',
        'Down Payment Options',
        'Closing Cost Analysis',
      ],
    },
    {
      icon: FileText,
      title: 'Negotiation Support',
      description: 'Professional representation to get you the best deal',
      features: [
        'Offer Strategy',
        'Market Value Analysis',
        'Inspection Coordination',
        'Closing Support',
      ],
    },
  ];

  const buyerSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'Meet with Dr. Jan Duffy to discuss your needs, budget, and timeline',
    },
    {
      step: '02',
      title: 'Property Search',
      description: 'Receive customized property recommendations and MLS access',
    },
    {
      step: '03',
      title: 'Property Viewing',
      description: 'Schedule showings and virtual tours of your preferred properties',
    },
    {
      step: '04',
      title: 'Offer & Negotiation',
      description: 'Submit offers with expert guidance and negotiation support',
    },
    {
      step: '05',
      title: 'Closing Process',
      description: 'Complete inspections, financing, and finalize your purchase',
    },
  ];

  return (
    <Layout
      title="Home Buyers Guide | Centennial Hills Real Estate | Dr. Jan Duffy"
      description="Expert guidance for homebuyers in Centennial Hills, Providence, and Skye Canyon. Get professional support from Dr. Jan Duffy, Top 1% REALTOR®."
      canonical="https://centennialhillshomesforsale.com/buyers/"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Dream Home Awaits</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Expert guidance through every step of your home buying journey in Centennial Hills
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Start Your Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/market-update"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Market Analysis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Dr. Jan Duffy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Dr. Jan Duffy?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ranked in the Top 1% of Las Vegas REALTORS® with 20+ years of experience in
                master-planned communities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Top 1% REALTOR®</h3>
                <p className="text-gray-600">
                  Consistently ranked among the highest-performing agents in Las Vegas
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Expert</h3>
                <p className="text-gray-600">
                  Deep knowledge of Centennial Hills, Providence, and Skye Canyon markets
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  Available whenever you need assistance, including same-day showings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Buyer Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From initial search to closing, we provide complete support for your home buying
                journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {buyerServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buyer Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Home Buying Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A clear, step-by-step process to guide you from dream to reality
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {buyerSteps.map((step, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RealScout Listings */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Properties for Buyers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our latest listings to see what&apos;s available in your preferred areas
              </p>
            </div>
            
            <RealScoutListings 
              priceMin={500000}
              priceMax={1500000}
              propertyTypes="SFR,MF"
              listingStatus="For Sale"
            />
          </div>
        </section>

        {/* Market Insights for Buyers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stay Informed with Market Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get the latest real estate market trends and insights to make informed buying decisions
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <FeaturedInsight 
                title="Latest Market Insight for Buyers"
                subtitle="Expert analysis to guide your home buying decisions"
                theme="blue"
                enableAnalytics={true}
                enablePerformance={true}
              />
            </div>
          </div>
        </section>

        {/* Market Trends Widget */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Market Trends
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track real-time market data and trends affecting Centennial Hills real estate
              </p>
            </div>
            
            <MarketInsightsWidget 
              maxArticles={6}
              showFeatured={true}
              enableAnalytics={true}
              enablePerformance={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Home Search?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact Dr. Jan Duffy today for a free consultation and personalized property search
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17029031952"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (702) 903-1952
              </a>
              <a
                href="mailto:jan@centennialhillshomesforsale.com"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BuyersPage;
