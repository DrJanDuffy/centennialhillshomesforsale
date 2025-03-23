# Centennial Hills Homes For Sale

A Next.js website showcasing homes for sale in Centennial Hills, Las Vegas.

## Features

- Real estate listings
- Market analysis tools
- Interactive maps
- Property search functionality
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/geneb/centennialhillshomesforsale.git
cd centennialhillshomesforsale
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_REALSCOUT_OFFICE_ID=your_office_id
NEXT_PUBLIC_REALSCOUT_MARKET_AREA=your_market_area
# Add other required environment variables
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

To deploy manually:

```bash
npm run build
npm run deploy
```

The site will be available at: https://geneb.github.io/centennialhillshomesforsale

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
