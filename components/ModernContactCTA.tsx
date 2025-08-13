import { ArrowRight, Calendar, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ModernContactCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Find Your
            <span className="block text-blue-400">Dream Home?</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let Dr. Jan Duffy guide you through the Centennial Hills real estate market. 
            Get personalized recommendations and expert guidance every step of the way.
          </p>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
              <p className="text-gray-300 mb-4">Speak directly with Dr. Jan Duffy</p>
              <a
                href="tel:+17025550123"
                className="text-blue-400 hover:text-blue-300 font-semibold text-lg"
              >
                (702) 555-0123
              </a>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
              <p className="text-gray-300 mb-4">Send us your questions and requirements</p>
              <a
                href="mailto:jan.duffy@centennialhillshomes.com"
                className="text-blue-400 hover:text-blue-300 font-semibold text-lg"
              >
                jan.duffy@centennialhillshomes.com
              </a>
            </div>

            {/* Schedule */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Schedule Meeting</h3>
              <p className="text-gray-300 mb-4">Book a consultation at your convenience</p>
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 font-semibold text-lg inline-flex items-center gap-2"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Home Search Today
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or just exploring, Dr. Jan Duffy is here to help 
              you navigate the Centennial Hills real estate market with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/listings"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
              >
                Browse Properties
              </Link>
            </div>
          </div>

          {/* Location Info */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <MapPin className="w-5 h-5" />
              <span>Serving Centennial Hills, Las Vegas & Surrounding Areas</span>
            </div>
            <p className="text-gray-500">
              Licensed REALTOR® in Nevada | Member of GLVAR | Top 1% Producer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernContactCTA;
