/**
 * Advanced Analytics and Conversion Tracking
 * Tracks user behavior, engagement, and conversion metrics
 */

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

interface ConversionMetrics {
  engagementScore: number;
  timeOnSite: number;
  scrollDepth: number;
  clickCount: number;
  formInteractions: number;
  triggerActivations: string[];
  funnelStage: string;
  conversionValue: number;
}

class AnalyticsTracker {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private metrics: ConversionMetrics;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.metrics = {
      engagementScore: 0,
      timeOnSite: 0,
      scrollDepth: 0,
      clickCount: 0,
      formInteractions: 0,
      triggerActivations: [],
      funnelStage: 'awareness',
      conversionValue: 0,
    };

    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page view
    this.track('page_view', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });

    // Track time on site
    this.startTimeTracking();

    // Track scroll depth
    this.trackScrollDepth();

    // Track clicks
    this.trackClicks();

    // Track form interactions
    this.trackFormInteractions();
  }

  private startTimeTracking(): void {
    const startTime = Date.now();

    setInterval(() => {
      this.metrics.timeOnSite = Math.floor((Date.now() - startTime) / 1000);
      this.updateEngagementScore();
    }, 1000);

    // Track time on site when user leaves
    window.addEventListener('beforeunload', () => {
      this.track('time_on_site', {
        duration: this.metrics.timeOnSite,
        engagementScore: this.metrics.engagementScore,
      });
    });
  }

  private trackScrollDepth(): void {
    let maxScrollDepth = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        this.metrics.scrollDepth = maxScrollDepth;
        this.updateEngagementScore();

        // Track milestone scroll depths
        if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
          this.track('scroll_25_percent');
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
          this.track('scroll_50_percent');
        } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
          this.track('scroll_75_percent');
        } else if (maxScrollDepth >= 100) {
          this.track('scroll_100_percent');
        }
      }
    });
  }

  private trackClicks(): void {
    document.addEventListener('click', (event) => {
      this.metrics.clickCount++;
      this.updateEngagementScore();

      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementClass = target.className;
      const elementId = target.id;
      const elementText = target.textContent?.trim().substring(0, 50);

      this.track('click', {
        elementType,
        elementClass,
        elementId,
        elementText,
        clickCount: this.metrics.clickCount,
      });

      // Track specific conversion actions
      if (target.closest('a[href*="tel:"]')) {
        this.track('phone_click', { phone: target.getAttribute('href') });
        this.metrics.conversionValue += 10;
      }

      if (target.closest('a[href*="mailto:"]')) {
        this.track('email_click', { email: target.getAttribute('href') });
        this.metrics.conversionValue += 7;
      }

      if (target.closest('button') && elementText?.toLowerCase().includes('contact')) {
        this.track('contact_button_click');
        this.metrics.conversionValue += 8;
      }
    });
  }

  private trackFormInteractions(): void {
    document.addEventListener(
      'focus',
      (event) => {
        const target = event.target as HTMLElement;
        if (
          target.tagName.toLowerCase() === 'input' ||
          target.tagName.toLowerCase() === 'textarea'
        ) {
          this.metrics.formInteractions++;
          this.updateEngagementScore();

          this.track('form_interaction', {
            fieldType: target.getAttribute('type') || 'text',
            fieldName: target.getAttribute('name') || 'unknown',
            formInteractions: this.metrics.formInteractions,
          });
        }
      },
      true
    );

    document.addEventListener('submit', (event) => {
      const target = event.target as HTMLFormElement;
      this.track('form_submit', {
        formId: target.id || 'unknown',
        formClass: target.className || 'unknown',
      });
      this.metrics.conversionValue += 15;
    });
  }

  private updateEngagementScore(): void {
    // Calculate engagement score based on various metrics
    let score = 0;

    // Time on site (max 30 points)
    score += Math.min(this.metrics.timeOnSite / 10, 30);

    // Scroll depth (max 25 points)
    score += (this.metrics.scrollDepth / 100) * 25;

    // Click count (max 20 points)
    score += Math.min(this.metrics.clickCount * 2, 20);

    // Form interactions (max 15 points)
    score += Math.min(this.metrics.formInteractions * 5, 15);

    // Trigger activations (max 10 points)
    score += Math.min(this.metrics.triggerActivations.length * 2, 10);

    this.metrics.engagementScore = Math.round(score);
  }

  public track(event: string, properties: Record<string, any> = {}): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        engagementScore: this.metrics.engagementScore,
        timeOnSite: this.metrics.timeOnSite,
        scrollDepth: this.metrics.scrollDepth,
        clickCount: this.metrics.clickCount,
        formInteractions: this.metrics.formInteractions,
        funnelStage: this.metrics.funnelStage,
        conversionValue: this.metrics.conversionValue,
      },
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);

    // Send to analytics (in production, this would go to your analytics service)
    if (typeof window !== 'undefined') {
      console.log('Analytics Event:', analyticsEvent);

      // Example: Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', event, properties);
      }
    }
  }

  public trackTriggerActivation(triggerId: string): void {
    if (!this.metrics.triggerActivations.includes(triggerId)) {
      this.metrics.triggerActivations.push(triggerId);
      this.updateEngagementScore();

      this.track('trigger_activation', {
        triggerId,
        totalTriggers: this.metrics.triggerActivations.length,
      });
    }
  }

  public updateFunnelStage(stage: string): void {
    this.metrics.funnelStage = stage;
    this.track('funnel_stage_change', {
      newStage: stage,
      engagementScore: this.metrics.engagementScore,
    });
  }

  public getMetrics(): ConversionMetrics {
    return { ...this.metrics };
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getSessionId(): string {
    return this.sessionId;
  }
}

// Create singleton instance
let analyticsInstance: AnalyticsTracker | null = null;

export const getAnalytics = (): AnalyticsTracker => {
  if (typeof window === 'undefined') {
    // Return a mock instance for server-side rendering
    return {
      track: () => {},
      trackTriggerActivation: () => {},
      updateFunnelStage: () => {},
      getMetrics: () => ({
        engagementScore: 0,
        timeOnSite: 0,
        scrollDepth: 0,
        clickCount: 0,
        formInteractions: 0,
        triggerActivations: [],
        funnelStage: 'awareness',
        conversionValue: 0,
      }),
      getEvents: () => [],
      getSessionId: () => 'server-session',
    } as AnalyticsTracker;
  }

  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsTracker();
  }

  return analyticsInstance;
};

// Export types
export type { AnalyticsEvent, ConversionMetrics };
export { AnalyticsTracker };
