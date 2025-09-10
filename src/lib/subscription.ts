export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'free' | 'premium' | 'pro';
  price: number;
  currency: string;
  duration: number; // in days
  features: string[];
  limitations: {
    maxPredictionsPerDay: number;
    maxLotteries: number;
    updateInterval: number; // in seconds
    notifications: boolean;
    statistics: boolean;
    digitalTickets: boolean;
    prioritySupport: boolean;
  };
}

export interface UserSubscription {
  planId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
  paymentMethod?: string;
  lastPayment?: string;
  nextPayment?: string;
}

export class SubscriptionService {
  private static instance: SubscriptionService;
  private currentPlan: SubscriptionPlan | null = null;
  private userSubscription: UserSubscription | null = null;

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  constructor() {
    this.loadSubscription();
  }

  /**
   * Get available subscription plans
   */
  getPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'free',
        name: 'Plan Gratuito',
        type: 'free',
        price: 0,
        currency: 'USD',
        duration: 0,
        features: [
          'Predicciones básicas',
          '3 loterías disponibles',
          'Actualización cada hora',
          'Soporte por email'
        ],
        limitations: {
          maxPredictionsPerDay: 5,
          maxLotteries: 3,
          updateInterval: 3600, // 1 hour
          notifications: false,
          statistics: false,
          digitalTickets: false,
          prioritySupport: false
        }
      },
      {
        id: 'premium',
        name: 'Plan Premium',
        type: 'premium',
        price: 29.99,
        currency: 'USD',
        duration: 30,
        features: [
          'Predicciones avanzadas',
          '9 loterías disponibles',
          'Actualización cada 10 segundos',
          'Notificaciones push',
          'Estadísticas básicas',
          'Boletos digitales',
          'Soporte prioritario'
        ],
        limitations: {
          maxPredictionsPerDay: 50,
          maxLotteries: 9,
          updateInterval: 10, // 10 seconds
          notifications: true,
          statistics: true,
          digitalTickets: true,
          prioritySupport: true
        }
      },
      {
        id: 'pro',
        name: 'Plan Pro',
        type: 'pro',
        price: 49.99,
        currency: 'USD',
        duration: 30,
        features: [
          'Predicciones ilimitadas',
          'Todas las loterías',
          'Actualización en tiempo real',
          'Notificaciones avanzadas',
          'Estadísticas completas',
          'Boletos digitales ilimitados',
          'Soporte VIP',
          'Análisis personalizado'
        ],
        limitations: {
          maxPredictionsPerDay: -1, // unlimited
          maxLotteries: -1, // unlimited
          updateInterval: 5, // 5 seconds
          notifications: true,
          statistics: true,
          digitalTickets: true,
          prioritySupport: true
        }
      }
    ];
  }

  /**
   * Get current user subscription
   */
  getCurrentSubscription(): UserSubscription | null {
    return this.userSubscription;
  }

  /**
   * Get current plan
   */
  getCurrentPlan(): SubscriptionPlan | null {
    if (!this.userSubscription) {
      return this.getPlans().find(plan => plan.type === 'free') || null;
    }
    
    return this.getPlans().find(plan => plan.id === this.userSubscription!.planId) || null;
  }

  /**
   * Check if user has active subscription
   */
  isActive(): boolean {
    if (!this.userSubscription) return false;
    
    const now = new Date();
    const endDate = new Date(this.userSubscription.endDate);
    
    return this.userSubscription.isActive && endDate > now;
  }

  /**
   * Check if user can perform an action
   */
  canPerformAction(action: keyof SubscriptionPlan['limitations']): boolean {
    const plan = this.getCurrentPlan();
    if (!plan) return false;

    const limitation = plan.limitations[action];
    
    switch (action) {
      case 'maxPredictionsPerDay':
        return this.getPredictionsToday() < (limitation as number);
      case 'maxLotteries':
        return limitation === -1 || this.getLotteriesUsed() < (limitation as number);
      case 'notifications':
      case 'statistics':
      case 'digitalTickets':
      case 'prioritySupport':
        return limitation === true;
      case 'updateInterval':
        return true; // This is handled by the app logic
      default:
        return true;
    }
  }

  /**
   * Get remaining predictions for today
   */
  getRemainingPredictions(): number {
    const plan = this.getCurrentPlan();
    if (!plan) return 0;

    const maxPredictions = plan.limitations.maxPredictionsPerDay;
    if (maxPredictions === -1) return -1; // unlimited

    const usedToday = this.getPredictionsToday();
    return Math.max(0, maxPredictions - usedToday);
  }

  /**
   * Get predictions used today
   */
  private getPredictionsToday(): number {
    const today = new Date().toDateString();
    const predictions = JSON.parse(localStorage.getItem('predictions_today') || '[]');
    return predictions.filter((p: any) => new Date(p.timestamp).toDateString() === today).length;
  }

  /**
   * Get lotteries used
   */
  private getLotteriesUsed(): number {
    const lotteries = JSON.parse(localStorage.getItem('lotteries_used') || '[]');
    return new Set(lotteries).size;
  }

  /**
   * Record prediction usage
   */
  recordPrediction(lotteryId: string): void {
    const today = new Date().toDateString();
    const predictions = JSON.parse(localStorage.getItem('predictions_today') || '[]');
    predictions.push({
      lotteryId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('predictions_today', JSON.stringify(predictions));

    // Record lottery usage
    const lotteries = JSON.parse(localStorage.getItem('lotteries_used') || '[]');
    if (!lotteries.includes(lotteryId)) {
      lotteries.push(lotteryId);
      localStorage.setItem('lotteries_used', JSON.stringify(lotteries));
    }
  }

  /**
   * Subscribe to a plan
   */
  async subscribe(planId: string, paymentMethod?: string): Promise<boolean> {
    try {
      const plan = this.getPlans().find(p => p.id === planId);
      if (!plan) throw new Error('Plan not found');

      // Simulate payment processing
      await this.processPayment(plan, paymentMethod);

      // Create subscription
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + (plan.duration * 24 * 60 * 60 * 1000));

      this.userSubscription = {
        planId: plan.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        autoRenew: true,
        paymentMethod,
        lastPayment: startDate.toISOString(),
        nextPayment: endDate.toISOString()
      };

      this.saveSubscription();
      this.currentPlan = plan;

      return true;
    } catch (error) {
      console.error('Subscription error:', error);
      return false;
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(): Promise<boolean> {
    try {
      if (!this.userSubscription) return false;

      this.userSubscription.isActive = false;
      this.userSubscription.autoRenew = false;
      this.saveSubscription();

      return true;
    } catch (error) {
      console.error('Cancellation error:', error);
      return false;
    }
  }

  /**
   * Upgrade subscription
   */
  async upgradeSubscription(newPlanId: string): Promise<boolean> {
    try {
      const newPlan = this.getPlans().find(p => p.id === newPlanId);
      if (!newPlan) throw new Error('Plan not found');

      const currentPlan = this.getCurrentPlan();
      if (!currentPlan) throw new Error('No current plan');

      // Check if it's actually an upgrade
      if (newPlan.price <= currentPlan.price) {
        throw new Error('New plan must be more expensive');
      }

      // Process payment for difference
      const priceDifference = newPlan.price - currentPlan.price;
      await this.processPayment({ ...newPlan, price: priceDifference });

      // Update subscription
      if (this.userSubscription) {
        this.userSubscription.planId = newPlanId;
        this.userSubscription.lastPayment = new Date().toISOString();
        this.saveSubscription();
      }

      this.currentPlan = newPlan;
      return true;
    } catch (error) {
      console.error('Upgrade error:', error);
      return false;
    }
  }

  /**
   * Get subscription status
   */
  getStatus(): {
    isActive: boolean;
    planName: string;
    daysRemaining: number;
    canUpgrade: boolean;
    limitations: SubscriptionPlan['limitations'];
  } {
    const plan = this.getCurrentPlan();
    const isActive = this.isActive();
    
    let daysRemaining = 0;
    if (this.userSubscription && isActive) {
      const now = new Date();
      const endDate = new Date(this.userSubscription.endDate);
      daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      isActive,
      planName: plan?.name || 'Plan Gratuito',
      daysRemaining,
      canUpgrade: plan?.type !== 'pro',
      limitations: plan?.limitations || this.getPlans()[0].limitations
    };
  }

  /**
   * Check if user needs to upgrade
   */
  needsUpgrade(action: keyof SubscriptionPlan['limitations']): boolean {
    return !this.canPerformAction(action);
  }

  /**
   * Get upgrade message
   */
  getUpgradeMessage(action: keyof SubscriptionPlan['limitations']): string {
    const plan = this.getCurrentPlan();
    if (!plan) return 'Necesitas una suscripción para usar esta función';

    switch (action) {
      case 'maxPredictionsPerDay':
        return `Has alcanzado el límite de ${plan.limitations.maxPredictionsPerDay} predicciones por día. ¡Upgrade a Premium para predicciones ilimitadas!`;
      case 'maxLotteries':
        return `Solo puedes usar ${plan.limitations.maxLotteries} loterías. ¡Upgrade para acceder a todas las loterías!`;
      case 'notifications':
        return 'Las notificaciones están disponibles solo en planes Premium. ¡Upgrade ahora!';
      case 'statistics':
        return 'Las estadísticas avanzadas están disponibles solo en planes Premium. ¡Upgrade ahora!';
      case 'digitalTickets':
        return 'Los boletos digitales están disponibles solo en planes Premium. ¡Upgrade ahora!';
      case 'prioritySupport':
        return 'El soporte prioritario está disponible solo en planes Premium. ¡Upgrade ahora!';
      default:
        return 'Esta función requiere una suscripción Premium. ¡Upgrade ahora!';
    }
  }

  /**
   * Process payment (simulated)
   */
  private async processPayment(plan: SubscriptionPlan, paymentMethod?: string): Promise<void> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success/failure
    if (Math.random() < 0.95) { // 95% success rate
      console.log(`Payment processed: $${plan.price} for ${plan.name}`);
    } else {
      throw new Error('Payment failed');
    }
  }

  /**
   * Load subscription from storage
   */
  private loadSubscription(): void {
    try {
      const stored = localStorage.getItem('user_subscription');
      if (stored) {
        this.userSubscription = JSON.parse(stored);
        this.currentPlan = this.getPlans().find(plan => plan.id === this.userSubscription!.planId) || null;
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
  }

  /**
   * Save subscription to storage
   */
  private saveSubscription(): void {
    if (this.userSubscription) {
      localStorage.setItem('user_subscription', JSON.stringify(this.userSubscription));
    }
  }

  /**
   * Reset daily limits
   */
  resetDailyLimits(): void {
    localStorage.removeItem('predictions_today');
    localStorage.removeItem('lotteries_used');
  }

  /**
   * Get subscription history
   */
  getSubscriptionHistory(): UserSubscription[] {
    try {
      const stored = localStorage.getItem('subscription_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Add to subscription history
   */
  private addToHistory(subscription: UserSubscription): void {
    const history = this.getSubscriptionHistory();
    history.push(subscription);
    localStorage.setItem('subscription_history', JSON.stringify(history));
  }
}

// Export singleton instance
export const subscriptionService = SubscriptionService.getInstance();
