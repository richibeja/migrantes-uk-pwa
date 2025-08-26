export interface AsylumFormData {
  fullName: string;
  dateOfBirth: string; // ISO yyyy-mm-dd
  nationality: string;
  documentType?: 'passport' | 'id' | 'none';
  documentNumber?: string;
  phone?: string;
  email?: string;
  address?: string;
  claimSummary?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function createEmptyAsylumForm(): AsylumFormData {
  const now = new Date().toISOString();
  return {
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    documentType: 'none',
    documentNumber: '',
    phone: '',
    email: '',
    address: '',
    claimSummary: '',
    createdAt: now,
    updatedAt: now,
  };
}

export function validateAsylumForm(data: AsylumFormData): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.fullName.trim()) errors.push('Nombre completo es obligatorio');
  if (!data.dateOfBirth.trim()) errors.push('Fecha de nacimiento es obligatoria');
  if (!data.nationality.trim()) errors.push('Nacionalidad es obligatoria');
  if (data.documentType !== 'none') {
    if (!data.documentNumber?.trim()) errors.push('Número de documento es obligatorio');
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Email inválido');
  return { ok: errors.length === 0, errors };
}


