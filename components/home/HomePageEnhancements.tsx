import { ArrowRight, Award, Home, MapPin, Phone, Shield, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// ─── Shared Tokens ────────────────────────────────────────────────────────────
const NAVY = '#0a2540';
const GOLD = '#d4af37';

// ─── HomeHero ─────────────────────────────────────────────────────────────────
export function HomeHero({
  listingsSectionId = 'featured-listings',
}: {
  listingsSectionId?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: NAVY }}>
      {/* Subtle diagonal accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 60%, ${GOLD} 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32 text-center">
        {/* Eyebrow */}
        <p
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-semibold tracking-widest uppercase mb-6"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          <MapPin size={14} style={{ color: GOLD }} aria-hidden="true" />
          Las Vegas, Nevada
        </p>

        {/* Headline */}
        <h1
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-balance"
          style={{ color: '#ffffff' }}
        >
          Discover Your Dream Home in <span style={{ color: GOLD }}>Centennial Hills</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          style={{ color: '#b0bec5' }}
        >
          Northwest Las Vegas&apos;s most sought-after master-planned community — top-rated schools,
          resort amenities, and homes built for the way you live.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`#${listingsSectionId}`}
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-bold shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: GOLD,
              color: NAVY,
            }}
          >
            Browse Listings
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border px-7 py-3 text-sm font-bold transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderColor: '#ffffff', color: '#ffffff' }}
          >
            <Phone size={16} aria-hidden="true" />
            Contact an Agent
          </Link>
        </div>

        {/* Trust bar */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 text-xs font-medium tracking-wide uppercase"
          style={{ color: '#78909c' }}
        >
          {['Top 1% REALTOR®', 'Providence & Skye Canyon', 'Same-day showings'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <Star size={12} style={{ color: GOLD }} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ExploreCards ─────────────────────────────────────────────────────────────
const CARDS = [
  {
    href: '/properties',
    icon: Home,
    label: 'Homes for Sale',
    description:
      'Browse active listings across Centennial Hills — from cozy starter homes to luxury estates.',
    accent: GOLD,
  },
  {
    href: '/market-data',
    icon: TrendingUp,
    label: 'Market Trends',
    description:
      'Stay ahead with the latest pricing data, days-on-market stats, and neighborhood insights.',
    accent: GOLD,
  },
  {
    href: '/neighborhoods',
    icon: MapPin,
    label: 'Community Guide',
    description:
      'Explore parks, schools, dining, and everything that makes Centennial Hills special.',
    accent: GOLD,
  },
] as const;

export function ExploreCards() {
  return (
    <section className="w-full bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
            Start Exploring
          </p>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-balance" style={{ color: NAVY }}>
            Everything You Need to Find Your Next Home
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {CARDS.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={
                {
                  borderColor: '#e2e8f0',
                  '--tw-ring-color': GOLD,
                } as React.CSSProperties
              }
            >
              {/* Icon badge */}
              <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${NAVY}12` }}
              >
                <Icon size={22} style={{ color: NAVY }} aria-hidden="true" />
              </span>

              <h3 className="mb-2 text-base font-bold" style={{ color: NAVY }}>
                {label}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#4a5568' }}>
                {description}
              </p>

              {/* Arrow hint */}
              <span
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold transition-gap group-hover:gap-2"
                style={{ color: GOLD }}
              >
                Learn more
                <ArrowRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AgentSpotlight ───────────────────────────────────────────────────────────
export function AgentSpotlight() {
  return (
    <section className="w-full py-14 sm:py-20" style={{ backgroundColor: '#f7f9fc' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row">
          {/* Left accent panel */}
          <div
            className="flex flex-col items-center justify-center gap-4 px-8 py-10 md:w-64 lg:w-72"
            style={{ backgroundColor: NAVY }}
          >
            {/* Avatar placeholder */}
            <div
              role="img"
              className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold border-4"
              style={{
                borderColor: GOLD,
                backgroundColor: `${GOLD}22`,
                color: GOLD,
              }}
              aria-label="Dr. Jan Duffy agent photo placeholder"
            >
              JD
            </div>

            <div className="text-center">
              <p className="text-lg font-extrabold leading-tight" style={{ color: '#ffffff' }}>
                Dr. Jan Duffy
              </p>
              <p
                className="mt-1 text-xs font-semibold tracking-wide uppercase"
                style={{ color: GOLD }}
              >
                REALTOR®
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-col gap-2 w-full mt-2">
              <span
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{ backgroundColor: '#0d2f52', color: '#b0c4de' }}
              >
                <Award size={12} style={{ color: GOLD }} aria-hidden="true" />
                License: S.0197614.LLC
              </span>
              <span
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{ backgroundColor: '#0d2f52', color: '#b0c4de' }}
              >
                <Shield size={12} style={{ color: GOLD }} aria-hidden="true" />
                Berkshire Hathaway HomeServices Nevada Properties
              </span>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 bg-white px-8 py-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              Your Centennial Hills Expert
            </p>
            <h2
              className="text-xl font-extrabold sm:text-2xl text-balance mb-4"
              style={{ color: NAVY }}
            >
              Local Knowledge You Can Trust
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a5568' }}>
              With over two decades serving the Centennial Hills and Northwest Las Vegas market, Dr.
              Jan Duffy combines deep neighborhood expertise with the global reach of{' '}
              <strong style={{ color: NAVY }}>Berkshire Hathaway HomeServices</strong> Nevada
              Properties. Whether you&apos;re buying your first home or upgrading to a luxury
              estate, Dr. Duffy delivers a seamless, data-driven experience tailored to you.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-7">
              {[
                { value: 'Top 1%', label: 'Las Vegas REALTORS®' },
                { value: '30+', label: 'Years experience' },
                { value: '89149', label: 'Centennial Hills' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-extrabold" style={{ color: NAVY }}>
                    {value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#718096' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: NAVY, color: '#ffffff' }}
            >
              <Phone size={15} aria-hidden="true" />
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BottomCta ────────────────────────────────────────────────────────────────
export function BottomCta({
  listingsSectionId = 'featured-listings',
}: {
  listingsSectionId?: string;
}) {
  return (
    <section className="w-full py-14 sm:py-20" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        {/* Decorative rule */}
        <div
          className="mx-auto mb-6 h-1 w-16 rounded-full"
          style={{ backgroundColor: GOLD }}
          aria-hidden="true"
        />

        <h2
          className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-balance leading-tight"
          style={{ color: '#ffffff' }}
        >
          Ready to Make Your Move in <span style={{ color: GOLD }}>Centennial Hills?</span>
        </h2>

        <p
          className="mt-4 text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
          style={{ color: '#90a4ae' }}
        >
          Connect with Dr. Jan Duffy today — your trusted Berkshire Hathaway HomeServices agent
          dedicated to finding the perfect home at the right price.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`#${listingsSectionId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-bold shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            <Home size={16} aria-hidden="true" />
            Browse Listings
          </Link>
          <a
            href="tel:+17029031952"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderColor: '#ffffff' }}
          >
            <Phone size={16} aria-hidden="true" />
            (702) 903-1952
          </a>
        </div>

        <p className="mt-8 text-xs tracking-wide" style={{ color: '#546e7a' }}>
          Berkshire Hathaway HomeServices Nevada Properties · License S.0197614.LLC
        </p>
      </div>
    </section>
  );
}
