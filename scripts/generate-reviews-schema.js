
const fs = require('fs');
const path = require('path');

// Sample reviews data for schema markup
const reviewsData = [
  {
    author: "Sarah M.",
    rating: 5,
    reviewBody: "Dr. Jan Duffy helped us find our dream home in Centennial Hills. Her knowledge of the area and professionalism made the entire process smooth. Highly recommend!",
    datePublished: "2024-11-15"
  },
  {
    author: "Michael R.",
    rating: 5,
    reviewBody: "Outstanding service! Jan knew exactly what we were looking for in Providence. She was available 24/7 and found us the perfect home within our budget.",
    datePublished: "2024-10-28"
  },
  {
    author: "Jennifer L.",
    rating: 5,
    reviewBody: "First-time home buyer experience was amazing with Dr. Duffy. She guided us through every step and helped us understand the Skye Canyon market.",
    datePublished: "2024-10-12"
  },
  {
    author: "David K.",
    rating: 5,
    reviewBody: "Sold our Summerlin home in just 12 days! Jan's marketing strategy and pricing expertise are top-notch. True professional.",
    datePublished: "2024-09-30"
  },
  {
    author: "Lisa T.",
    rating: 5,
    reviewBody: "Luxury home purchase in Lone Mountain went perfectly. Jan's attention to detail and market knowledge saved us time and money.",
    datePublished: "2024-09-18"
  }
];

function generateReviewsSchema() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dr. Jan Duffy, REALTOR®",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "4"
    },
    "review": reviewsData.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };

  // Save reviews schema
  fs.writeFileSync(
    path.join(__dirname, '../public/reviews-schema.json'),
    JSON.stringify(reviewsSchema, null, 2)
  );

  console.log('Reviews schema generated successfully!');
  console.log(`- ${reviewsData.length} reviews structured`);
  console.log('Schema saved to: public/reviews-schema.json');

  return reviewsSchema;
}

// Generate reviews schema
generateReviewsSchema();

module.exports = { generateReviewsSchema, reviewsData };
