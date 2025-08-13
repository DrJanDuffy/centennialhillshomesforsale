import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      <div className="header-content">
        {/* Logo and Brand Section */}
        <div className="header-brand">
          <Link href="/" onClick={closeMenu} className="logo">
            <div className="flex flex-col justify-center py-1">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-color to-secondary-color bg-clip-text text-transparent leading-tight">
                Dr. Jan Duffy
              </h1>
              <span className="text-xs sm:text-sm text-secondary font-medium leading-tight">
                REALTOR® | Centennial Hills Expert
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mt-0.5">
                <span className="inline-flex items-center text-xs bg-accent-color/10 text-accent-color px-1.5 py-0.5 rounded-full font-semibold">
                  ✅ Verified Google Business
                </span>
                <span className="text-xs text-warning-color font-medium">
                  ⭐ 4.9/5 • Top 1% REALTOR®
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Moved to center */}
        <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link
            href="/properties"
            className={`nav-link ${router.pathname === '/properties' ? 'active' : ''}`}
          >
            Properties
          </Link>
          <Link
            href="/neighborhoods"
            className={`nav-link ${router.pathname === '/neighborhoods' ? 'active' : ''}`}
          >
            Neighborhoods
          </Link>
          <Link
            href="/market-data"
            className={`nav-link ${router.pathname === '/market-data' ? 'active' : ''}`}
          >
            Market Data
          </Link>
          <Link
            href="/area-explorer"
            className={`nav-link ${router.pathname === '/area-explorer' ? 'active' : ''}`}
          >
            Area Explorer
          </Link>
          <Link
            href="/faq-schema"
            className={`nav-link ${router.pathname === '/faq-schema' ? 'active' : ''}`}
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right side elements */}
        <div className="flex items-center space-x-4">
          {/* Service Areas - Hidden on mobile */}
          <div className="hidden lg:block">
            <span className="text-sm text-secondary font-medium">
              Centennial Hills | Providence | Skye Canyon
            </span>
          </div>

          {/* Contact Info - Hidden on small screens */}
          <div className="hidden md:block">
            <a href="tel:+17029031952" className="phone-number">
              📞 (702) 903-1952
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            data-mobile-menu="true"
            {...(isMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`nav ${isMenuOpen ? 'nav--open' : ''}`} data-mobile-menu-content="true">
        <div className="nav-menu">
          {/* Mobile Contact */}
          <div className="pb-4 border-b border-primary">
            <a
              href="tel:+17029031952"
              className="phone-number w-full justify-center"
              onClick={closeMenu}
            >
              📞 (702) 903-1952
            </a>
          </div>

          {/* Mobile Service Areas */}
          <div className="text-center text-sm text-secondary font-medium pb-4 border-b border-primary">
            Centennial Hills | Providence | Skye Canyon
          </div>

          {/* Mobile Navigation Links */}
          <Link
            href="/"
            className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`nav-link ${router.pathname === '/properties' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Properties
          </Link>
          <Link
            href="/neighborhoods"
            className={`nav-link ${router.pathname === '/neighborhoods' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Neighborhoods
          </Link>
          <Link
            href="/market-data"
            className={`nav-link ${router.pathname === '/market-data' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Market Data
          </Link>
          <Link
            href="/area-explorer"
            className={`nav-link ${router.pathname === '/area-explorer' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Area Explorer
          </Link>
          <Link
            href="/faq-schema"
            className={`nav-link ${router.pathname === '/faq-schema' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Dr. Duffy
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="nav-overlay active" onClick={closeMenu} />}
    </header>
  );
}
