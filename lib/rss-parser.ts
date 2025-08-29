import { XMLParser } from 'fast-xml-parser';

export interface KCMArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  publishedAt: string;
  author: string;
  category: string;
  imageUrl?: string;
  readTime: number;
  excerpt: string;
}

export interface RSSFeedData {
  title: string;
  description: string;
  link: string;
  articles: KCMArticle[];
  lastUpdated: string;
}

class RSSParser {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
    });
  }

  async parseFeed(feedUrl: string): Promise<RSSFeedData> {
    try {
      const response = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CentennialHillsHomes/1.0)',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status}`);
      }

      const xmlText = await response.text();
      const parsed = this.parser.parse(xmlText);

      // Handle different RSS feed structures
      const channel = parsed.rss?.channel || parsed.feed;
      if (!channel) {
        throw new Error('Invalid RSS feed structure');
      }

      const articles = this.parseArticles(channel.item || channel.entry || []);

      return {
        title: channel.title || 'Market Insights',
        description: channel.description || 'Latest real estate market insights',
        link: channel.link || feedUrl,
        articles,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      throw error;
    }
  }

  private parseArticles(items: any[]): KCMArticle[] {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .filter((item) => item?.title)
      .map((item, index) => {
        const content = this.cleanContent(item.content || item.description || '');
        const imageUrl = this.extractImageUrl(content);
        const excerpt = this.generateExcerpt(content, 150);
        const readTime = this.calculateReadTime(content);

        return {
          id: item.guid || item.id || `article-${index}`,
          title: this.cleanText(item.title),
          description: this.cleanText(item.description || ''),
          content,
          link: item.link || '',
          publishedAt: this.formatDate(item.pubDate || item.published || item.updated),
          author: this.cleanText(item.author || item['dc:creator'] || 'KCM Team'),
          category: this.cleanText(item.category || 'Market Insights'),
          imageUrl,
          readTime,
          excerpt,
        };
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  private cleanContent(content: string): string {
    if (!content) return '';

    // Remove HTML tags but preserve line breaks
    let cleaned = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Decode HTML entities
    cleaned = this.decodeHtmlEntities(cleaned);

    return cleaned;
  }

  private cleanText(text: string): string {
    if (!text) return '';
    return this.decodeHtmlEntities(text.replace(/<[^>]+>/g, '').trim());
  }

  private extractImageUrl(content: string): string | undefined {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    return imgMatch ? imgMatch[1] : undefined;
  }

  private generateExcerpt(content: string, maxLength: number): string {
    if (!content) return '';

    const words = content.split(' ');
    if (words.length <= maxLength / 5) return content;

    return `${words.slice(0, Math.floor(maxLength / 5)).join(' ')}...`;
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (Number.isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  private decodeHtmlEntities(text: string): string {
    const entities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' ',
      '&hellip;': '...',
      '&mdash;': '—',
      '&ndash;': '–',
    };

    return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
      return entities[entity] || entity;
    });
  }
}

export const rssParser = new RSSParser();

// Helper function to fetch and parse KCM feed
export async function fetchKCMFeed(): Promise<RSSFeedData> {
  // Primary RSS feed URL from Simplifying the Market
  const feedUrl =
    'https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18';

  try {
    return await rssParser.parseFeed(feedUrl);
  } catch (error) {
    console.warn('Primary RSS feed failed, trying alternative URL:', error);

    // Fallback to alternative URL if primary fails
    const alternativeUrl =
      'https://www.simplifyingthemarket.com/en/?a=956758-ef2edda2f940e018328655620ea05f18';
    return await rssParser.parseFeed(alternativeUrl);
  }
}
