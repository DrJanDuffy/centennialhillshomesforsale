const fs = require('node:fs');
const path = require('node:path');

const siteConfig = {
  baseUrl: 'https://centennialhillshomesforsale.com',
  pages: [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/listings', priority: 0.9, changefreq: 'daily' },
    { url: '/neighborhoods', priority: 0.8, changefreq: 'weekly' },
    { url: '/centennial-hills', priority: 0.8, changefreq: 'weekly' },
    { url: '/providence-las-vegas', priority: 0.7, changefreq: 'weekly' },
    { url: '/skye-canyon', priority: 0.7, changefreq: 'weekly' },
    { url: '/las-vegas-89149', priority: 0.7, changefreq: 'weekly' },
    { url: '/las-vegas-89166', priority: 0.7, changefreq: 'weekly' },
    { url: '/northwest-las-vegas', priority: 0.7, changefreq: 'weekly' },
    { url: '/market-update', priority: 0.8, changefreq: 'daily' },
    { url: '/faq', priority: 0.6, changefreq: 'monthly' },
    { url: '/services', priority: 0.7, changefreq: 'monthly' },
    { url: '/about', priority: 0.5, changefreq: 'monthly' },
    { url: '/contact', priority: 0.5, changefreq: 'monthly' },
    { url: '/local-business-optimization', priority: 0.5, changefreq: 'monthly' },
  ],
};

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  siteConfig.pages.forEach((page) => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteConfig.baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  return sitemap;
}

function generateNewsSitemap() {
  const currentDate = new Date().toISOString();

  let newsSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  newsSitemap +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

  // Add market update as news content
  newsSitemap += '  <url>\n';
  newsSitemap += `    <loc>${siteConfig.baseUrl}/market-update</loc>\n`;
  newsSitemap += '    <news:news>\n';
  newsSitemap += '      <news:publication>\n';
  newsSitemap += '        <news:name>Centennial Hills Homes For Sale</news:name>\n';
  newsSitemap += '        <news:language>en</news:language>\n';
  newsSitemap += '      </news:publication>\n';
  newsSitemap += `      <news:publication_date>${currentDate}</news:publication_date>\n`;
  newsSitemap += '      <news:title>Centennial Hills Real Estate Market Update</news:title>\n';
  newsSitemap +=
    '      <news:keywords>real estate, Centennial Hills, Las Vegas, market update, home prices</news:keywords>\n';
  newsSitemap += '    </news:news>\n';
  newsSitemap += '  </url>\n';

  newsSitemap += '</urlset>';

  return newsSitemap;
}

// Generate and save sitemaps
const sitemap = generateSitemap();
const newsSitemap = generateNewsSitemap();

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, '../public/sitemap-news.xml'), newsSitemap);

console.log('Sitemaps generated successfully!');
console.log('- sitemap.xml: Main sitemap with all pages');
console.log('- sitemap-news.xml: News sitemap for market updates');

module.exports = {
  generateSitemap,
  generateNewsSitemap,
  siteConfig,
};
