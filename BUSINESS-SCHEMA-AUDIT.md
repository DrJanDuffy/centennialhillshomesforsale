# Business Schema Audit & Implementation Guide

## Overview
This document outlines the comprehensive business schema implementation for Dr. Jan Duffy's real estate business across all website pages.

## Business Information Summary

### Company Details
- **Business Name**: Centennial Hills Homes for Sale
- **Primary Category**: Real Estate Agent
- **Secondary Categories**: 
  - Real Estate Agency
  - Real Estate Consultant
  - Property Management Company
- **Description**: Looking for a homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? 🏠 Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. 📍 With 20+ years of experience in master-planned communities, Dr. Duffy specializes in top neighborhoods like Skye Canyon, Providence, Aliante, Centennial Hills, Tule Springs, El Dorado, Lone Mountain, and Summerlin. ⭐ Ranked in the Top 1% of Las Vegas REALTORS®, Dr. Duffy offers expert guidance, same-day showings, and a free market analysis. 📱 Available 24/7, Dr. Duffy provides personalized service to make buying or selling your Las Vegas home easy. 4.9/5 ⭐

### Contact Information
- **Phone**: (702) 903-1952
- **Email**: jan@centennialhillshomes.com
- **Website**: http://centennialhillshomesforsale.com/
- **Address**: 1490 Center Crossing Rd, Las Vegas, NV 89144

### Business Hours
- **Main Hours**: Sunday-Saturday: 6:00 AM–9:00 PM
- **Special Hours**:
  - May 26, 2025: Closed
  - Jul 4, 2025: 4th of July - Closed
  - Sep 1, 2025: Labor Day - Closed

### Service Areas
1. Lone Mountain, NV, USA
2. North Las Vegas, NV, USA
3. Summerlin South, NV, USA
4. Summerlin, Las Vegas, NV, USA
5. Providence, Las Vegas, NV, USA
6. Kyle Canyon, Las Vegas, NV, USA
7. Tule Springs, Las Vegas, NV, USA
8. Elkhorn, Las Vegas, NV 89131, USA
9. Antelope, Las Vegas, NV 89149, USA
10. Summerlin West, Las Vegas, NV, USA
11. Summerlin North, Las Vegas, NV, USA
12. Centennial Hills, Las Vegas, NV, USA
13. Los Prados, Las Vegas, NV 89130, USA
14. The Springs, Las Vegas, NV 89130, USA
15. Wyeth Ranch, Las Vegas, NV 89131, USA
16. La Madre Foothills, Las Vegas, NV, USA
17. Carmel Canyon, Las Vegas, NV 89131, USA
18. Silverstone Ranch, Las Vegas, NV 89131, USA
19. Iron Mountain Ranch, Las Vegas, NV 89131, USA
20. Lone Mountain Heights, Las Vegas, NV 89129, USA

### Social Profiles
- Pinterest: https://www.pinterest.com/DrJanDuffy/
- LinkedIn: https://www.linkedin.com/company/california-to-vegas-homes
- YouTube: https://www.youtube.com/@DrDuffy
- Instagram: https://www.instagram.com/drjanduffy/
- Facebook: https://www.facebook.com/SummerlinNewHomesBHHS

### Credentials & Memberships
- Nevada Real Estate License
- Top 1% REALTOR®
- Certified Luxury Home Marketing Specialist
- Certified Residential Specialist (CRS)
- Accredited Buyer's Representative (ABR)
- Member of Greater Las Vegas Association of REALTORS
- Member of Nevada Association of REALTORS
- Member of National Association of REALTORS®
- Works for Berkshire Hathaway HomeServices

## Schema Implementation Status

### ✅ Completed
- **Homepage** (`pages/index.tsx`) - Updated with comprehensive business schema
- **About Page** (`pages/about.tsx`) - Updated with business schema
- **Business Schema Library** (`lib/business-schema.ts`) - Created comprehensive schema definitions

### 🔄 In Progress
- **Contact Page** (`pages/contact.tsx`) - Needs LocalBusiness schema
- **Services Page** (`pages/services.tsx`) - Needs Organization schema
- **Properties Page** (`pages/properties.tsx`) - Needs RealEstateAgent schema

### ⏳ Pending
- **Neighborhoods Page** (`pages/neighborhoods.tsx`)
- **Blog Page** (`pages/blog.tsx`)
- **Market Data Page** (`pages/market-data.tsx`)
- **Buyers Page** (`pages/buyers.tsx`)
- **Testimonials Page** (`pages/testimonials.tsx`)
- **FAQ Page** (`pages/faq.tsx`)
- **Area Explorer Page** (`pages/area-explorer.tsx`)
- **Featured Home Page** (`pages/featured-home.tsx`)
- **Market Insights Page** (`pages/market-insights.tsx`)
- **Local Business Optimization Page** (`pages/local-business-optimization.tsx`)
- **SEO Improvements Page** (`pages/seo-improvements.tsx`)
- **Taskmaster Page** (`pages/taskmaster.tsx`)
- **Business Verification Page** (`pages/business-verification.tsx`)
- **Centennial Hills Page** (`pages/centennial-hills.tsx`)
- **Providence Las Vegas Page** (`pages/providence-las-vegas.tsx`)
- **Skye Canyon Page** (`pages/skye-canyon.tsx`)
- **Northwest Las Vegas Page** (`pages/northwest-las-vegas.tsx`)
- **Las Vegas 89149 Page** (`pages/las-vegas-89149.tsx`)
- **Las Vegas 89166 Page** (`pages/las-vegas-89166.tsx`)
- **Market Update Page** (`pages/market-update.tsx`)
- **Listings Page** (`pages/listings.tsx`)

## Schema Types to Implement

### 1. RealEstateAgent Schema
- Primary schema for Dr. Jan Duffy
- Includes credentials, experience, specializations
- Service areas and contact information

### 2. Organization Schema
- For the business entity
- Includes founding date, contact points
- Social media profiles and memberships

### 3. LocalBusiness Schema
- For local SEO optimization
- Includes business hours, service areas
- Payment methods and currencies

### 4. WebSite Schema
- For the website itself
- Includes search functionality
- Publisher information

### 5. Person Schema
- For Dr. Jan Duffy as an individual
- Includes professional credentials
- Awards and specializations

### 6. Service Schema
- For specific real estate services
- Includes pricing and availability
- Service area coverage

### 7. Place Schema
- For neighborhood-specific pages
- Includes geographic coordinates
- Local amenities and attractions

### 8. Article Schema
- For blog posts and market insights
- Includes author information
- Publication dates and categories

### 9. FAQ Schema
- For FAQ pages
- Includes questions and answers
- Topic categorization

### 10. Review Schema
- For testimonials and reviews
- Includes rating information
- Author and date details

## Implementation Priority

### High Priority (Core Business Pages)
1. Contact Page - LocalBusiness schema
2. Services Page - Organization + Service schemas
3. Properties Page - RealEstateAgent + RealEstateListing schemas

### Medium Priority (Content Pages)
1. Neighborhoods Page - Place + RealEstateAgent schemas
2. Blog Page - Article + Organization schemas
3. Market Data Page - RealEstateMarket + Organization schemas

### Low Priority (Utility Pages)
1. FAQ Page - FAQPage schema
2. Testimonials Page - Review + Person schemas
3. Area Explorer Page - Place + InteractiveApplication schemas

## Next Steps

1. **Complete Core Business Pages** - Implement schemas for contact, services, and properties pages
2. **Update Content Pages** - Add appropriate schemas for neighborhood and market information pages
3. **Enhance Utility Pages** - Implement schemas for FAQ, testimonials, and interactive features
4. **Test Schema Validation** - Use Google's Rich Results Test to validate all schemas
5. **Monitor Performance** - Track schema implementation impact on search visibility

## Schema Validation Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Structured Data Testing Tool**: https://search.google.com/structured-data/testing-tool

## Notes

- All schemas should include the business address: 1490 Center Crossing Rd, Las Vegas, NV 89144
- Business hours are 6:00 AM–9:00 PM daily
- Phone number: (702) 903-1952
- Email: jan@centennialhillshomes.com
- Website: https://centennialhillshomesforsale.com/
- Opening date: September 1993
- Rating: 4.9/5 stars
- Price range: $$$
- Service area: Las Vegas Valley and surrounding communities
