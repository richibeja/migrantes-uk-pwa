// API para crear órdenes de PayPal
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { planId, amount, currency, description } = await request.json();

    if (!planId || amount === undefined) {
      return NextResponse.json(
        { error: 'Plan ID y amount son requeridos' },
        { status: 400 }
      );
    }

    // Configuración de PayPal
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    const paypalMode = process.env.NEXT_PUBLIC_PAYPAL_MODE || 'sandbox';

    if (!paypalClientId || !paypalSecret) {
      return NextResponse.json(
        { error: 'PayPal no está configurado correctamente' },
        { status: 500 }
      );
    }

    const baseUrl = paypalMode === 'production' 
      ? 'https://api.paypal.com' 
      : 'https://api.sandbox.paypal.com';

    // Obtener access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      throw new Error('Error obteniendo token de PayPal');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Crear orden
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString()
          },
          description: description || `Gana Fácil - Plan ${planId}`
        }
      ],
      application_context: {
        brand_name: 'Gana Fácil',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`
      }
    };

    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `ganafacil-${Date.now()}`
      },
      body: JSON.stringify(orderData)
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(`Error creando orden PayPal: ${errorData.message}`);
    }

    const order = await orderResponse.json();

    return NextResponse.json({
      success: true,
      id: order.id,
      status: order.status,
      links: order.links
    });

  } catch (error) {
    console.error('Error creando orden PayPal:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
}
