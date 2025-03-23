import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { track } from '@vercel/analytics';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');
  const router = useRouter();

  const handleNavigation = (path, label) => {
    track('Navigation Click', {
      path,
      label,
      location: 'main-nav'
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    track('Neighborhood Dropdown', {
      action: !isDropdownOpen ? 'open' : 'close',
      location: 'main-nav'
    });
  };

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
    track('Mobile Menu', {
      action: !isOpen ? 'open' : 'close',
      location: 'main-nav'
    });
  };

  const handleHomeValueClick = () => {
    track('Home Value Button Click', {
      location: 'main-nav'
    });
  };

  const handlePhoneClick = () => {
    track('Phone Call Click', {
      location: 'main-nav',
      phone: '(702) 555-1234'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        setScrollDirection('');
        return;
      }

      if (currentScroll > lastScroll && !scrollDirection.includes('scroll-down')) {
        setScrollDirection('scroll-down');
      } else if (currentScroll < lastScroll && scrollDirection.includes('scroll-down')) {
        setScrollDirection('scroll-up');
      }
      
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll, scrollDirection]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
      if (isOpen && !e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isDropdownOpen]);

  return (
    <nav className={`main-nav ${scrollDirection}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link href="/" onClick={() => handleNavigation('/', 'Home Logo')} className="nav-logo" aria-label="Centennial Hills Homes For Sale">
          <Image src="/images/logo.png" alt="Centennial Hills Homes For Sale" width={150} height={50} priority />
        </Link>

        <button 
          className="nav-toggle" 
          aria-expanded={isOpen} 
          aria-controls="nav-menu" 
          aria-label="Toggle navigation"
          onClick={handleMobileMenuToggle}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <div className={`nav-menu ${isOpen ? 'is-open' : ''}`} id="nav-menu">
          <ul className="nav-list">
            {[
              { path: '/', icon: '🏠', text: 'Home' },
              { path: '/about', icon: 'ℹ️', text: 'About' },
              { path: '/listings', icon: '🏠', text: 'Listings' },
              { path: '/market-update', icon: '📊', text: 'Market Update' },
              { path: '/buyers', icon: '👥', text: 'Buyers' },
              { path: '/sellers', icon: '💰', text: 'Sellers' },
              { path: '/contact', icon: '📞', text: 'Contact' }
            ].map(({ path, icon, text }) => (
              <li key={path} className="nav-item">
                <Link 
                  href={path} 
                  className={`nav-link ${router.pathname === path ? 'active' : ''}`}
                  onClick={() => handleNavigation(path, text)}
                >
                  <span className="nav-icon">{icon}</span>
                  <span className="nav-text">{text}</span>
                </Link>
              </li>
            ))}
            
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                aria-expanded={isDropdownOpen}
                onClick={handleDropdownToggle}
              >
                <span className="nav-icon">📍</span>
                <span className="nav-text">Neighborhoods</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'is-open' : ''}`}>
                <div className="dropdown-grid">
                  {[
                    { path: '/neighborhoods/skye-canyon', icon: '🏔️', text: 'Skye Canyon' },
                    { path: '/neighborhoods/providence', icon: '🌳', text: 'Providence' },
                    { path: '/neighborhoods/centennial-hills', icon: '🏘️', text: 'Centennial Hills' },
                    { path: '/neighborhoods/lone-mountain', icon: '⛰️', text: 'Lone Mountain' },
                    { path: '/neighborhoods/summerlin', icon: '🌴', text: 'Summerlin' },
                    { path: '/neighborhoods/tule-springs', icon: '🌵', text: 'Tule Springs' }
                  ].map(({ path, icon, text }) => (
                    <Link 
                      key={path}
                      href={path} 
                      className="dropdown-item"
                      onClick={() => handleNavigation(path, text)}
                    >
                      <span className="dropdown-icon">{icon}</span>
                      <span className="dropdown-text">{text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <div className="nav-actions">
            <Link 
              href="/homebot" 
              className="btn btn-primary"
              onClick={handleHomeValueClick}
            >
              <span className="btn-icon">💎</span>
              <span className="btn-text">Home Value</span>
            </Link>
            <a 
              href="tel:+17025551234" 
              className="btn btn-outline"
              onClick={handlePhoneClick}
            >
              <span className="btn-icon">📞</span>
              <span className="btn-text">(702) 555-1234</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 