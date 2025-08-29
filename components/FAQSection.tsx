import { ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  showCategories?: boolean;
}

export default function FAQSection({ title = 'Frequently Asked Questions', items, showCategories = false }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const scriptRef = useRef<HTMLDivElement>(null);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }), [items]);

  useEffect(() => {
    if (scriptRef.current) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqSchema);
      scriptRef.current.appendChild(script);
    }
  }, [faqSchema]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Generate FAQ schema markup
  // const faqSchema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'FAQPage',
  //   mainEntity: items.map((item) => ({
  //     '@type': 'Question',
  //     name: item.question,
  //     acceptedAnswer: {
  //       '@type': 'Answer',
  //       text: item.answer,
  //     },
  //   })),
  // };

  // Group items by category if needed
  const groupedItems = showCategories
    ? items.reduce(
        (acc, item) => {
          const category = item.category || 'General';
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        },
        {} as Record<string, FAQItem[]>
      )
    : { 'All Questions': items };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about Centennial Hills real estate
            </p>
          </div>

          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-8">
              {showCategories && (
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h3>
              )}

              <div className="space-y-4">
                {categoryItems.map((item, globalIndex) => {
                  const isOpen = openItems.includes(globalIndex);
                  return (
                    <div
                      key={`${category}-${globalIndex}-${item.question.substring(0, 20)}`}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                        aria-expanded={isOpen ? 'true' : 'false'}
                        aria-controls={`faq-answer-${globalIndex}`}
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      <div
                        id={`faq-answer-${globalIndex}`}
                        className={`px-6 transition-all duration-300 ease-in-out ${
                          isOpen ? 'pb-4 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        <div className="text-gray-600 leading-relaxed">{item.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
