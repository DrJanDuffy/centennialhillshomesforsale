import { NextResponse } from 'next/server';

// Valid paths that should not redirect
const validPaths = [
  '/',
  '/about',
  '/contact',
  '/properties',
  '/neighborhoods',
  '/market-data',
  '/area-explorer',
  '/buyers',
  '/blog',
  '/faq',
  '/faq-schema',
  '/services',
  '/testimonials',
  '/listings',
  '/market-update',
  '/featured-home',
  '/centennial-hills',
  '/providence-las-vegas',
  '/skye-canyon',
  '/northwest-las-vegas',
  '/las-vegas-89149',
  '/las-vegas-89166',
  '/business-verification',
  '/local-business-optimization',
  '/seo-improvements',
  '/taskmaster',
];

// Common typos and variations that should redirect
const redirectMap = {
  '/buyer': '/buyers',
  '/neighborhood': '/neighborhoods',
  '/blogs': '/blog',
  '/property': '/properties',
  '/market': '/market-data',
  '/explorer': '/area-explorer',
  '/faqs': '/faq-schema',
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/homes': '/properties',
  '/houses': '/properties',
  '/real-estate': '/properties',
  '/las-vegas': '/centennial-hills',
  '/centennial': '/centennial-hills',
  '/providence': '/providence-las-vegas',
  '/skye': '/skye-canyon',
};

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const hostname = request.headers.get('host') || '';

  // Log all requests for monitoring (optional)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Middleware processing: ${pathname} from ${hostname}`);
  }

  // Handle HTTP to HTTPS redirects
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    console.log(`Redirecting HTTP to HTTPS: ${request.url} → ${httpsUrl.toString()}`);
    return NextResponse.redirect(httpsUrl, 301); // Permanent redirect
  }

  // REMOVED: www to non-www redirect logic to prevent redirect loops
  // Your domain should be configured to use www as the primary domain
  // If you need to redirect www to non-www, configure this at the DNS/CDN level instead

  // Handle common typos and variations
  if (redirectMap[pathname]) {
    const destination = redirectMap[pathname];
    console.log(`Redirecting ${pathname} to ${destination}`);
    url.pathname = destination;
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Handle trailing slashes (remove them)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newPathname = pathname.slice(0, -1);
    console.log(`Removing trailing slash: ${pathname} → ${newPathname}`);
    url.pathname = newPathname;
    return NextResponse.redirect(url, 301);
  }

  // Handle search queries (redirect to home with noindex)
  if (pathname === '/search' || pathname.startsWith('/search?')) {
    console.log(`Blocking search query: ${pathname}`);
    url.pathname = '/';
    return NextResponse.redirect(url, 302); // Temporary redirect
  }

  // Log potential 404s for monitoring
  if (
    !validPaths.includes(pathname) &&
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/api/') &&
    !pathname.includes('.')
  ) {
    console.warn(`Potential 404 path detected: ${pathname}`);

    // Optional: Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // You could send this to an error tracking service
      console.error(`404 detected: ${pathname}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
