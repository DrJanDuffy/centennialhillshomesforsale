import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="container">
        <div className="header-brand">
          <div className="logo">
            <Link href="/">
              <h1>Dr. Jan Duffy</h1>
              <span className="subtitle">REALTOR® | Centennial Hills Expert</span>
              <div className="verification-badge">
                <span className="verified">✅ Verified Google Business</span>
                <span className="rating">⭐ 4.9/5 • Top 1% REALTOR®</span>
              </div>
            </Link>
          </div>
          <span className="tagline">Centennial Hills | Providence | Skye Canyon</span>
        </div>
        <div className="header-contact">
          <a href="tel:+17029031952" className="phone-number">(702) 903-1952</a>
        </div>
        <nav className="nav">
          <Link 
            href="/" 
            className={router.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={router.pathname === '/about' ? 'active' : ''}
          >
            About Dr. Duffy
          </Link>
          <Link 
            href="/listings" 
            className={router.pathname === '/listings' ? 'active' : ''}
          >
            Listings
          </Link>
          <Link 
            href="/services" 
            className={router.pathname === '/services' ? 'active' : ''}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className={router.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}