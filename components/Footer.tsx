import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle,
  Award,
  Shield,
  Users,
  Star
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Centennial Hills Homes',
      description: 'Your trusted partner in finding the perfect home in Northwest Las Vegas. Expert real estate services with a personal touch.',
      links: [
        { name: 'About Dr. Jan Duffy', href: '/about' },
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Client Success Stories', href: '/testimonials' },
        { name: 'Awards & Recognition', href: '/about#awards' }
      ]
    },
    {
      title: 'Areas We Serve',
      description: 'Comprehensive real estate services across the most desirable neighborhoods in Northwest Las Vegas.',
      links: [
        { name: 'Centennial Hills', href: '/neighborhoods/centennial-hills' },
        { name: 'Providence', href: '/neighborhoods/providence' },
        { name: 'Skye Canyon', href: '/neighborhoods/skye-canyon' },
        { name: 'Northwest Las Vegas', href: '/neighborhoods/northwest-las-vegas' }
      ]
    },
    {
      title: 'Quick Links',
      description: 'Essential resources and tools to help you navigate your real estate journey.',
      links: [
        { name: 'Current Listings', href: '/listings' },
        { name: 'Market Updates', href: '/market-update' },
        { name: 'Our Services', href: '/services' },
        { name: 'Client Reviews', href: '/testimonials' }
      ]
    },
    {
      title: 'Contact Info',
      description: 'Get in touch with us for personalized real estate guidance and support.',
      links: [
        { name: 'Schedule Consultation', href: '/contact' },
        { name: 'Request Property Alert', href: '/contact#alerts' },
        { name: 'Free Market Analysis', href: '/contact#analysis' },
        { name: 'Emergency Contact', href: '/contact#emergency' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/centennialhillshomes', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/centennialhills', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/centennialhillshomes', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/dr-jan-duffy', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/centennialhillshomes', color: 'hover:text-red-600' }
  ];

  const certifications = [
    { icon: Award, text: 'Top 1% Realtor', color: 'text-warning-color' },
    { icon: Shield, text: 'Certified Luxury Specialist', color: 'text-accent-color' },
    { icon: Users, text: '500+ Happy Families', color: 'text-secondary-color' },
    { icon: Star, text: '4.9/5 Client Rating', color: 'text-warning-color' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Sections */}
        {footerSections.map((section) => (
          <div key={section.title} className="footer-section">
            <h3>{section.title}</h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {section.description}
            </p>
            <nav>
              {section.links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="block py-1 text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="container mt-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-color/20 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary-color" />
              </div>
              <div>
                <div className="text-white font-semibold">Phone</div>
                <a href="tel:+17029031952" className="text-white/80 hover:text-white transition-colors">
                  (702) 903-1952
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-color/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent-color" />
              </div>
              <div>
                <div className="text-white font-semibold">Email</div>
                <a href="mailto:jan@centennialhillshomes.com" className="text-white/80 hover:text-white transition-colors">
                  jan@centennialhillshomes.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning-color/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-warning-color" />
              </div>
              <div>
                <div className="text-white font-semibold">Location</div>
                <div className="text-white/80">
                  Las Vegas, Nevada
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-color/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-color" />
              </div>
              <div>
                <div className="text-white font-semibold">Availability</div>
                <div className="text-white/80">
                  Available 7 Days a Week
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="container mt-8">
        <div className="flex flex-wrap justify-center gap-6">
          {certifications.map((cert) => (
            <div key={cert.text} className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <cert.icon className={`w-4 h-4 ${cert.color}`} />
              <span className="text-white/80 text-sm font-medium">{cert.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media & Platform Links */}
      <div className="container mt-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="w-6 h-6 text-white" />
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://zillow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              Zillow
            </a>
            <a
              href="https://realtor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              Realtor.com
            </a>
            <a
              href="https://redfin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              Redfin
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {currentYear} Centennial Hills Homes For Sale. All rights reserved. Made with ❤️ in Las Vegas.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-white/60">Equal Housing Opportunity</span>
                <span className="text-white/60">•</span>
                <span className="text-white/60">Fair Housing and Equal Service</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-white/50 text-xs">
              Dr. Jan Duffy is a licensed real estate professional in Nevada. All information provided is deemed reliable but not guaranteed. 
              Please verify all information independently.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-gradient-to-r from-secondary-color to-accent-color text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          aria-label="Contact us"
          title="Contact us"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;