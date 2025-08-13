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
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Dr. Jan Duffy
                </h1>
                <p className="text-sm text-gray-600">
                  REALTOR® | Centennial Hills Expert
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/' ? 'text-blue-600 font-semibold' : ''}`}>
              Home
            </Link>
            <Link href="/properties" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/properties' ? 'text-blue-600 font-semibold' : ''}`}>
              Properties
            </Link>
            <Link href="/neighborhoods" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/neighborhoods' ? 'text-blue-600 font-semibold' : ''}`}>
              Neighborhoods
            </Link>
            <Link href="/market-data" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/market-data' ? 'text-blue-600 font-semibold' : ''}`}>
              Market Data
            </Link>
            <Link href="/area-explorer" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/area-explorer' ? 'text-blue-600 font-semibold' : ''}`}>
              Area Explorer
            </Link>
            <Link href="/faq-schema" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/faq-schema' ? 'text-blue-600 font-semibold' : ''}`}>
              FAQ
            </Link>
            <Link href="/about" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/about' ? 'text-blue-600 font-semibold' : ''}`}>
              About
            </Link>
            <Link href="/contact" className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/contact' ? 'text-blue-600 font-semibold' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="/" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/' ? 'text-blue-600 font-semibold' : ''}`}>
                Home
              </Link>
              <Link href="/properties" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/properties' ? 'text-blue-600 font-semibold' : ''}`}>
                Properties
              </Link>
              <Link href="/neighborhoods" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/neighborhoods' ? 'text-blue-600 font-semibold' : ''}`}>
                Neighborhoods
              </Link>
              <Link href="/market-data" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/market-data' ? 'text-blue-600 font-semibold' : ''}`}>
                Market Data
              </Link>
              <Link href="/area-explorer" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/area-explorer' ? 'text-blue-600 font-semibold' : ''}`}>
                Area Explorer
              </Link>
              <Link href="/faq-schema" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/faq-schema' ? 'text-blue-600 font-semibold' : ''}`}>
                FAQ
              </Link>
              <Link href="/about" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/about' ? 'text-blue-600 font-semibold' : ''}`}>
                About
              </Link>
              <Link href="/contact" onClick={closeMenu} className={`text-gray-700 hover:text-blue-600 transition-colors ${router.pathname === '/contact' ? 'text-blue-600 font-semibold' : ''}`}>
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/contact" onClick={closeMenu} className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
