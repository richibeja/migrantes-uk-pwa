// Configuración de Firebase corregida para GanaFácil
const firebaseConfig = {
  apiKey: "AIzaSyCaIyENrwBTFNaYMqEsZuznl65voI3xbLc",
  authDomain: "gana-facil-rifa-d5609.firebaseapp.com",
  projectId: "gana-facil-rifa-d5609",
  storageBucket: "gana-facil-rifa-d5609.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Inicializar Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  
  // Configurar Auth con dominios autorizados
  const auth = firebase.auth();
  
  // Lista de dominios autorizados
  const authorizedDomains = [
    'localhost',
    'gana-facil-rifa-d5609.firebaseapp.com',
    'gana-facil-rifa-d5609.web.app',
    'ganafacil.vercel.app',
    'gana-facil-7d54ub3o2-ganafacils-projects.vercel.app',
    'gana-facil-5fxy5qcd3-ganafacils-projects.vercel.app',
    'gana-facil-hle9lagad-ganafacils-projects.vercel.app',
    'gana-facil-2md9pa0xg-ganafacils-projects.vercel.app',
    'gana-facil-js2hq197j-ganafacils-projects.vercel.app',
    'ganafaci-anbel-pwa.vercel.app'
  ];
  
  // Verificar si el dominio actual está autorizado
  const currentDomain = window.location.hostname;
  const isAuthorized = authorizedDomains.includes(currentDomain);
  
  if (!isAuthorized) {
    console.warn('⚠️ Dominio no autorizado:', currentDomain);
    console.log('📋 Dominios autorizados:', authorizedDomains);
    
    // Redirigir al dominio fijo
    if (currentDomain.includes('vercel.app') && !currentDomain.includes('ganafacil.vercel.app')) {
      console.log('🔄 Redirigiendo al dominio fijo...');
      window.location.href = 'https://ganafacil.vercel.app';
    }
  } else {
    console.log('✅ Dominio autorizado:', currentDomain);
  }
  
  // Configurar Auth para manejar errores
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('✅ Usuario autenticado:', user.email);
    } else {
      console.log('ℹ️ No hay usuario autenticado');
    }
  });
  
  // Manejar errores de Auth
  auth.onError((error) => {
    console.error('❌ Error de Firebase Auth:', error);
    
    if (error.code === 'auth/unauthorized-domain') {
      console.log('🔄 Dominio no autorizado, redirigiendo...');
      window.location.href = 'https://ganafacil.vercel.app';
    }
  });
  
} else {
  console.error('❌ Firebase no está disponible');
}
