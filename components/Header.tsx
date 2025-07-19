
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand Section */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu} className="block">
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dr. Jan Duffy
                </h1>
                <span className="text-sm text-gray-600 font-medium">
                  REALTOR® | Centennial Hills Expert
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    ✅ Verified Google Business
                  </span>
                  <span className="text-xs text-amber-600 font-medium">
                    ⭐ 4.9/5 • Top 1% REALTOR®
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Service Areas - Hidden on mobile */}
          <div className="hidden lg:block">
            <span className="text-sm text-gray-600 font-medium">
              Centennial Hills | Providence | Skye Canyon
            </span>
          </div>

          {/* Contact Info - Hidden on small screens */}
          <div className="hidden md:block">
            <a 
              href="tel:+17029031952" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              📞 (702) 903-1952
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 ${
              isMenuOpen ? 'open' : ''
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            {...(isMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/about' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </Link>
            <Link 
              href="/listings" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/listings' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Listings
            </Link>
            <Link 
              href="/neighborhoods" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/neighborhoods' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Neighborhoods
            </Link>
            <Link 
              href="/services" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/services' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === '/contact' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-6 space-y-4">
          {/* Mobile Contact */}
          <div className="pb-4 border-b border-gray-200">
            <a 
              href="tel:+17029031952" 
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              📞 (702) 903-1952
            </a>
          </div>

          {/* Mobile Service Areas */}
          <div className="text-center text-sm text-gray-600 font-medium pb-4 border-b border-gray-200">
            Centennial Hills | Providence | Skye Canyon
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-3">
            <Link 
              href="/" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/about' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              About Dr. Duffy
            </Link>
            <Link 
              href="/listings" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/listings' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Listings
            </Link>
            <Link 
              href="/neighborhoods" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/neighborhoods' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Neighborhoods
            </Link>
            <Link 
              href="/services" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/services' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              href="/market-update" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/market-update' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Market Update
            </Link>
            <Link 
              href="/contact" 
              className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                router.pathname === '/contact' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" 
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
}
