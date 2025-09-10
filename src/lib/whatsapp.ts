'use client';

// Utilidades para construir mensajes y enlaces de WhatsApp

export interface PaymentMessageParams {
  caseCode: string;
  amount?: number | null;
  userCode?: string | null;
  note?: string | null;
}

export function buildPaymentMessage(params: PaymentMessageParams): string {
  const { caseCode, amount, userCode, note } = params;
  const lines: string[] = [];
  lines.push('Hola, quiero confirmar mi pago.');
  lines.push(`CASE_CODE: ${String(caseCode || 'N/A')}`);
  if (userCode) lines.push(`USER_CODE: ${String(userCode)}`);
  if (typeof amount === 'number') lines.push(`Monto: ${formatCurrency(amount)}`);
  if (note) lines.push(`Nota: ${note}`);
  lines.push('Adjunto comprobante. ¡Gracias!');
  return lines.join('\n');
}

export function buildWhatsappLink(phoneE164: string, message: string): string {
  const phone = sanitizePhone(phoneE164);
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'es-ES'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

function sanitizePhone(phoneE164: string): string {
  return String(phoneE164 || '').replace(/[^\d]/g, '');
}




