import { ArrowRight, Calendar, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

const ModernContactCTA: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-color via-primary-dark to-secondary-dark">
      <div className="container">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8">
            Ready to Find Your
            <span className="block text-blue-400 mt-2">Dream Home?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-300 mb-12 lg:mb-16 max-w-3xl mx-auto leading-relaxed">
            Let Dr. Jan Duffy guide you through the Centennial Hills real estate market. Get
            personalized recommendations and expert guidance every step of the way.
          </p>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {/* Phone */}
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-secondary-color w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Call Us</h3>
              <p className="text-gray-300 mb-4 text-sm lg:text-base">
                Speak directly with Dr. Jan Duffy
              </p>
              <a
                href="tel:+17025550123"
                className="text-blue-400 hover:text-blue-300 font-semibold text-base lg:text-lg"
              >
                (702) 555-0123
              </a>
            </div>

            {/* Email */}
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-secondary-color w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Email Us</h3>
              <p className="text-gray-300 mb-4 text-sm lg:text-base">
                Send us your questions and requirements
              </p>
              <a
                href="mailto:jan.duffy@centennialhillshomes.com"
                className="text-blue-400 hover:text-blue-300 font-semibold text-base lg:text-lg"
              >
                jan.duffy@centennialhillshomes.com
              </a>
            </div>

            {/* Schedule */}
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-secondary-color w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Schedule Meeting</h3>
              <p className="text-gray-300 mb-4 text-sm lg:text-base">
                Book a consultation at your convenience
              </p>
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 font-semibold text-base lg:text-lg inline-flex items-center gap-2"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main CTA */}
          <div className="bg-gradient-to-r from-secondary-color to-secondary-dark rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8">
              Start Your Home Search Today
            </h3>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re buying, selling, or just exploring, Dr. Jan Duffy is here to help
              you navigate the Centennial Hills real estate market with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-base lg:text-lg"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
              <Link
                href="/listings"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                Browse Properties
              </Link>
            </div>
          </div>

          {/* Location Info */}
          <div className="mt-12 lg:mt-16 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2 lg:mb-3">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base">
                Serving Centennial Hills, Las Vegas & Surrounding Areas
              </span>
            </div>
            <p className="text-gray-500 text-sm lg:text-base">
              Licensed REALTOR® in Nevada | Member of GLVAR | Top 1% Producer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernContactCTA;
