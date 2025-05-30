
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dr. Jan Duffy, REALTOR®</h3>
            <p><strong>Berkshire Hathaway HomeServices</strong></p>
            <p>📞 Phone: (702) 903-1952</p>
            <p>🌐 Website: <a href="https://www.searchforhomeslasvegas.com/" target="_blank" rel="noopener">searchforhomeslasvegas.com</a></p>
            <p>📍 Serving: Centennial Hills, Providence, Skye Canyon</p>
            <p>⭐ Top 1% Las Vegas REALTOR® | 4.9/5 Rating</p>
            <p>🏢 Licensed Since September 1993</p>
            <div className="business-verification">
              <p><small>Verified Google Business Profile</small></p>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Service Areas</h3>
            <nav className="service-areas">
              <Link href="/centennial-hills">Centennial Hills</Link>
              <Link href="/providence-las-vegas">Providence</Link>
              <Link href="/skye-canyon">Skye Canyon</Link>
              <Link href="/neighborhoods">Summerlin</Link>
              <Link href="/northwest-las-vegas">Lone Mountain</Link>
              <a href="/neighborhoods">Aliante</a>
              <a href="/neighborhoods">Tule Springs</a>
              <a href="/neighborhoods">El Dorado</a>
            </nav>
          </div>

          <div className="footer-section">
            <h3>Our Services</h3>
            <nav className="services-nav">
              <a href="/listings">Luxury Property Sales</a>
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
              <Link href="/about">About Dr. Duffy</Link>
              <Link href="/listings">Current Listings</Link>
              <Link href="/market-update">Market Update</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.pinterest.com/DrJanDuffy/" target="_blank" rel="noopener noreferrer">Pinterest</a>
              <a href="https://www.linkedin.com/company/california-to-vegas-homes" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.youtube.com/@DrDuffy" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="business-info">
            <p><strong>Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®</strong></p>
            <p>Licensed Real Estate Professional | Berkshire Hathaway HomeServices | Since September 1993</p>
            <p>Specializing in North Las Vegas, Centennial Hills, and Master-Planned Communities</p>
          </div>
          <p>&copy; {new Date().getFullYear()} Dr. Jan Duffy, REALTOR®. All rights reserved. Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  );
} 
