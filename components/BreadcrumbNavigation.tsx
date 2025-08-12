import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type React from 'react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items = [],
  showHome = true,
}) => {
  const router = useRouter();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({
        name: 'Home',
        href: '/',
      });
    }

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Convert segment to readable name
      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs();

  // Generate schema markup for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://centennialhillshomesforsale.com${item.href}`,
    })),
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}

                {index === breadcrumbItems.length - 1 ? (
                  // Current page (not clickable)
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.name === 'Home' ? <Home className="w-4 h-4" /> : item.name}
                  </span>
                ) : (
                  // Clickable breadcrumb
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    {item.name === 'Home' ? <Home className="w-4 h-4" /> : item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default BreadcrumbNavigation;
