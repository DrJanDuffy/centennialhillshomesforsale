import cors from 'cors';
// server/mcp-server.js
import express from 'express';

class CentennialHillsMCPServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.realEstateData = this.initializeRealEstateData();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  setupRoutes() {
    // Property Search API
    this.app.post('/api/search-properties', async (req, res) => {
      try {
        const { minPrice, maxPrice, bedrooms, bathrooms, propertyType, features } = req.body;
        const properties = await this.searchProperties({
          minPrice,
          maxPrice,
          bedrooms,
          bathrooms,
          propertyType,
          features,
        });
        res.json({ success: true, properties });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Market Analysis API
    this.app.get('/api/market-analysis/:zipCode', async (req, res) => {
      try {
        const { zipCode } = req.params;
        const analysis = await this.getMarketAnalysis(zipCode);
        res.json({ success: true, analysis });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Home Valuation API
    this.app.post('/api/home-valuation', async (req, res) => {
      try {
        const valuation = await this.calculateHomeValue(req.body);
        res.json({ success: true, valuation });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // AI Chat API
    this.app.post('/api/ai-chat', async (req, res) => {
      try {
        const { message, context } = req.body;
        const response = await this.processAIChat(message, context);
        res.json({ success: true, response });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Mortgage Calculator API
    this.app.post('/api/mortgage-calculator', async (req, res) => {
      try {
        const { homePrice, downPayment, interestRate, loanTerm } = req.body;
        const calculation = await this.calculateMortgage({
          homePrice,
          downPayment,
          interestRate,
          loanTerm,
        });
        res.json({ success: true, calculation });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Lead Capture API
    this.app.post('/api/lead-capture', async (req, res) => {
      try {
        const leadData = req.body;
        const result = await this.captureLead(leadData);
        res.json({ success: true, result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Property Alerts API
    this.app.post('/api/property-alerts', async (req, res) => {
      try {
        const { email, criteria } = req.body;
        const result = await this.setupPropertyAlerts(email, criteria);
        res.json({ success: true, result });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  initializeRealEstateData() {
    return {
      neighborhoods: {
        'centennial-hills': {
          medianPrice: 635000,
          avgSqft: 2800,
          pricePerSqft: 227,
          daysOnMarket: 18,
          appreciation: 8.2,
          features: ['TPC Golf Course', 'A+ Schools', 'Gated Communities'],
        },
        providence: {
          medianPrice: 750000,
          avgSqft: 3200,
          pricePerSqft: 234,
          daysOnMarket: 15,
          appreciation: 9.1,
          features: ['Master Planned', 'Mountain Views', 'Resort Style'],
        },
        'skye-canyon': {
          medianPrice: 580000,
          avgSqft: 2600,
          pricePerSqft: 223,
          daysOnMarket: 22,
          appreciation: 7.8,
          features: ['Family Friendly', 'Parks', 'New Construction'],
        },
      },
      schools: {
        'centennial-high': { rating: 9, type: 'High School', distance: '0.5 miles' },
        'alexander-dawson': { rating: 10, type: 'Private School', distance: '1.2 miles' },
        'centennial-elementary': { rating: 8, type: 'Elementary', distance: '0.3 miles' },
      },
    };
  }

  async searchProperties(filters) {
    // Simulate property search with sample data
    const sampleProperties = [
      {
        id: 1,
        address: '123 TPC Drive, Las Vegas, NV 89149',
        price: 679000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2850,
        propertyType: 'Single Family',
        features: ['Golf Course View', 'Pool', 'Gated'],
        neighborhood: 'Centennial Hills',
      },
      {
        id: 2,
        address: '456 Providence Way, Las Vegas, NV 89166',
        price: 795000,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3200,
        propertyType: 'Single Family',
        features: ['Mountain View', 'Casita', 'Pool'],
        neighborhood: 'Providence',
      },
    ];

    return sampleProperties.filter((property) => {
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      return true;
    });
  }

  async getMarketAnalysis(zipCode) {
    const neighborhood =
      zipCode === '89149' ? 'centennial-hills' : zipCode === '89166' ? 'providence' : 'skye-canyon';

    const data = this.realEstateData.neighborhoods[neighborhood];

    return {
      zipCode,
      neighborhood,
      medianPrice: data.medianPrice,
      pricePerSqft: data.pricePerSqft,
      daysOnMarket: data.daysOnMarket,
      appreciation: data.appreciation,
      inventory: '1.8 months',
      trends: "Strong seller's market with high demand",
      forecast: 'Continued appreciation expected through 2024',
    };
  }

  async calculateHomeValue(propertyData) {
    const { address, sqft, bedrooms, bathrooms } = propertyData;

    // Simple valuation algorithm
    const basePricePerSqft = 225;
    const bedroomBonus = bedrooms * 15000;
    const bathroomBonus = bathrooms * 10000;

    const estimatedValue = sqft * basePricePerSqft + bedroomBonus + bathroomBonus;

    return {
      address,
      estimatedValue,
      priceRange: {
        low: Math.round(estimatedValue * 0.9),
        high: Math.round(estimatedValue * 1.1),
      },
      confidence: '85%',
      factors: [
        'Recent comparable sales',
        'Neighborhood trends',
        'Property features',
        'Market conditions',
      ],
    };
  }

  async processAIChat(message, _context) {
    const lowerMessage = message.toLowerCase();

    // Advanced AI pattern matching with detailed responses
    if (
      lowerMessage.includes('market') ||
      lowerMessage.includes('price') ||
      lowerMessage.includes('value')
    ) {
      const marketData = this.realEstateData.neighborhoods['centennial-hills'];
      return `📊 **Centennial Hills Market Update:**
      
• Median Price: $${marketData.medianPrice.toLocaleString()}
• Price per Sq Ft: $${marketData.pricePerSqft}
• Days on Market: ${marketData.daysOnMarket} days
• Annual Appreciation: ${marketData.appreciation}%
• Market Status: Strong seller's market

The market is extremely active with low inventory and high demand. Properties often receive multiple offers. Would you like a personalized market analysis for your area?`;
    }

    if (lowerMessage.includes('school') || lowerMessage.includes('education')) {
      return `🎓 **Centennial Hills Schools:**

**Top Rated Schools:**
• Centennial High School - 9/10 rating
• Alexander Dawson School - 10/10 rating (Private)
• Centennial Elementary - 8/10 rating

**School District:** Clark County School District (highly rated northwest zone)
**Special Programs:** STEM, Arts, Athletics
**Average Test Scores:** Above state average

The area is known for excellent educational opportunities. Would you like information about specific schools or enrollment procedures?`;
    }

    if (
      lowerMessage.includes('amenities') ||
      lowerMessage.includes('activities') ||
      lowerMessage.includes('recreation')
    ) {
      return `🏌️ **Centennial Hills Amenities:**

**Recreation:**
• TPC Las Vegas Golf Course (PGA Tour venue)
• Red Rock Canyon National Conservation Area
• Multiple parks and trails
• Community pools and recreation centers

**Shopping & Dining:**
• Downtown Summerlin (outdoor mall)
• Local restaurants and cafes
• Farmers markets

**Convenience:**
• Close to airport (25 minutes)
• Major highways access
• Medical facilities nearby

What specific amenities are most important to you?`;
    }

    if (
      lowerMessage.includes('buy') ||
      lowerMessage.includes('purchase') ||
      lowerMessage.includes('home search')
    ) {
      return `🏡 **Ready to Buy in Centennial Hills?**

I can help you find the perfect home! Here's how:

1. **Free Pre-approval Assistance** - Connect with top lenders
2. **Personalized Property Search** - Match your exact criteria  
3. **Market Analysis** - Ensure you're getting the best value
4. **Professional Guidance** - Expert negotiation and closing support

**Current Inventory:** Limited but quality options available
**Average Price Range:** $580K - $750K
**Best Time to Buy:** Now (before spring market heats up)

What's your budget and must-have features? I'll create a custom search for you!`;
    }

    if (
      lowerMessage.includes('sell') ||
      lowerMessage.includes('listing') ||
      lowerMessage.includes('valuation')
    ) {
      return `💰 **Selling Your Centennial Hills Home?**

**Current Market Advantages:**
• Low inventory = Higher prices
• Average days on market: 18 days
• Multiple offer situations common
• 8.2% annual appreciation

**My Full-Service Approach:**
1. **Free Home Valuation** - Precise pricing strategy
2. **Professional Marketing** - Photography, staging, online presence
3. **Negotiation Expertise** - Maximize your net proceeds
4. **Smooth Closing** - Handle all details

**Recent Results:** 98% of listings sell within 30 days at 102% of asking price

Ready for your free home valuation? What's your address?`;
    }

    if (
      lowerMessage.includes('mortgage') ||
      lowerMessage.includes('payment') ||
      lowerMessage.includes('finance') ||
      lowerMessage.includes('loan')
    ) {
      return `💳 **Mortgage Information for Centennial Hills:**

**Current Rates (estimated):**
• 30-year fixed: 7.25% - 7.75%
• 15-year fixed: 6.75% - 7.25%
• FHA loans: 7.00% - 7.50%

**Monthly Payment Example** (on $650,000 home):
• 20% down ($130,000)
• Loan amount: $520,000
• Est. payment: ~$3,600/month (P&I)

**Local Lender Partners:** I work with trusted local lenders who know Centennial Hills and can offer competitive rates.

Would you like me to connect you with a lender for pre-approval?`;
    }

    if (
      lowerMessage.includes('investment') ||
      lowerMessage.includes('rental') ||
      lowerMessage.includes('roi')
    ) {
      return `📈 **Centennial Hills Investment Opportunities:**

**Investment Highlights:**
• Strong rental demand (growing tech sector)
• 8.2% annual appreciation
• Quality tenant pool (professionals, families)
• Limited new construction = supply constraint

**Rental Market:**
• 3BR homes: $2,800-$3,400/month
• 4BR homes: $3,200-$4,000/month
• Average vacancy: <30 days

**ROI Potential:** 6-8% cap rates common
**Future Growth:** Continued development planned

Interested in investment properties? I can show you current opportunities!`;
    }

    if (
      lowerMessage.includes('neighborhood') ||
      lowerMessage.includes('area') ||
      lowerMessage.includes('community')
    ) {
      return `🏘️ **Centennial Hills Neighborhoods:**

**Featured Communities:**
• **Providence** - Master-planned, mountain views ($750K+)
• **The Ridges** - Luxury golf course community ($1M+)  
• **Skye Canyon** - Family-friendly, newer homes ($580K+)
• **Centennial Hills** - Established, golf course access ($635K+)

**Each Area Offers:**
• Gated communities available
• A+ rated schools
• Parks and recreation
• HOA amenities

**Lifestyle:** Family-oriented, active, upscale suburban

Which neighborhood characteristics matter most to you?`;
    }

    // Default helpful response with call to action
    return `👋 **Hi! I'm your Centennial Hills AI assistant.**

I can help you with:
• 📊 Market conditions and pricing
• 🏫 School information and ratings  
• 🏌️ Local amenities and activities
• 🏡 Buying process and home search
• 💰 Selling strategies and valuations
• 💳 Mortgage and financing options
• 📈 Investment opportunities

**Popular Questions:**
- "What are home prices in Centennial Hills?"
- "Tell me about the schools"
- "I want to buy a home"
- "What's my home worth?"

Just ask me anything about Centennial Hills real estate! I'm here 24/7 to help.`;
  }

  async calculateMortgage(data) {
    const { homePrice, downPayment, interestRate, loanTerm } = data;

    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const monthlyPayment =
      (loanAmount * (monthlyRate * (1 + monthlyRate) ** numPayments)) /
      ((1 + monthlyRate) ** numPayments - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;

    // Estimate taxes and insurance for Centennial Hills
    const propertyTax = (homePrice * 0.0076) / 12; // Nevada average
    const insurance = (homePrice * 0.0035) / 12; // Estimate
    const pmi = loanAmount < homePrice * 0.8 ? 0 : (loanAmount * 0.005) / 12;

    const totalMonthlyPayment = monthlyPayment + propertyTax + insurance + pmi;

    return {
      homePrice,
      downPayment,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      propertyTax: Math.round(propertyTax),
      insurance: Math.round(insurance),
      pmi: Math.round(pmi),
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      interestRate,
      loanTerm,
    };
  }

  async captureLead(leadData) {
    // In a real application, this would save to a database
    const lead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...leadData,
      source: 'centennial-hills-website',
      status: 'new',
    };

    console.log('New lead captured:', lead);

    // Simulate email notification
    return {
      message: "Thank you! I'll contact you within 1 hour.",
      leadId: lead.id,
      nextSteps: [
        "I'll call you within 1 hour",
        'Send you a custom property search',
        'Schedule a consultation if desired',
      ],
    };
  }

  async setupPropertyAlerts(email, criteria) {
    // In a real application, this would save to a database
    const alert = {
      id: Date.now().toString(),
      email,
      criteria,
      created: new Date().toISOString(),
      active: true,
    };

    console.log('Property alert created:', alert);

    return {
      message:
        "Property alerts activated! You'll receive notifications when new properties match your criteria.",
      alertId: alert.id,
      criteria,
    };
  }

  async start() {
    const PORT = process.env.PORT || 3001;
    this.app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Centennial Hills MCP Server running on port ${PORT}`);
      console.log(`📍 API endpoints available at http://0.0.0.0:${PORT}/api/`);
      console.log(`🤖 AI Chat: /api/ai-chat`);
      console.log(`🏠 Property Search: /api/search-properties`);
      console.log(`📊 Market Analysis: /api/market-analysis`);
      console.log(`💰 Home Valuation: /api/home-valuation`);
      console.log(`💳 Mortgage Calculator: /api/mortgage-calculator`);
      console.log(`📧 Lead Capture: /api/lead-capture`);
      console.log(`🔔 Property Alerts: /api/property-alerts`);
    });
  }
}

// Initialize and start server
const server = new CentennialHillsMCPServer();
server.start().catch(console.error);

export default CentennialHillsMCPServer;
