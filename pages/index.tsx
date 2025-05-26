
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import { fetchUnsplashImages } from '../utils/unsplash';

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

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchUnsplashImages('real estate homes', 12);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading images:', error);
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Centennial Hills Homes For Sale",
              "description": "Expert real estate services in Centennial Hills, Las Vegas",
              "url": "https://centennialhillshomesforsale.com",
              "areaServed": "Centennial Hills, Las Vegas, Nevada",
              "serviceType": "Real Estate Sales"
            })
          }}
        />
      </Head>

      <div className="wrapper">
        {/* Sticky neighborhood identifier */}
        <div className="neighborhood-bar">
          <p>Currently browsing: <strong>Centennial Hills</strong> <span className="change-neighborhood">Change</span></p>
        </div>

        {/* Hero Section */}
        <section className="page__main hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Find Your Dream Home in Centennial Hills</h1>
              <p className="hero-subtitle">
                Discover luxury living in one of Las Vegas's most prestigious neighborhoods. 
                From stunning single-family homes to modern condos, find your perfect property today.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Browse Properties</button>
                <button className="btn btn-secondary">Schedule Tour</button>
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

        {/* Quick Search */}
        <section className="quick-search">
          <div className="container">
            <div className="search-form">
              <h2>Quick Property Search</h2>
              <form className="search-filters">
                <div className="filter-group">
                  <label>Property Type</label>
                  <select>
                    <option>All Types</option>
                    <option>Single Family</option>
                    <option>Townhome</option>
                    <option>Condo</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Price Range</label>
                  <select>
                    <option>Any Price</option>
                    <option>$400K - $600K</option>
                    <option>$600K - $800K</option>
                    <option>$800K+</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Bedrooms</label>
                  <select>
                    <option>Any</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="page__services featured-properties">
          <div className="container">
            <h2 className="section-title">Featured Properties</h2>
            <div className="properties-grid">
              {[
                { id: '1', address: '123 Desert Vista Dr', price: '$675,000', beds: 4, baths: 3, sqft: 2850, status: 'For Sale' },
                { id: '2', address: '456 Canyon Ridge Ct', price: '$825,000', beds: 5, baths: 4, sqft: 3200, status: 'New Listing' },
                { id: '3', address: '789 Mountain View Ln', price: '$750,000', beds: 4, baths: 3.5, sqft: 3100, status: 'Price Reduced' },
                { id: '4', address: '321 Sunset Hills Ave', price: '$950,000', beds: 6, baths: 5, sqft: 4200, status: 'Luxury' },
                { id: '5', address: '654 Providence Dr', price: '$695,000', beds: 4, baths: 3, sqft: 2900, status: 'For Sale' },
                { id: '6', address: '987 Skye Canyon Blvd', price: '$580,000', beds: 3, baths: 2.5, sqft: 2400, status: 'Open House' }
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
        </section>

        {/* About Section */}
        <section className="page__about about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Your Trusted Centennial Hills Real Estate Expert</h2>
                <p>
                  With over 15 years of experience in Las Vegas real estate, I specialize in helping 
                  families find their perfect home in Centennial Hills. Known for its excellent schools, 
                  family-friendly neighborhoods, and stunning mountain views, Centennial Hills offers 
                  the perfect blend of suburban comfort and urban convenience.
                </p>
                <p>
                  Whether you're a first-time buyer, looking to upgrade, or investing in property, 
                  I'm here to guide you through every step of the process with personalized service 
                  and deep local market knowledge.
                </p>
                <div className="credentials">
                  <span className="credential">Licensed Nevada Realtor</span>
                  <span className="credential">Certified Luxury Home Specialist</span>
                  <span className="credential">Top 1% Agent in Las Vegas</span>
                </div>
              </div>
              <div className="about-image">
                {images[7] && (
                  <img 
                    src={images[7]} 
                    alt="Professional real estate agent" 
                    className="agent-photo"
                  />
                )}
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
                        Providence Master Planned Community, 10am-3pm. Family-friendly event with local vendors, food trucks, and entertainment.
                      </div>
                    </div>
                  </div>
                  <div className="events__column">
                    <div className="events__item item-events">
                      <div className="event-date">
                        <span className="month">APR</span>
                        <span className="day">15</span>
                      </div>
                      <h3 className="item-events__title">Skye Canyon Chalk & Cheers</h3>
                      <div className="item-events__text">
                        Skye Canyon Park, 11am-6pm. Annual art festival with live music, local food, and activities for the whole family.
                      </div>
                    </div>
                  </div>
                  <div className="events__column">
                    <div className="events__item item-events">
                      <div className="event-date">
                        <span className="month">MAY</span>
                        <span className="day">20</span>
                      </div>
                      <h3 className="item-events__title">Centennial Hills Farmers Market</h3>
                      <div className="item-events__text">
                        Every Saturday at Downtown Summerlin, 9am-2pm. Fresh produce, artisanal goods, and community connections.
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
