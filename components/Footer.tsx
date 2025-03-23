import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@centennialhillshomes.com</p>
            <p>Address: 123 Main St, Las Vegas, NV 89149</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Centennial Hills Homes For Sale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 