import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Berkshire Hathaway HomeServices Nevada Properties</h3>
            <p><strong>Your Trusted Las Vegas Real Estate Experts</strong></p>
            <p>📞 Phone: (702) 903-1952</p>
            <p>🌐 Website: <a href="https://www.searchforhomeslasvegas.com/" target="_blank" rel="noopener">searchforhomeslasvegas.com</a></p>
            <p>📍 Serving: Centennial Hills, Providence, Skye Canyon</p>
            <p>⭐ Top 1% Las Vegas REALTOR® | 4.9/5 Rating</p>
            <p>🏢 Licensed Since September 1993</p>

            <div className="business-verification">
              <p><small>✅ Verified Google Business Profile</small></p>
              <p><small>📋 Nevada RE License: Active</small></p>
              <p><small>🏢 Berkshire Hathaway HomeServices Nevada Properties</small></p>
              <p><small>🏆 Las Vegas Board of REALTORS® Member</small></p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Our Offices</h3>
            <div className="offices-grid">
              <div className="office">
                <h4>Centennial Hills</h4>
                <p>9406 Del Webb Boulevard,<br/>Las Vegas, NV 89134</p>
                <p><strong>(702) 718-0043</strong></p>
              </div>

              <div className="office">
                <h4>Henderson</h4>
                <p>3185 St Rose Pkwy, Suite 101,<br/>Henderson, NV 89052</p>
                <p><strong>(702) 500-1955</strong></p>
              </div>

              <div className="office">
                <h4>Sahara</h4>
                <p>7475 W Sahara Ave #100,<br/>Las Vegas, NV 89117</p>
                <p><strong>(702) 299-6607</strong></p>
              </div>

              <div className="office">
                <h4>Sunset</h4>
                <p>8850 W Sunset Rd UNIT 200,<br/>Las Vegas, NV 89148</p>
                <p><strong>(702) 500-1942</strong></p>
              </div>

              <div className="office">
                <h4>Lone Mountain</h4>
                <p>10777 W Twain Ave #333,<br/>Las Vegas, NV 89129</p>
                <p><strong>(702) 678-9012</strong></p>
              </div>

              <div className="office">
                <h4>Summerlin</h4>
                <p>1490 Center Crossing Rd,<br/>Las Vegas, NV 89144</p>
                <p><strong>(702) 903-1952</strong></p>
              </div>

              <div className="office">
                <h4>North Las Vegas</h4>
                <p>921 South Main Street,<br/>Las Vegas, NV 89101</p>
                <p><strong>(702) 500-1980</strong></p>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>🌟 Discover the Finest Neighborhoods in Las Vegas</h3>
            <nav className="service-areas">
              <Link href="/centennial-hills">🏠 Centennial Hills - Suburban charm and urban convenience</Link>
              <Link href="/providence-las-vegas">🏡 Providence - Master-planned luxury</Link>
              <Link href="/skye-canyon">🌄 Skye Canyon - Mountain views and modern living</Link>
              <Link href="/neighborhoods">🏡 Summerlin North & West - Top-tier schools</Link>
              <Link href="/northwest-las-vegas">🌄 Lone Mountain & Heights - Breathtaking views</Link>
              <a href="/neighborhoods">Aliante - Family-friendly community</a>
              <a href="/neighborhoods">Tule Springs - Emerging neighborhoods</a>
              <a href="/neighborhoods">El Dorado - Established community</a>
            </nav>
          </div>

          <div className="footer-section">
            <h3>Our Services</h3>
            <nav className="services-nav">
              <a href="/listings">Residential Sales</a>
              <a href="/contact">Luxury Property Sales</a>
              <a href="/contact">First-time Home Buyers</a>
              <a href="/contact">Commercial Property</a>
              <a href="/contact">Building Lot Sales</a>
              <a href="/contact">Relocation Services</a>
              <a href="/market-update">Market Analysis</a>
            </nav>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/listings">Current Listings</Link>
              <Link href="/market-update">Blog</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/services">Privacy Policy</Link>
              <Link href="/services">Terms of Service</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="business-info">
            <p><strong>Dr. Jan Duffy, REALTOR® | Berkshire Hathaway HomeServices Nevada Properties</strong></p>
            <p>Licensed Real Estate Professional | Since September 1993</p>
            <p>Specializing in North Las Vegas, Centennial Hills, and Master-Planned Communities</p>
          </div>
          <p>&copy; {new Date().getFullYear()} Berkshire Hathaway HomeServices Nevada Property. All Rights Reserved.</p>
          <p>Equal Housing Opportunity</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;