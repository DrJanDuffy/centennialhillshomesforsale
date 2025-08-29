import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Car,
  ExternalLink,
  Heart,
  Home,
  MessageCircle,
  Phone,
  Share2,
  Square,
  Star,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';

const FeaturedHome: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = {
    id: 'featured-golden-moments',
    mlsNumber: 'GLVARTRESTLE-409',
    address: '11773 Golden Moments Avenue',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89138',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    lotSize: '0.25 acres',
    yearBuilt: 2020,
    propertyType: 'Single Family Residence',
    status: 'For Sale',
    daysOnMarket: 15,
    pricePerSqft: 266,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
        alt: 'Luxury Home Exterior - Golden Moments Avenue',
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
        alt: 'Modern Kitchen with Granite Countertops',
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
        alt: 'Spacious Living Room with Fireplace',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        alt: 'Master Bedroom Suite',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
        alt: 'Backyard with Pool and Mountain Views',
      },
    ],
    features: [
      'Pool & Spa',
      'Mountain Views',
      'Gourmet Kitchen',
      'Smart Home Technology',
      '3-Car Garage',
      'Hardwood Floors',
      'Granite Countertops',
      'Walk-in Closets',
      'Fireplace',
      'Large Backyard',
    ],
    description: `Discover this stunning luxury home in the prestigious Golden Moments neighborhood of Las Vegas. This meticulously maintained 4-bedroom, 3-bathroom residence offers 3,200 square feet of living space with premium finishes throughout. The open-concept design features a gourmet kitchen with granite countertops, stainless steel appliances, and a large center island perfect for entertaining. The master suite includes a spa-like bathroom and generous walk-in closet. Enjoy the beautiful backyard with pool, spa, and breathtaking mountain views. This home combines luxury living with the perfect location near shopping, dining, and excellent schools.`,
    neighborhood: {
      name: 'Golden Moments',
      description:
        'A prestigious neighborhood in Northwest Las Vegas known for luxury homes and family-friendly amenities.',
      amenities: ['Shopping Centers', 'Restaurants', 'Parks', 'Schools', 'Golf Courses'],
    },
    realScoutUrl:
      'https://drjanduffy.realscout.com/homesearch/listings/p-11773-golden-moments-avenue-las-vegas-89138-glvartrestle-409',
  };

  const stats = [
    { icon: Home, label: 'Property Type', value: property.propertyType },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
    { icon: Square, label: 'Lot Size', value: property.lotSize },
    { icon: Car, label: 'Garage', value: '3-Car' },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Featured Luxury Home</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
            <div className="text-3xl md:text-4xl font-bold text-accent-color">
              ${property.price.toLocaleString()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Images */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={property.images[currentImage].url}
                alt={property.images[currentImage].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition-colors"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition-colors"
                aria-label="Next image"
              >
                <ArrowLeft className="w-6 h-6 rotate-180" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {property.images.length}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className={`rounded-full p-3 transition-colors ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'
                  }`}
                  aria-label="Add to favorites"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  className="bg-white/80 hover:bg-white rounded-full p-3 transition-colors"
                  aria-label="Share property"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 mt-4 justify-center">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-16 rounded-lg overflow-hidden transition-all ${
                    currentImage === index
                      ? 'ring-2 ring-accent-color'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Property Details</h2>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-accent-color" />
                    <div className="text-2xl font-bold text-primary">{property.bedrooms}</div>
                    <div className="text-sm text-secondary">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-accent-color" />
                    <div className="text-2xl font-bold text-primary">{property.bathrooms}</div>
                    <div className="text-sm text-secondary">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-8 h-8 mx-auto mb-2 text-accent-color" />
                    <div className="text-2xl font-bold text-primary">
                      {property.sqft.toLocaleString()}
                    </div>
                    <div className="text-sm text-secondary">Square Feet</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Car className="w-8 h-8 mx-auto mb-2 text-accent-color" />
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-secondary">Garage</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">About This Home</h3>
                  <p className="text-secondary leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Features & Amenities</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-accent-color mr-2 flex-shrink-0" />
                        <span className="text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhood */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Neighborhood</h3>
                  <p className="text-secondary mb-4">{property.neighborhood.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {property.neighborhood.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-accent-color/10 text-accent-color px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-8"
              >
                {/* Price Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-secondary mb-4">
                    ${property.pricePerSqft}/sq ft • {property.daysOnMarket} days on market
                  </div>

                  <div className="space-y-3 mb-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center text-secondary">
                          <stat.icon className="w-4 h-4 mr-2" />
                          {stat.label}
                        </div>
                        <span className="font-semibold text-primary">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <a
                      href={property.realScoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on RealScout
                    </a>

                    <a
                      href="tel:702-903-1952"
                      className="btn btn-outline w-full flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Dr. Jan Duffy
                    </a>

                    <Link
                      href="/contact"
                      className="btn btn-secondary w-full flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Schedule Viewing
                    </Link>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Dr. Jan Duffy</h3>
                    <p className="text-white/80 mb-4">Top 1% REALTOR®</p>
                    <div className="flex items-center justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <span className="ml-2 text-sm">5.0 (500+ reviews)</span>
                    </div>
                    <a
                      href="tel:702-903-1952"
                      className="inline-flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      (702) 903-1952
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* RealScout Integration */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Interactive Property Details</h2>
            <p className="text-secondary mb-8 max-w-2xl mx-auto">
              Explore this property with our advanced RealScout integration. Get detailed
              information, virtual tours, and neighborhood insights.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <realscout-property-details
                property-id="p-11773-golden-moments-avenue-las-vegas-89138-glvartrestle-409"
                agent-encoded-id="QWdlbnQtMjI1MDUw"
                className="w-full"
              ></realscout-property-details>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make This Your Home?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact Dr. Jan Duffy today to schedule a private viewing or get more information
              about this exceptional property.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:702-903-1952" className="btn btn-white text-primary hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (702) 903-1952
              </a>
              <Link
                href="/contact"
                className="btn btn-outline-white border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Schedule Viewing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturedHome;
