import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  image: string;
  price: string;
  registrationUrl?: string;
  featured: boolean;
}

const communityEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Centennial Hills Farmers Market',
    description:
      'Weekly farmers market featuring local produce, artisanal goods, and community vendors. Enjoy live music and family activities.',
    date: '2024-09-15',
    time: '8:00 AM - 1:00 PM',
    location: 'Centennial Hills Park Pavilion',
    category: 'Community',
    organizer: 'Centennial Hills Community Association',
    image: '/assets/icons/farmers-market.svg',
    price: 'Free',
    featured: true,
  },
  {
    id: '2',
    title: 'TPC Las Vegas Golf Tournament',
    description:
      'Professional golf tournament featuring PGA Tour players competing on the championship TPC Las Vegas course.',
    date: '2024-10-20',
    time: '7:00 AM - 6:00 PM',
    location: 'TPC Las Vegas Golf Course',
    category: 'Sports',
    organizer: 'PGA Tour',
    image: '/assets/icons/golf-tournament.svg',
    price: '$25 - $150',
    registrationUrl: 'https://www.pgatour.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Centennial Hills Home & Garden Tour',
    description:
      'Annual self-guided tour of beautifully landscaped homes and gardens in Centennial Hills. Proceeds benefit local schools.',
    date: '2024-11-10',
    time: '10:00 AM - 4:00 PM',
    location: 'Various Homes in Centennial Hills',
    category: 'Community',
    organizer: 'Centennial Hills Garden Club',
    image: '/assets/icons/home-tour.svg',
    price: '$20',
    featured: false,
  },
  {
    id: '4',
    title: 'Holiday Tree Lighting Ceremony',
    description:
      'Community holiday celebration with tree lighting, carol singing, hot cocoa, and Santa visits for children.',
    date: '2024-12-01',
    time: '5:00 PM - 8:00 PM',
    location: 'Centennial Hills Town Center',
    category: 'Holiday',
    organizer: 'Centennial Hills Business Association',
    image: '/assets/icons/holiday-tree.svg',
    price: 'Free',
    featured: true,
  },
  {
    id: '5',
    title: 'Spring Community 5K Run',
    description:
      'Annual 5K run/walk through Centennial Hills featuring scenic routes and community support. All ages welcome.',
    date: '2025-04-15',
    time: '8:00 AM - 11:00 AM',
    location: 'Centennial Hills Park',
    category: 'Fitness',
    organizer: 'Centennial Hills Runners Club',
    image: '/assets/icons/5k-run.svg',
    price: '$15',
    featured: false,
  },
  {
    id: '6',
    title: 'Back to School Bash',
    description:
      'End of summer celebration for families with school supply giveaways, face painting, games, and community resources.',
    date: '2024-08-25',
    time: '10:00 AM - 2:00 PM',
    location: 'Centennial Hills Elementary School',
    category: 'Education',
    organizer: 'Centennial Hills PTA',
    image: '/assets/icons/back-to-school.svg',
    price: 'Free',
    featured: false,
  },
];

const categories = ['All Events', 'Community', 'Sports', 'Education', 'Fitness', 'Holiday'];

export default function CommunityEvents() {
  const [selectedCategory, setSelectedCategory] = React.useState('All Events');
  const [selectedMonth, setSelectedMonth] = React.useState('All Months');

  const filteredEvents = communityEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All Events' || event.category === selectedCategory;
    const eventDate = new Date(event.date);
    const matchesMonth =
      selectedMonth === 'All Months' ||
      eventDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
    return matchesCategory && matchesMonth;
  });

  const featuredEvents = communityEvents.filter((event) => event.featured);
  const months = [
    'All Months',
    ...new Set(
      communityEvents.map((event) =>
        new Date(event.date).toLocaleString('default', { month: 'long' })
      )
    ),
  ];

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Community Events | Las Vegas Local Activities & Calendar</title>
        <meta
          name="description"
          content="Stay connected with Centennial Hills community events, festivals, tournaments, and local activities. Farmers markets, golf tournaments, and family events."
        />
        <meta
          name="keywords"
          content="Centennial Hills events, Las Vegas community calendar, farmers market, golf tournament, local activities, family events"
        />

        {/* Event Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Centennial Hills Community Events',
              description:
                'Calendar of community events and activities in Centennial Hills, Las Vegas',
              url: 'https://centennialhillshomesforsale.com/community-events',
              itemListElement: communityEvents.map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  description: event.description,
                  startDate: `${event.date}T${event.time.split(' - ')[0].replace(' ', '').toLowerCase()}`,
                  location: {
                    '@type': 'Place',
                    name: event.location,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Las Vegas',
                      addressRegion: 'NV',
                      postalCode: '89149',
                      addressCountry: 'US',
                    },
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: event.organizer,
                  },
                  offers: {
                    '@type': 'Offer',
                    price: event.price === 'Free' ? '0' : event.price.replace('$', ''),
                    priceCurrency: 'USD',
                  },
                },
              })),
            }),
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Centennial Hills Community Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Stay connected with your community through local events, festivals, and activities
            </p>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Events</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't miss these upcoming community highlights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <span className="text-sm text-gray-500">{event.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">{event.price}</span>
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Register
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Events List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">All Community Events</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse upcoming events by category and month
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {event.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                      Organized by {event.organizer}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{event.price}</span>
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Register Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No events found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-green-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Never Miss a Community Event</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our community newsletter and get notified about upcoming events, local
              news, and neighborhood updates
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* RealScout Office Listings */}
      <RealScoutListingsSection
        title="Current Listings"
        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
      />
    </Layout>
  );
}
