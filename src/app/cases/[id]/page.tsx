'use client';

import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import BackNav from '@/components/BackNav';

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = String(params?.id || '');
  const [uid, setUid] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => setUid(u?.uid || null));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!caseId) return;
    const ref = doc(db, 'cases', caseId);
    const unsub = onSnapshot(ref, (snap) => {
      setData({ id: snap.id, ...snap.data() });
      setLoading(false);
    }, (e) => {
      setError('No se pudo cargar el trámite');
      setLoading(false);
    });
    return () => unsub();
  }, [caseId]);

  const canDownload = useMemo(() => data?.status === 'pagado', [data]);

  useEffect(() => {
    (async () => {
      try {
        if (data?.uid) {
          const uref = doc(db, 'users', String(data.uid));
          const usnap = await getDoc(uref);
          const u = usnap.data() as any;
          setUserName(u?.name || 'Usuario');
        }
      } catch {}
    })();
  }, [data?.uid]);

  function formatDate(d: any): string {
    try {
      const date = d?.toDate ? d.toDate() : (d ? new Date(d) : new Date());
      return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    } catch {
      return '';
    }
  }

  async function handleDownloadPdf() {
    try {
      const pdf = await PDFDocument.create();
      const page = pdf.addPage([595.28, 841.89]); // A4
      const { width, height } = page.getSize();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

      // Logo opcional
      let y = height - 60;
      try {
        const res = await fetch('/logo.png');
        if (res.ok) {
          const bytes = await res.arrayBuffer();
          let img: any = null;
          try { img = await pdf.embedPng(bytes); } catch { img = await pdf.embedJpg(bytes); }
          if (img) {
            const iw = 120;
            const ih = (img.height / img.width) * iw;
            page.drawImage(img, { x: 50, y: height - ih - 30, width: iw, height: ih });
            y = height - ih - 50;
          }
        }
      } catch {}

      // Título
      const title = 'Comprobante de Trámite';
      page.drawText(title, { x: 50, y, size: 18, font: fontBold, color: rgb(1, 0.84, 0) });
      y -= 30;

      // Campos
      const lines = [
        `CASE_CODE: ${data?.caseCode || '—'}`,
        `Usuario: ${userName || '—'}`,
        `Estado del trámite: ${data?.status || '—'}`,
        `Fecha de creación: ${formatDate(data?.createdAt)}`,
      ];
      lines.forEach((t) => {
        page.drawText(t, { x: 50, y, size: 12, font, color: rgb(0.9, 0.9, 0.9) });
        y -= 20;
      });

      // Pie de página
      const footer = '“Documento generado automáticamente – Agencia de Trámites”';
      page.drawText(footer, { x: 50, y: 40, size: 10, font, color: rgb(0.7, 0.7, 0.7) });

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const name = `case-${data?.caseCode || data?.id || 'comprobante'}.pdf`;
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (e) {
      alert('No fue posible generar el PDF');
    }
  }

  function openWhatsApp() {
    const userCode = data?.userCode || data?.user_code || 'N/A';
    const caseCode = data?.caseCode || 'N/A';
    const text = `Hola, ya realicé el depósito.\nMi CÓDIGO DE USUARIO: ${userCode}\nMi CÓDIGO DE TRÁMITE: ${caseCode}\nAdjunto comprobante para validar y desbloquear mis documentos. Gracias.`;
    const url = `https://wa.me/18053080769?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  async function markPendingPayment() {
    if (!caseId) return;
    await setDoc(doc(db, 'cases', caseId), { status: 'pendiente_pago' }, { merge: true });
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <BackNav />
      {loading ? (
        <div>Cargando…</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gold">{data?.title || 'Trámite'}</h1>
              <div className="text-xs text-gray-400">CASE_CODE: <span className="font-mono">{data?.caseCode || '—'}</span></div>
              {data?.userCode && (
                <div className="text-xs text-gray-400">USER_CODE: <span className="font-mono">{data?.userCode}</span></div>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded ${data?.status==='pagado'?'bg-green-700/50 border border-green-500/50':'bg-yellow-700/40 border border-yellow-500/40'}`}>{data?.status}</span>
          </div>

          {canDownload ? (
            <div className="bg-green-900/30 border border-green-600/40 p-4 rounded-xl">
              <div className="text-green-300">✅ Pago confirmado. Puedes descargar o enviar tu documento.</div>
              <div className="mt-3 flex gap-3">
                <button onClick={handleDownloadPdf} className="bg-gold text-black px-4 py-2 rounded">Descargar PDF</button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded">Enviar por email</button>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-900/30 border border-yellow-600/40 p-4 rounded-xl">
              <div className="text-yellow-300 font-semibold">Para descargar o enviar este documento debe confirmar el pago.</div>
              <div className="text-gray-300 text-sm mt-1">Presione el botón para enviar su comprobante por WhatsApp.</div>
              <div className="mt-3 flex gap-3">
                <button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Enviar comprobante por WhatsApp</button>
                {data?.status === 'borrador' && (
                  <button onClick={markPendingPayment} className="bg-gray-700 text-white px-4 py-2 rounded">Marcar como pendiente de pago</button>
                )}
              </div>
            </div>
          )}

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Datos del trámite</h2>
            <pre className="text-xs whitespace-pre-wrap text-gray-300">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}


