// API para obtener estado de suscripción
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      );
    }

    // Obtener datos del usuario
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      // Usuario no existe, devolver plan gratuito
      return NextResponse.json({
        isActive: false,
        plan: 'free',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        features: [
          '3 predicciones por día',
          '2 loterías disponibles',
          'Soporte básico',
          'Sin historial'
        ]
      });
    }

    const userData = userDoc.data();
    const subscription = userData.subscription;

    if (!subscription) {
      // No hay suscripción, devolver plan gratuito
      return NextResponse.json({
        isActive: false,
        plan: 'free',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        features: [
          '3 predicciones por día',
          '2 loterías disponibles',
          'Soporte básico',
          'Sin historial'
        ]
      });
    }

    // Verificar si la suscripción ha expirado
    const now = new Date();
    const expiresAt = new Date(subscription.expiresAt);
    const isExpired = now > expiresAt;

    if (isExpired) {
      // Suscripción expirada, actualizar estado
      await doc(db, 'users', userId).update({
        'subscription.isActive': false,
        lastUpdated: new Date()
      });

      return NextResponse.json({
        isActive: false,
        plan: 'free',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        features: [
          '3 predicciones por día',
          '2 loterías disponibles',
          'Soporte básico',
          'Sin historial'
        ]
      });
    }

    // Suscripción activa
    return NextResponse.json({
      isActive: subscription.isActive || false,
      plan: subscription.planId || 'free',
      expiresAt: subscription.expiresAt,
      features: subscription.features || [],
      subscriptionId: subscription.id
    });

  } catch (error) {
    console.error('Error obteniendo estado de suscripción:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
}
