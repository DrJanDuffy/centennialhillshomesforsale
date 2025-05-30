import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import RealScoutListings from '../components/RealScoutListings';
import PropertyCalculator from '../components/PropertyCalculator';
import MarketTrendChart from '../components/MarketTrendChart';
import AdvancedSearch from '../components/AdvancedSearch';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import LocalAmenities from '../components/LocalAmenities';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import GoogleBusinessOptimization from '../components/GoogleBusinessOptimization';
import LocalCitationWidget from '../components/LocalCitationWidget';
import SEOOptimized from '../components/SEOOptimized';
import GEOOptimized from '../components/GEOOptimized';
import AIContentOptimizer from '../components/AIContentOptimizer';
import StatisticalWidget from '../components/StatisticalWidget';

interface Property {
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: string;
}

export default function Home() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState('Centennial Hills');

  try {
    return (
    <React.Fragment>
      <Head>
        <title>Centennial Hills Homes For Sale | Las Vegas Real Estate Expert Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties</title>
        <meta name="description" content="Find luxury homes for sale in Centennial Hills, Providence, and Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® at Berkshire Hathaway HomeServices Nevada Properties. 30+ years experience in Las Vegas real estate market. Current median home price $635,000." />
        <meta name="keywords" content="Centennial Hills homes for sale, Providence Las Vegas real estate, Skye Canyon luxury homes, Las Vegas REALTOR, Dr. Jan Duffy, Berkshire Hathaway HomeServices, Nevada Properties, 89149 homes, 89166 homes, Northwest Las Vegas real estate" />

        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Discover luxury homes in Centennial Hills, Providence, and Skye Canyon with expert REALTOR® Dr. Jan Duffy. Median price $635,000. Call (702) 903-1952 today!" />
        <meta property="og:image" content="https://centennialhillshomesforsale.com/images/centennial-hills-hero.jpg" />
        <meta property="og:url" content="https://centennialhillshomesforsale.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Centennial Hills Homes For Sale" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®" />
        <meta name="twitter:description" content="Find luxury homes in Centennial Hills, Providence & Skye Canyon. Expert REALTOR® with 30+ years experience. Median price $635,000." />
        <meta name="twitter:image" content="https://centennialhillshomesforsale.com/images/centennial-hills-hero.jpg" />

        {/* Article/Real Estate Specific */}
        <meta property="article:author" content="Dr. Jan Duffy" />
        <meta property="article:publisher" content="Berkshire Hathaway HomeServices Nevada Properties" />
        <meta name="author" content="Dr. Jan Duffy, REALTOR®" />

        {/* Local Business Schema in Head */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RealEstateAgent", "LocalBusiness"],
            "name": "Dr. Jan Duffy - Centennial Hills Real Estate Expert",
            "alternateName": "Centennial Hills Homes For Sale",
            "description": "Premier real estate services in Centennial Hills, Providence, and Skye Canyon with Dr. Jan Duffy, experienced REALTOR® at Berkshire Hathaway HomeServices Nevada Properties.",
            "url": "https://centennialhillshomesforsale.com",
            "telephone": "(702) 903-1952",
            "priceRange": "$450,000 - $1,200,000",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Providence Skye Canyon Dr",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89166",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.268",
              "longitude": "-115.328"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Las Vegas",
                "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
              },
              {
                "@type": "Neighborhood",
                "name": "Centennial Hills",
                "containedInPlace": "Las Vegas, NV"
              },
              {
                "@type": "Neighborhood", 
                "name": "Providence",
                "containedInPlace": "Las Vegas, NV"
              },
              {
                "@type": "Neighborhood",
                "name": "Skye Canyon", 
                "containedInPlace": "Las Vegas, NV"
              }
            ],
            "serviceType": [
              "Real Estate Sales",
              "Property Search",
              "Market Analysis",
              "Buyer Representation",
              "Seller Representation",
              "Luxury Home Sales",
              "Investment Properties"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "image": "https://centennialhillshomesforsale.com/images/dr-jan-duffy-realtor.jpg",
            "openingHours": "Mo-Su 06:00-21:00",
            "paymentAccepted": "Cash, Check, Financing",
            "currenciesAccepted": "USD",
            "memberOf": {
              "@type": "Organization",
              "name": "Berkshire Hathaway HomeServices Nevada Properties"
            },
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional License",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Nevada Real Estate Division"
                }
              }
            ],
            "knowsAbout": [
              "Centennial Hills Real Estate Market",
              "Providence Las Vegas Properties",
              "Skye Canyon Luxury Homes", 
              "Northwest Las Vegas Neighborhoods",
              "Las Vegas Investment Properties"
            ],
            "sameAs": [
              "https://g.co/kgs/4qQ8DsY",
              "https://www.facebook.com/CentennialHillsHomes",
              "https://www.linkedin.com/in/drjanduffy"
            ]
          })
        }} />
      </Head>


      <SEOOptimized 
        title="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®"
        description="Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® at Berkshire Hathaway HomeServices Nevada Properties."
        keywords="Centennial Hills homes for sale, Providence Las Vegas, Skye Canyon real estate, Dr. Jan Duffy REALTOR"
      />
      <GEOOptimized 
        title="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®"
        description="Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, experienced REALTOR® with 30+ years in Las Vegas real estate. Specializing in Providence family communities ($450K-$800K) and Skye Canyon luxury homes ($550K-$1.2M)."
        pageType="homepage"
        priceRange="$450,000 - $1,200,000"
      />

      <AIContentOptimizer pageType="homepage">
      <main className="main-content">


      <div className="wrapper">
        {/* Sticky neighborhood identifier */}
        <NeighborhoodBar 
          currentNeighborhood={currentNeighborhood}
          onNeighborhoodChange={setCurrentNeighborhood}
        />

        {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="/images/centennial-hills/centennial-hills-hero.jpg" 
            alt="Luxury Centennial Hills Home"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Find Your Dream Home in Centennial Hills</h1>
            <p className="hero-subtitle">
              Discover luxury living in Northwest Las Vegas with exclusive access to Centennial Hills, Providence, and Skye Canyon properties. Expert local knowledge since 2009.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🏡</span>
                <span>Luxury Communities</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Local Expert</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>5-Star Service</span>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Homes Sold</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link href="/listings" className="btn btn-primary">
                <span>View Properties</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                <span>Free Consultation</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

        {/* Advanced Search */}
        <section className="search-section">
          <div className="container">
            <AdvancedSearch />
          </div>
        </section>

        {/* Featured Properties */}
        <section className="page__services featured-properties">
          <div className="container">
            <h2 className="section-title">Featured Properties</h2>
            <RealScoutListings />
          </div>
        </section>

        {/* Market Statistics */}
        <section className="page__market market-stats">
          <div className="container">
            <h2 className="section-title">Centennial Hills Market Insights</h2>
            <div className="market-dashboard">
              <div className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Median Home Price</h3>
                    <p className="stat-value">$725,000</p>
                    <span className="stat-change positive">+5.2% from last year</span>
                  </div>
                  <div className="stat-card">
                    <h3>Average Days on Market</h3>
                    <p className="stat-value">28 days</p>
                    <span className="stat-change neutral">Same as last month</span>
                  </div>
                  <div className="stat-card">
                    <h3>Properties Sold (30 days)</h3>
                    <p className="stat-value">47</p>
                    <span className="stat-change positive">+12% from last month</span>
                  </div>
                  <div className="stat-card">
                    <h3>Price per Sq Ft</h3>
                    <p className="stat-value">$245</p>
                    <span className="stat-change positive">+3.8% from last year</span>
                  </div>
                </div>
              </div>
              <div className="charts-section">
                <MarketTrendChart />
              </div>
            </div>
          </div>
        </section>

        {/* Mortgage Calculator */}
        <section className="calculator-section">
          <div className="container">
            <PropertyCalculator />
          </div>
        </section>

        {/* School Information */}
        <section className="schools-section">
          <div className="container">
            <SchoolInfo neighborhood={currentNeighborhood} />
          </div>
        </section>

        {/* Featured Neighborhoods */}
        <section className="neighborhoods-section">
          <div className="container">
            <h2 className="section-title">Premier Centennial Hills Communities</h2>
            <div className="neighborhoods-grid">
              <div className="neighborhood-card">
                <div className="neighborhood-image">
                  <img 
                    src="/images/centennial-hills/providence-community.jpg" 
                    alt="Providence community homes in Centennial Hills"
                    loading="lazy"
                  />
                </div>
                <h3>Providence</h3>
                <p className="price-range">$450K - $800K</p>
                <div className="neighborhood-features">
                  <span>🏫 Centennial High School</span>
                  <span>🏊 Community pools & parks</span>
                  <span>🚶 Walkable neighborhoods</span>
                  <span>🛍️ Near Downtown Summerlin</span>
                </div>
                <button className="btn btn-outline">Explore Providence</button>
              </div>

              <div className="neighborhood-card">
                <div className="neighborhood-image">
                  <img 
                    src="/images/centennial-hills/skye-canyon-homes.jpg" 
                    alt="Skye Canyon luxury homes with desert landscaping"
                    loading="lazy"
                  />
                </div>
                <h3>Skye Canyon</h3>
                <p className="price-range">$550K - $1.2M</p>
                <div className="neighborhood-features">
                  <span>🏫 Coral Academy Charter</span>
                  <span>⛰️ Mountain & valley views</span>
                  <span>🏞️ Skye Canyon Park</span>
                  <span>🏠 Custom & semi-custom homes</span>
                </div>
                <button className="btn btn-outline">Explore Skye Canyon</button>
              </div>

              <div className="neighborhood-card">
                <div className="neighborhood-image">
                  <img 
                    src="/images/centennial-hills/tpc-las-vegas-golf.jpg" 
                    alt="TPC Las Vegas Golf Course in Centennial Hills"
                    loading="lazy"
                  />
                </div>
                <h3>The Trails</h3>
                <p className="price-range">$600K - $2M+</p>
                <div className="neighborhood-features">
                  <span>🏫 Palo Verde High School</span>
                  <span>🏌️ TPC Las Vegas Golf</span>
                  <span>🏘️ Gated communities</span>
                  <span>⛰️ Red Rock Canyon access</span>
                </div>
                <button className="btn btn-outline">Explore The Trails</button>
              </div>

              <div className="neighborhood-card">
                <div className="neighborhood-image">
                  <img 
                    src="/images/centennial-hills/tournament-hills.jpg"
                    alt="Homes in Tournament Hills, Las Vegas"
                    loading="lazy"
                  />
                </div>
                <h3>Tournament Hills</h3>
                <p className="price-range">$500K - $1.5M</p>
                <div className="neighborhood-features">
                  <span>🏫 Shadow Ridge High</span>
                  <span>🏌️ Bear's Best Golf Course</span>
                  <span>🏠 Semi-custom homes</span>
                  <span>🌲 Desert landscaping</span>
                </div>
                <button className="btn btn-outline">Explore Tournament Hills</button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Amenities */}
        <section className="amenities-section">
          <div className="container">
            <LocalAmenities />
          </div>
        </section>

        {/* Google Business Profile */}
        <section className="google-business-section">
          <div className="container">
            <GoogleBusinessOptimization showWidget={true} pageType="home" />
          </div>
        </section>

        {/* Local Citations */}
        <section className="citations-section">
          <div className="container">
            <LocalCitationWidget />
          </div>
        </section>

        {/* Why Choose Centennial Hills */}
        <section className="lifestyle-section">
          <div className="container">
            <div className="lifestyle-grid">
              <div className="lifestyle-content">
                <h2>Why Choose Centennial Hills?</h2>
                <ul className="lifestyle-benefits">
                  <li>🏌️ Championship golf at TPC Las Vegas</li>
                  <li>🏫 Top-rated Clark County schools (8-10/10 ratings)</li>
                  <li>🏔️ Stunning Red Rock Canyon proximity</li>
                  <li>🛍️ Downtown Summerlin shopping (5 minutes)</li>
                  <li>🏥 Centennial Hills Hospital nearby</li>
                  <li>🎯 20 minutes to Las Vegas Strip</li>
                </ul>
              </div>
              <div className="lifestyle-image">
                <img 
                  src="/images/centennial-hills/red-rock-canyon-view.jpg" 
                  alt="Red Rock Canyon view from Centennial Hills"
                  className="lifestyle-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Property Showcase */}
        <section className="property-showcase">
          <div className="container">
            <h2 className="section-title">Featured Centennial Hills Properties</h2>
            <div className="properties-grid">
              <div className="property-card">
                <div className="property-image">
                  <img 
                    src="/images/centennial-hills/luxury-pool-home.jpg" 
                    alt="Luxury home with pool in Centennial Hills"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="property-card">
                <div className="property-image">
                  <img 
                    src="/images/centennial-hills/modern-kitchen.jpg" 
                    alt="Modern kitchen in Centennial Hills home"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="property-card">
                <div className="property-image">
                  <img 
                    src="/images/centennial-hills/master-bedroom.jpg" 
                    alt="Master bedroom in Centennial Hills luxury home"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="page__about about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Dr. Jan Duffy, REALTOR® - Your Centennial Hills Expert</h2>
                <p>
                  With over 30 years of Las Vegas real estate experience since September 1993, 
                  Dr. Jan Duffy has watched Centennial Hills transform from desert to one of the 
                  valley's premier family destinations. Ranked in the Top 1% of Las Vegas REALTORS®, 
                  Dr. Duffy specializes in luxury and new-build homes in master-planned communities.
                </p>
                <p>
                  From Providence's family-friendly atmosphere to Skye Canyon's mountain views and 
                  The Trails' luxury golf course living, Dr. Duffy provides expert guidance with 
                  same-day showings and personalized service available 24/7.
                </p>
                <div className="local-expertise">
                  <span className="expertise">🏢 Berkshire Hathaway HomeServices</span>
                  <span className="expertise">📞 (702) 903-1952</span>
                  <span className="expertise">⭐ 4.9/5 Rating - Top 1%</span>
                  <span className="expertise">📅 Since September 1993</span>
                </div>
                <div className="contact-buttons">
                  <a href="tel:+17029031952" className="btn btn-primary">Call Dr. Duffy</a>
                  <a href="/contact" className="btn btn-secondary">Free Market Analysis</a>
                </div>
              </div>
              <div className="about-image">
                <img 
                  src="/images/dr-jan-duffy-realtor.jpg"
                  alt="Dr. Jan Duffy, REALTOR® - Centennial Hills Expert"
                  className="agent-photo"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Business Directory */}
        <section className="local-business-section">
          <div className="container">
            <h2 className="section-title">Local Centennial Hills Businesses</h2>
            <div className="business-categories">
              <div className="business-category">
                <h3>🍽️ Dining</h3>
                <ul>
                  <li key="buffet">Red Rock Casino Resort Buffet</li>
                  <li key="brio">Brio Tuscan Grille (Downtown Summerlin)</li>
                  <li key="yard">Yard House (Downtown Summerlin)</li>
                  <li key="innout">In-N-Out Burger (Fort Apache)</li>
                  <li key="flemings">Flemings Prime Steakhouse</li>
                </ul>
              </div>
              <div className="business-category">
                <h3>🛍️ Shopping</h3>
                <ul>
                  <li>Downtown Summerlin</li>
                  <li>Red Rock Casino Gift Shop</li>
                  <li>Boca Park Fashion Village</li>
                  <li>Trader Joe's (Centennial)</li>
                  <li>Whole Foods Market</li>
                </ul>
              </div>
              <div className="business-category">
                <h3>🏥 Healthcare</h3>
                <ul>
                  <li>Summerlin Hospital Medical Center</li>
                  <li>Desert Springs Hospital</li>
                  <li>Centennial Hills Animal Hospital</li>
                  <li>Southwest Medical Associates</li>
                  <li>CVS Pharmacy (Multiple locations)</li>
                </ul>
              </div>
              <div className="business-category">
                <h3>💼 Services</h3>
                <ul>
                  <li>Wells Fargo Bank</li>
                  <li>Bank of America</li>
                  <li>UPS Store</li>
                  <li>FedEx Office</li>
                  <li>Jiffy Lube</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Events */}
        <section className="page__events community-events">
          <div className="container">
            <div className="events__content">
              <div className="events__body">
                <h2 className="events__title title">Community Happenings</h2>
                <div className="events__row">
                  <div className="events__column">
                    <div className="events__item item-events">
                      <div className="event-date">
                        <span className="month">MAR</span>
                        <span className="day">28</span>
                      </div>
                      <h3 className="item-events__title">Providence Spring Festival</h3>
                      <div className="item-events__text">
                        Providence Community Center, 9am-4pm. Bounce houses, face painting, food trucks, 
                        and live music. Free admission for Providence residents.
                      </div>
                    </div>
                  </div>
                  <div className="events__column">
                    <div className="events__item item-events">
                      <div className="event-date">
                        <span className="month">APR</span>
                        <span className="day">15</span>
                      </div>
                      <h3 className="item-events__title">Skye Canyon Chalk Art Festival</h3>
                      <div className="item-events__text">
                        Skye Canyon Park, 10am-3pm. Family chalk art competition, local artists, 
                        food vendors, and kids activities. Prizes for best neighborhood chalk art!
                      </div>
                    </div>
                  </div>
                  <div className="events__column">
                    <div className="events__item item-events">
                      <div className="event-date">
                        <span className="month">SAT</span>
                        <span className="day">Weekly</span>
                      </div>
                      <h3 className="item-events__title">Downtown Summerlin Farmers Market</h3>
                      <div className="item-events__text">
                        Every Saturday 9am-2pm. Local produce, artisan goods, live music. 
                        Just 5 minutes from Centennial Hills - walk or bike via the trails!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="page__testimonial testimonials">
          <div className="container">
            <h2 className="section-title">What My Clients Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "Working with this team made buying our first home in Centennial Hills an absolute breeze. 
                  Their knowledge of the area and attention to detail exceeded our expectations."
                </p>
                <div className="testimonial-author">
                  <strong>Sarah & Mike Johnson</strong>
                  <span>First-time Homebuyers</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "After relocating from California, finding the right neighborhood was crucial. 
                  They helped us discover Centennial Hills and we couldn't be happier with our new home."
                </p>
                <div className="testimonial-author">
                  <strong>David Chen</strong>
                  <span>Relocation Client</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "Professional, responsive, and truly cared about finding us the perfect investment property. 
                  The market analysis and guidance were invaluable."
                </p>
                <div className="testimonial-author">
                  <strong>Jennifer Martinez</strong>
                  <span>Investment Property</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RealScout Integration */}
        <section className="realscout-section">
          <div className="container">
            <h2 className="section-title">Search All Available Properties</h2>
            <RealScoutWidget />
          </div>
        </section>

        {/* Call to Action */}
        <section className="page__outro cta-section">
          <div className="cta-container">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>
              Let's work together to find the perfect property in Centennial Hills. 
              With personalized service and expert local knowledge, your home buying journey starts here.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Get Started Today</button>
              <button className="btn btn-outline">Schedule Consultation</button>
            </div>
          </div>
        </section>
      </div>
      </main>
      </AIContentOptimizer>

      <LocalBusinessSchema 
        pageType="home" 
        additionalServices={["Luxury Home Sales", "New Construction", "Master-Planned Communities"]}
      />
      <GoogleBusinessOptimization pageType="home" />
    </React.Fragment>
    );
  } catch (error) {
    console.error('Home component error:', error);
    return (
      <div>
        <Head>
          <title>Centennial Hills Homes For Sale | Las Vegas Real Estate</title>
        </Head>
        <div className="error-fallback">
          <h1>Welcome to Centennial Hills Homes</h1>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }
}

export default Home;