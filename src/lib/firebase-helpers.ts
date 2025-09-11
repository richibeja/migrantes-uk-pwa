import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  User, 
  Payment, 
  FormData, 
  DirectoryLink, 
  FAQ, 
  Notification,
  ActivationCode,
  AnalyticsEvent,
  Subscription,
  LotteryPrediction,
  LotteryResult,
  DigitalTicket
} from '@/types/firebase';

// Helper para verificar si Firebase está inicializado
export const isFirebaseReady = (): boolean => {
  return db !== null;
};

// Helper genérico para obtener un documento
export const getDocument = async <T>(
  collectionName: string, 
  docId: string
): Promise<T | null> => {
  if (!isFirebaseReady()) {
    console.error('Firebase not initialized');
    return null;
  }

  try {
    const docRef = doc(db!, collectionName, docId);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    return null;
  }
};

// Helper genérico para obtener múltiples documentos
export const getDocuments = async <T>(
  collectionName: string,
  constraints?: any[]
): Promise<T[]> => {
  if (!isFirebaseReady()) {
    console.error('Firebase not initialized');
    return [];
  }

  try {
    const collectionRef = collection(db!, collectionName);
    let q: any = collectionRef;
    
    if (constraints && constraints.length > 0) {
      q = query(collectionRef, ...constraints);
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as T));
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
};

// Funciones específicas para cada colección
// Funciones de casos eliminadas (no es de lotería)

export const getUser = async (userId: string): Promise<User | null> => {
  return await getDocument<User>('users', userId);
};

export const getUsers = async (): Promise<User[]> => {
  return await getDocuments<User>('users');
};

export const getPayment = async (paymentId: string): Promise<Payment | null> => {
  return await getDocument<Payment>('payments', paymentId);
};

export const getPayments = async (userId?: string): Promise<Payment[]> => {
  const constraints = userId ? [where('userId', '==', userId)] : [];
  return await getDocuments<Payment>('payments', constraints);
};

export const getFormData = async (formId: string): Promise<FormData | null> => {
  return await getDocument<FormData>('forms', formId);
};

export const getFormDataByUser = async (userId: string): Promise<FormData[]> => {
  return await getDocuments<FormData>('forms', [where('userId', '==', userId)]);
};

export const getDirectoryLinks = async (language?: 'es' | 'en'): Promise<DirectoryLink[]> => {
  const constraints = language ? [where('language', '==', language)] : [];
  return await getDocuments<DirectoryLink>('directoryLinks', constraints);
};

export const getFAQs = async (language?: 'es' | 'en'): Promise<FAQ[]> => {
  const constraints = language ? [where('language', '==', language)] : [];
  return await getDocuments<FAQ>('faqs', constraints);
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  return await getDocuments<Notification>('notifications', [where('userId', '==', userId)]);
};

export const getActivationCode = async (code: string): Promise<ActivationCode | null> => {
  return await getDocument<ActivationCode>('activationCodes', code);
};

export const getAnalyticsEvents = async (limitCount?: number): Promise<AnalyticsEvent[]> => {
  const constraints = limitCount ? [orderBy('timestamp', 'desc'), limit(limitCount)] : [];
  return await getDocuments<AnalyticsEvent>('analytics', constraints);
};

export const getSubscription = async (userId: string): Promise<Subscription | null> => {
  return await getDocument<Subscription>('subscriptions', userId);
};

export const getLotteryPrediction = async (predictionId: string): Promise<LotteryPrediction | null> => {
  return await getDocument<LotteryPrediction>('lotteryPredictions', predictionId);
};

export const getLotteryPredictions = async (lotteryId?: string): Promise<LotteryPrediction[]> => {
  const constraints = lotteryId ? [where('lotteryId', '==', lotteryId)] : [];
  return await getDocuments<LotteryPrediction>('lotteryPredictions', constraints);
};

export const getLotteryResult = async (resultId: string): Promise<LotteryResult | null> => {
  return await getDocument<LotteryResult>('lotteryResults', resultId);
};

export const getLotteryResults = async (lotteryId?: string): Promise<LotteryResult[]> => {
  const constraints = lotteryId ? [where('lotteryId', '==', lotteryId)] : [];
  return await getDocuments<LotteryResult>('lotteryResults', constraints);
};

export const getDigitalTicket = async (ticketId: string): Promise<DigitalTicket | null> => {
  return await getDocument<DigitalTicket>('digitalTickets', ticketId);
};

export const getDigitalTickets = async (userId: string): Promise<DigitalTicket[]> => {
  return await getDocuments<DigitalTicket>('digitalTickets', [where('userId', '==', userId)]);
};

// Helper para manejar errores de Firebase
export const handleFirebaseError = (error: any, context: string): void => {
  console.error(`Firebase error in ${context}:`, error);
  
  // Aquí puedes agregar lógica adicional para manejar errores específicos
  if (error.code === 'permission-denied') {
    console.error('Permission denied - user may not have access to this resource');
  } else if (error.code === 'not-found') {
    console.error('Resource not found');
  } else if (error.code === 'unavailable') {
    console.error('Firebase service is currently unavailable');
  }
};

// Helper para validar datos antes de enviar a Firebase
export const validateDocumentData = <T>(data: Partial<T>, requiredFields: (keyof T)[]): boolean => {
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      console.error(`Required field ${String(field)} is missing`);
      return false;
    }
  }
  return true;
};
