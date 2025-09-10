// API para verificar pagos de PayPal
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { transactionId } = await request.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID es requerido' },
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

    // Verificar la orden
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!orderResponse.ok) {
      throw new Error('Error verificando orden de PayPal');
    }

    const order = await orderResponse.json();

    // Verificar que la orden esté completada
    const isVerified = order.status === 'COMPLETED' || order.status === 'APPROVED';
    
    return NextResponse.json({
      success: true,
      verified: isVerified,
      status: order.status,
      order: {
        id: order.id,
        status: order.status,
        amount: order.purchase_units?.[0]?.amount,
        createTime: order.create_time,
        updateTime: order.update_time
      }
    });

  } catch (error) {
    console.error('Error verificando pago PayPal:', error);
    return NextResponse.json(
      { 
        success: false,
        verified: false,
        error: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
}
