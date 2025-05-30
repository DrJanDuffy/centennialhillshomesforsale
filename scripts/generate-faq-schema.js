
const fs = require('fs');
const path = require('path');

const faq = [
  {
    question: "What areas does Dr. Jan Duffy specialize in?",
    answer: "Dr. Jan Duffy specializes in North Las Vegas, Centennial Hills, Providence, Skye Canyon, Summerlin, Lone Mountain, Aliante, Tule Springs, El Dorado, and other master-planned communities. With 20+ years of experience, she's ranked in the Top 1% of Las Vegas REALTORS®."
  },
  {
    question: "What services does Dr. Duffy offer?",
    answer: "Dr. Duffy offers luxury property sales, new construction sales, first-time home buyer services, relocation assistance, property management, real estate investing guidance, and commercial property transactions. She provides same-day showings and free market analysis."
  },
  {
    question: "How do I find homes for sale in Summerlin or Centennial Hills?",
    answer: "Browse our up-to-date listings, use our interactive map, or contact Dr. Duffy directly at (702) 903-1952 for personalized recommendations. She offers 24/7 availability and same-day showings for qualified buyers."
  },
  {
    question: "What is the average home price in Summerlin and Centennial Hills?",
    answer: "Home prices vary by neighborhood and property type. Centennial Hills median is around $635,000, while Summerlin ranges from $400,000 to over $2 million for luxury estates. Dr. Duffy provides current market analysis for specific neighborhoods upon request."
  },
  {
    question: "What makes Dr. Duffy different from other REALTORS®?",
    answer: "Dr. Duffy is ranked in the Top 1% of Las Vegas REALTORS® with 20+ years of experience in master-planned communities. She offers 24/7 availability, same-day showings, personalized service, and specializes in luxury and new construction homes with a 4.9/5 star rating."
  },
  {
    question: "Does Dr. Duffy help with relocation to Las Vegas?",
    answer: "Yes, Dr. Duffy provides comprehensive relocation assistance including detailed neighborhood insights, school information, and tailored home searches. She helps individuals and families moving to Las Vegas from anywhere in the country."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
};

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(
  path.join(publicDir, 'faq-schema.json'),
  JSON.stringify(faqSchema, null, 2)
);

console.log("FAQ schema generated for GEO optimization!");

module.exports = { faq, faqSchema };
