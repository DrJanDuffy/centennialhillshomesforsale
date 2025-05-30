import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    // Prevent body scroll when menu is open
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <Link href="/" onClick={closeMenu} className="logo-link">
              <div className="logo">
                <h1>Dr. Jan Duffy</h1>
                <span className="subtitle">REALTOR® | Centennial Hills Expert</span>
                <div className="verification-badge">
                  <span className="verified">✅ Verified Google Business</span>
                  <span className="rating">⭐ 4.9/5 • Top 1% REALTOR®</span>
                </div>
              </div>
            </Link>
            <span className="tagline">Centennial Hills | Providence | Skye Canyon</span>
          </div>

          <div className="header-contact">
            <a href="tel:+17029031952" className="phone-number">(702) 903-1952</a>
          </div>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
            <div className="nav-overlay" onClick={closeMenu}></div>
            <div className="nav-menu">
              <Link 
                href="/" 
                className={router.pathname === '/' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={router.pathname === '/about' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                About Dr. Duffy
              </Link>
              <Link 
                href="/listings" 
                className={router.pathname === '/listings' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Listings
              </Link>
              <Link 
                href="/neighborhoods" 
                className={router.pathname === '/neighborhoods' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Neighborhoods
              </Link>
              <Link 
                href="/services" 
                className={router.pathname === '/services' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link 
                href="/market-update" 
                className={router.pathname === '/market-update' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Market Update
              </Link>
              <Link 
                href="/contact" 
                className={router.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}