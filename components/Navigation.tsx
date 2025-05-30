import Link from 'next/link';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/listings', label: 'Listings' },
    { href: '/neighborhoods', label: 'Neighborhoods' },
    { href: '/market-update', label: 'Market Update' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navigation ${className}`}>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.href} className="nav-item">
            <Link href={item.href} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;