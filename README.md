# 🏠 Centennial Hills Homes For Sale

A modern, high-performance real estate website showcasing luxury properties in Centennial Hills, Providence, and Skye Canyon, Las Vegas. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 Modern Design System
- **Dark/Light Mode Toggle** - Seamless theme switching with system preference detection
- **Glassmorphism & Neumorphism Effects** - Modern UI elements with depth and visual appeal
- **Responsive Design** - Mobile-first approach with 5 breakpoint tiers
- **Smooth Animations** - 60fps animations powered by Framer Motion
- **Custom CSS Variables** - Consistent design tokens across the entire application

### 🚀 Performance Optimizations
- **Next.js 14 with App Router** - Latest framework features and optimizations
- **Code Splitting & Lazy Loading** - Optimized bundle sizes and loading performance
- **Image Optimization** - WebP/AVIF formats with responsive images
- **Core Web Vitals Optimization** - Targeting 90+ Lighthouse scores
- **Bundle Analysis** - Webpack Bundle Analyzer integration

### 🔍 Advanced Search & Filtering
- **Real-time Property Search** - Instant results with advanced filtering
- **Multi-criteria Filters** - Price, beds, baths, sqft, property type, neighborhood
- **Grid/List View Toggle** - Flexible property display options
- **Favorites System** - Save and track favorite properties
- **Sorting Options** - Multiple sorting criteria for optimal property discovery

### 📱 Interactive Components
- **Enhanced Hero Section** - Dynamic gradients and engaging animations
- **Modern Navigation** - Responsive navigation with submenus and mobile hamburger
- **Interactive Testimonials** - Carousel with autoplay and manual controls
- **Enhanced Contact Form** - Comprehensive form with validation and real-time feedback
- **Custom 404 Page** - Engaging error page with helpful navigation

### 🎯 SEO & Accessibility
- **Structured Data Markup** - Schema.org implementation for rich snippets
- **Meta Tags Optimization** - Comprehensive meta tag management
- **Accessibility Features** - ARIA labels, semantic HTML, keyboard navigation
- **Performance Monitoring** - Real-time performance tracking and optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **State Management**: React Context API
- **Build Tool**: Vercel (Cloud CI/CD)
- **Code Quality**: Biome (Linting, Formatting, Type Checking)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/DrJanDuffy/centennialhillshomesforsale.git
   cd centennialhillshomesforsale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://centennialhillshomesforsale.com
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
   NEXT_PUBLIC_REALSCOUT_AGENT_ID=your_realscout_id
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📁 Project Structure

```
centennialhillshomesforsale/
├── components/           # React components
│   ├── EnhancedHero.tsx     # Modern hero section
│   ├── EnhancedNavigation.tsx # Responsive navigation
│   ├── EnhancedFooter.tsx    # Interactive footer
│   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   ├── AdvancedPropertySearch.tsx # Property search & filtering
│   ├── InteractiveTestimonials.tsx # Testimonials carousel
│   └── EnhancedContactForm.tsx # Contact form with validation
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper with theme provider
│   ├── index.tsx       # Homepage
│   ├── 404.tsx         # Custom error page
│   └── ...             # Other pages
├── styles/             # Global styles
│   └── globals.css     # Design system and utilities
├── public/             # Static assets
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#0A2540` (Deep Blue)
- **Secondary**: `#3A8DDE` (Bright Blue)
- **Accent**: `#16B286` (Green)
- **Neutral**: `#F7F9FC` (Light Gray)

### Typography Scale
- **Display**: 4xl-6xl (Hero headings)
- **Heading**: 2xl-4xl (Section titles)
- **Body**: base-lg (Content text)
- **Small**: sm-xs (Captions, labels)

### Spacing System
- **Container**: max-w-7xl (1280px)
- **Section**: py-16 (64px vertical padding)
- **Component**: p-6-12 (24-48px padding)
- **Element**: gap-4-8 (16-32px spacing)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linting
- `npm run format` - Format code with Biome
- `npm run type-check` - Run TypeScript type checking
- `npm run analyze` - Analyze bundle size

## 📊 Performance Metrics

### Target Scores
- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 90+
- **Lighthouse SEO**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Monitoring
- Real-time Core Web Vitals tracking
- Bundle size analysis
- Performance regression detection
- User experience metrics

## 🔒 Security Features

- **Input Validation** - Comprehensive form validation
- **XSS Protection** - Sanitized content rendering
- **Security Headers** - CORS, CSP, and other security headers
- **Rate Limiting** - API endpoint protection
- **Environment Variables** - Secure configuration management

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS 14+, Android 10+
- **Progressive Enhancement** - Graceful degradation for older browsers

## 📱 Responsive Breakpoints

- **xs**: < 576px (Mobile)
- **sm**: ≥ 576px (Large Mobile)
- **md**: ≥ 768px (Tablet)
- **lg**: ≥ 992px (Desktop)
- **xl**: ≥ 1200px (Large Desktop)

## 🚀 Future Enhancements

### Phase 4 Roadmap
- [ ] AI-powered property recommendations
- [ ] Real-time chat support
- [ ] Virtual tour integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] PWA capabilities
- [ ] Advanced filtering algorithms
- [ ] Social media integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Biome for linting and formatting
- Write comprehensive component documentation
- Ensure accessibility compliance
- Maintain performance benchmarks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 About Dr. Jan Duffy

Dr. Jan Duffy is a Top 1% REALTOR® in Las Vegas with over 20 years of experience in master-planned communities. Specializing in Centennial Hills, Providence, and Skye Canyon, Dr. Duffy has helped hundreds of families find their dream homes.

**Contact Information:**
- **Phone**: (702) 903-1952
- **Email**: jan@centennialhillshomes.com
- **Office**: Centennial Hills, Las Vegas, NV

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment and hosting
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Heroicons** - For beautiful iconography

---

**Built with ❤️ for the Las Vegas real estate community**

*Last updated: December 2024*
