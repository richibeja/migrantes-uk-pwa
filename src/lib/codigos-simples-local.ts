// Sistema de Códigos Únicos Simples que funciona sin Firebase
// Usa localStorage para almacenamiento temporal

interface CodigoLocal {
  codigo: string;
  email: string;
  plan: string;
  usado: boolean;
  creado: string;
  expira: string;
  usadoEn?: string;
  usadoPor?: string;
}

class CodigosSimplesLocal {
  private codigos: Map<string, CodigoLocal> = new Map();
  private storageKey = 'ganaFacilCodigosLocales';

  constructor() {
    this.cargarCodigos();
  }

  // Generar código único
  generarCodigo(email: string, plan: string = 'premium'): string {
    const codigo = this.crearCodigo();
    const ahora = new Date();
    const expira = new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const codigoLocal: CodigoLocal = {
      codigo,
      email,
      plan,
      usado: false,
      creado: ahora.toISOString(),
      expira: expira.toISOString()
    };

    this.codigos.set(codigo, codigoLocal);
    this.guardarCodigos();

    return codigo;
  }

  // Validar código
  validarCodigo(codigo: string): { valido: boolean; mensaje: string; datos?: any } {
    const codigoData = this.codigos.get(codigo);

    if (!codigoData) {
      return { valido: false, mensaje: 'Código no válido' };
    }

    if (codigoData.usado) {
      return { valido: false, mensaje: 'Este código ya fue usado' };
    }

    const ahora = new Date();
    const expira = new Date(codigoData.expira);

    if (ahora > expira) {
      return { valido: false, mensaje: 'Este código ha expirado' };
    }

    // Marcar como usado
    codigoData.usado = true;
    codigoData.usadoEn = ahora.toISOString();
    codigoData.usadoPor = 'usuario@ganafacil.com';
    this.codigos.set(codigo, codigoData);
    this.guardarCodigos();

    // Crear usuario
    const usuario = {
      id: `user_${Date.now()}`,
      email: codigoData.email,
      name: codigoData.email.split('@')[0],
      plan: codigoData.plan,
      activated: true,
      activatedAt: ahora.toISOString(),
      method: 'unique_code_local',
      code: codigo
    };

    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ganaFacilUser', JSON.stringify(usuario));
      localStorage.setItem('ganafacil_activated', 'true');
    }

    return { 
      valido: true, 
      mensaje: 'Cuenta activada exitosamente',
      datos: usuario
    };
  }

  // Obtener todos los códigos
  obtenerCodigos(): CodigoLocal[] {
    return Array.from(this.codigos.values());
  }

  // Obtener estadísticas
  obtenerEstadisticas() {
    const todos = this.obtenerCodigos();
    return {
      total: todos.length,
      usados: todos.filter(c => c.usado).length,
      disponibles: todos.filter(c => !c.usado).length
    };
  }

  // Eliminar código
  eliminarCodigo(codigo: string): boolean {
    if (this.codigos.has(codigo)) {
      this.codigos.delete(codigo);
      this.guardarCodigos();
      return true;
    }
    return false;
  }

  // Crear código único
  private crearCodigo(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    let codigo = '';
    
    // 3 letras + 4 números
    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    for (let i = 0; i < 4; i++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
    
    return codigo;
  }

  // Guardar códigos
  private guardarCodigos() {
    if (typeof window !== 'undefined') {
      const codigosArray = Array.from(this.codigos.entries());
      localStorage.setItem(this.storageKey, JSON.stringify(codigosArray));
    }
  }

  // Cargar códigos
  private cargarCodigos() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          const codigosArray = JSON.parse(stored);
          this.codigos = new Map(codigosArray);
        } catch (error) {
          console.error('Error cargando códigos:', error);
        }
      }
    }
  }
}

// Instancia global
export const codigosSimplesLocal = new CodigosSimplesLocal();
