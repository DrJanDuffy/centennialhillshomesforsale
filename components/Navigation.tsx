import React, { useState } from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="awesome-nav">
      <div className="container mx-auto flex justify-between items-center px-6 h-full">
        <Link href="/" className="text-2xl font-bold text-white hover:scale-110 transition-transform duration-300">
          🏡 <span className="awesome-highlight">Centennial Hills</span> Homes
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 items-center h-full">
          <Link href="/" className="awesome-nav-link">🏠 Home</Link>
          <Link href="/about" className="awesome-nav-link">👋 About</Link>
          <Link href="/services" className="awesome-nav-link">⭐ Services</Link>
          <Link href="/listings" className="awesome-nav-link">📋 Listings</Link>
          <Link href="/neighborhoods" className="awesome-nav-link">🏘️ Areas</Link>
          <Link href="/contact" className="awesome-nav-link">📞 Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl hover:scale-110 transition-transform"
          onClick={toggleMenu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 slide-in-up">
          <div className="flex flex-col space-y-2 px-6">
            <Link href="/" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
            <Link href="/about" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>👋 About</Link>
            <Link href="/services" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>⭐ Services</Link>
            <Link href="/listings" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>📋 Listings</Link>
            <Link href="/neighborhoods" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>🏘️ Areas</Link>
            <Link href="/contact" className="awesome-nav-link block" onClick={() => setIsMenuOpen(false)}>📞 Contact</Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .awesome-nav-link {
          color: white;
          text-decoration: none;
          padding: 0 16px; /* Use horizontal padding only */
          margin: 0 4px;
          border-radius: 20px;
          transition: all 0.3s ease;
          font-weight: 500;
          display: flex; /* Change to flex for better alignment */
          align-items: center; /* Center items vertically */
          justify-content: center; /* Center items horizontally */
          font-size: 0.95rem;
          white-space: nowrap;
          line-height: 1.2; /* Prevent text from adding extra height */
          height: 100%; /* Ensure link takes full height */
          min-height: 44px; /* Minimum touch target size */
        }

        .awesome-nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .awesome-nav-link:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .awesome-nav-link:hover:before {
          left: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;