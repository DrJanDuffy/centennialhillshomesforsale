interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

interface RealEstateMetrics {
  propertyViews: number;
  searchQueries: number;
  contactRequests: number;
  listingClicks: number;
  calculatorUsage: number;
}

class EnterpriseAnalytics {
  private static instance: EnterpriseAnalytics;
  private isInitialized = false;
  private metrics: RealEstateMetrics = {
    propertyViews: 0,
    searchQueries: 0,
    contactRequests: 0,
    listingClicks: 0,
    calculatorUsage: 0,
  };

  static getInstance(): EnterpriseAnalytics {
    if (!EnterpriseAnalytics.instance) {
      EnterpriseAnalytics.instance = new EnterpriseAnalytics();
    }
    return EnterpriseAnalytics.instance;
  }

  initialize(measurementId?: string): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Initialize Google Analytics if measurement ID is provided
    if (measurementId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
          if (window.dataLayer) {
            window.dataLayer.push(args);
          }
        };
      }

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: 'Centennial Hills Homes for Sale',
        custom_map: {
          real_estate_type: 'residential',
          market_area: 'centennial_hills',
          agent_name: 'jan_duff',
        },
      });
    }

    // Setup custom event listeners
    this.setupEventListeners();
    this.isInitialized = true;
  }

  private setupEventListeners(): void {
    // Track property searches
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form.classList.contains('property-search')) {
        this.trackEvent({
          category: 'Real Estate',
          action: 'Property Search',
          label: 'Search Form Submission',
        });
        this.metrics.searchQueries++;
      }
    });

    // Track contact form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form.classList.contains('contact-form')) {
        this.trackEvent({
          category: 'Lead Generation',
          action: 'Contact Request',
          label: 'Contact Form',
        });
        this.metrics.contactRequests++;
      }
    });

    // Track property listing clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.property-listing') || target.closest('[data-property-id]')) {
        const propertyId = target.closest('[data-property-id]')?.getAttribute('data-property-id');
        this.trackEvent({
          category: 'Property Engagement',
          action: 'Property View',
          label: propertyId || 'Unknown Property',
          customParameters: {
            property_id: propertyId,
            timestamp: new Date().toISOString(),
          },
        });
        this.metrics.propertyViews++;
      }
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters,
      });
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Store locally for reporting
    this.storeEventLocally(event);
  }

  private storeEventLocally(event: AnalyticsEvent): void {
    try {
      const stored = localStorage.getItem('enterprise_analytics_events');
      const events = stored ? JSON.parse(stored) : [];
      events.push({
        ...event,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      });

      // Keep only last 1000 events
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }

      localStorage.setItem('enterprise_analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  getMetrics(): RealEstateMetrics {
    return { ...this.metrics };
  }

  exportData(): any {
    try {
      const events = localStorage.getItem('enterprise_analytics_events');
      return {
        metrics: this.metrics,
        events: events ? JSON.parse(events) : [],
        exportedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to export analytics data:', error);
      return null;
    }
  }

  // Real estate specific tracking methods
  trackPropertySearch(query: string, filters: any = {}): void {
    this.trackEvent({
      category: 'Real Estate Search',
      action: 'Property Search',
      label: query,
      customParameters: {
        search_query: query,
        filters: filters,
        results_count: filters.resultsCount || 0,
      },
    });
  }

  trackPropertyView(propertyId: string, propertyType: string, price?: number): void {
    this.trackEvent({
      category: 'Property Engagement',
      action: 'Property Detail View',
      label: propertyId,
      value: price,
      customParameters: {
        property_id: propertyId,
        property_type: propertyType,
        price: price,
      },
    });
  }

  trackCalculatorUsage(calculatorType: string, inputs: any = {}): void {
    this.trackEvent({
      category: 'Tools Usage',
      action: 'Calculator Used',
      label: calculatorType,
      customParameters: {
        calculator_type: calculatorType,
        inputs: inputs,
      },
    });
    this.metrics.calculatorUsage++;
  }

  trackLeadGeneration(source: string, propertyId?: string): void {
    this.trackEvent({
      category: 'Lead Generation',
      action: 'Lead Captured',
      label: source,
      customParameters: {
        lead_source: source,
        property_id: propertyId,
        conversion_page: window.location.pathname,
      },
    });
  }
}

export default EnterpriseAnalytics;
