// Sistema unificado de autenticación
export interface User {
  id: string;
  username?: string;
  email?: string;
  code: string;
  plan: 'basic' | 'premium' | 'vip';
  isActivated: boolean;
  status: 'active' | 'pending' | 'expired';
  createdAt: Date;
  expiresAt?: Date;
  isAdmin?: boolean;
}

// CÓDIGOS VÁLIDOS UNIFICADOS
export const VALID_CODES = {
  // Códigos Premium
  'GANAFACIL2024': { plan: 'premium', isAdmin: false },
  'PREMIUM123': { plan: 'premium', isAdmin: false },
  'VIP456': { plan: 'vip', isAdmin: false },
  
  // Códigos Básicos
  'BASIC789': { plan: 'basic', isAdmin: false },
  'DEMO2024': { plan: 'basic', isAdmin: false },
  'TEST123': { plan: 'basic', isAdmin: false },
  
  // Códigos de admin
  'ADMIN123': { plan: 'premium', isAdmin: true },
  'ADMIN456': { plan: 'premium', isAdmin: true },
  'ADMIN789': { plan: 'premium', isAdmin: true },
  'GANA7878': { plan: 'premium', isAdmin: true },
  'FACIL0707': { plan: 'premium', isAdmin: true }
};

export const validateCode = (code: string): { valid: boolean; data?: typeof VALID_CODES[keyof typeof VALID_CODES] } => {
  const normalizedCode = code.trim().toUpperCase();
  const codeData = VALID_CODES[normalizedCode as keyof typeof VALID_CODES];
  
  return {
    valid: !!codeData,
    data: codeData
  };
};

export const createUser = (code: string, email?: string, username?: string): User => {
  const validation = validateCode(code);
  
  if (!validation.valid || !validation.data) {
    throw new Error('Código no válido');
  }

  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 días de validez

  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username: username || `user_${Date.now()}`,
    email: email || '',
    code: code.toUpperCase(),
    plan: validation.data.plan,
    isActivated: true,
    status: 'active',
    createdAt: now,
    expiresAt: expiresAt,
    isAdmin: validation.data.isAdmin
  };
};

export const saveUser = (user: User): void => {
  localStorage.setItem('ganaFacilUser', JSON.stringify(user));
  
  // También guardar en la lista de cuentas
  const existingAccounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
  const accounts = Array.isArray(existingAccounts) ? existingAccounts : [];
  
  // Actualizar o agregar cuenta
  const existingIndex = accounts.findIndex((acc: any) => acc.id === user.id);
  if (existingIndex >= 0) {
    accounts[existingIndex] = user;
  } else {
    accounts.push(user);
  }
  
  localStorage.setItem('ganaFacilAccounts', JSON.stringify(accounts));
};

export const loadUser = (): User | null => {
  try {
    const savedUser = localStorage.getItem('ganaFacilUser');
    if (!savedUser) return null;
    
    const userData = JSON.parse(savedUser);
    userData.createdAt = new Date(userData.createdAt);
    if (userData.expiresAt) {
      userData.expiresAt = new Date(userData.expiresAt);
    }
    
    // Verificar si el usuario no ha expirado
    if (userData.expiresAt && new Date() > userData.expiresAt) {
      localStorage.removeItem('ganaFacilUser');
      return null;
    }
    
    return userData;
  } catch (error) {
    console.error('Error loading user:', error);
    localStorage.removeItem('ganaFacilUser');
    return null;
  }
};

export const clearUser = (): void => {
  localStorage.removeItem('ganaFacilUser');
};

export const isUserAuthenticated = (): boolean => {
  const user = loadUser();
  return user !== null && user.isActivated && user.status === 'active';
};

export const isUserAdmin = (): boolean => {
  const user = loadUser();
  return user !== null && user.isAdmin === true;
};
