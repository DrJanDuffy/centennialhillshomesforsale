import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="awesome-footer">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">🏡 Centennial Hills Homes</h3>
            <p className="awesome-text">
              Your trusted partner in finding the perfect home in Las Vegas's most prestigious community.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-lg">🗺️ Areas We Serve</h4>
            <ul className="space-y-2">
              <li><Link href="/centennial-hills" className="hover:text-pink-300 transition-colors">Centennial Hills</Link></li>
              <li><Link href="/providence-las-vegas" className="hover:text-pink-300 transition-colors">Providence</Link></li>
              <li><Link href="/skye-canyon" className="hover:text-pink-300 transition-colors">Skye Canyon</Link></li>
              <li><Link href="/northwest-las-vegas" className="hover:text-pink-300 transition-colors">Northwest Las Vegas</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-lg">⚡ Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/listings" className="hover:text-pink-300 transition-colors">Current Listings</Link></li>
              <li><Link href="/market-update" className="hover:text-pink-300 transition-colors">Market Updates</Link></li>
              <li><Link href="/services" className="hover:text-pink-300 transition-colors">Our Services</Link></li>
              <li><Link href="/testimonials" className="hover:text-pink-300 transition-colors">Client Reviews</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-lg">📞 Contact Info</h4>
            <div className="space-y-2 awesome-text">
              <p>📧 info@centennialhillshomes.com</p>
              <p>📱 (702) 555-HOMES</p>
              <p>📍 Las Vegas, Nevada</p>
              <p>🕒 Available 7 Days a Week</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <span className="text-2xl cursor-pointer hover:scale-125 transition-transform">🌟</span>
            <span className="text-2xl cursor-pointer hover:scale-125 transition-transform">🏠</span>
            <span className="text-2xl cursor-pointer hover:scale-125 transition-transform">💎</span>
            <span className="text-2xl cursor-pointer hover:scale-125 transition-transform">🌴</span>
            <span className="text-2xl cursor-pointer hover:scale-125 transition-transform">✨</span>
          </div>
          <p className="awesome-text">
            &copy; 2024 <span className="awesome-highlight">Centennial Hills Homes For Sale</span>. 
            All rights reserved. | Made with ❤️ in Las Vegas
          </p>
          <p className="text-sm mt-2 opacity-75">
            🚀 Experience the awesome difference in real estate service!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;