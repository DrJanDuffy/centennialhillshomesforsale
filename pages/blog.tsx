import { ArrowRight, Calendar, Clock, DollarSign, Home, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import Layout from '@/components/Layout';
import RealScoutListings from '@/components/RealScoutListings';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Centennial Hills Market Update: Summer 2024',
      excerpt:
        'Discover the latest trends in Centennial Hills real estate, including price movements, inventory levels, and what buyers and sellers can expect.',
      author: 'Dr. Jan Duffy',
      date: 'July 15, 2024',
      readTime: '5 min read',
      category: 'Market Analysis',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
      slug: 'centennial-hills-market-update-summer-2024',
    },
    {
      id: 2,
      title: 'Why Providence is the Perfect Family Neighborhood',
      excerpt:
        "Explore the family-friendly amenities, top-rated schools, and community features that make Providence one of Las Vegas' most sought-after neighborhoods.",
      author: 'Dr. Jan Duffy',
      date: 'July 10, 2024',
      readTime: '4 min read',
      category: 'Neighborhood Guide',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=400&fit=crop',
      slug: 'why-providence-perfect-family-neighborhood',
    },
    {
      id: 3,
      title: 'First-Time Homebuyer Guide: Centennial Hills Edition',
      excerpt:
        'Everything first-time buyers need to know about purchasing a home in Centennial Hills, from financing options to closing costs.',
      author: 'Dr. Jan Duffy',
      date: 'July 5, 2024',
      readTime: '7 min read',
      category: 'Buyer Guide',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop',
      slug: 'first-time-homebuyer-guide-centennial-hills',
    },
    {
      id: 4,
      title: 'Skye Canyon: The Ultimate Outdoor Lifestyle Community',
      excerpt:
        "Learn about Skye Canyon's unique outdoor amenities, hiking trails, and community events that make it perfect for active families.",
      author: 'Dr. Jan Duffy',
      date: 'June 28, 2024',
      readTime: '6 min read',
      category: 'Neighborhood Guide',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
      slug: 'skye-canyon-ultimate-outdoor-lifestyle',
    },
    {
      id: 5,
      title: 'Investment Properties in Northwest Las Vegas',
      excerpt:
        'Discover the best investment opportunities in Northwest Las Vegas, including rental properties and appreciation potential.',
      author: 'Dr. Jan Duffy',
      date: 'June 20, 2024',
      readTime: '8 min read',
      category: 'Investment',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
      slug: 'investment-properties-northwest-las-vegas',
    },
    {
      id: 6,
      title: 'Preparing Your Home for Sale: A Complete Checklist',
      excerpt:
        'Get your home market-ready with our comprehensive checklist covering everything from curb appeal to staging tips.',
      author: 'Dr. Jan Duffy',
      date: 'June 15, 2024',
      readTime: '6 min read',
      category: 'Seller Guide',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
      slug: 'preparing-home-sale-complete-checklist',
    },
  ];

  const categories = [
    { name: 'Market Analysis', count: 1 },
    { name: 'Neighborhood Guide', count: 2 },
    { name: 'Buyer Guide', count: 1 },
    { name: 'Seller Guide', count: 1 },
    { name: 'Investment', count: 1 },
  ];

  return (
    <Layout
      title="Real Estate Blog | Centennial Hills Market Insights | Dr. Jan Duffy"
      description="Stay informed with the latest real estate insights, market updates, and neighborhood guides for Centennial Hills, Providence, and Skye Canyon."
      canonical="https://centennialhillshomesforsale.com/blog/"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Real Estate Insights</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Expert analysis, market updates, and neighborhood guides for Centennial Hills
              </p>
              <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Centennial Hills
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Market Updates
                </span>
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Neighborhood Guides
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </span>
                          <a
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Load More Articles
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {category.count}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe</h3>
                  <p className="text-gray-600 mb-4">
                    Get the latest market updates and insights delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Dr. Jan Duffy
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Have questions about the market or need personalized advice?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RealScout Listings */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our latest listings while reading our latest market insights
              </p>
            </div>
            
            <RealScoutListings 
              priceMin={500000}
              priceMax={2000000}
              propertyTypes="SFR,MF"
              listingStatus="For Sale"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BlogPage;
