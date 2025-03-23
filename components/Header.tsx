import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          Centennial Hills Homes For Sale
        </Link>
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
            About
          </Link>
          <Link 
            href="/listings" 
            className={router.pathname === '/listings' ? 'active' : ''}
          >
            Listings
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