"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicCaseByCode = exports.onPaymentValidated = exports.reserveCaseCode = exports.reserveUserCode = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const db = admin.firestore();
const ALPHANUM = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function randomSuffix(length) {
    let out = '';
    for (let i = 0; i < length; i++)
        out += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
    return out;
}
function userCodeFor(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const suf = randomSuffix(4 + Math.floor(Math.random() * 3));
    return `UKU-${y}${m}-${suf}`;
}
function caseCodeFor(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const suf = randomSuffix(4 + Math.floor(Math.random() * 3));
    return `UKC-${y}${m}${d}-${suf}`;
}
exports.reserveUserCode = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'auth required');
    const uid = context.auth.uid;
    for (let i = 0; i < 10; i++) {
        const code = userCodeFor(new Date());
        const ref = db.collection('indexes').doc('userCodes').collection(code).doc('meta');
        const snap = await ref.get();
        if (snap.exists)
            continue;
        await ref.set({ uid, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        await db.collection('users').doc(uid).set({ userCode: code }, { merge: true });
        return { code };
    }
    throw new functions.https.HttpsError('resource-exhausted', 'unable to reserve code');
});
exports.reserveCaseCode = functions.https.onCall(async (data, context) => {
    if (!context.auth)
        throw new functions.https.HttpsError('unauthenticated', 'auth required');
    const uid = context.auth.uid;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = data;
    const caseId = String(payload?.caseId || '');
    if (!caseId)
        throw new functions.https.HttpsError('invalid-argument', 'caseId required');
    for (let i = 0; i < 10; i++) {
        const code = caseCodeFor(new Date());
        const ref = db.collection('indexes').doc('caseCodes').collection(code).doc('meta');
        const snap = await ref.get();
        if (snap.exists)
            continue;
        await ref.set({ caseId, uid, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        await db.collection('cases').doc(caseId).set({ caseCode: code }, { merge: true });
        return { code };
    }
    throw new functions.https.HttpsError('resource-exhausted', 'unable to reserve case code');
});
exports.onPaymentValidated = functions.firestore
    .document('payments/{paymentId}')
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if ((before?.status) !== 'validated' && (after?.status) === 'validated') {
        const caseId = String(after?.caseId || '');
        if (caseId) {
            await db.collection('cases').doc(caseId).set({ status: 'pagado' }, { merge: true });
            // enviar notificación FCM al dueño
            const uid = String(after?.uid || '');
            if (uid) {
                const tokensSnap = await db.collection(`users/${uid}/tokens`).get();
                const tokens = tokensSnap.docs.map((d) => d.id);
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
exports.getPublicCaseByCode = functions.https.onCall(async (data, context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = data;
    const raw = String(payload?.caseCode || '').trim().toUpperCase();
    if (!raw)
        throw new functions.https.HttpsError('invalid-argument', 'caseCode required');
    try {
        const metaRef = db.collection('indexes').doc('caseCodes').collection(raw).doc('meta');
        const metaSnap = await metaRef.get();
        if (!metaSnap.exists) {
            return { exists: false };
        }
        const meta = metaSnap.data();
        const caseId = String(meta?.caseId || '');
        if (!caseId) {
            return { exists: false };
        }
        const caseSnap = await db.collection('cases').doc(caseId).get();
        if (!caseSnap.exists) {
            return { exists: false };
        }
        const c = caseSnap.data();
        const serializeDate = (d) => {
            try {
                return d?.toDate ? d.toDate().toISOString() : (d ?? null);
            }
            catch {
                return null;
            }
        };
        const timeline = Array.isArray(c?.timeline)
            ? c.timeline.map((x) => ({
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
    }
    catch (e) {
        console.error('getPublicCaseByCode error', e);
        throw new functions.https.HttpsError('internal', 'unexpected');
    }
});
