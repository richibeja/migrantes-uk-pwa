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

export const reserveUserCode = functions.https.onCall(async (data, context) => {
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

export const reserveCaseCode = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','auth required');
  const uid = context.auth.uid;
  const caseId = String(data?.caseId || '');
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
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if (before.status !== 'validated' && after.status === 'validated') {
      const caseId = after.caseId as string;
      if (caseId) {
        await db.collection('cases').doc(caseId).set({ status: 'pagado' }, { merge: true });
        // enviar notificación FCM al dueño
        const uid = after.uid as string;
        if (uid) {
          const tokensSnap = await db.collection(`users/${uid}/tokens`).get();
          const tokens = tokensSnap.docs.map(d => d.id);
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


