import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="container">
        <div className="header-brand">
          <Link href="/" className="logo">
            Dr. Jan Duffy, REALTOR®
          </Link>
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