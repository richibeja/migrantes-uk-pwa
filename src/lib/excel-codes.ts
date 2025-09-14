// Sistema de códigos Excel para GANAFACIL ANBEL IA

export interface ExcelCode {
  id: string;
  code: string;
  plan: 'basic' | 'premium' | 'vip';
  isUsed: boolean;
  usedBy?: string;
  usedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

// Almacenamiento en memoria (en producción sería una base de datos)
let excelCodes: ExcelCode[] = [
  {
    id: '1',
    code: 'GANAFACIL2024',
    plan: 'premium',
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año
  },
  {
    id: '2',
    code: 'PREMIUM123',
    plan: 'premium',
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    code: 'VIP456',
    plan: 'vip',
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    code: 'BASIC789',
    plan: 'basic',
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  }
];

// Función para obtener todos los códigos
export function getAllExcelCodes(): ExcelCode[] {
  return excelCodes;
}

// Función para obtener estadísticas de códigos
export function getExcelStats() {
  const total = excelCodes.length;
  const used = excelCodes.filter(code => code.isUsed).length;
  const available = total - used;
  
  const byPlan = excelCodes.reduce((acc, code) => {
    acc[code.plan] = (acc[code.plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    used,
    available,
    byPlan
  };
}

// Función para agregar un nuevo código
export function addExcelCode(code: string, plan: 'basic' | 'premium' | 'vip'): ExcelCode {
  const newCode: ExcelCode = {
    id: Date.now().toString(),
    code: code.toUpperCase(),
    plan,
    isUsed: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  };
  
  excelCodes.push(newCode);
  return newCode;
}

// Función para generar un código aleatorio
export function generateRandomExcelCode(plan: 'basic' | 'premium' | 'vip'): string {
  const prefix = plan.toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${random}`;
}

// Función para resetear un código
export function resetExcelCode(codeId: string): boolean {
  const codeIndex = excelCodes.findIndex(code => code.id === codeId);
  if (codeIndex === -1) return false;
  
  excelCodes[codeIndex].isUsed = false;
  excelCodes[codeIndex].usedBy = undefined;
  excelCodes[codeIndex].usedAt = undefined;
  
  return true;
}

// Función para exportar códigos a Excel
export function exportToExcel(): string {
  const headers = ['ID', 'Código', 'Plan', 'Usado', 'Usuario', 'Fecha de Uso', 'Creado', 'Expira'];
  const rows = excelCodes.map(code => [
    code.id,
    code.code,
    code.plan,
    code.isUsed ? 'Sí' : 'No',
    code.usedBy || '',
    code.usedAt?.toLocaleDateString() || '',
    code.createdAt.toLocaleDateString(),
    code.expiresAt?.toLocaleDateString() || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  return csvContent;
}

// Función para exportar códigos usados a Excel
export function exportUsedCodesToExcel(): string {
  const usedCodes = excelCodes.filter(code => code.isUsed);
  const headers = ['ID', 'Código', 'Plan', 'Usuario', 'Fecha de Uso'];
  const rows = usedCodes.map(code => [
    code.id,
    code.code,
    code.plan,
    code.usedBy || '',
    code.usedAt?.toLocaleDateString() || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  return csvContent;
}

// Función para validar y usar un código
export function validateAndUseCode(code: string, userId: string): { success: boolean; plan?: string; message: string } {
  const excelCode = excelCodes.find(c => c.code === code.toUpperCase());
  
  if (!excelCode) {
    return { success: false, message: 'Código no encontrado' };
  }
  
  if (excelCode.isUsed) {
    return { success: false, message: 'Código ya utilizado' };
  }
  
  if (excelCode.expiresAt && excelCode.expiresAt < new Date()) {
    return { success: false, message: 'Código expirado' };
  }
  
  // Marcar como usado
  excelCode.isUsed = true;
  excelCode.usedBy = userId;
  excelCode.usedAt = new Date();
  
  return { 
    success: true, 
    plan: excelCode.plan, 
    message: `Código válido. Plan ${excelCode.plan} activado.` 
  };
}