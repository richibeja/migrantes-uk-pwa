"use client";

import { useEffect, useState } from "react";
import { AsylumFormData, createEmptyAsylumForm, validateAsylumForm } from "@/types/asylum";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useI18n } from "@/components/I18nProvider";
import { saveQnaDraft, loadQnaDraft } from "@/lib/db";

const LOCAL_KEY = "asylumFormDraft";

export default function QnaClient() {
  const { t } = useI18n();
  const [form, setForm] = useState<AsylumFormData>(createEmptyAsylumForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const dbDraft = await loadQnaDraft();
        if (dbDraft) {
          setForm(dbDraft);
          return;
        }
        const raw = localStorage.getItem(LOCAL_KEY);
        if (raw) setForm(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          const cred = await signInAnonymously(auth);
          setUid(cred.user.uid);
        } else {
          setUid(user.uid);
        }
      } catch {}
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      (async () => {
        try {
          setSaving(true);
          const withTs = { ...form, updatedAt: new Date().toISOString() };
          localStorage.setItem(LOCAL_KEY, JSON.stringify(withTs));
          await saveQnaDraft(withTs);
        } finally {
          setSaving(false);
        }
      })();
    }, 600);
    return () => clearTimeout(id);
  }, [form]);

  function update<K extends keyof AsylumFormData>(key: K, value: AsylumFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { ok, errors } = validateAsylumForm(form);
    if (!ok) {
      setMessage(errors[0] || t('validation.fixFields'));
      return;
    }
    setMessage("Borrador guardado localmente. Envío a la nube pendiente de integrar.");
  }

  async function handleSendToCloud() {
    const { ok, errors } = validateAsylumForm(form);
    if (!ok) {
      setMessage(errors[0] || t('validation.fixFields'));
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      let currentUid = uid;
      if (!currentUid) {
        const cred = await signInAnonymously(auth);
        currentUid = cred.user.uid;
        setUid(currentUid);
      }
      const ref = await addDoc(collection(db, "users", String(currentUid), "forms"), {
        ...form,
        updatedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
        source: "web-pwa",
      });
      setMessage(`${t('qna.success.sent')} ${ref.id}`);
    } catch (e: any) {
      setMessage(t('qna.error.sendCloud'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">{t('qna.title')}</h1>
      <p className="text-gray-300 mb-4 text-sm">{t('qna.subtitle')}</p>
      <div className="mb-6">
        <a href="/help-documents" className="text-gold underline text-sm">{t('qna.noPassportLink')}</a>
      </div>
      {message && <div className="mb-4 text-sm text-yellow-300" role="status" aria-live="polite">{message}</div>}
      {saving && <div className="mb-4 text-xs text-gray-400" role="status" aria-live="polite">{t('qna.status.saving')}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label htmlFor="fullName" className="block text-sm text-gray-400 mb-1">{t('qna.label.fullName')}</label>
          <input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm text-gray-400 mb-1">{t('qna.label.dob')}</label>
          <input id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
        </div>
        <div>
          <label htmlFor="nationality" className="block text-sm text-gray-400 mb-1">{t('qna.label.nationality')}</label>
          <input id="nationality" value={form.nationality} onChange={(e) => update("nationality", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
        </div>
        <div>
          <label htmlFor="documentType" className="block text-sm text-gray-400 mb-1">{t('qna.label.documentType')}</label>
          <select id="documentType" value={form.documentType} onChange={(e) => update("documentType", e.target.value as any)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold">
            <option value="none">{t('qna.option.none')}</option>
            <option value="passport">{t('qna.option.passport')}</option>
            <option value="id">{t('qna.option.id')}</option>
          </select>
        </div>
        {form.documentType !== "none" && (
          <div>
            <label htmlFor="documentNumber" className="block text-sm text-gray-400 mb-1">{t('qna.label.documentNumber')}</label>
            <input id="documentNumber" value={form.documentNumber || ""} onChange={(e) => update("documentNumber", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">{t('qna.label.phone')}</label>
            <input id="phone" value={form.phone || ""} onChange={(e) => update("phone", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">{t('qna.label.email')}</label>
            <input id="email" value={form.email || ""} onChange={(e) => update("email", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm text-gray-400 mb-1">{t('qna.label.address')}</label>
          <input id="address" value={form.address || ""} onChange={(e) => update("address", e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
        </div>
        <div>
          <label htmlFor="claimSummary" className="block text-sm text-gray-400 mb-1">{t('qna.label.claimSummary')}</label>
          <textarea id="claimSummary" value={form.claimSummary || ""} onChange={(e) => update("claimSummary", e.target.value)} rows={5} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold" />
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <button type="submit" aria-label="Guardar formulario en este dispositivo" className="bg-gold text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold/50">{t('qna.btn.saveLocal')}</button>
          <a href="/letter" className="border border-gold text-gold px-5 py-2 rounded-lg font-semibold hover:bg-gold hover:text-black">{t('qna.btn.generatePdf')}</a>
          <button type="button" onClick={handleSendToCloud} disabled={submitting} aria-busy={submitting} aria-label="Enviar formulario a la nube" className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
            {submitting ? t('qna.status.sending') : t('qna.btn.sendCloud')}
          </button>
        </div>
      </form>
    </div>
  );
}


