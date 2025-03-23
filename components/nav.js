import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Navigation Component
function Navigation() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const nav = document.querySelector('.main-nav');

      if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
      }

      if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo" aria-label="Centennial Hills Homes For Sale">
          <img src="https://via.placeholder.com/150x50" alt="Centennial Hills Homes For Sale" width="150" height="50" loading="eager" />
        </Link>

        <button 
          className="nav-toggle" 
          aria-expanded={isOpen} 
          aria-controls="nav-menu" 
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <div className={`nav-menu ${isOpen ? 'is-open' : ''}`} id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}>
                <span className="nav-icon">ℹ️</span>
                <span className="nav-text">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/listings" className={`nav-link ${currentPath === '/listings' ? 'active' : ''}`}>
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Listings</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" aria-expanded="false">
                <span className="nav-icon">📍</span>
                <span className="nav-text">Neighborhoods</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className="dropdown-menu">
                <div className="dropdown-grid">
                  <Link href="/neighborhoods/skye-canyon" className="dropdown-item">
                    <span className="dropdown-icon">🏔️</span>
                    <span className="dropdown-text">Skye Canyon</span>
                  </Link>
                  <Link href="/neighborhoods/providence" className="dropdown-item">
                    <span className="dropdown-icon">🌳</span>
                    <span className="dropdown-text">Providence</span>
                  </Link>
                  <Link href="/neighborhoods/centennial-hills" className="dropdown-item">
                    <span className="dropdown-icon">🏘️</span>
                    <span className="dropdown-text">Centennial Hills</span>
                  </Link>
                  <Link href="/neighborhoods/lone-mountain" className="dropdown-item">
                    <span className="dropdown-icon">⛰️</span>
                    <span className="dropdown-text">Lone Mountain</span>
                  </Link>
                  <Link href="/neighborhoods/summerlin" className="dropdown-item">
                    <span className="dropdown-icon">🌴</span>
                    <span className="dropdown-text">Summerlin</span>
                  </Link>
                  <Link href="/neighborhoods/tule-springs" className="dropdown-item">
                    <span className="dropdown-icon">🌵</span>
                    <span className="dropdown-text">Tule Springs</span>
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link href="/market-update" className={`nav-link ${currentPath === '/market-update' ? 'active' : ''}`}>
                <span className="nav-icon">📊</span>
                <span className="nav-text">Market Update</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/buyers" className={`nav-link ${currentPath === '/buyers' ? 'active' : ''}`}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Buyers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sellers" className={`nav-link ${currentPath === '/sellers' ? 'active' : ''}`}>
                <span className="nav-icon">💰</span>
                <span className="nav-text">Sellers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>
                <span className="nav-icon">📞</span>
                <span className="nav-text">Contact</span>
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <Link href="/homebot" className="btn btn-primary">
              <span className="btn-icon">💎</span>
              <span className="btn-text">Home Value</span>
            </Link>
            <a href="tel:+17025551234" className="btn btn-outline">
              <span className="btn-icon">📞</span>
              <span className="btn-text">(702) 555-1234</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 