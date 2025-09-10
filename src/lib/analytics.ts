// Sistema de analytics para Hotmart
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export interface ConversionFunnel {
  step: string;
  count: number;
  percentage: number;
}

class Analytics {
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadUserId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadUserId(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ganaFacilUser');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          this.userId = user.id || user.username;
        } catch (error) {
          console.error('Error loading user ID:', error);
        }
      }
    }
  }

  // Track eventos
  track(event: string, properties: Record<string, any> = {}): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    // Enviar a analytics (simulado)
    this.sendToAnalytics(analyticsEvent);
    
    // Guardar localmente
    this.saveToLocal(analyticsEvent);
  }

  // Eventos específicos para Hotmart
  trackPageView(page: string): void {
    this.track('page_view', { page });
  }

  trackButtonClick(button: string, location: string): void {
    this.track('button_click', { button, location });
  }

  trackPlanView(planId: string): void {
    this.track('plan_view', { plan_id: planId });
  }

  trackPlanSelect(planId: string, price: number): void {
    this.track('plan_select', { plan_id: planId, price });
  }

  trackPaymentStart(planId: string, amount: number): void {
    this.track('payment_start', { plan_id: planId, amount });
  }

  trackPaymentComplete(planId: string, amount: number, transactionId: string): void {
    this.track('payment_complete', { 
      plan_id: planId, 
      amount, 
      transaction_id: transactionId 
    });
  }

  trackPredictionView(lottery: string): void {
    this.track('prediction_view', { lottery });
  }

  trackPredictionUse(lottery: string, confidence: number): void {
    this.track('prediction_use', { lottery, confidence });
  }

  trackTestimonialView(testimonialId: string): void {
    this.track('testimonial_view', { testimonial_id: testimonialId });
  }

  trackVideoPlay(videoId: string): void {
    this.track('video_play', { video_id: videoId });
  }

  trackVideoComplete(videoId: string, duration: number): void {
    this.track('video_complete', { video_id: videoId, duration });
  }

  // Métricas de conversión
  getConversionFunnel(): ConversionFunnel[] {
    const events = this.getLocalEvents();
    
    const funnel = [
      { step: 'Visitas', count: 0, percentage: 100 },
      { step: 'Plan View', count: 0, percentage: 0 },
      { step: 'Plan Select', count: 0, percentage: 0 },
      { step: 'Payment Start', count: 0, percentage: 0 },
      { step: 'Payment Complete', count: 0, percentage: 0 },
    ];

    const pageViews = events.filter(e => e.event === 'page_view').length;
    const planViews = events.filter(e => e.event === 'plan_view').length;
    const planSelects = events.filter(e => e.event === 'plan_select').length;
    const paymentStarts = events.filter(e => e.event === 'payment_start').length;
    const paymentCompletes = events.filter(e => e.event === 'payment_complete').length;

    funnel[0].count = pageViews;
    funnel[1].count = planViews;
    funnel[1].percentage = pageViews > 0 ? (planViews / pageViews) * 100 : 0;
    funnel[2].count = planSelects;
    funnel[2].percentage = planViews > 0 ? (planSelects / planViews) * 100 : 0;
    funnel[3].count = paymentStarts;
    funnel[3].percentage = planSelects > 0 ? (paymentStarts / planSelects) * 100 : 0;
    funnel[4].count = paymentCompletes;
    funnel[4].percentage = paymentStarts > 0 ? (paymentCompletes / paymentStarts) * 100 : 0;

    return funnel;
  }

  // Métricas de engagement
  getEngagementMetrics() {
    const events = this.getLocalEvents();
    const sessionDuration = this.getSessionDuration();
    
    return {
      totalEvents: events.length,
      sessionDuration: sessionDuration,
      averageEventsPerSession: events.length,
      topPages: this.getTopPages(events),
      topButtons: this.getTopButtons(events),
      conversionRate: this.getConversionRate(events),
    };
  }

  private getSessionDuration(): number {
    const startTime = localStorage.getItem('session_start');
    if (startTime) {
      return Date.now() - parseInt(startTime);
    }
    return 0;
  }

  private getTopPages(events: AnalyticsEvent[]): Array<{page: string, count: number}> {
    const pageViews = events.filter(e => e.event === 'page_view');
    const pageCounts: Record<string, number> = {};
    
    pageViews.forEach(event => {
      const page = event.properties.page;
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    return Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getTopButtons(events: AnalyticsEvent[]): Array<{button: string, count: number}> {
    const buttonClicks = events.filter(e => e.event === 'button_click');
    const buttonCounts: Record<string, number> = {};
    
    buttonClicks.forEach(event => {
      const button = event.properties.button;
      buttonCounts[button] = (buttonCounts[button] || 0) + 1;
    });

    return Object.entries(buttonCounts)
      .map(([button, count]) => ({ button, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getConversionRate(events: AnalyticsEvent[]): number {
    const pageViews = events.filter(e => e.event === 'page_view').length;
    const payments = events.filter(e => e.event === 'payment_complete').length;
    
    return pageViews > 0 ? (payments / pageViews) * 100 : 0;
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // Simular envío a analytics
    console.log('📊 Analytics Event:', event);
    
    // Aquí iría la integración real con Google Analytics, Mixpanel, etc.
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // });
  }

  private saveToLocal(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      existing.push(event);
      
      // Mantener solo los últimos 1000 eventos
      if (existing.length > 1000) {
        existing.splice(0, existing.length - 1000);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(existing));
    }
  }

  private getLocalEvents(): AnalyticsEvent[] {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    }
    return [];
  }

  // Inicializar sesión
  initSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('session_start', Date.now().toString());
      this.track('session_start', {});
    }
  }

  // Finalizar sesión
  endSession(): void {
    this.track('session_end', { 
      duration: this.getSessionDuration() 
    });
  }
}

// Instancia global
export const analytics = new Analytics();

// Hook para React
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackPlanView: analytics.trackPlanView.bind(analytics),
    trackPlanSelect: analytics.trackPlanSelect.bind(analytics),
    trackPaymentStart: analytics.trackPaymentStart.bind(analytics),
    trackPaymentComplete: analytics.trackPaymentComplete.bind(analytics),
    trackPredictionView: analytics.trackPredictionView.bind(analytics),
    trackPredictionUse: analytics.trackPredictionUse.bind(analytics),
    trackTestimonialView: analytics.trackTestimonialView.bind(analytics),
    trackVideoPlay: analytics.trackVideoPlay.bind(analytics),
    trackVideoComplete: analytics.trackVideoComplete.bind(analytics),
  };
};