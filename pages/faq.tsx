import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useId, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import FeaturedInsight from '../components/rss/FeaturedInsight';
import MarketInsightsWidget from '../components/rss/MarketInsightsWidget';

const faqs = [
  {
    question: 'What areas does Dr. Jan Duffy specialize in?',
    answer:
      "Dr. Jan Duffy specializes in North Las Vegas, Centennial Hills, Providence, Skye Canyon, Summerlin, Lone Mountain, Aliante, Tule Springs, El Dorado, and other master-planned communities. With 20+ years of experience, she's ranked in the Top 1% of Las Vegas REALTORS®. Her expertise covers ZIP codes 89166, 89131, 89149, and surrounding areas. Dr. Duffy has extensive knowledge of each neighborhood's unique characteristics, from Providence's luxury amenities to Skye Canyon's family-friendly atmosphere. She understands the local market dynamics, school districts, HOA structures, and community features that make each area special. Whether you're looking for a starter home in Centennial Hills or a luxury estate in Summerlin, Dr. Duffy provides personalized guidance tailored to your specific needs and budget.",
    category: 'Service Areas',
    relatedQuestions: [
      'What makes each neighborhood unique?',
      'Which areas have the best schools?',
    ],
  },
  {
    question: 'What services does Dr. Duffy offer?',
    answer:
      'Dr. Duffy offers comprehensive real estate services including luxury property sales, new construction sales, first-time home buyer assistance, relocation services, property management, real estate investing guidance, and commercial property transactions. She provides same-day showings, free market analysis, and 24/7 availability. Her specialized services include pre-construction sales for new developments, investment property analysis with ROI calculations, and relocation assistance for families moving to Las Vegas. Dr. Duffy also offers staging consultations, pricing strategies, and negotiation expertise. She works with both buyers and sellers, providing market insights, comparative market analysis, and personalized recommendations. Her team includes mortgage specialists, home inspectors, and contractors to ensure a seamless transaction process.',
    category: 'Services',
    relatedQuestions: [
      'Do you offer free market analysis?',
      'What is included in relocation assistance?',
    ],
  },
  {
    question: 'What is the average home price in Summerlin and Centennial Hills?',
    answer:
      'Home prices in Centennial Hills and Summerlin vary significantly by neighborhood, home type, and specific location. As of 2024, Centennial Hills median home prices range from $550,000 to $750,000, with luxury properties reaching $1.2M+. Summerlin offers a broader range from $400,000 for condos to over $3M for custom estates. Providence homes typically start at $600,000, while Skye Canyon ranges from $500,000 to $900,000. The Las Vegas metro average is approximately $450,000, making these areas premium locations. Factors affecting pricing include proximity to amenities, school districts, HOA fees, lot size, and home condition. Dr. Duffy provides detailed market analysis including price per square foot, recent sales data, and future appreciation projections for specific properties and neighborhoods.',
    category: 'Pricing',
    relatedQuestions: [
      'How do HOA fees affect total costs?',
      'What factors influence home values?',
    ],
  },
  {
    question: 'What are the best schools in Centennial Hills?',
    answer:
      "Centennial Hills is served by the highly-rated Clark County School District, with several top-performing schools. Shadow Ridge High School consistently ranks among Nevada's best public high schools, with strong academic programs and extracurricular activities. Centennial High School offers excellent STEM programs and college preparation. Elementary schools like Garehime Elementary and Staton Elementary receive high ratings for student achievement and teacher quality. Private school options include Faith Lutheran School and The Meadows School, both offering rigorous academic programs. The area's schools benefit from active parent involvement, modern facilities, and experienced teachers. Dr. Duffy can provide detailed school ratings, enrollment information, and help you find homes in specific school attendance zones. School quality significantly impacts property values, with homes in top-rated school districts commanding premium prices.",
    category: 'Education',
    relatedQuestions: [
      'How do school ratings affect home values?',
      'What are the school attendance zones?',
    ],
  },
  {
    question: 'How long does it take to sell a home in Centennial Hills?',
    answer:
      "The average time to sell a home in Centennial Hills varies by market conditions, pricing strategy, and property condition. In the current 2024 market, well-priced homes typically sell within 30-45 days, while overpriced properties may sit for 90+ days. Luxury properties ($800K+) may take 60-90 days due to a smaller buyer pool. Factors affecting sale time include accurate pricing, professional staging, quality photos, and effective marketing. Dr. Duffy's comprehensive marketing strategy includes professional photography, virtual tours, MLS listing, social media promotion, and targeted buyer outreach. She provides detailed market analysis to ensure competitive pricing and implements proven strategies to maximize exposure. Homes in prime locations with recent updates sell fastest, while properties needing repairs or in less desirable locations require more time and strategic pricing.",
    category: 'Selling',
    relatedQuestions: [
      'What marketing strategies do you use?',
      'How do you determine listing price?',
    ],
  },
  {
    question: 'What are HOA fees in Providence and Skye Canyon?',
    answer:
      "HOA fees in Providence and Skye Canyon vary by community and amenities offered. Providence HOA fees typically range from $150-$300 per month, covering landscaping, common area maintenance, security, and access to amenities like pools, fitness centers, and clubhouses. Skye Canyon HOA fees are generally $120-$250 monthly, including similar services plus access to the community's extensive trail system and recreational facilities. These fees are essential to consider when budgeting, as they can add $1,800-$3,600 annually to your housing costs. HOA fees often include exterior maintenance, which can save homeowners significant repair costs. Dr. Duffy provides detailed HOA information including fee schedules, included amenities, and any special assessments. She can also explain HOA rules and restrictions that may affect your lifestyle, such as pet policies, rental restrictions, and architectural guidelines.",
    category: 'HOA & Fees',
    relatedQuestions: [
      'What amenities are included in HOA fees?',
      'Are there any special assessments?',
    ],
  },
  {
    question: 'Is Centennial Hills a good investment for rental properties?',
    answer:
      "Centennial Hills offers excellent rental property investment opportunities due to its growing population, strong job market, and desirable location. Rental yields typically range from 6-8% annually, with average rents for single-family homes between $2,500-$4,000 monthly. The area's proximity to major employers, good schools, and amenities makes it attractive to renters. Investment considerations include HOA fees, property management costs, and market appreciation potential. Dr. Duffy provides detailed investment analysis including cash flow projections, cap rates, and appreciation forecasts. She works with investors to identify properties with strong rental potential and helps navigate landlord-tenant laws. The area's master-planned communities often have rental restrictions, so it's important to verify HOA policies before purchasing. Dr. Duffy can connect you with property management companies and provide guidance on rental pricing strategies.",
    category: 'Investment',
    relatedQuestions: ['What are current rental rates?', 'Are there rental restrictions?'],
  },
  {
    question: 'What new construction homes are available in Centennial Hills?',
    answer:
      'Several new construction developments are currently available in Centennial Hills and surrounding areas. Providence continues to expand with new phases offering modern floor plans, energy-efficient features, and luxury amenities. Skye Canyon has ongoing construction with homes featuring smart home technology and sustainable design. Builders include KB Home, Lennar, and Richmond American, offering various price points from $500,000 to $1.2M+. New construction benefits include modern layouts, energy efficiency, warranties, and customization options. Dr. Duffy has established relationships with local builders and can provide early access to new phases, negotiate upgrades, and ensure proper representation throughout the building process. She helps clients understand builder contracts, warranty coverage, and timeline expectations. Pre-construction purchases often offer the best selection and pricing, but require careful planning and understanding of construction timelines.',
    category: 'New Construction',
    relatedQuestions: ['What builders are active in the area?', 'How long does construction take?'],
  },
  {
    question: 'How far is Centennial Hills from the Las Vegas Strip?',
    answer:
      "Centennial Hills is approximately 20-25 miles northwest of the Las Vegas Strip, with drive times ranging from 30-45 minutes depending on traffic and time of day. The distance provides the perfect balance of accessibility to Las Vegas attractions while maintaining a suburban, family-friendly atmosphere. Major routes include US-95 North and the 215 Beltway, with the new 215 extension improving connectivity. During peak hours (7-9 AM, 4-6 PM), commute times can extend to 45-60 minutes. The area's distance from the Strip means lower noise levels, cleaner air, and a more residential feel. Many residents appreciate being close enough for occasional entertainment while living in a quieter, more family-oriented community. Dr. Duffy can provide detailed commute information and help you find homes that balance your work location with lifestyle preferences.",
    category: 'Location',
    relatedQuestions: [
      'What are the commute times to major employers?',
      'How is public transportation?',
    ],
  },
  {
    question: 'What amenities are available in Centennial Hills communities?',
    answer:
      "Centennial Hills communities offer extensive amenities designed for active lifestyles. Providence features resort-style pools, fitness centers, tennis courts, walking trails, and a championship golf course. Skye Canyon offers over 20 miles of hiking and biking trails, community gardens, splash pads, and outdoor fitness equipment. Common amenities across communities include clubhouses, playgrounds, dog parks, and landscaped common areas. Many communities feature gated entrances, security patrols, and controlled access. The area also benefits from nearby shopping centers, restaurants, medical facilities, and entertainment venues. Dr. Duffy can provide detailed amenity lists for specific communities and help you find homes that match your lifestyle preferences. Amenity quality and maintenance significantly impact property values and HOA fees, so it's important to understand what's included and how well amenities are maintained.",
    category: 'Amenities',
    relatedQuestions: [
      'Are there fitness facilities?',
      'What recreational activities are available?',
    ],
  },
  {
    question: 'How do I find homes for sale in Summerlin or Centennial Hills?',
    answer:
      "Finding homes in Summerlin and Centennial Hills is easy with Dr. Duffy's comprehensive search tools and personalized service. Start by browsing our up-to-date listings on the website, which include detailed photos, virtual tours, and neighborhood information. Use our interactive map to explore specific areas and filter by price, bedrooms, and amenities. Dr. Duffy also provides exclusive access to pre-market listings and new construction opportunities. She offers 24/7 availability and same-day showings for qualified buyers. Her personalized approach includes understanding your specific needs, budget, and timeline to recommend the best properties. Dr. Duffy can set up automated alerts for new listings matching your criteria and provide market analysis for properties you're considering. She also has access to off-market properties and can help you find homes before they're publicly listed.",
    category: 'Home Search',
    relatedQuestions: ['How do I get pre-market listings?', 'What is the home buying process?'],
  },
  {
    question: 'What makes Dr. Duffy different from other REALTORS®?',
    answer:
      "Dr. Duffy stands out through her exceptional track record, personalized service, and deep local expertise. Ranked in the Top 1% of Las Vegas REALTORS® with 20+ years of experience, she has closed over 1,000 transactions worth more than $500 million. Her 4.9/5 star rating reflects consistent client satisfaction and successful outcomes. Dr. Duffy offers 24/7 availability, same-day showings, and personalized attention that larger brokerages can't match. She specializes in master-planned communities and has extensive knowledge of local market trends, school districts, and neighborhood characteristics. Her services include professional photography, virtual tours, comprehensive marketing, and negotiation expertise. Dr. Duffy also provides ongoing support after closing, helping clients with home maintenance, local services, and future real estate needs. Her commitment to client success is evident in her high referral rate and long-term client relationships.",
    category: 'Experience',
    relatedQuestions: ['What is your success rate?', 'Do you provide post-closing support?'],
  },
  {
    question: 'Does Dr. Duffy help with relocation to Las Vegas?',
    answer:
      "Yes, Dr. Duffy provides comprehensive relocation assistance for individuals and families moving to Las Vegas from anywhere in the country. Her relocation services include detailed neighborhood insights, school information, commute analysis, and tailored home searches. She helps clients understand Las Vegas's unique market dynamics, from HOA structures to property tax implications. Dr. Duffy provides virtual tours, detailed neighborhood reports, and can coordinate with your moving timeline. Her relocation package includes information about local services, utilities, DMV requirements, and community resources. She works with corporate relocation departments and can provide employer verification and documentation. Dr. Duffy understands the stress of moving and provides ongoing support throughout the transition, from initial search to post-move assistance. Her local expertise helps relocating families make informed decisions about neighborhoods, schools, and lifestyle factors.",
    category: 'Relocation',
    relatedQuestions: [
      'What relocation services are included?',
      'How do you help with school selection?',
    ],
  },
  {
    question: 'What is the home buying process in Las Vegas?',
    answer:
      "The home buying process in Las Vegas typically takes 30-45 days from contract to closing, though this can vary based on financing and inspection requirements. The process begins with pre-approval for financing, followed by property search and viewing. Once you find a home, Dr. Duffy helps you make a competitive offer and negotiate terms. After acceptance, you'll have 10-15 days for inspections and due diligence. The final steps include appraisal, final loan approval, and closing. Dr. Duffy guides you through each step, explaining timelines, requirements, and potential issues. She coordinates with lenders, inspectors, and title companies to ensure a smooth process. Las Vegas's competitive market requires quick decisions and strong offers, so having an experienced agent is crucial. Dr. Duffy's expertise helps you avoid common pitfalls and ensures you get the best possible terms.",
    category: 'Buying Process',
    relatedQuestions: ['How long does the process take?', 'What inspections are required?'],
  },
  {
    question: 'What are property taxes like in Centennial Hills?',
    answer:
      "Property taxes in Centennial Hills are relatively low compared to many other states, with effective rates typically around 0.6-0.8% of assessed value. For a $600,000 home, annual property taxes would be approximately $3,600-$4,800. Nevada's property tax system is based on assessed value, which is generally lower than market value. Property taxes fund local schools, infrastructure, and municipal services. Dr. Duffy can provide specific tax information for properties you're considering and explain how taxes may change over time. She also helps clients understand tax implications of different property types and locations. Property taxes are an important factor in total housing costs and should be included in your budget calculations. Dr. Duffy can connect you with tax professionals for more detailed advice on property tax strategies and exemptions.",
    category: 'Taxes & Costs',
    relatedQuestions: ['How are property taxes calculated?', 'Are there any tax exemptions?'],
  },
  {
    question: 'What should I know about Las Vegas weather and home maintenance?',
    answer:
      "Las Vegas's desert climate requires specific home maintenance considerations. Summers are hot (100°F+) and dry, while winters are mild with occasional freezing temperatures. Key maintenance includes HVAC system servicing, pool maintenance, and protecting outdoor furniture from sun damage. Desert landscaping requires drought-tolerant plants and efficient irrigation systems. Homeowners should consider energy-efficient windows, insulation, and solar panels to manage cooling costs. Dr. Duffy provides detailed information about climate considerations and can recommend local contractors for maintenance services. She helps clients understand seasonal maintenance schedules and cost estimates. The dry climate means less mold and pest issues but requires attention to foundation settling and UV damage. Dr. Duffy can connect you with reliable contractors and provide guidance on home maintenance schedules specific to Las Vegas conditions.",
    category: 'Maintenance',
    relatedQuestions: [
      'What are typical maintenance costs?',
      'How do I find reliable contractors?',
    ],
  },
];

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate unique IDs for form elements
  const categorySelectId = useId();
  const questionId = useId();
  const emailId = useId();
  const nameId = useId();

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))],
    []
  );

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpanded = useCallback((index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const scrollToSection = useCallback((category: string) => {
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('All');
  }, []);

  return (
    <Layout>
      <Head>
        <title>Expert Answers to 20+ FAQs About Centennial Hills Real Estate | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Expert answers to 20+ FAQs about Centennial Hills real estate, including 2024 home prices ($400K-$2M+), top-rated schools, HOA fees, and investment opportunities. Local REALTOR® insights from Dr. Jan Duffy."
        />
        <meta
          name="keywords"
          content="Centennial Hills FAQ, real estate questions, Las Vegas home prices, school ratings, market conditions, Providence homes, Skye Canyon real estate, Northwest Las Vegas property values, HOA fees, investment properties"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/faq" />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content={new Date().toISOString()} />

        {/* Enhanced Schema Markup */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema markup requires dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema markup requires dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Dr. Jan Duffy, REALTOR®',
              alternateName:
                'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
              url: 'https://centennialhillshomesforsale.com',
              telephone: '(702) 903-1952',
              sameAs: ['https://g.co/kgs/4qQ8DsY'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Providence Skye Canyon Dr',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89166',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '36.268',
                longitude: '-115.328',
              },
              openingHours: 'Mo-Su 06:00-21:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
                bestRating: '5',
              },
              priceRange: '$$$$',
              currenciesAccepted: 'USD',
              paymentAccepted: 'Cash, Check, Credit Card, Wire Transfer',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Real Estate Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Real Estate Sales',
                      provider: {
                        '@type': 'RealEstateAgent',
                        name: 'Dr. Jan Duffy, REALTOR®',
                      },
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Property Search',
                      provider: {
                        '@type': 'RealEstateAgent',
                        name: 'Dr. Jan Duffy, REALTOR®',
                      },
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Market Analysis',
                      provider: {
                        '@type': 'RealEstateAgent',
                        name: 'Dr. Jan Duffy, REALTOR®',
                      },
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema markup requires dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://centennialhillshomesforsale.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'FAQ',
                  item: 'https://centennialhillshomesforsale.com/faq',
                },
              ],
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-br from-primary-color via-secondary-color to-accent-color text-white py-16 lg:py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get expert answers about Centennial Hills real estate from local market specialists.
              <br />
              <span className="text-sm opacity-75">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </p>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-label="Search icon"
                  >
                    <title>Search</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-[200px]">
                <label htmlFor={categorySelectId} className="sr-only">
                  Filter by Category
                </label>
                <select
                  id={categorySelectId}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-6 py-4 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-900 focus:bg-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 cursor-pointer"
                  aria-label="Filter FAQs by category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Table of Contents */}
        <motion.section
          className="bg-white py-12 border-b border-border-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-color mb-8">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {categories.slice(1).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => scrollToSection(category)}
                  className="px-4 py-3 bg-gradient-to-r from-secondary-color to-accent-color text-white rounded-xl font-semibold text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            {/* Group FAQs by Category */}
            {categories.slice(1).map((category) => {
              const categoryFaqs = filteredFaqs.filter((faq) => faq.category === category);
              if (categoryFaqs.length === 0) return null;

              return (
                <div
                  key={category}
                  id={category.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-16"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-color mb-12 relative">
                    {category}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-secondary-color to-accent-color rounded-full"></div>
                  </h2>
                  <div className="grid gap-6 max-w-4xl mx-auto">
                    {categoryFaqs.map((faq, index) => {
                      const globalIndex = faqs.findIndex((f) => f.question === faq.question);
                      const isExpanded = expandedItems.includes(globalIndex);

                      return (
                        <motion.div
                          key={globalIndex}
                          className={`bg-white rounded-2xl shadow-lg border border-border-primary overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? 'shadow-xl border-secondary-color'
                              : 'hover:shadow-xl hover:-translate-y-1'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          <button
                            type="button"
                            className="w-full px-6 py-5 text-left bg-gradient-to-r from-bg-secondary to-bg-tertiary hover:from-secondary-color hover:to-accent-color hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2"
                            onClick={() => toggleExpanded(globalIndex)}
                            aria-expanded={isExpanded}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg md:text-xl font-semibold pr-4 leading-relaxed">
                                {faq.question}
                              </h3>
                              <span
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                                  isExpanded
                                    ? 'bg-white/20 text-white'
                                    : 'bg-secondary-color text-white'
                                }`}
                              >
                                {isExpanded ? '−' : '+'}
                              </span>
                            </div>
                          </button>
                          <motion.div
                            className={`overflow-hidden transition-all duration-300 ${
                              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            initial={false}
                            animate={{
                              height: isExpanded ? 'auto' : 0,
                              opacity: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 py-6">
                              <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                                {faq.answer}
                              </p>

                              {/* Related Questions */}
                              {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                                <div className="bg-bg-secondary p-4 rounded-xl mb-6 border-l-4 border-secondary-color">
                                  <h4 className="text-primary-color font-semibold mb-3">
                                    Related Questions:
                                  </h4>
                                  <ul className="space-y-2">
                                    {faq.relatedQuestions.map((relatedQ) => (
                                      <li key={relatedQ}>
                                        <Link
                                          href={`#${relatedQ.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="text-secondary-color hover:text-accent-color font-medium transition-colors duration-200"
                                        >
                                          {relatedQ}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Helpful Voting */}
                              <div className="border-t border-border-primary pt-4">
                                <p className="text-sm font-semibold text-primary-color mb-3">
                                  Was this helpful?
                                </p>
                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    className="px-4 py-2 border-2 border-success-color bg-transparent text-success-color rounded-full font-medium hover:bg-success-color hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-success-color focus:ring-offset-2"
                                  >
                                    👍 Yes
                                  </button>
                                  <button
                                    type="button"
                                    className="px-4 py-2 border-2 border-error-color bg-transparent text-error-color rounded-full font-medium hover:bg-error-color hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error-color focus:ring-offset-2"
                                  >
                                    👎 No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* No Results Message */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-border-primary">
                <h3 className="text-2xl font-bold text-primary-color mb-4">
                  No FAQs found matching your search
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or browse all categories.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-secondary-color to-accent-color text-white rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Market Insights for FAQ Page */}
        <motion.section
          className="bg-bg-secondary py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-color mb-4">
              Stay Informed with Market Insights
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Get the latest real estate trends and analysis to help answer your questions
            </p>

            <div className="max-w-6xl mx-auto">
              <FeaturedInsight
                title="Latest Market Analysis"
                subtitle="Expert insights to guide your real estate decisions"
                theme="blue"
                enableAnalytics={true}
                enablePerformance={true}
              />
            </div>
          </div>
        </motion.section>

        {/* Market Trends Widget */}
        <motion.section
          className="bg-white py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-color mb-4">
              Current Market Trends
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Track real-time market data and trends affecting Centennial Hills real estate
            </p>

            <MarketInsightsWidget maxArticles={4} enableAnalytics={true} enablePerformance={true} />
          </div>
        </motion.section>

        {/* Question Submission Form */}
        <motion.section
          className="bg-white py-16 border-t border-border-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-color mb-4">
              Ask Your Own Question
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Can't find what you're looking for? Submit your question and get a personalized answer
              from Dr. Duffy.
            </p>
            <form className="max-w-2xl mx-auto bg-bg-secondary p-8 rounded-2xl shadow-lg border border-border-primary">
              <div className="mb-6">
                <label
                  htmlFor={questionId}
                  className="block text-sm font-semibold text-primary-color mb-2"
                >
                  Your Question
                </label>
                <textarea
                  id={questionId}
                  name="question"
                  rows={4}
                  placeholder="What would you like to know about Centennial Hills real estate?"
                  required
                  className="w-full px-4 py-3 border-2 border-border-primary rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary-color focus:outline-none focus:ring-2 focus:ring-secondary-color/20 transition-all duration-300 resize-none"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor={emailId}
                  className="block text-sm font-semibold text-primary-color mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id={emailId}
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border-2 border-border-primary rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary-color focus:outline-none focus:ring-2 focus:ring-secondary-color/20 transition-all duration-300"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor={nameId}
                  className="block text-sm font-semibold text-primary-color mb-2"
                >
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id={nameId}
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-border-primary rounded-xl text-gray-900 placeholder-gray-500 focus:border-secondary-color focus:outline-none focus:ring-2 focus:ring-secondary-color/20 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary-color to-accent-color text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2"
              >
                Submit Question
              </button>
            </form>
          </div>
        </motion.section>

        {/* Social Sharing */}
        <motion.section
          className="bg-bg-secondary py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-color mb-4">
              Share This Resource
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Help others find answers to their Centennial Hills real estate questions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="px-6 py-3 border-2 border-blue-600 bg-transparent text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                📘 Share on Facebook
              </button>
              <button
                type="button"
                className="px-6 py-3 border-2 border-sky-500 bg-transparent text-sky-500 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                🐦 Share on Twitter
              </button>
              <button
                type="button"
                className="px-6 py-3 border-2 border-blue-700 bg-transparent text-blue-700 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              >
                💼 Share on LinkedIn
              </button>
              <button
                type="button"
                className="px-6 py-3 border-2 border-accent-color bg-transparent text-accent-color rounded-full font-semibold hover:bg-accent-color hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-color focus:ring-offset-2"
              >
                📧 Email This Page
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="bg-gradient-to-br from-primary-color via-secondary-color to-accent-color text-white py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto">
              Our local real estate experts are here to help with personalized answers about
              Centennial Hills. Contact Dr. Jan Duffy directly for expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary-color rounded-full font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
              >
                Contact Our Team
              </Link>
              <a
                href="tel:+17029031952"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-primary-color transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
              >
                Call (702) 903-1952
              </a>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <span className="text-3xl mb-2">⭐</span>
                <span className="font-semibold">4.9/5 Star Rating</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <span className="text-3xl mb-2">🏆</span>
                <span className="font-semibold">Top 1% REALTOR®</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <span className="text-3xl mb-2">✅</span>
                <span className="font-semibold">Verified Google Business</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <span className="text-3xl mb-2">📞</span>
                <span className="font-semibold">24/7 Availability</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
