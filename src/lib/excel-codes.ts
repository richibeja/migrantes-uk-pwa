// 📊 SISTEMA SIMPLE PARA EXCEL - SIN BASE DE DATOS
// Este sistema funciona completamente en memoria y permite exportar a Excel

export interface ExcelCode {
  code: string;
  type: 'premium' | 'vip' | 'basic';
  used: boolean;
  usedBy?: string;
  usedAt?: string;
  expiration: string;
  description?: string;
}

// CÓDIGOS PREDEFINIDOS (ESTOS SE ACTUALIZAN MANUALMENTE EN EXCEL)
export let EXCEL_CODES: ExcelCode[] = [
  {
    code: 'GANAFACIL2024',
    type: 'premium',
    used: false,
    expiration: '2025-12-31',
    description: 'Código principal de prueba'
  },
  {
    code: 'PREMIUM123',
    type: 'premium', 
    used: false,
    expiration: '2025-12-31',
    description: 'Código premium de prueba'
  },
  {
    code: 'VIP456',
    type: 'vip',
    used: false,
    expiration: '2025-12-31',
    description: 'Código VIP de prueba'
  },
  {
    code: 'BASIC789',
    type: 'basic',
    used: false,
    expiration: '2025-12-31',
    description: 'Código básico de prueba'
  },
  {
    code: 'EXCEL001',
    type: 'premium',
    used: false,
    expiration: '2025-12-31',
    description: 'Código generado para Excel'
  },
  {
    code: 'EXCEL002',
    type: 'vip',
    used: false,
    expiration: '2025-12-31',
    description: 'Código VIP para Excel'
  }
];

// Validar código
export const validateExcelCode = (code: string): { valid: boolean; codeData?: ExcelCode; message?: string } => {
  const cleanCode = code.toUpperCase().trim();
  const codeData = EXCEL_CODES.find(c => c.code === cleanCode);
  
  if (!codeData) {
    return { valid: false, message: 'Código no encontrado' };
  }
  
  if (codeData.used) {
    return { valid: false, message: 'Código ya utilizado' };
  }
  
  // Verificar expiración
  if (new Date() > new Date(codeData.expiration)) {
    return { valid: false, message: 'Código expirado' };
  }
  
  return { valid: true, codeData, message: 'Código válido' };
};

// Marcar código como usado (solo en memoria)
export const markExcelCodeAsUsed = (code: string, email: string): boolean => {
  const cleanCode = code.toUpperCase().trim();
  const codeIndex = EXCEL_CODES.findIndex(c => c.code === cleanCode);
  
  if (codeIndex === -1 || EXCEL_CODES[codeIndex].used) {
    return false;
  }
  
  EXCEL_CODES[codeIndex].used = true;
  EXCEL_CODES[codeIndex].usedBy = email;
  EXCEL_CODES[codeIndex].usedAt = new Date().toLocaleDateString();
  
  return true;
};

// Obtener estadísticas
export const getExcelStats = () => {
  const total = EXCEL_CODES.length;
  const used = EXCEL_CODES.filter(c => c.used).length;
  const available = total - used;
  
  return { total, used, available };
};

// Obtener todos los códigos
export const getAllExcelCodes = (): ExcelCode[] => {
  return [...EXCEL_CODES];
};

// Obtener códigos disponibles
export const getAvailableExcelCodes = (): ExcelCode[] => {
  return EXCEL_CODES.filter(c => !c.used);
};

// Obtener códigos usados
export const getUsedExcelCodes = (): ExcelCode[] => {
  return EXCEL_CODES.filter(c => c.used);
};

// Agregar nuevo código
export const addExcelCode = (code: string, type: 'premium' | 'vip' | 'basic', expiration: string = '2024-12-31'): boolean => {
  const cleanCode = code.toUpperCase().trim();
  
  // Verificar que no exista
  if (EXCEL_CODES.find(c => c.code === cleanCode)) {
    return false;
  }
  
  EXCEL_CODES.push({
    code: cleanCode,
    type,
    used: false,
    expiration,
    description: `Código ${type} generado`
  });
  
  return true;
};

// Exportar datos para Excel
export const exportToExcel = (): string => {
  let csv = 'Código,Tipo,Estado,Email Usuario,Fecha Activación,Expiración,Descripción\n';
  
  EXCEL_CODES.forEach(code => {
    csv += `${code.code},${code.type},${code.used ? 'USADO' : 'DISPONIBLE'},${code.usedBy || ''},${code.usedAt || ''},${code.expiration},${code.description || ''}\n`;
  });
  
  return csv;
};

// Exportar solo códigos usados
export const exportUsedCodesToExcel = (): string => {
  let csv = 'Código,Tipo,Email Usuario,Fecha Activación,Expiración,Descripción\n';
  
  EXCEL_CODES
    .filter(code => code.used)
    .forEach(code => {
      csv += `${code.code},${code.type},${code.usedBy || ''},${code.usedAt || ''},${code.expiration},${code.description || ''}\n`;
    });
  
  return csv;
};

// Resetear código (para testing)
export const resetExcelCode = (code: string): boolean => {
  const cleanCode = code.toUpperCase().trim();
  const codeIndex = EXCEL_CODES.findIndex(c => c.code === cleanCode);
  
  if (codeIndex === -1) {
    return false;
  }
  
  EXCEL_CODES[codeIndex].used = false;
  EXCEL_CODES[codeIndex].usedBy = undefined;
  EXCEL_CODES[codeIndex].usedAt = undefined;
  
  return true;
};

// Generar código aleatorio
export const generateRandomExcelCode = (type: 'premium' | 'vip' | 'basic' = 'premium'): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};
