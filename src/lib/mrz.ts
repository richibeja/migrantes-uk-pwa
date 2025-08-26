export type MrzData = {
  documentType?: 'passport' | 'id' | 'unknown';
  issuingCountry?: string;
  surname?: string;
  givenNames?: string;
  fullName?: string;
  documentNumber?: string;
  nationality?: string;
  dateOfBirth?: string; // yyyy-mm-dd
};

function cleanup(text: string): string {
  return text.replace(/<+/g, ' ').replace(/[^A-Z\s]/g, '').trim();
}

function yyMMddToIso(s: string): string | undefined {
  if (!/^\d{6}$/.test(s)) return undefined;
  const yy = parseInt(s.slice(0, 2), 10);
  const mm = parseInt(s.slice(2, 4), 10);
  const dd = parseInt(s.slice(4, 6), 10);
  const fullYear = yy >= 50 ? 1900 + yy : 2000 + yy;
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return undefined;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${fullYear}-${pad(mm)}-${pad(dd)}`;
}

// Minimal MRZ TD3 parser (passports).
export function parseMrz(lines: string[]): MrzData | null {
  if (lines.length < 2) return null;
  const l1 = lines[0].replace(/\s+/g, '');
  const l2 = lines[1].replace(/\s+/g, '');
  if (!l1.startsWith('P<')) return null;
  const issuingCountry = l1.slice(2, 5).replace(/</g, '').toUpperCase();
  const namePart = l1.slice(5);
  const nameSegments = namePart.split('<<');
  const surname = cleanup(nameSegments[0] || '');
  const givenNames = cleanup((nameSegments[1] || '').replace(/</g, ' '));
  const fullName = `${surname}${givenNames ? ' ' + givenNames : ''}`.trim();

  const documentNumber = l2.slice(0, 9).replace(/</g, '');
  const nationality = l2.slice(10, 13).replace(/</g, '').toUpperCase();
  const dobRaw = l2.slice(13, 19);
  const dateOfBirth = yyMMddToIso(dobRaw);

  return {
    documentType: 'passport',
    issuingCountry,
    surname: surname || undefined,
    givenNames: givenNames || undefined,
    fullName: fullName || undefined,
    documentNumber: documentNumber || undefined,
    nationality: nationality || undefined,
    dateOfBirth,
  };
}



