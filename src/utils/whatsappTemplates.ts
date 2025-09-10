import { APP_CONFIG } from '@/lib/constants';
import { buildWhatsappLink, formatCurrency } from '@/lib/whatsapp';

export const WhatsAppTemplates = {
  pagoPendiente: (caseCode: string, monto: number, currency: string = 'USD') => `
Hola 👋
Tu trámite con código *${caseCode}* está listo para el pago.

Monto: ${formatCurrency(monto, currency)}
Por favor envíanos el comprobante de pago a este chat indicando tu CASE_CODE para validarlo.
`.trim(),

  pagoValidado: (caseCode: string) => `
✅ Pago validado

Tu trámite con código *${caseCode}* ha sido confirmado.
Nuestro equipo continuará el proceso y podrás seguirlo en:
${APP_CONFIG.url.replace(/\/$/, '')}/track/${caseCode}
`.trim(),

  enProceso: (caseCode: string) => `
🔄 Seguimiento de tu trámite

Tu caso *${caseCode}* está en proceso.
Recuerda que puedes ver la línea de tiempo aquí:
${APP_CONFIG.url.replace(/\/$/, '')}/track/${caseCode}
`.trim(),

  finalizado: (caseCode: string) => `
🎉 Trámite finalizado

Tu caso con código *${caseCode}* ha sido entregado.
Gracias por confiar en nosotros.
`.trim(),
};

export function buildWhatsappPaymentLink(phoneE164: string, caseCode: string, monto: number, currency: string = 'USD'): string {
  const msg = WhatsAppTemplates.pagoPendiente(caseCode, monto, currency);
  return buildWhatsappLink(phoneE164, msg);
}

export function buildTrackUrl(caseCode: string): string {
  return `${APP_CONFIG.url.replace(/\/$/, '')}/track/${caseCode}`;
}






