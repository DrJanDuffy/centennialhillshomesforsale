interface PageError {
  type: 'missing-meta' | 'broken-link' | 'missing-schema' | 'seo-issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  element?: string;
  suggestion?: string;
}

interface PageValidationResult {
  isValid: boolean;
  errors: PageError[];
  warnings: PageError[];
  score: number;
}

class PageErrorChecker {
  private errors: PageError[] = [];
  private warnings: PageError[] = [];

  validatePage(_url?: string): PageValidationResult {
    this.errors = [];
    this.warnings = [];

    if (typeof window !== 'undefined') {
      this.checkMetaTags();
      this.checkHeadings();
      this.checkImages();
      this.checkLinks();
      this.checkSchemaMarkup();
      this.checkSEOElements();
    }

    const score = this.calculateScore();
    const isValid = this.errors.length === 0;

    return {
      isValid,
      errors: this.errors,
      warnings: this.warnings,
      score,
    };
  }

  private checkMetaTags(): void {
    const title = document.querySelector('title');
    if (!title || !title.textContent?.trim()) {
      this.addError('missing-meta', 'critical', 'Missing or empty page title', 'title');
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription || !metaDescription.getAttribute('content')?.trim()) {
      this.addError('missing-meta', 'high', 'Missing meta description', 'meta[name="description"]');
    }

    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      this.addError('missing-meta', 'medium', 'Missing viewport meta tag', 'meta[name="viewport"]');
    }
  }

  private checkHeadings(): void {
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length === 0) {
      this.addError('seo-issue', 'high', 'Missing H1 heading', 'h1');
    } else if (h1Elements.length > 1) {
      this.addWarning('seo-issue', 'medium', 'Multiple H1 headings found', 'h1');
    }
  }

  private checkImages(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        this.addWarning(
          'seo-issue',
          'medium',
          `Image missing alt attribute`,
          `img:nth-child(${index + 1})`
        );
      }
    });
  }

  private checkLinks(): void {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') {
        this.addWarning(
          'broken-link',
          'low',
          'Empty or placeholder link',
          `a:nth-child(${index + 1})`
        );
      }
    });
  }

  private checkSchemaMarkup(): void {
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (schemaScripts.length === 0) {
      this.addWarning('missing-schema', 'medium', 'No structured data found');
    } else {
      schemaScripts.forEach((script, index) => {
        try {
          JSON.parse(script.textContent || '');
        } catch (_error) {
          this.addError(
            'missing-schema',
            'high',
            `Invalid JSON-LD schema`,
            `script:nth-child(${index + 1})`
          );
        }
      });
    }
  }

  private checkSEOElements(): void {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      this.addWarning('seo-issue', 'medium', 'Missing canonical link');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      this.addWarning('seo-issue', 'low', 'Missing Open Graph title');
    }
  }

  private addError(
    type: PageError['type'],
    severity: PageError['severity'],
    message: string,
    element?: string
  ): void {
    this.errors.push({ type, severity, message, element });
  }

  private addWarning(
    type: PageError['type'],
    severity: PageError['severity'],
    message: string,
    element?: string
  ): void {
    this.warnings.push({ type, severity, message, element });
  }

  private calculateScore(): number {
    const _totalIssues = this.errors.length + this.warnings.length;
    const criticalPenalty = this.errors.filter((e) => e.severity === 'critical').length * 25;
    const highPenalty = this.errors.filter((e) => e.severity === 'high').length * 15;
    const mediumPenalty =
      (this.errors.filter((e) => e.severity === 'medium').length +
        this.warnings.filter((w) => w.severity === 'medium').length) *
      10;
    const lowPenalty = this.warnings.filter((w) => w.severity === 'low').length * 5;

    const totalPenalty = criticalPenalty + highPenalty + mediumPenalty + lowPenalty;
    return Math.max(0, 100 - totalPenalty);
  }
}

export default PageErrorChecker;
export type { PageError, PageValidationResult };
