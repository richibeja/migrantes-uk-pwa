'use client';

import { WhatsAppTemplates } from '@/utils/whatsappTemplates';

type TemplateType = 'pagoPendiente' | 'pagoValidado' | 'enProceso' | 'finalizado';

export default function CopyWhatsAppButton({
  type,
  caseCode,
  monto,
}: {
  type: TemplateType;
  caseCode: string;
  monto?: number;
}) {
  const copyMessage = () => {
    const msg =
      type === 'pagoPendiente'
        ? WhatsAppTemplates.pagoPendiente(caseCode, monto || 0)
        : WhatsAppTemplates[type](caseCode);

    try {
      navigator.clipboard.writeText(msg);
      alert('Plantilla copiada. Pega en WhatsApp ✅');
    } catch {
      alert('No se pudo copiar la plantilla');
    }
  };

  return (
    <button
      onClick={copyMessage}
      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
    >
      Copiar mensaje ({type})
    </button>
  );
}













