/**
 * Web Vitals Reporting
 * Measures and reports Core Web Vitals metrics
 */

export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics service
  // Example: Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Custom Metrics',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', metric.name, { value: metric.value });
  }

  // You can also send to other analytics services here
  // Example: Mixpanel, Amplitude, etc.
}

/**
 * Custom event tracking
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', eventName, eventData);
  }

  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
}

/**
 * Page view tracking
 */
export function trackPageView(url: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', url);
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}
