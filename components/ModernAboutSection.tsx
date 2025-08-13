import { Award, Calendar, Mail, MapPin, Phone, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop"
                alt="Dr. Jan Duffy - Top 1% REALTOR® in Centennial Hills"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
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
                    className="bg-white rounded-xl p-4 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{achievement.value}</div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Dr. Jan Duffy
                <span className="block text-blue-600">Your Trusted Real Estate Expert</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                As a Top 1% REALTOR® with over 15 years of experience in the Las Vegas market, 
                I specialize in helping families find their perfect home in Centennial Hills and 
                surrounding communities.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Me?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Expertise */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Local Market Expertise
              </h3>
              <p className="text-gray-600 mb-4">
                Deep knowledge of Centennial Hills, Providence, and Skye Canyon neighborhoods. 
                I understand the unique characteristics, school districts, and amenities that make 
                each community special.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Centennial Hills
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Providence
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Skye Canyon
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Northwest LV
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </Link>
              <Link
                href="/about"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
              >
                Learn More About Me
              </Link>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>(702) 555-0123</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>jan.duffy@centennialhillshomes.com</span>
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
