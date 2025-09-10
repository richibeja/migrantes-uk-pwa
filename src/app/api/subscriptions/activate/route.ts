// API para activar suscripciones
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      planId,
      transactionId,
      paymentMethod,
      isActive,
      activatedAt,
      expiresAt,
      features,
      amount,
      currency
    } = await request.json();

    if (!userId || !planId || !transactionId) {
      return NextResponse.json(
        { error: 'userId, planId y transactionId son requeridos' },
        { status: 400 }
      );
    }

    // Crear documento de suscripción
    const subscriptionData = {
      userId,
      planId,
      transactionId,
      paymentMethod,
      isActive: isActive || true,
      activatedAt: activatedAt || new Date().toISOString(),
      expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      features: features || [],
      amount: amount || 0,
      currency: currency || 'USD',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Guardar en Firestore
    const subscriptionRef = await addDoc(collection(db, 'subscriptions'), subscriptionData);

    // También guardar en la colección de usuarios para fácil acceso
    await setDoc(doc(db, 'users', userId), {
      subscription: {
        id: subscriptionRef.id,
        planId,
        isActive: subscriptionData.isActive,
        expiresAt: subscriptionData.expiresAt,
        features: subscriptionData.features
      },
      lastUpdated: serverTimestamp()
    }, { merge: true });

    // Log de activación
    console.log(`✅ Suscripción activada: ${subscriptionRef.id} para usuario ${userId}`);

    return NextResponse.json({
      success: true,
      subscriptionId: subscriptionRef.id,
      message: 'Suscripción activada correctamente'
    });

  } catch (error) {
    console.error('Error activando suscripción:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
}
