import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Dr. Jan Duffy</h3>
            <p className="text-gray-300 mb-4">
              Top 1% REALTOR® specializing in luxury homes and master-planned communities in
              Centennial Hills, Las Vegas.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Centennial Hills, Las Vegas, NV</p>
              <p>📞 (702) 903-1952</p>
              <p>✉️ jan@centennialhillshomes.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link
                  href="/market-data"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Market Data
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/buyers" className="text-gray-300 hover:text-white transition-colors">
                  Buyers
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq-schema"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Market Insights */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Market Insights</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-300 mb-3">
                Stay informed with the latest real estate trends and market analysis
              </p>
              <Link
                href="/market-insights"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                View Latest Insights
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* RSS Feed Links */}
              <div className="pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Subscribe to RSS Feeds:</p>
                <div className="space-y-1">
                  <a
                    href="/api/rss-feed"
                    className="block text-xs text-gray-400 hover:text-blue-400 transition-colors"
                    title="Centennial Hills Market Insights RSS Feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📊 Market Insights RSS
                  </a>
                  <a
                    href="https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18"
                    className="block text-xs text-gray-400 hover:text-blue-400 transition-colors"
                    title="Simplifying the Market RSS Feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🏠 Industry News RSS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Dr. Jan Duffy. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
