import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Add any client-side initialization here
  }, []);

  return (
    <>
      <Head>
        <title>Centennial Hills Homes For Sale | Las Vegas Real Estate Expert</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/img/favicon.png" />
        
        {/* Structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Centennial Hills Homes For Sale | Las Vegas Real Estate Expert",
              "founder": {
                "@type": "Person",
                "name": "Dr. Jan Duffy",
                "jobTitle": "REALTOR®",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Berkshire Hathaway HomeServices"
                }
              },
              "description": "Find Centennial Hills homes for sale with Dr. Jan Duffy, a trusted expert in luxury and new-build Las Vegas homes with 20+ years experience in master-planned communities.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1490 Center Crossing Rd",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "postalCode": "89144"
              },
              "areaServed": ["Centennial Hills", "Skye Canyon", "Providence", "Lone Mountain", "North Las Vegas", "Summerlin", "Tule Springs", "Aliante"],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "06:00",
                  "closes": "21:00"
                }
              ],
              "telephone": "(702) 903-1952",
              "url": "https://www.centennialhillshomesforsale.com/",
              "sameAs": [
                "https://www.linkedin.com/company/california-to-vegas-homes",
                "https://www.instagram.com/drjanduffy/",
                "https://www.facebook.com/SummerlinNewHomesBHHS",
                "https://www.youtube.com/@DrDuffy",
                "https://www.pinterest.com/DrJanDuffy/"
              ],
              "priceRange": "$$$",
              "hasMap": "https://www.google.com/maps/place/1490+Center+Crossing+Rd,+Las+Vegas,+NV+89144",
              "award": "Top 1% of Las Vegas REALTORS®",
              "knowsLanguage": ["English", "American Sign Language", "Filipino", "French", "Korean", "Mandarin", "Russian", "Ukrainian"]
            })
          }}
        />
      </Head>

      <Script
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        type="module"
        strategy="lazyOnload"
      />

      <div className="wrapper">
        {/* Sticky neighborhood identifier */}
        <div className="neighborhood-bar">
          <p>Currently browsing: <strong>Centennial Hills</strong> <span className="change-neighborhood">Change</span></p>
        </div>
        
        <main className="page">
          <section className="page__main main">
            <div className="main__container">
              <h3 className="main__caption">Las Vegas Master-Planned Community Expert</h3>
              <h1 className="main__title">Luxury & New Homes in Centennial Hills & Providence</h1>
              <div className="main__text">
                Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert with 20+ years of experience in Las Vegas master-planned communities.
              </div>
              <div className="neighborhood-stats">
                <div className="stat">
                  <span className="stat-number">4.9/5</span>
                  <span className="stat-label">Client Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Top 1%</span>
                  <span className="stat-label">of Las Vegas REALTORS®</span>
                </div>
              </div>
              <div className="main__buttons">
                <a href="#featured-properties" className="main__button">View Featured Homes</a>
                <a href="#neighborhood-guide" className="main__button button_secondary">Explore Neighborhoods</a>
              </div>
            </div>
          </section>
          
          <section id="featured-properties" className="page__services services">
            <div className="services__container">
              <h2 className="services__title title">Featured Las Vegas Luxury Homes</h2>
              
              {/* RealScout Listings Widget */}
              <div className="realscout-widget-container">
                <realscout-office-listings 
                  agent-encoded-id="QWdlbnQtMjI1MDUw" 
                  sort-order="NEWEST" 
                  listing-status="Sold" 
                  property-types="SFR,MF,TC" 
                  price-min="500000">
                </realscout-office-listings>
              </div>
              
              <form className="valuation-form">
                <div className="form-group">
                  <label htmlFor="address">Street Address</label>
                  <input type="text" id="address" name="address" placeholder="123 Skye Canyon Street" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="yourname@example.com" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="(702) 555-1234" />
                </div>
                
                <button type="submit" className="outro__button button">Get Your Free Market Analysis</button>
              </form>
              
              {/* Homebot Widget */}
              <div className="homebot-widget-container">
                <h3>Track Your Home's Value Over Time</h3>
                <p>Get instant access to your home's current value, equity position, and wealth-building opportunities:</p>
                <div id="homebot_homeowner"></div>
              </div>
            </div>
          </section>
          
          {/* Community Events Calendar Section */}
          <section className="page__events events">
            <div className="events__container">
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
                      <span className="month">APR</span>
                      <span className="day">22</span>
                    </div>
                    <h3 className="item-events__title">Centennial Hills Home & Garden Expo</h3>
                    <div className="item-events__text">
                      Centennial Hills Community Center, 9am-4pm. Expert advice, local vendors, and inspiration for your home improvement projects.
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-all-container">
                <a href="/events" className="view-all button">View Full Community Calendar</a>
              </div>
            </div>
          </section>
          
          {/* Market Update Section with Blog Posts */}
          <section className="page__market market">
            <div className="market__container">
              <h2 className="market__title title">Las Vegas Real Estate Insider</h2>
              
              {/* Market Update Listings */}
              <div className="market-update-listings">
                <h3>Just Listed This Week</h3>
                <realscout-office-listings 
                  agent-encoded-id="QWdlbnQtMjI1MDUw" 
                  sort-order="NEWEST" 
                  listing-status="For Sale,For Rent" 
                  property-types="SFR,MF,TC" 
                  price-min="500000">
                </realscout-office-listings>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
} 