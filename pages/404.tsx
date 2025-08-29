import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Custom404() {
  const router = useRouter();

  // Track 404s for monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', '404_error', {
        page_path: router.asPath,
        page_location: window.location.href,
      });
    }
  }, [router.asPath]);

  return (
    <Layout>
      <Head>
        <title>Page Not Found - Centennial Hills Homes | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Sorry, we couldn't find the page you're looking for. Browse our properties, explore neighborhoods, or contact Dr. Jan Duffy for assistance."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Error Display */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>

          {/* Helpful Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Were you looking for:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Link
                href="/properties"
                className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-blue-800">Browse Properties</h4>
                <p className="text-sm text-blue-600">View luxury homes for sale</p>
              </Link>

              <Link
                href="/neighborhoods"
                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-green-800">Explore Neighborhoods</h4>
                <p className="text-sm text-green-600">Discover Centennial Hills areas</p>
              </Link>

              <Link
                href="/market-data"
                className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-purple-800">Market Data</h4>
                <p className="text-sm text-purple-600">Latest real estate insights</p>
              </Link>

              <Link
                href="/buyers"
                className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-orange-800">Buyer&apos;s Guide</h4>
                <p className="text-sm text-orange-600">Complete home buying guide</p>
              </Link>

              <Link
                href="/area-explorer"
                className="block p-4 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-teal-800">Area Explorer</h4>
                <p className="text-sm text-teal-600">Interactive map & amenities</p>
              </Link>

              <Link
                href="/contact"
                className="block p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
              >
                <h4 className="font-medium text-red-800">Contact Dr. Jan Duffy</h4>
                <p className="text-sm text-red-600">Get personalized assistance</p>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Return to Homepage
            </Link>

            <div className="text-sm text-gray-500">
              <p>If you believe this is an error, please contact us at:</p>
              <p className="font-medium">(702) 903-1952 or jan@centennialhillshomes.com</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
