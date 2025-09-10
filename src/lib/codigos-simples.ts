// Sistema de Códigos Únicos Simples que SÍ funciona
// Cada usuario tiene un código único que solo se puede usar una vez

interface CodigoSimple {
  codigo: string;
  email: string;
  plan: string;
  usado: boolean;
  creado: string;
  expira: string;
}

class CodigosSimples {
  private codigos: Map<string, CodigoSimple> = new Map();

  constructor() {
    this.cargarCodigos();
  }

  // Generar código único
  generarCodigo(email: string, plan: string = 'premium'): string {
    const codigo = this.crearCodigo();
    const ahora = new Date();
    const expira = new Date(ahora.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días

    const codigoSimple: CodigoSimple = {
      codigo,
      email,
      plan,
      usado: false,
      creado: ahora.toISOString(),
      expira: expira.toISOString()
    };

    this.codigos.set(codigo, codigoSimple);
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
    this.codigos.set(codigo, codigoData);
    this.guardarCodigos();

    // Crear usuario
    const usuario = {
      id: `user_${Date.now()}`,
      email: codigoData.email,
      name: codigoData.email.split('@')[0],
      plan: codigoData.plan,
      activado: true,
      activadoEn: ahora.toISOString(),
      metodo: 'codigo_unico',
      codigo: codigo
    };

    // Guardar en localStorage
    localStorage.setItem('ganaFacilUser', JSON.stringify(usuario));
    localStorage.setItem('ganafacil_activated', 'true');

    return { 
      valido: true, 
      mensaje: 'Cuenta activada exitosamente',
      datos: usuario
    };
  }

  // Obtener todos los códigos
  obtenerCodigos(): CodigoSimple[] {
    return Array.from(this.codigos.values());
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
      localStorage.setItem('ganaFacilCodigosSimples', JSON.stringify(codigosArray));
    }
  }

  // Cargar códigos
  private cargarCodigos() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ganaFacilCodigosSimples');
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
export const codigosSimples = new CodigosSimples();
