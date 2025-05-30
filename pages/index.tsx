import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import PropertyCalculator from '../components/PropertyCalculator';
import MarketTrendChart from '../components/MarketTrendChart';
import AdvancedSearch from '../components/AdvancedSearch';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import LocalAmenities from '../components/LocalAmenities';
import { searchImages } from '../utils/unsplash';

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
  const [images, setImages] = useState<string[]>([]);
  const [currentNeighborhood, setCurrentNeighborhood] = useState('Centennial Hills');

  useEffect(() => {
    const loadImages = async () => {
      // Use fallback images immediately for better UX
      const fallbackImages = [
        '/images/agent1.jpg',
        '/images/agent2.jpg', 
        '/images/agent3.jpg',
        '/images/agent1.jpg',
        '/images/agent2.jpg',
        '/images/agent3.jpg',
        '/images/agent1.jpg',
        '/images/agent2.jpg',
        '/images/agent3.jpg',
        '/images/agent1.jpg',
        '/images/agent2.jpg',
        '/images/agent3.jpg'
      ];

      setImages(fallbackImages);

      // Try to load Unsplash images in background
      try {
        const fetchedImages = await searchImages('real estate homes centennial hills luxury', 12);
        if (fetchedImages && fetchedImages.length > 0) {
          setImages(fetchedImages);
        }
      } catch (error) {
        // Silently fail and keep fallback images
        console.log('Using local images for better performance');
      }
    };
    loadImages();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Homes For Sale | Las Vegas Real Estate Expert</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find your dream home in Centennial Hills, Las Vegas. Browse luxury homes, condos, and townhomes for sale with expert real estate guidance." />
        <meta name="keywords" content="Centennial Hills homes, Las Vegas real estate, homes for sale, luxury homes, Nevada properties" />
        <meta property="og:title" content="Centennial Hills Homes For Sale | Las Vegas Real Estate Expert" />
        <meta property="og:description" content="Find your dream home in Centennial Hills, Las Vegas. Browse luxury homes, condos, and townhomes for sale." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://centennialhillshomesforsale.com" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "RealEstateAgent",
                "name": "Centennial Hills Homes For Sale",
                "description": "Expert real estate services in Centennial Hills, Las Vegas with over 10 years of local market experience",
                "url": "https://centennialhillshomesforsale.com",
                "areaServed": {
                  "@type": "Place",
                  "name": "Centennial Hills, Las Vegas, Nevada",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "36.268",
                    "longitude": "-115.328"
                  }
                },
                "serviceType": "Real Estate Sales",
                "priceRange": "$300,000 - $2,000,000",
                "telephone": "+1-702-555-0123",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "10161 Park Run Dr",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV",
                  "postalCode": "89145",
                  "addressCountry": "US"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "127",
                  "bestRating": "5"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is the average home price in Centennial Hills?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The median home price in Centennial Hills is $635,000 as of 2024, with homes ranging from $300,000 to over $2 million depending on size and location."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long do homes stay on the market in Centennial Hills?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Homes in Centennial Hills typically sell within 18 days on average, making it a competitive seller's market with strong demand."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What schools serve the Centennial Hills area?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Centennial Hills is served by top-rated Clark County schools including Centennial High School, Del Webb Middle School, and several elementary schools with ratings of 8+ out of 10."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </Head>

      <div className="wrapper">
        {/* Sticky neighborhood identifier */}
        <NeighborhoodBar 
          currentNeighborhood={currentNeighborhood}
          onNeighborhoodChange={setCurrentNeighborhood}
        />

        {/* Hero Section */}
        <section className="page__main hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Centennial Hills: Where Desert Luxury Meets Family Living</h1>
              <p className="hero-subtitle">
                Just 20 minutes from the Strip, discover master-planned communities like Providence, 
                Skye Canyon, and The Trails. Award-winning schools, championship golf courses, 
                and Red Rock Canyon at your doorstep.
              </p>
              <div className="local-highlights">
                <span className="highlight">🏫 Top-rated CCSD schools</span>
                <span className="highlight">⛰️ Red Rock Canyon views</span>
                <span className="highlight">🏌️ TPC Las Vegas nearby</span>
                <span className="highlight">🛍️ Downtown Summerlin 5 min</span>
              </div>
              <div className="hero-buttons">
                <button className="btn btn-primary">Browse Local Homes</button>
                <button className="btn btn-secondary">Neighborhood Tour</button>
              </div>
            </div>
            <div className="hero-image">
              {images[0] && (
                <img 
                  src={images[0]} 
                  alt="Beautiful Centennial Hills home" 
                  className="hero-img"
                />
              )}
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
            <div className="properties-grid">
              {[
                { id: '1', address: '8421 Providence Ranch Ave', price: '$675,000', beds: 4, baths: 3, sqft: 2850, status: 'For Sale', community: 'Providence' },
                { id: '2', address: '10115 Skye Ridge Park Ave', price: '$825,000', beds: 5, baths: 4, sqft: 3200, status: 'New Listing', community: 'Skye Canyon' },
                { id: '3', address: '9823 Canyon Vista Dr', price: '$750,000', beds: 4, baths: 3.5, sqft: 3100, status: 'Price Reduced', community: 'The Canyons' },
                { id: '4', address: '7654 Trails Village Cir', price: '$950,000', beds: 6, baths: 5, sqft: 4200, status: 'Luxury', community: 'The Trails' },
                { id: '5', address: '9156 Tournament Canyon Dr', price: '$695,000', beds: 4, baths: 3, sqft: 2900, status: 'For Sale', community: 'Tournament Hills' },
                { id: '6', address: '8877 Desert Foothills Dr', price: '$580,000', beds: 3, baths: 2.5, sqft: 2400, status: 'Open House', community: 'Desert Foothills' }
              ].map((property, index) => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    {images[index + 1] && (
                      <img 
                        src={images[index + 1]} 
                        alt={`Property at ${property.address}`}
                        loading="lazy"
                      />
                    )}
                    <div className="property-status">{property.status}</div>
                  </div>
                  <div className="property-details">
                    <div className="property-community">{property.community}</div>
                    <h3 className="property-address">{property.address}</h3>
                    <p className="property-price">{property.price}</p>
                    <div className="property-features">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <button className="btn btn-outline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Neighborhood Spotlight */}
        <section className="neighborhoods-section">
          <div className="container">
            <h2 className="section-title">Centennial Hills Communities</h2>
            <div className="neighborhoods-grid">
              <div className="neighborhood-card">
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

        {/* About Section */}
        <section className="page__about about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Your Centennial Hills Neighborhood Specialist</h2>
                <p>
                  Born and raised in Las Vegas, I've watched Centennial Hills transform from desert 
                  to one of the valley's premier family destinations. I know every master-planned 
                  community, every school boundary, and every hidden gem this area offers.
                </p>
                <p>
                  From Providence's family-friendly atmosphere to The Trails' luxury golf course living, 
                  I'll help you find the perfect Centennial Hills community that matches your lifestyle, 
                  budget, and dreams.
                </p>
                <div className="local-expertise">
                  <span className="expertise">📍 Native Las Vegan</span>
                  <span className="expertise">🏠 500+ CH homes sold</span>
                  <span className="expertise">🎓 School district expert</span>
                  <span className="expertise">⭐ 5-star local reviews</span>
                </div>
              </div>
              <div className="about-image">
                {images[7] && (
                  <img 
                    src={images[7]} 
                    alt="Local Centennial Hills real estate expert" 
                    className="agent-photo"
                  />
                )}
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
                  <li>Red Rock Casino Resort Buffet</li>
                  <li>Brio Tuscan Grille (Downtown Summerlin)</li>
                  <li>Yard House (Downtown Summerlin)</li>
                  <li>In-N-Out Burger (Fort Apache)</li>
                  <li>Flemings Prime Steakhouse</li>
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
              <a href="#contact" className="btn btn-primary">Get Started Today</a>
              <a href="tel:+1234567890" className="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}