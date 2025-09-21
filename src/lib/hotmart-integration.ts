/**
 * 🛒 HOTMART INTEGRATION - Sistema de Integración con Hotmart
 * 
 * Maneja pagos, activaciones y webhooks de Hotmart
 * Conecta las ventas con el sistema de activación de Anbel IA
 */

export interface HotmartConfig {
  productId: string;
  productName: string;
  prices: {
    basic: number;
    premium: number;
    vip: number;
  };
  currency: string;
  webhookSecret: string;
}

export interface HotmartPurchase {
  transaction: string;
  product: {
    id: string;
    name: string;
  };
  buyer: {
    email: string;
    name: string;
    document: string;
  };
  purchase: {
    price: number;
    currency: string;
    status: 'APPROVED' | 'CANCELLED' | 'REFUNDED';
    approved_date: string;
  };
  commissions: any[];
  subscription?: {
    id: string;
    status: string;
  };
}

export interface HotmartWebhookData {
  id: string;
  event: 'PURCHASE_APPROVED' | 'PURCHASE_CANCELLED' | 'PURCHASE_REFUNDED' | 'SUBSCRIPTION_CANCELLATION';
  version: string;
  data: HotmartPurchase;
  creation_date: string;
}

class HotmartIntegration {
  private config: HotmartConfig;
  
  constructor(config: HotmartConfig) {
    this.config = config;
  }
  
  /**
   * 🛒 GENERAR ENLACE DE COMPRA
   */
  generatePurchaseLink(plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
    const productId = this.config.productId;
    
    // URL de Hotmart con parámetros optimizados
    const params = new URLSearchParams({
      checkoutMode: '2', // Modo de checkout optimizado
      src: 'gana-facil-web',
      utm_source: 'gana-facil',
      utm_medium: 'website',
      utm_campaign: plan,
      utm_content: 'sales-page'
    });
    
    return `https://pay.hotmart.com/${productId}?${params.toString()}`;
  }
  
  /**
   * 🔗 GENERAR ENLACE CON AFILIADO
   */
  generateAffiliateLink(affiliateCode?: string, plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
    const baseUrl = 'https://pay.hotmart.com';
    const productId = this.config.productId;
    
    const params = new URLSearchParams({
      checkoutMode: 'product',
      offerId: productId,
      src: 'gana-facil-web',
      utm_source: 'affiliate',
      utm_medium: 'referral',
      utm_campaign: plan
    });
    
    if (affiliateCode) {
      params.append('ref', affiliateCode);
    }
    
    return `${baseUrl}/${productId}?${params.toString()}`;
  }
  
  /**
   * 🎁 GENERAR ENLACE CON CUPÓN
   */
  generateCouponLink(couponCode: string, plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
    const baseUrl = 'https://pay.hotmart.com';
    const productId = this.config.productId;
    
    const params = new URLSearchParams({
      checkoutMode: 'product',
      offerId: productId,
      src: 'gana-facil-web',
      coupon: couponCode,
      utm_source: 'coupon',
      utm_medium: 'discount',
      utm_campaign: plan
    });
    
    return `${baseUrl}/${productId}?${params.toString()}`;
  }
  
  /**
   * 📧 PROCESAR WEBHOOK DE HOTMART
   */
  async processWebhook(webhookData: HotmartWebhookData): Promise<{
    success: boolean;
    activationCode?: string;
    error?: string;
  }> {
    try {
      // Verificar integridad del webhook
      if (!this.validateWebhook(webhookData)) {
        throw new Error('Webhook inválido');
      }
      
      const { event, data } = webhookData;
      
      switch (event) {
        case 'PURCHASE_APPROVED':
          return await this.handlePurchaseApproved(data);
          
        case 'PURCHASE_CANCELLED':
          return await this.handlePurchaseCancelled(data);
          
        case 'PURCHASE_REFUNDED':
          return await this.handlePurchaseRefunded(data);
          
        default:
          console.log(`Webhook event not handled: ${event}`);
          return { success: true };
      }
    } catch (error) {
      console.error('Error processing Hotmart webhook:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
  
  /**
   * ✅ MANEJAR COMPRA APROBADA
   */
  private async handlePurchaseApproved(purchase: HotmartPurchase): Promise<{
    success: boolean;
    activationCode?: string;
    error?: string;
  }> {
    try {
      // Generar código de activación único
      const activationCode = this.generateActivationCode();
      
      // Registrar la compra en el sistema
      const purchaseRecord = {
        transactionId: purchase.transaction,
        email: purchase.buyer.email,
        name: purchase.buyer.name,
        productId: purchase.product.id,
        price: purchase.purchase.price,
        currency: purchase.purchase.currency,
        activationCode,
        status: 'active',
        purchaseDate: new Date(purchase.purchase.approved_date),
        createdAt: new Date()
      };
      
      // Guardar en base de datos (Firebase/local storage)
      await this.savePurchaseRecord(purchaseRecord);
      
      // Enviar email de bienvenida con código
      await this.sendWelcomeEmail(purchase.buyer.email, activationCode, purchase.buyer.name);
      
      console.log(`✅ Compra procesada: ${purchase.buyer.email} - Código: ${activationCode}`);
      
      return {
        success: true,
        activationCode
      };
    } catch (error) {
      console.error('Error handling purchase approval:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error processing purchase'
      };
    }
  }
  
  /**
   * ❌ MANEJAR COMPRA CANCELADA
   */
  private async handlePurchaseCancelled(purchase: HotmartPurchase): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Desactivar código si existe
      await this.deactivateCode(purchase.transaction);
      
      console.log(`❌ Compra cancelada: ${purchase.buyer.email}`);
      
      return { success: true };
    } catch (error) {
      console.error('Error handling purchase cancellation:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error processing cancellation'
      };
    }
  }
  
  /**
   * 💸 MANEJAR REEMBOLSO
   */
  private async handlePurchaseRefunded(purchase: HotmartPurchase): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Desactivar código
      await this.deactivateCode(purchase.transaction);
      
      // Enviar email de confirmación de reembolso
      await this.sendRefundEmail(purchase.buyer.email, purchase.buyer.name);
      
      console.log(`💸 Reembolso procesado: ${purchase.buyer.email}`);
      
      return { success: true };
    } catch (error) {
      console.error('Error handling refund:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error processing refund'
      };
    }
  }
  
  /**
   * 🔐 GENERAR CÓDIGO DE ACTIVACIÓN
   */
  private generateActivationCode(): string {
    const prefix = 'ANBEL';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  }
  
  /**
   * 🔍 VALIDAR WEBHOOK
   */
  private validateWebhook(webhookData: HotmartWebhookData): boolean {
    // Verificar estructura básica
    if (!webhookData.id || !webhookData.event || !webhookData.data) {
      return false;
    }
    
    // Verificar que el producto coincida
    if (webhookData.data.product.id !== this.config.productId) {
      return false;
    }
    
    // En producción, verificar firma del webhook con el secret
    // const signature = req.headers['x-hotmart-hottok'];
    // return this.verifySignature(webhookData, signature);
    
    return true;
  }
  
  /**
   * 💾 GUARDAR REGISTRO DE COMPRA
   */
  private async savePurchaseRecord(record: any): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Guardar en localStorage para demo
        const purchases = JSON.parse(localStorage.getItem('hotmart_purchases') || '[]');
        purchases.push(record);
        localStorage.setItem('hotmart_purchases', JSON.stringify(purchases));
      }
      
      // En producción, guardar en Firebase/base de datos
      // await saveToFirestore('purchases', record);
      
    } catch (error) {
      console.error('Error saving purchase record:', error);
      throw error;
    }
  }
  
  /**
   * 📧 ENVIAR EMAIL DE BIENVENIDA
   */
  private async sendWelcomeEmail(email: string, activationCode: string, name: string): Promise<void> {
    try {
      // En producción, usar servicio de email real
      console.log(`📧 Enviando email de bienvenida a ${email} con código ${activationCode}`);
      
      // Simular envío de email
      const emailContent = {
        to: email,
        subject: '🎉 ¡Bienvenido a Gana Fácil! Tu código de activación',
        html: this.generateWelcomeEmailHTML(name, activationCode)
      };
      
      // await sendEmail(emailContent);
      
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
  
  /**
   * 📧 GENERAR HTML DEL EMAIL DE BIENVENIDA
   */
  private generateWelcomeEmailHTML(name: string, activationCode: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>¡Bienvenido a Gana Fácil!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px;">
              <h1>🎯 ¡Bienvenido a Gana Fácil!</h1>
              <h2>🤖 Anbel IA Ultra está listo para ti</h2>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa; margin: 20px 0; border-radius: 10px;">
              <h3>¡Hola ${name}! 👋</h3>
              <p>¡Felicidades por tu compra! Ya eres parte de la comunidad de ganadores de Gana Fácil.</p>
              
              <div style="background: #FFD700; color: black; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                  <h3>🔑 TU CÓDIGO DE ACTIVACIÓN:</h3>
                  <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 10px 0;">
                      ${activationCode}
                  </div>
                  <p style="margin: 0; font-size: 14px;">Guarda este código en un lugar seguro</p>
              </div>
              
              <h3>🚀 Pasos para activar:</h3>
              <ol>
                  <li>Ve a: <a href="https://gana-facil.vercel.app" style="color: #667eea;">https://gana-facil.vercel.app</a></li>
                  <li>Haz clic en "Activar Cuenta"</li>
                  <li>Ingresa tu código: <strong>${activationCode}</strong></li>
                  <li>¡Comienza a generar números ganadores!</li>
              </ol>
              
              <h3>🎯 Lo que incluye tu compra:</h3>
              <ul>
                  <li>🤖 Anbel IA Ultra con 6 algoritmos</li>
                  <li>🎯 Predicciones para todas las loterías</li>
                  <li>📱 PWA instalable</li>
                  <li>🔊 Voz inteligente bilingüe</li>
                  <li>📊 Dashboard completo</li>
                  <li>🔔 Notificaciones</li>
                  <li>💰 Sistema de ganancias compartidas</li>
                  <li>🆘 Soporte 24/7</li>
                  <li>🛡️ Garantía de 30 días</li>
              </ul>
          </div>
          
          <div style="text-align: center; padding: 20px;">
              <a href="https://gana-facil.vercel.app" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                  🚀 ACTIVAR MI CUENTA AHORA
              </a>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
              <p>¿Necesitas ayuda? Contáctanos:</p>
              <p>📧 soporte@ganafacil.com | 📱 WhatsApp: +1 (555) 123-4567</p>
              <p>🛡️ Garantía de 30 días - Sin preguntas</p>
          </div>
      </body>
      </html>
    `;
  }
  
  /**
   * 💸 ENVIAR EMAIL DE REEMBOLSO
   */
  private async sendRefundEmail(email: string, name: string): Promise<void> {
    console.log(`💸 Enviando confirmación de reembolso a ${email}`);
    // En producción, implementar envío real
  }
  
  /**
   * ❌ DESACTIVAR CÓDIGO
   */
  private async deactivateCode(transactionId: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const purchases = JSON.parse(localStorage.getItem('hotmart_purchases') || '[]');
        const updatedPurchases = purchases.map((p: any) => 
          p.transactionId === transactionId 
            ? { ...p, status: 'inactive', deactivatedAt: new Date() }
            : p
        );
        localStorage.setItem('hotmart_purchases', JSON.stringify(updatedPurchases));
      }
      
      console.log(`❌ Código desactivado para transacción: ${transactionId}`);
    } catch (error) {
      console.error('Error deactivating code:', error);
      throw error;
    }
  }
  
  /**
   * 🔍 VERIFICAR COMPRA POR EMAIL
   */
  async verifyPurchaseByEmail(email: string): Promise<{
    hasPurchase: boolean;
    activationCode?: string;
    status?: string;
  }> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const purchases = JSON.parse(localStorage.getItem('hotmart_purchases') || '[]');
        const purchase = purchases.find((p: any) => p.email === email && p.status === 'active');
        
        if (purchase) {
          return {
            hasPurchase: true,
            activationCode: purchase.activationCode,
            status: purchase.status
          };
        }
      }
      
      return { hasPurchase: false };
    } catch (error) {
      console.error('Error verifying purchase:', error);
      return { hasPurchase: false };
    }
  }
  
  /**
   * 📊 OBTENER ESTADÍSTICAS DE VENTAS
   */
  getSalesStatistics(): {
    totalSales: number;
    totalRevenue: number;
    activeUsers: number;
    refundRate: number;
  } {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const purchases = JSON.parse(localStorage.getItem('hotmart_purchases') || '[]');
        
        const activePurchases = purchases.filter((p: any) => p.status === 'active');
        const totalRevenue = purchases.reduce((sum: number, p: any) => sum + (p.price || 0), 0);
        const refunds = purchases.filter((p: any) => p.status === 'refunded').length;
        
        return {
          totalSales: purchases.length,
          totalRevenue,
          activeUsers: activePurchases.length,
          refundRate: purchases.length > 0 ? (refunds / purchases.length) * 100 : 0
        };
      }
      
      return {
        totalSales: 0,
        totalRevenue: 0,
        activeUsers: 0,
        refundRate: 0
      };
    } catch (error) {
      console.error('Error getting sales statistics:', error);
      return {
        totalSales: 0,
        totalRevenue: 0,
        activeUsers: 0,
        refundRate: 0
      };
    }
  }
}

// Configuración con datos reales de Hotmart
const defaultConfig: HotmartConfig = {
  productId: 'K101811871T', // ID real de Hotmart
  productName: 'AI Lottery Prediction System - Win Easy',
  prices: {
    basic: 47,
    premium: 147,
    vip: 97 // Precio especial actual
  },
  currency: 'USD',
  webhookSecret: 'YOUR_WEBHOOK_SECRET' // Configurar cuando tengas el secret
};

// Instancia global
export const hotmartIntegration = new HotmartIntegration(defaultConfig);

/**
 * 🔗 FUNCIONES DE UTILIDAD PARA COMPONENTES
 */

// Para botones de compra
export function getHotmartPurchaseLink(plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
  return hotmartIntegration.generatePurchaseLink(plan);
}

// Para enlaces de afiliados
export function getHotmartAffiliateLink(affiliateCode: string, plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
  return hotmartIntegration.generateAffiliateLink(affiliateCode, plan);
}

// Para cupones de descuento
export function getHotmartCouponLink(couponCode: string, plan: 'basic' | 'premium' | 'vip' = 'vip'): string {
  return hotmartIntegration.generateCouponLink(couponCode, plan);
}

// Para verificar compras
export function verifyHotmartPurchase(email: string) {
  return hotmartIntegration.verifyPurchaseByEmail(email);
}

// Para estadísticas
export function getHotmartStats() {
  return hotmartIntegration.getSalesStatistics();
}
