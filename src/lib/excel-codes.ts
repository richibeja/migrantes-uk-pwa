// Sistema de códigos Excel para GANAFACIL ANBEL IA
import * as XLSX from 'xlsx';

export interface ActivationCode {
  id: string;
  code: string;
  type: 'basic' | 'premium' | 'vip';
  used: boolean;
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
  expiration?: string;
}

// Alias para compatibilidad
export type ExcelCode = ActivationCode;

// Almacenamiento en memoria (en producción sería una base de datos)
let excelCodes: ActivationCode[] = [
  {
    id: '1',
    code: 'GANAFACIL2024',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString(),
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    code: 'PREMIUM123',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString(),
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    code: 'VIP456',
    type: 'vip',
    used: false,
    createdAt: new Date().toISOString(),
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    code: 'BASIC789',
    type: 'basic',
    used: false,
    createdAt: new Date().toISOString(),
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Función para obtener todos los códigos
export function getActivationCodes(): ActivationCode[] {
  return excelCodes;
}

// Alias para compatibilidad
export const getAllExcelCodes = getActivationCodes;

// Función para obtener estadísticas de códigos
export function getStats() {
  const total = excelCodes.length;
  const used = excelCodes.filter(code => code.used).length;
  const unused = total - used;
  
  const byType = excelCodes.reduce((acc, code) => {
    acc[code.type] = (acc[code.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    used,
    unused,
    byType
  };
}

// Alias para compatibilidad
export const getExcelStats = getStats;

// Función para agregar un nuevo código
export function addNewCode(code: string, type: 'basic' | 'premium' | 'vip'): boolean {
  // Verificar si el código ya existe
  if (excelCodes.some(c => c.code === code.toUpperCase())) {
    return false;
  }

  const newCode: ActivationCode = {
    id: Date.now().toString(),
    code: code.toUpperCase(),
    type,
    used: false,
    createdAt: new Date().toISOString(),
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };
  
  excelCodes.push(newCode);
  return true;
}

// Alias para compatibilidad
export const addExcelCode = addNewCode;

// Función para generar un código aleatorio
export function generateRandomCode(): string {
  const prefixes = ['GANAFACIL', 'PREMIUM', 'VIP', 'BASIC'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${randomPrefix}${random}`;
}

// Alias para compatibilidad
export const generateRandomExcelCode = generateRandomCode;

// Función para resetear un código
export function resetCode(codeId: string): boolean {
  const codeIndex = excelCodes.findIndex(code => code.id === codeId);
  if (codeIndex === -1) return false;
  
  excelCodes[codeIndex].used = false;
  excelCodes[codeIndex].usedBy = undefined;
  excelCodes[codeIndex].usedAt = undefined;
  
  return true;
}

// Función para resetear todos los códigos
export function resetAllCodes(): void {
  excelCodes.forEach(code => {
    code.used = false;
    code.usedBy = undefined;
    code.usedAt = undefined;
  });
}

// Alias para compatibilidad
export const resetExcelCode = resetCode;

// Función para exportar códigos a Excel (XLSX)
export function exportToExcel(codes: ActivationCode[] = excelCodes, filename: string = 'codigos-activacion'): boolean {
  try {
    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();
    
    // Preparar datos
    const data = codes.map(code => ({
      'Código': code.code,
      'Estado': code.used ? 'Usado' : 'Disponible',
      'Tipo': code.type,
      'Email': code.usedBy || 'N/A',
      'Fecha Activación': code.usedAt ? new Date(code.usedAt).toLocaleDateString() : 'N/A',
      'Fecha Creación': new Date(code.createdAt).toLocaleDateString(),
      'Expiración': code.expiration ? new Date(code.expiration).toLocaleDateString() : 'N/A'
    }));
    
    // Crear hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Añadir hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Códigos de Activación');
    
    // Escribir archivo
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    return false;
  }
}

// Función para exportar códigos usados a Excel
export function exportUsedCodesToExcel(): string {
  const usedCodes = excelCodes.filter(code => code.used);
  const headers = ['ID', 'Código', 'Tipo', 'Usuario', 'Fecha de Uso'];
  const rows = usedCodes.map(code => [
    code.id,
    code.code,
    code.type,
    code.usedBy || '',
    code.usedAt ? new Date(code.usedAt).toLocaleDateString() : ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  return csvContent;
}

// Función para validar y usar un código
export function validateAndUseCode(code: string, userId: string): { success: boolean; type?: string; message: string } {
  const excelCode = excelCodes.find(c => c.code === code.toUpperCase());
  
  if (!excelCode) {
    return { success: false, message: 'Código no encontrado' };
  }
  
  if (excelCode.used) {
    return { success: false, message: 'Código ya utilizado' };
  }
  
  if (excelCode.expiration && new Date(excelCode.expiration) < new Date()) {
    return { success: false, message: 'Código expirado' };
  }
  
  // Marcar como usado
  excelCode.used = true;
  excelCode.usedBy = userId;
  excelCode.usedAt = new Date().toISOString();
  
  return { 
    success: true, 
    type: excelCode.type, 
    message: `Código válido. Tipo ${excelCode.type} activado.` 
  };
}