import { Award, Calendar, Mail, MapPin, Phone, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

const ModernAboutSection: React.FC = () => {
  const achievements = [
    { icon: Award, label: 'Top 1% REALTOR®', value: '15+ Years' },
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: TrendingUp, label: 'Total Volume', value: '$2.5B+' },
    { icon: Star, label: 'Client Rating', value: '4.9/5' },
  ];

  const services = [
    'Luxury Home Sales',
    'New Construction',
    'Investment Properties',
    'Relocation Services',
    'Market Analysis',
    'Negotiation Expertise',
  ];

  return (
    <section className="section bg-gradient-soft">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image & Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop"
                alt="Dr. Jan Duffy - Top 1% REALTOR® in Centennial Hills"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary-color">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="card bg-white p-4 lg:p-6 text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-secondary-color mx-auto mb-2 lg:mb-3" />
                    <div className="text-base lg:text-lg font-bold text-primary-color">
                      {achievement.value}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Section Header */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
                Meet Dr. Jan Duffy
                <span className="block text-secondary-color mt-2">
                  Your Trusted Real Estate Expert
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                As a Top 1% REALTOR® with over 15 years of experience in the Las Vegas market, I
                specialize in helping families find their perfect home in Centennial Hills and
                surrounding communities.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color">Why Choose Me?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary-color rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm lg:text-base">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Expertise */}
            <div className="card bg-white p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-bold text-primary-color mb-4 lg:mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary-color" />
                Local Market Expertise
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Deep knowledge of Centennial Hills, Providence, and Skye Canyon neighborhoods. I
                understand the unique characteristics, school districts, and amenities that make
                each community special.
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Centennial Hills
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Providence
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Skye Canyon
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Northwest LV
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link
                href="/contact"
                className="bg-secondary-color hover:bg-secondary-dark text-white px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-base lg:text-lg"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Link>
              <Link
                href="/about"
                className="border-2 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-white px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                Learn More About Me
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-secondary-color to-secondary-dark rounded-2xl p-6 lg:p-8 text-white">
              <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Ready to Get Started?</h3>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm lg:text-base">(702) 555-0123</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm lg:text-base">jan.duffy@centennialhillshomes.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAboutSection;
