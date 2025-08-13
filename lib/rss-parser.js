import { XMLParser } from 'fast-xml-parser';

export class RSSParserError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = 'RSSParserError';
    this.code = code;
    this.details = details;
  }
}

export class RSSParser {
  constructor(options = {}) {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      ...options
    });
    
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.timeout = options.timeout || 10000;
  }

  async parseFeed(feedUrl, options = {}) {
    const retries = options.retries || 0;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CentennialHillsHomes/1.0)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache',
          ...options.headers
        },
        signal: controller.signal,
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new RSSParserError(
          `Failed to fetch RSS feed: ${response.status} ${response.statusText}`,
          'FETCH_ERROR',
          { status: response.status, statusText: response.statusText }
        );
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('xml')) {
        throw new RSSParserError(
          'Invalid content type: expected XML',
          'INVALID_CONTENT_TYPE',
          { contentType }
        );
      }

      const xmlText = await response.text();
      
      if (!xmlText || xmlText.trim().length === 0) {
        throw new RSSParserError(
          'Empty RSS feed response',
          'EMPTY_RESPONSE'
        );
      }

      const parsed = this.parser.parse(xmlText);
      return this.processParsedData(parsed, feedUrl);

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new RSSParserError(
          'Request timeout',
          'TIMEOUT_ERROR',
          { timeout: this.timeout }
        );
      }

      if (error instanceof RSSParserError) {
        throw error;
      }

      // Retry logic for network errors
      if (retries < this.maxRetries && this.isRetryableError(error)) {
        console.warn(`RSS fetch failed, retrying (${retries + 1}/${this.maxRetries}):`, error.message);
        
        await this.delay(this.retryDelay * Math.pow(2, retries));
        return this.parseFeed(feedUrl, { ...options, retries: retries + 1 });
      }

      throw new RSSParserError(
        `Failed to parse RSS feed: ${error.message}`,
        'PARSE_ERROR',
        { originalError: error.message, retries }
      );
    }
  }

  processParsedData(parsed, feedUrl) {
    try {
      // Handle different RSS feed structures
      const channel = parsed.rss?.channel || parsed.feed || parsed.rdf;
      if (!channel) {
        throw new RSSParserError(
          'Invalid RSS feed structure: missing channel or feed element',
          'INVALID_STRUCTURE'
        );
      }

      const articles = this.parseArticles(channel.item || channel.entry || []);
      
      if (articles.length === 0) {
        console.warn('RSS feed contains no articles');
      }

      return {
        title: this.sanitizeText(channel.title) || 'Market Insights',
        description: this.sanitizeText(channel.description) || 'Latest real estate market insights',
        link: this.sanitizeUrl(channel.link) || feedUrl,
        language: channel.language || 'en',
        lastBuildDate: channel.lastBuildDate || channel.updated || new Date().toISOString(),
        articles,
        lastUpdated: new Date().toISOString(),
        feedType: parsed.rss ? 'RSS' : parsed.feed ? 'Atom' : 'RDF',
        articleCount: articles.length
      };
    } catch (error) {
      throw new RSSParserError(
        `Failed to process RSS data: ${error.message}`,
        'PROCESSING_ERROR',
        { originalError: error.message }
      );
    }
  }

  parseArticles(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .filter(item => item && item.title)
      .map((item, index) => {
        try {
          const content = this.cleanContent(item.content || item.description || '');
          const imageUrl = this.extractImageUrl(content);
          const excerpt = this.generateExcerpt(content, 150);
          const readTime = this.calculateReadTime(content);

          return {
            id: item.guid || item.id || `article-${index}`,
            title: this.sanitizeText(item.title),
            description: this.sanitizeText(item.description || ''),
            content,
            link: this.sanitizeUrl(item.link || ''),
            publishedAt: this.formatDate(item.pubDate || item.published || item.updated),
            author: this.sanitizeText(item.author || item['dc:creator'] || 'KCM Team'),
            category: this.sanitizeText(item.category || 'Market Insights'),
            imageUrl,
            readTime,
            excerpt,
            tags: this.extractTags(item),
            source: 'KCM',
            originalUrl: this.sanitizeUrl(item.link || '')
          };
        } catch (error) {
          console.warn(`Failed to parse article ${index}:`, error);
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  cleanContent(content) {
    if (!content) return '';
    
    try {
      // Remove script and style tags
      let cleaned = content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Decode HTML entities
      cleaned = this.decodeHtmlEntities(cleaned);
      
      return cleaned;
    } catch (error) {
      console.warn('Error cleaning content:', error);
      return content || '';
    }
  }

  sanitizeText(text) {
    if (!text) return '';
    try {
      return this.decodeHtmlEntities(text.replace(/<[^>]+>/g, '').trim());
    } catch (error) {
      console.warn('Error sanitizing text:', error);
      return text || '';
    }
  }

  sanitizeUrl(url) {
    if (!url) return '';
    try {
      const sanitized = url.trim();
      if (sanitized.startsWith('http://') || sanitized.startsWith('https://')) {
        return sanitized;
      }
      return `https://${sanitized}`;
    } catch (error) {
      console.warn('Error sanitizing URL:', error);
      return url || '';
    }
  }

  extractImageUrl(content) {
    try {
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
      return imgMatch ? this.sanitizeUrl(imgMatch[1]) : undefined;
    } catch (error) {
      console.warn('Error extracting image URL:', error);
      return undefined;
    }
  }

  extractTags(item) {
    try {
      const tags = [];
      if (item.category) {
        tags.push(this.sanitizeText(item.category));
      }
      if (item.tags) {
        tags.push(...item.tags.split(',').map(tag => this.sanitizeText(tag)));
      }
      return tags.filter(Boolean);
    } catch (error) {
      console.warn('Error extracting tags:', error);
      return [];
    }
  }

  generateExcerpt(content, maxLength) {
    if (!content) return '';
    
    try {
      const words = content.split(' ');
      if (words.length <= maxLength / 5) return content;
      
      return `${words.slice(0, Math.floor(maxLength / 5)).join(' ')}...`;
    } catch (error) {
      console.warn('Error generating excerpt:', error);
      return content || '';
    }
  }

  calculateReadTime(content) {
    try {
      const wordsPerMinute = 200;
      const wordCount = content.split(' ').length;
      return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    } catch (error) {
      console.warn('Error calculating read time:', error);
      return 1;
    }
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch (error) {
      console.warn('Error formatting date:', error);
      return new Date().toISOString();
    }
  }

  decodeHtmlEntities(text) {
    try {
      const entities = {
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
        '&copy;': '©',
        '&reg;': '®',
        '&trade;': '™'
      };

      return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
        return entities[entity] || entity;
      });
    } catch (error) {
      console.warn('Error decoding HTML entities:', error);
      return text;
    }
  }

  isRetryableError(error) {
    const retryableCodes = ['ECONNRESET', 'ENOTFOUND', 'ETIMEDOUT', 'ECONNREFUSED'];
    return retryableCodes.some(code => error.code === code) || 
           error.message.includes('network') ||
           error.message.includes('timeout');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  validateFeed(feedData) {
    const errors = [];
    
    if (!feedData.title) errors.push('Missing feed title');
    if (!feedData.articles || feedData.articles.length === 0) {
      errors.push('No articles found in feed');
    }
    
    if (errors.length > 0) {
      throw new RSSParserError(
        `Feed validation failed: ${errors.join(', ')}`,
        'VALIDATION_ERROR',
        { errors }
      );
    }
    
    return true;
  }
}

// Global parser instance
export const rssParser = new RSSParser();

// Helper function to fetch and parse KCM feed with validation
export async function fetchKCMFeed(options = {}) {
  const feedUrl = 'https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18';
  
  try {
    const feedData = await rssParser.parseFeed(feedUrl, options);
    rssParser.validateFeed(feedData);
    return feedData;
  } catch (error) {
    console.error('KCM feed fetch failed:', error);
    throw error;
  }
}

// Export error types for use in components
export { RSSParserError };
