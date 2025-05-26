
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { searchImages } from '../utils/unsplash';
import { PropertyImage } from '../types/unsplash';

export default function Home() {
  const [featuredImages, setFeaturedImages] = useState<PropertyImage[]>([]);
  const [articleImages, setArticleImages] = useState<PropertyImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Fetch featured property images
        const images = await searchImages('luxury home centennial hills', 3);
        setFeaturedImages(images);

        // Fetch article images
        const articleImgs = await searchImages('real estate market las vegas', 3);
        setArticleImages(articleImgs);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <>
      <Head>
        <title>Centennial Hills Homes For Sale | Las Vegas Real Estate Expert</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find luxury Centennial Hills homes for sale with Dr. Jan Duffy, a trusted Las Vegas real estate expert with 20+ years experience in master-planned communities." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        
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

      <Layout>
        <div className="wrapper">
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
                
                <div className="featured-listings">
                  <div className="listing-grid">
                    {featuredImages.map((image, index) => (
                      <div key={image.id} className="listing-card">
                        <div className="listing-image">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            width={800}
                            height={600}
                            priority={index === 0}
                          />
                          <div className="listing-price">
                            {index === 0 ? '$749,900' : index === 1 ? '$899,000' : '$1,250,000'}
                          </div>
                        </div>
                        <div className="listing-details">
                          <h3>
                            {index === 0 ? 'Modern Luxury in Centennial Hills' : 
                             index === 1 ? 'Providence Estate with Views' : 
                             'Custom Lone Mountain Retreat'}
                          </h3>
                          <p>
                            {index === 0 ? '4 bed • 3.5 bath • 3,245 sqft' :
                             index === 1 ? '5 bed • 4 bath • 4,120 sqft' :
                             '6 bed • 5.5 bath • 5,340 sqft'}
                          </p>
                          <p>
                            {index === 0 ? '10234 Skye Canyon Drive' :
                             index === 1 ? '8756 Providence Heights Street' :
                             '6543 Lone Mountain View Court'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                
                <div className="market-stats">
                  <h3>Current Market Statistics</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <h4>Average Sale Price</h4>
                      <p className="stat-value">$725,000</p>
                      <p className="stat-change">+12% from last year</p>
                    </div>
                    <div className="stat-card">
                      <h4>Days on Market</h4>
                      <p className="stat-value">28</p>
                      <p className="stat-change">-15% from last month</p>
                    </div>
                    <div className="stat-card">
                      <h4>Available Homes</h4>
                      <p className="stat-value">142</p>
                      <p className="stat-change">New listings daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
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
            
            <section className="page__market market">
              <div className="market__container">
                <h2 className="market__title title">Las Vegas Real Estate Insider</h2>
                
                <div className="article-grid">
                  {articleImages.map((image, index) => (
                    <article key={image.id} className="article-card">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        width={800}
                        height={600}
                      />
                      <div className="article-content">
                        <h3>
                          {index === 0 ? '2024 Las Vegas Market Trends' :
                           index === 1 ? 'New Developments in Centennial Hills' :
                           'Your Guide to Master-Planned Communities'}
                        </h3>
                        <p>
                          {index === 0 ? 'Discover the latest trends shaping the Las Vegas real estate market, from luxury home features to buyer preferences.' :
                           index === 1 ? 'Explore upcoming residential and commercial developments in the Centennial Hills area.' :
                           'Everything you need to know about Las Vegas\'s premier master-planned communities.'}
                        </p>
                        <a href={`/blog/${index === 0 ? '2024-market-trends' : index === 1 ? 'new-developments' : 'community-guide'}`} className="read-more">Read More →</a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <motion.section 
              className="cta-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="cta-container">
                <h2>Ready to Find Your Dream Home in Centennial Hills?</h2>
                <p>Let Dr. Jan Duffy guide you through your home buying or selling journey with expert knowledge of Las Vegas real estate.</p>
                <div className="cta-buttons">
                  <motion.a 
                    href="/contact" 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Dr. Jan Duffy
                  </motion.a>
                  <motion.a 
                    href="/listings" 
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Current Listings
                  </motion.a>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
      </Layout>
    </>
  );
}
