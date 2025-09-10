import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const ALPHANUM = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function randomSuffix(length: number) {
  let out = '';
  for (let i=0;i<length;i++) out += ALPHANUM[Math.floor(Math.random()*ALPHANUM.length)];
  return out;
}
function userCodeFor(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const suf = randomSuffix(4 + Math.floor(Math.random()*3));
  return `UKU-${y}${m}-${suf}`;
}
function caseCodeFor(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  const suf = randomSuffix(4 + Math.floor(Math.random()*3));
  return `UKC-${y}${m}${d}-${suf}`;
}

export const reserveUserCode = functions.https.onCall(async (data: unknown, context: functions.https.CallableContext) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','auth required');
  const uid = context.auth.uid;
  for (let i=0;i<10;i++) {
    const code = userCodeFor(new Date());
    const ref = db.collection('indexes').doc('userCodes').collection(code).doc('meta');
    const snap = await ref.get();
    if (snap.exists) continue;
    await ref.set({ uid, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    await db.collection('users').doc(uid).set({ userCode: code }, { merge: true });
    return { code };
  }
  throw new functions.https.HttpsError('resource-exhausted','unable to reserve code');
});

export const reserveCaseCode = functions.https.onCall(async (data: { caseId?: string } | unknown, context: functions.https.CallableContext) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','auth required');
  const uid = context.auth.uid;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = data as any;
  const caseId = String(payload?.caseId || '');
  if (!caseId) throw new functions.https.HttpsError('invalid-argument','caseId required');
  for (let i=0;i<10;i++) {
    const code = caseCodeFor(new Date());
    const ref = db.collection('indexes').doc('caseCodes').collection(code).doc('meta');
    const snap = await ref.get();
    if (snap.exists) continue;
    await ref.set({ caseId, uid, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    await db.collection('cases').doc(caseId).set({ caseCode: code }, { merge: true });
    return { code };
  }
  throw new functions.https.HttpsError('resource-exhausted','unable to reserve case code');
});

export const onPaymentValidated = functions.firestore
  .document('payments/{paymentId}')
  .onUpdate(async (
    change: functions.Change<admin.firestore.DocumentSnapshot>,
    context: functions.EventContext
  ) => {
    const before = change.before.data() as any | undefined;
    const after = change.after.data() as any | undefined;
    if ((before?.status) !== 'validated' && (after?.status) === 'validated') {
      const caseId = String(after?.caseId || '');
      if (caseId) {
        await db.collection('cases').doc(caseId).set({ status: 'pagado' }, { merge: true });
        // enviar notificación FCM al dueño
        const uid = String(after?.uid || '');
        if (uid) {
          const tokensSnap = await db.collection(`users/${uid}/tokens`).get();
          const tokens = tokensSnap.docs.map((d: admin.firestore.QueryDocumentSnapshot) => d.id);
          if (tokens.length) {
            await admin.messaging().sendEachForMulticast({
              tokens,
              notification: { title: 'Trámite pagado', body: 'Tu documento ya está disponible para descarga/envío.' },
              webpush: { fcmOptions: { link: `/cases/${caseId}` } }
            });
          }
        }
      }
    }
    return null;
  });

export const getPublicCaseByCode = functions.https.onCall(async (data: unknown, context: functions.https.CallableContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = data as any;
  const raw = String(payload?.caseCode || '').trim().toUpperCase();
  if (!raw) throw new functions.https.HttpsError('invalid-argument','caseCode required');

  try {
    const metaRef = db.collection('indexes').doc('caseCodes').collection(raw).doc('meta');
    const metaSnap = await metaRef.get();
    if (!metaSnap.exists) {
      return { exists: false };
    }
    const meta = metaSnap.data() as any;
    const caseId = String(meta?.caseId || '');
    if (!caseId) {
      return { exists: false };
    }

    const caseSnap = await db.collection('cases').doc(caseId).get();
    if (!caseSnap.exists) {
      return { exists: false };
    }
    const c = caseSnap.data() as any;

    const serializeDate = (d: any) => {
      try { return d?.toDate ? d.toDate().toISOString() : (d ?? null); } catch { return null; }
    };

    const timeline = Array.isArray(c?.timeline)
      ? c.timeline.map((x: any) => ({
          step: String(x?.step || ''),
          date: serializeDate(x?.date),
          note: x?.note ? String(x.note) : null,
        }))
      : [];

    return {
      exists: true,
      caseId,
      caseCode: String(c?.caseCode || raw),
      title: c?.title ? String(c.title) : null,
      amount: typeof c?.amount === 'number' ? c.amount : null,
      status: c?.status ? String(c.status) : 'borrador',
      updatedAt: serializeDate(c?.updatedAt) || serializeDate(c?.createdAt),
      timeline,
    };
  } catch (e: any) {
    console.error('getPublicCaseByCode error', e);
    throw new functions.https.HttpsError('internal','unexpected');
  }
});

